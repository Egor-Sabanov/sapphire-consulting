# Project guide for future coding agents

- Keep business copy and localized content in `data.ts`.
- Keep reusable UI in `components/`; avoid large route components when a component can be shared.
- Keep form validation in `lib/contact-schema.ts` so browser and server use the same rules.
- Use TypeScript for all application source files.
- Do not add a dependency unless it solves a real production need.
- Run `npm run lint`, `npm run typecheck`, `npm run test:e2e`, and `npm run build` before production release when dependencies are available.
- Preserve responsive behavior and `prefers-reduced-motion` support when changing UI or animation.
- Never invent company claims, metrics, client relationships, or legal wording.
