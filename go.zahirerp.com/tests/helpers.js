export async function loginAndSelectCompany(page) {
  await page.goto('https://go.zahirerp.com/auth');
  await page.getByRole('textbox', { name: 'Alamat Email' }).fill(process.env.ZAHIR_USERNAME);
  await page.getByRole('textbox', { name: 'Kata Sandi' }).fill(process.env.ZAHIR_PASSWORD);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  const companyName = process.env.ZAHIR_COMPANY_NAME || 'PT. Sarana Makmur Sentosa';
  const companyOption = page.getByText(companyName).first();
  await companyOption.waitFor({ state: 'visible', timeout: 20_000 });
  await companyOption.dblclick();

  await page.waitForURL((url) => !url.pathname.includes('list-company'), { timeout: 20_000 });
  await page.waitForTimeout(1000);
}