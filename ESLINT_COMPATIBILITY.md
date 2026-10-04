# ESLint compatibility note

Sapphire Consulting 3.2.3 pins ESLint to 9.39.5 because the current Next.js 16.3.8 ESLint config still depends on React-family rules that are not compatible with ESLint 10's removed `context.getFilename()` API.

Use:

```bash
npm install
npm run lint
```

Do not use `--legacy-peer-deps` unless a future dependency update explicitly requires it.
