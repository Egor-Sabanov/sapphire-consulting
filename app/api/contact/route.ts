import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '../../../lib/contact-schema';
import { contactNotificationSubject, renderContactNotification } from '../../../lib/email/contact-email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 48 * 1024;
const MIN_FORM_TIME_MS = 1_800;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 6;

const attempts = new Map<string, number[]>();

function json(data: Record<string, unknown>, init?: ResponseInit) {
  return Response.json(data, { headers: { 'Cache-Control': 'no-store' }, ...init });
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || (process.env.NODE_ENV === 'production' ? 'https' : 'http');

  if (!origin) return false;

  const allowed = new Set<string>();
  const requestOrigin = `${protocol}://${host}`;
  allowed.add(requestOrigin.replace(/\/$/, ''));

  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) allowed.add(configured.replace(/\/$/, ''));

  return allowed.has(origin.replace(/\/$/, ''));
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);

  if (attempts.size > 2_000) {
    for (const [storedKey, timestamps] of attempts) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_WINDOW_MS)) attempts.delete(storedKey);
    }
  }
  return false;
}

function clientMessage(locale: 'ru' | 'en', key: 'config' | 'rate' | 'invalid' | 'error' | 'method') {
  const copy = {
    ru: {
      config: 'Форма временно недоступна. Мы уже проверяем настройки.',
      rate: 'Слишком много попыток. Пожалуйста, попробуйте позже.',
      invalid: 'Проверьте заполненные поля и попробуйте ещё раз.',
      error: 'Не удалось отправить заявку. Попробуйте ещё раз позже.',
      method: 'Метод запроса не поддерживается.',
    },
    en: {
      config: 'The form is temporarily unavailable. We are checking the configuration.',
      rate: 'Too many attempts. Please try again later.',
      invalid: 'Please check the fields and try again.',
      error: 'We could not send your request. Please try again later.',
      method: 'Request method is not supported.',
    },
  } as const;
  return copy[locale][key];
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ ok: false, message: clientMessage('en', 'invalid') }, { status: 415 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: clientMessage('en', 'invalid') }, { status: 413 });
  }

  if (!isAllowedOrigin(request)) {
    return json({ ok: false, message: clientMessage('en', 'invalid') }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: clientMessage('ru', 'invalid') }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  const locale = parsed.success ? parsed.data.locale : body && typeof body === 'object' && 'locale' in body && body.locale === 'en' ? 'en' : 'ru';

  if (!parsed.success) {
    return json({ ok: false, message: clientMessage(locale, 'invalid'), issues: process.env.NODE_ENV === 'development' ? parsed.error.flatten() : undefined }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return json({ ok: false, message: clientMessage(locale, 'rate') }, { status: 429, headers: { 'Retry-After': '900' } });
  }

  const data = parsed.data;
  if (data.website) {
    return json({ ok: true }, { status: 200 });
  }

  if (Date.now() - data.startedAt < MIN_FORM_TIME_MS) {
    return json({ ok: false, message: clientMessage(data.locale, 'invalid') }, { status: 400 });
  }

  const formMode = process.env.CONTACT_FORM_MODE?.trim().toLowerCase() || 'email';

  // Demo mode is intentionally non-delivery: useful for client previews before
  // the company provides a verified sending domain and mailbox. The request is
  // still fully validated and passes through the same anti-spam checks.
  if (formMode === 'demo') {
    console.info('Contact form demo submission', {
      locale: data.locale,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      messageLength: data.message.length,
      submittedAt: new Date().toISOString(),
    });

    return json({ ok: true, demo: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const contactEmail = process.env.CONTACT_EMAIL?.trim();
  const contactFrom = process.env.CONTACT_FROM?.trim();

  if (!apiKey || !contactEmail || !contactFrom) {
    return json({ ok: false, message: clientMessage(data.locale, 'config') }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const { data: sendData, error } = await resend.emails.send({
      from: contactFrom,
      to: [contactEmail],
      replyTo: data.email,
      subject: contactNotificationSubject(data),
      html: renderContactNotification(data),
    }, {
      signal: AbortSignal.timeout(8_000),
    });

    if (error) {
      console.error('Contact form email provider error', { name: error.name, statusCode: error.statusCode });
      return json({ ok: false, message: clientMessage(data.locale, 'error') }, { status: 502 });
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
          signal: AbortSignal.timeout(5_000),
        });
      } catch (webhookError) {
        console.warn('Contact form webhook failed', webhookError);
      }
    }

    return json({ ok: true, id: sendData?.id || null });
  } catch (error) {
    console.error('Contact form unexpected error', error instanceof Error ? error.message : error);
    return json({ ok: false, message: clientMessage(data.locale, 'error') }, { status: 500 });
  }
}

export async function GET() {
  return json({ ok: false, message: clientMessage('en', 'method') }, { status: 405, headers: { Allow: 'POST' } });
}
