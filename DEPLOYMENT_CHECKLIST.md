# Sapphire Consulting — production launch checklist

## Before deploy
- [ ] `CONTACT_FORM_MODE=demo` while the company email is not connected.
- [ ] `NEXT_PUBLIC_SITE_URL=https://sbs.expert`.
- [ ] Confirm final company contact details and legal copy.
- [ ] Confirm public use of client logos, cases and team photos.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run check:i18n`.
- [ ] Run `npm run check:routes`.
- [ ] Run `npm run check:api`.
- [ ] Run `npm run preflight`.
- [ ] Run `npm run test:e2e` after installing Playwright browsers.
- [ ] Run `npm run build`.

## Vercel
- [ ] Import the GitHub repository as a Next.js project.
- [ ] Use Node.js 22 LTS in project settings.
- [ ] Set `NEXT_PUBLIC_SITE_URL`.
- [ ] Keep `CONTACT_FORM_MODE=demo` for the preview deployment.
- [ ] Enable Vercel Web Analytics.
- [ ] Enable Vercel Speed Insights.
- [ ] Check the preview on desktop, tablet and mobile.

## When the company provides the mailbox
- [ ] Verify `sbs.expert` in Resend.
- [ ] Add `RESEND_API_KEY` as a secret in Vercel.
- [ ] Add `CONTACT_EMAIL`.
- [ ] Add `CONTACT_FROM` using a verified `sbs.expert` sender.
- [ ] Change `CONTACT_FORM_MODE=email`.
- [ ] Submit a real test request from RU and EN.
- [ ] Confirm delivery and Reply-To behavior.

## Domain / DNS
- [ ] Point `sbs.expert` to the approved Vercel target.
- [ ] Confirm HTTPS.
- [ ] Confirm `https://sbs.expert/ru` and `https://sbs.expert/en`.
- [ ] Confirm sitemap and robots.
- [ ] Confirm Open Graph preview.

## Post-launch
- [ ] Verify form success and error states.
- [ ] Verify analytics pageviews and CTA / form events.
- [ ] Monitor LCP < 2.5s, INP < 200ms, CLS < 0.1 in real-user data.
- [ ] Check Vercel logs for server errors.
- [ ] Keep GitHub history and deployment rollback available.
