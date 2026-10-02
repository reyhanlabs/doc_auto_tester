export async function loginAndSelectCompany(page) {
  await page.goto('https://erp.zahir.dev/auth');
  await page.getByRole('textbox', { name: 'Alamat Email' }).fill(process.env.ZAHIR_USERNAME);
  await page.getByRole('textbox', { name: 'Kata Sandi' }).fill(process.env.ZAHIR_PASSWORD);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  const companyName = process.env.ZAHIR_COMPANY_NAME || 'Regression Test';
  const companyCell = page.getByRole('cell', { name: companyName });
  await companyCell.waitFor({ state: 'visible', timeout: 30_000 });
  await companyCell.dblclick();

  // Dinaikkan dari 20 detik jadi 90 detik -- server CI (GitHub Actions) kadang
  // butuh waktu jauh lebih lama buat selesai "loading the data" dibanding komputer lokal.
  await page.waitForURL((url) => !url.pathname.includes('list-company'), { timeout: 90_000 });
}
