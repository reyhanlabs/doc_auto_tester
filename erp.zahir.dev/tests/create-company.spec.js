import { test, expect } from '@playwright/test';
import { login } from './helpers.js';

test('buat perusahaan baru berhasil dan masuk ke dashboard-nya', async ({ page }) => {
  await login(page);

  const uniqueCompanyName = `Data Baru Test ${Date.now()}`;

  await page.goto('https://erp.zahir.dev/list-company');
  await page.getByRole('button', { name: 'Buat Baru' }).click();

  await page.getByRole('textbox', { name: 'Nama Perusahaan' }).fill(uniqueCompanyName);
  await page.locator('.css-d7bazj').click();
  await page.locator('div').filter({ hasText: /^Perdagangan Umum$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Simpan' }).click();

  // Tutup 2 modal onboarding yang muncul setelah perusahaan dibuat
  await page.getByRole('button', { name: 'AYO MULAI' }).click();
  await page.getByText('Saya hubungi nanti').click();

  // Verifikasi: sudah masuk dashboard perusahaan baru
  await page.waitForURL((url) => !url.pathname.includes('list-company') && !url.pathname.includes('add-company'), { timeout: 20_000 });
  await expect(page.getByRole('button', { name: 'Data Master' })).toBeVisible({ timeout: 15_000 });
});