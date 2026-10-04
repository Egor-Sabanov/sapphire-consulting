# Sapphire Consulting — production website

## Stack
- Next.js 16.3.8 (Active LTS)
- React 19.3.0
- TypeScript 6
- Zod 4.6+
- Resend 6.32.0 (transactional email)
- ESLint 10.12+
- Playwright 1.63+
- Git / GitHub / Vercel

## Structure
- `app/` — routes, layouts, metadata and API Route Handlers
- `components/` — reusable UI
- `data.ts` — business content and localized copy
- `lib/contact-schema.ts` — shared form validation
- `lib/email/` — email rendering and notification helpers
- `public/assets/` — optimized local assets
- `tests/` — end-to-end smoke tests

## Setup
1. Use Node.js 20.9+ (Node 22 LTS recommended).
2. `npm install`
3. Copy `.env.example` to `.env.local`.
4. Run `npm run dev`.

## Quality checks
```bash
npm run lint
npm run typecheck
npm run check:i18n
npm run check:routes
npm run check:api
npx playwright install
npm run test:e2e
npm run build
```

`npm run check` runs the core checks together.

## Contact form — Stage 3
The form posts JSON to `/api/contact`. The server validates the payload with Zod, verifies the browser origin, limits body size, applies a per-IP request limit, rejects the honeypot and submissions that are filled unrealistically fast, and sends the notification through Resend.

The site does not need cookies for this contact flow.

### Environment
```env
NEXT_PUBLIC_SITE_URL=https://sbs.expert
RESEND_API_KEY=
CONTACT_EMAIL=info@sbs.expert
CONTACT_FROM=Sapphire Consulting <website@sbs.expert>
CONTACT_WEBHOOK_URL=
```

`CONTACT_FROM` must be a sender on a domain verified in Resend. Keep `RESEND_API_KEY` server-side only; never prefix it with `NEXT_PUBLIC_`.

Without a valid mail configuration, `/api/contact` returns `503` rather than pretending that the request was delivered.

See `STAGE_3_SETUP.md` for the production setup checklist.

## Maintenance rules
- Keep business copy and localized content in `data.ts`.
- Keep reusable UI in `components/`.
- Keep server endpoints in `app/api/`.
- Keep validation in `lib/contact-schema.ts` so client and server share the same rules.
- Use TypeScript for application source files.
- Preserve responsive behavior and reduced-motion support.
- Never invent company claims, metrics, client relationships or legal wording.

## Stage 3 — observability and production checks
The project now includes Vercel Web Analytics and Speed Insights. Page views and Core Web Vitals are observed in production; both packages do not collect analytics data during local development. Vercel Web Analytics is designed without cookie tracking.

Enable both products for the project in the Vercel dashboard after deployment. Custom events used by the site include `cta_click`, `solution_open`, `project_open`, `expert_open`, and `contact_form_success`.

Recommended final verification before switching the form from `demo` to `email`:
```bash
npm run lint
npm run typecheck
npm run check:i18n
npm run check:routes
npm run check:api
npm run test:e2e
npm run build
```

After deployment, monitor LCP < 2.5s, INP < 200ms, and CLS < 0.1 on real-user data.

## 2026 production upgrades

- React 19.3 stable `ViewTransition` is used as a progressive enhancement for route changes. Next.js experimental `viewTransition` is intentionally not enabled because the official Next.js docs still mark that flag experimental.
- Next.js `Link` is used for primary internal navigation, keeping built-in prefetching and client-side navigation.
- Route-level `loading.tsx` skeletons provide immediate navigation feedback on slow connections.
- Playwright visual regression smoke tests are available via `npm run test:visual`; create/refresh baselines with `npm run test:visual:update`.
- Keep `cacheComponents` disabled for this mostly-static corporate site; there is no dynamic data layer that benefits from the additional cache configuration.

## Runtime recommendation

For local development and Vercel, prefer Node.js 24.21.0 LTS. Node 20 is already EOL, while Node 24 is the current LTS line as of October 2026.


## Dependency fix
TypeScript is pinned to the published stable 6.0.3 release. TypeScript 6.0.0 is not a published npm version.

## 3.2.5 content + team route revision
- Restored selected homepage wording from the live sbs.expert site for Services, Business solutions, Professional team, Our clients and Contact.
- Added an explicit `app/[locale]/team/page.tsx` route so the team page is maintained separately from the generic content-section router.
- Kept 9 current expert profiles and their available photos.
