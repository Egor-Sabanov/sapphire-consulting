import type { ContactFormData } from '../contact-schema';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function contactNotificationSubject(data: ContactFormData): string {
  const prefix = data.locale === 'en' ? 'New website request' : 'Новая заявка с сайта';
  return `${prefix}: ${data.subject}`;
}

export function renderContactNotification(data: ContactFormData): string {
  const labels = data.locale === 'en'
    ? { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', subject: 'Subject', message: 'Message' }
    : { name: 'Имя', company: 'Компания', email: 'Email', phone: 'Телефон', subject: 'Тема', message: 'Сообщение' };

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #e6edf3;color:#657789;font:600 12px/1.4 Arial,sans-serif;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e6edf3;color:#0b1b2a;font:400 14px/1.55 Arial,sans-serif;vertical-align:top;">${escapeHtml(value || '—').replaceAll('\n', '<br />')}</td>
    </tr>`;

  return `<!doctype html>
<html lang="${data.locale}">
  <body style="margin:0;background:#f4f7fa;padding:32px 16px;font-family:Arial,sans-serif;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dce5ec;border-radius:18px;overflow:hidden;">
      <div style="background:#071b2d;padding:24px 28px;color:#ffffff;">
        <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#80c9ff;font-weight:700;">Sapphire Consulting</div>
        <h1 style="font-size:24px;line-height:1.2;margin:10px 0 0;">${escapeHtml(contactNotificationSubject(data))}</h1>
      </div>
      <div style="padding:24px 14px 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          ${row(labels.name, data.name)}
          ${row(labels.company, data.company)}
          ${row(labels.email, data.email)}
          ${row(labels.phone, data.phone)}
          ${row(labels.subject, data.subject)}
          ${row(labels.message, data.message)}
        </table>
      </div>
      <div style="padding:18px 28px 26px;color:#7a8b9a;font-size:12px;line-height:1.5;">
        ${data.locale === 'en' ? 'Submitted through the production website form.' : 'Заявка отправлена через рабочую форму сайта.'}
      </div>
    </div>
  </body>
</html>`;
}
