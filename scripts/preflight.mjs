import process from 'node:process';

const mode = (process.env.CONTACT_FORM_MODE || 'demo').trim().toLowerCase();
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
const errors = [];
const warnings = [];

if (!['demo', 'email'].includes(mode)) errors.push('CONTACT_FORM_MODE must be "demo" or "email".');
if (process.env.NODE_ENV === 'production' && !siteUrl) warnings.push('NEXT_PUBLIC_SITE_URL is empty; metadata will fall back to https://sbs.expert.');

if (mode === 'email') {
  for (const key of ['RESEND_API_KEY', 'CONTACT_EMAIL', 'CONTACT_FROM']) {
    if (!(process.env[key] || '').trim()) errors.push(`${key} is required when CONTACT_FORM_MODE=email.`);
  }
}

if (mode === 'demo') warnings.push('Contact form is in demo mode; requests are not delivered by email.');

if (warnings.length) {
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
}
if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}
console.log(`Production preflight: passed (${mode} form mode).`);
