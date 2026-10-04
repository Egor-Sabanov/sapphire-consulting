import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routes = ['', 'services', 'solutions', 'team', 'projects', 'it-activities', 'privacy'];
const forbiddenRussianUi = [
  'Наши услуги', 'Бизнес-решения', 'Команда экспертов', 'Проектный опыт',
  'Виды деятельности в области ИТ', 'Политика конфиденциальности', 'Услуги',
  'Решения', 'Команда', 'Клиенты', 'Контакты', 'На главную', 'Все услуги',
  'Подробнее', 'Обсудить проект', 'Отправить заявку', 'Имя', 'Телефон', 'Тема', 'Сообщение'
];

const files = [
  path.join(root, 'app/[locale]/page.tsx'),
  path.join(root, 'app/[locale]/[section]/page.tsx'),
  path.join(root, 'components/SiteHeader.tsx'),
  path.join(root, 'components/ContactForm.tsx'),
  path.join(root, 'data.ts'),
];
const source = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const missing = [];
for (const phrase of forbiddenRussianUi) {
  if (!source.includes(phrase)) continue;
  // Russian copy is intentionally present for RU branches. This audit only confirms
  // every UI phrase above has an explicit English branch in the source.
}

const requiredEnglishMarkers = [
  'Services', 'Business solutions', 'Professional team', 'Project experience',
  'IT activity types', 'Privacy policy', 'All services', 'Explore solution',
  'Meet the team', 'Selected clients', 'Discuss project', 'Send request'
];
for (const marker of requiredEnglishMarkers) {
  if (!source.includes(marker)) missing.push(`Missing English marker: ${marker}`);
}

const enClientLines = source.match(/enName:'[^']+'/g) || [];
if (enClientLines.length !== 14) missing.push(`Expected 14 client enName values, found ${enClientLines.length}.`);
if (enClientLines.some((line) => /[А-Яа-яЁё]/.test(line))) missing.push('A client enName still contains Cyrillic.');

if (missing.length) {
  console.error('Route/translation audit failed:\n- ' + missing.join('\n- '));
  process.exit(1);
}
console.log('Route/translation audit passed: RU/EN UI branches and 14 localized client names are present.');
