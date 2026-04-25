import { test, expect } from '@playwright/test'

test('Manejo de texto en Playwright', async ({ page }) => {
  await page.goto('http://localhost:5200');

  await expect(page).toHaveTitle('');
});
