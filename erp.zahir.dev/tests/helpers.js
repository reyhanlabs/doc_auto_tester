export async function login(page) {
  await page.goto('https://erp.zahir.dev/auth');
  await page.getByRole('textbox', { name: 'Alamat Email' }).fill(process.env.ZAHIR_USERNAME);
  await page.getByRole('textbox', { name: 'Kata Sandi' }).fill(process.env.ZAHIR_PASSWORD);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
}

export async function loginAndSelectCompany(page) {
  await login(page);

  const companyName = process.env.ZAHIR_COMPANY_NAME || 'Regression Test';
  const companyCell = page.getByRole('cell', { name: companyName });
  await companyCell.waitFor({ state: 'visible', timeout: 20_000 });
  await companyCell.dblclick();

  await page.waitForURL((url) => !url.pathname.includes('list-company'), { timeout: 20_000 });
}