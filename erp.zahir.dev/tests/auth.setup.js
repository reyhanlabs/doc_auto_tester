import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.ZAHIR_USERNAME;
const PASSWORD = process.env.ZAHIR_PASSWORD;
const COMPANY_NAME = process.env.ZAHIR_COMPANY_NAME || 'Regression Test';

setup('login ke Zahir ERP', async ({ page }) => {
  await page.goto('https://erp.zahir.dev/auth');

  await page.getByRole('textbox', { name: 'Alamat Email' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Kata Sandi' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Pilih perusahaan dari daftar
  const companyCell = page.getByRole('cell', { name: COMPANY_NAME });
  await expect(companyCell).toBeVisible({ timeout: 20_000 });
  await companyCell.dblclick();

  // Tunggu sampai benar-benar masuk (URL keluar dari list-company)
  await page.waitForURL((url) => !url.pathname.includes('list-company'), { timeout: 20_000 });

  await page.context().storageState({ path: 'reports/storageState.json' });
});