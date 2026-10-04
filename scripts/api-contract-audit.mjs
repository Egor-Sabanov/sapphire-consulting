import { readFile } from 'node:fs/promises';

const files = ['app/api/contact/route.ts', 'lib/contact-schema.ts', 'components/ContactForm.tsx'];
const sources = await Promise.all(files.map((file) => readFile(file, 'utf8')));

const required = [
  ['contact route', sources[0], 'export async function POST'],
  ['Resend provider', sources[0], 'resend.emails.send'],
  ['origin verification', sources[0], 'isAllowedOrigin'],
  ['rate limiting', sources[0], 'isRateLimited'],
  ['honeypot', sources[0], 'website'],
  ['schema validation', sources[1], 'contactFormSchema'],
  ['client JSON submission', sources[2], "fetch('/api/contact'"],
  ['non-resizable textarea', sources[2], 'textarea name="message"'],
];

const failures = required.filter(([, source, token]) => !source.includes(token));
if (failures.length) {
  for (const [name] of failures) console.error(`FAIL: ${name}`);
  process.exit(1);
}
console.log('API contract audit: passed');
