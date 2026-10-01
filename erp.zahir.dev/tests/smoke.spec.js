import { test, expect } from '@playwright/test';

test.describe('Smoke test - Zahir ERP', () => {
  test('halaman utama/dashboard berhasil dimuat setelah login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/zahir/i, { timeout: 15_000 });
    await page.screenshot({ path: 'reports/dashboard.png', fullPage: true });
  });

  // Contoh template test tambahan - copy & sesuaikan untuk modul lain
  // (invoice, inventory, laporan, dll)
  test.skip('contoh: buat data baru', async ({ page }) => {
    await page.goto('/');
    // await page.getByRole('link', { name: 'Invoice' }).click();
    // await page.getByRole('button', { name: 'Buat Baru' }).click();
    // ... isi form ...
    // await expect(page.getByText('Berhasil disimpan')).toBeVisible();
  });
});
