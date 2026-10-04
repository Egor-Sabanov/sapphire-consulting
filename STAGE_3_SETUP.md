# Stage 3 — working contact form

## What is included

- Next.js App Router Route Handler at `/api/contact`.
- Zod validation on the server and in the client form.
- Resend email delivery.
- Same-origin `Origin` verification.
- `application/json` content-type enforcement.
- Body-size limit.
- Honeypot field.
- Minimum fill-time check.
- Basic per-IP rate limiting for each running instance.
- Optional webhook forwarding.
- No cookie is required by the contact form.

Next.js Route Handlers use the Web Request/Response APIs and are defined in the `app` directory.

## Resend configuration

1. Create a Resend account.
2. Verify the `sbs.expert` sending domain.
3. Create an API key.
4. Set these environment variables:

```env
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@sbs.expert
CONTACT_FROM=Sapphire Consulting <website@sbs.expert>
NEXT_PUBLIC_SITE_URL=https://sbs.expert
```

Do not expose `RESEND_API_KEY` with a `NEXT_PUBLIC_` prefix.

## Local development

```bash
npm install
npm run dev
```

To test a real email locally, create `.env.local` from `.env.example` and add the Resend values.

Without a configured Resend key/from address, the endpoint intentionally returns HTTP 503 instead of pretending that a request was delivered.

## Production / Vercel

Add `RESEND_API_KEY` as a Secret and the other environment values in the Production environment. Redeploy after changing environment variables.

## Before go-live

- Verify the domain in Resend.
- Send a test request from RU.
- Send a test request from EN.
- Confirm Reply-To is the visitor's email.
- Test invalid data and spam honeypot.
- Test 429 handling.
- Run `npm run check`.
- Run a production build before DNS cutover.

## Recommended production mail DNS

Use a sender address on the verified `sbs.expert` domain and configure the DNS records Resend provides (SPF/DKIM). Keep the API key in Vercel as a Secret, not a public variable.

### Demo mode (for previewing the site)

You can test the entire form before the company gives you mailbox/domain details.
Set:

```env
CONTACT_FORM_MODE=demo
```

The form will validate the fields, anti-spam rules and consent exactly as normal, then return a successful result without sending an email. The submitted contact metadata is logged only in the local server terminal so you can confirm the request reached the backend.

When the real mailbox and verified domain are ready, change it to:

```env
CONTACT_FORM_MODE=email
```

and provide `RESEND_API_KEY`, `CONTACT_EMAIL` and `CONTACT_FROM`.
