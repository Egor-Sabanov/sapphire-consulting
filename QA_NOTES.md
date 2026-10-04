# QA checklist

- [ ] `npm install` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test:e2e` passes in Chromium + mobile profile
- [ ] `npm run build` passes
- [ ] RU pages contain no accidental EN copy
- [ ] EN pages contain no accidental RU copy
- [ ] Client + server form validation agree
- [ ] Production form destination is configured
- [ ] Final high-resolution hero and project images are used
- [ ] Domain / DNS / HTTPS verified
- [ ] `sitemap.xml` and `robots.txt` reachable
- [ ] Core Web Vitals checked on production URL
- [ ] Privacy / consent wording approved by company

## Stage 2 — RU/EN acceptance

- All public routes are generated for `/ru/*` and `/en/*`.
- English UI has dedicated strings for navigation, page headings, section copy, services, solutions, team details, legal pages, form states, footer and metadata.
- Client logos use localized `enName` labels where the brand has an English rendering.
- Unsupported locale values return `notFound()` rather than silently falling back to Russian.
- Run `npm run check:i18n` and `npm run check:routes` before release.


## Dependency fix
TypeScript is pinned to the published stable 6.0.3 release. TypeScript 6.0.0 is not a published npm version.

## 2026-10-04 content revision
- Replaced selected homepage copy with wording from the live sbs.expert site for services, solutions, team, clients and contact sections.
- Added a dedicated /[locale]/team route so Team is handled by an explicit page rather than the generic section router.
- Added RU/EN team route coverage for all 9 current experts.
- Updated English team role/team labels to match the live English site where provided.
