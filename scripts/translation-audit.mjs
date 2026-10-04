import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const data = fs.readFileSync(path.join(root, 'data.ts'), 'utf8');
const files = [
  path.join(root, 'app/[locale]/page.tsx'),
  path.join(root, 'app/[locale]/[section]/page.tsx'),
  path.join(root, 'components/SiteHeader.tsx'),
  path.join(root, 'components/ContactForm.tsx'),
];

const errors = [];

// Client names displayed in English should use Latin-script names.
const clientBlock = data.match(/export const clients[\s\S]*?\n\];/);
if (!clientBlock) errors.push('Client list not found.');
else if (/enName:'[^\']*[А-Яа-яЁё]/.test(clientBlock[0])) errors.push('A client enName still contains Cyrillic.');

// Critical English UI fields must exist as bilingual pairs.
const bilingualPairs = [
  ['Service.title', /title:'[^']+'/],
  ['Service.enTitle', /enTitle:'[^']+'/],
  ['Service.desc', /desc:'[^']+'/],
  ['Service.enDesc', /enDesc:'[^']+'/],
  ['Solution.title', /title:'[^']+'/],
  ['Solution.enTitle', /enTitle:'[^']+'/],
  ['Solution.desc', /desc:'[^']+'/],
  ['Solution.enDesc', /enDesc:'[^']+'/],
  ['Solution.items', /items:\[/],
  ['Solution.enItems', /enItems:\[/],
];
for (const [name, re] of bilingualPairs) {
  if (!re.test(data)) errors.push(`Missing ${name} field.`);
}

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  if (/href=\{`\/en\//.test(source) && !source.includes("en ?")) {
    errors.push(`Review locale switch logic in ${path.relative(root, file)}`);
  }
}

if (errors.length) {
  console.error('Translation audit failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log('Translation audit passed: English content has explicit bilingual data fields and Latin-script client names.');
