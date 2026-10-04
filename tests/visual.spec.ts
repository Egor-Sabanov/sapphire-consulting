import { expect, test } from '@playwright/test';

const pages = [
  { path: '/ru', name: 'home-ru' },
  { path: '/en', name: 'home-en' },
  { path: '/ru/services', name: 'services-ru' },
  { path: '/en/services', name: 'services-en' },
];

test.describe('visual smoke', () => {
  for (const pageCase of pages) {
    test(`${pageCase.name} desktop`, async ({ page }) => {
      await page.goto(pageCase.path);
      await expect(page).toHaveScreenshot(`${pageCase.name}-desktop.png`, {
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
        maxDiffPixels: 120,
      });
    });
  }
});
