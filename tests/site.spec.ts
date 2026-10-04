import { expect, test } from '@playwright/test';

test('Russian homepage renders', async ({ page }) => {
  await page.goto('/ru');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Something went wrong');
});

test('English homepage is translated', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('h1')).toContainText('SAP');
  await expect(page.locator('body')).toContainText('Services');
  await expect(page.locator('body')).not.toContainText('Наши услуги');
});

test('English service page preserves locale', async ({ page }) => {
  await page.goto('/en/services');
  await expect(page).toHaveURL(/\/en\/services$/);
  await expect(page.locator('h1')).toHaveText('Services');
});

test('Mobile navigation is usable', async ({ page }) => {
  await page.goto('/ru');
  const menu = page.locator('details.mobileNav');
  await expect(menu).toBeVisible();
  await menu.locator('summary').click();
  await expect(menu.locator('a').first()).toBeVisible();
});

test('Contact textarea cannot be resized', async ({ page }) => {
  await page.goto('/ru');
  const resize = await page.locator('textarea[name="message"]').evaluate((element) => getComputedStyle(element).resize);
  expect(resize).toBe('none');
});


test('All English routes expose English headings', async ({ page }) => {
  const routes = ['', '/services', '/solutions', '/team', '/projects', '/it-activities', '/privacy'];
  const headings = ['SAP and financial business solutions', 'Services', 'Business solutions', 'Professional team', 'Project experience', 'IT activity types', 'Privacy policy'];
  for (let i = 0; i < routes.length; i += 1) {
    await page.goto(`/en${routes[i]}`);
    await expect(page.locator('h1, h2').first()).toBeVisible();
    if (i > 0) await expect(page.locator('h1')).toHaveText(headings[i]);
  }
});

test('English contact form contains no Russian field labels', async ({ page }) => {
  await page.goto('/en');
  const form = page.locator('[data-contact-form="en"]');
  await expect(form).not.toContainText('Телефон');
  await expect(form).not.toContainText('Сообщение');
  await expect(form).toContainText('Phone');
  await expect(form).toContainText('Message');
});

test('Contact API rejects malformed payload', async ({ request }) => {
  const response = await request.post('/api/contact', {
    headers: { 'content-type': 'application/json', origin: 'http://127.0.0.1:3000' },
    data: { locale: 'ru', name: 'x' },
  });
  expect(response.status()).toBe(400);
});
