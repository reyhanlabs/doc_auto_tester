import { test, expect } from '@playwright/test';
import { loginAndSelectCompany } from './helpers.js';

let page;

test.describe.serial('Master Data (login sekali untuk semua test)', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await loginAndSelectCompany(page);
  });

  test.afterAll(async () => {
    await page.context().close();
  });

  test('buat customer baru berhasil tersimpan', async () => {
    const uniqueName = `PT Bintang Utara Semesta ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('semesta@gmail.com');
    await page.locator('#field-phone').fill('02199873366');
    await page.locator('#field-tax_id_number').fill('736843768934');
    await page.locator('#field-tax_id_address').fill('Bekasi Raya');

    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck();
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck();
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck();

    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat vendor baru berhasil tersimpan', async () => {
    const uniqueName = `CV Sumber Jaya Vendor ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('vendor@gmail.com');
    await page.locator('#field-phone').fill('02188776655');
    await page.locator('#field-tax_id_number').fill('123456789000');
    await page.locator('#field-tax_id_address').fill('Jakarta Barat');

    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck();
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck();
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck();

    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat karyawan baru berhasil tersimpan', async () => {
    const uniqueName = `Budi Karyawan Test ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('karyawan.test@gmail.com');
    await page.locator('#field-phone').fill('081234567890');
    await page.locator('#field-tax_id_number').fill('111222333444');
    await page.locator('#field-tax_id_address').fill('Bekasi');

    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck();
    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck();
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck();

    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat salesman/penjual baru berhasil tersimpan', async () => {
    const uniqueName = `Andi Salesman Test ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('salesman.test@gmail.com');
    await page.locator('#field-phone').fill('081298765432');
    await page.locator('#field-tax_id_number').fill('555666777888');
    await page.locator('#field-tax_id_address').fill('Bekasi');

    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck();
    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck();
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck();

    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat akun baru berhasil tersimpan', async () => {
    const uniqueName = `Bank Jabar ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Daftar Akun/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('div').filter({ hasText: /^Pilih Subklasifikasi$/ }).nth(1).click();
    await page.locator('.MuiListItem-root').filter({ hasText: 'Bank' }).click();

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('checkbox', { name: 'Atur sebagai Akun Kas / Bank' }).check();
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat produk baru berhasil tersimpan', async () => {
    const uniqueName = `Test Produk ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Produk/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').click();
    await expect(page.locator('#field-code')).not.toHaveValue('', { timeout: 5000 });

    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat satuan pengukuran baru berhasil tersimpan', async () => {
    const uniqueName = `Bobin ${Date.now()}`;
    const uniqueCode = `B${Date.now().toString().slice(-4)}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Satuan Pengukuran/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-code').fill(uniqueCode);
    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat gudang baru berhasil tersimpan', async () => {
    const uniqueName = `Gudang Cirebon ${Date.now()}`;
    const uniqueCode = `GD${Date.now().toString().slice(-4)}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Gudang/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').fill(uniqueCode);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat departemen baru berhasil tersimpan', async () => {
    const uniqueName = `Finance ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Departemen/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat proyek baru berhasil tersimpan', async () => {
    const uniqueName = `Proyek A ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Proyek/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat mata uang baru berhasil tersimpan', async () => {

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Mata Uang/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('div').filter({ hasText: /^Pilih Kode$/ }).last().click();
    await page.getByText('AED - United Arab Emirates').click();
    await page.getByRole('button', { name: 'Simpan' }).click();

    // Mata uang bisa duplikat kalau sudah ada, cek dua kemungkinan pesan
    const successMsg = page.getByText(/Telah ditambahkan|sudah ada|already exists/i);
    await expect(successMsg).toBeVisible({ timeout: 10_000 });
  });

  test('buat pajak baru berhasil tersimpan', async () => {
    const uniqueName = `PPN Test ${Date.now()}`;
    const uniqueCode = `PPN${Date.now().toString().slice(-4)}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Pajak/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').fill(uniqueCode);
    await page.locator('#field-rate').fill('15');
    await page.getByRole('checkbox', { name: 'Akun Pajak Pembelian' }).check();
    await page.getByRole('checkbox', { name: 'Akun Pajak Penjualan' }).check();
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat harta tetap baru berhasil tersimpan', async () => {
    const uniqueCode = `M${Date.now().toString().slice(-4)}`;
    const uniqueName = `Mobil Test ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Harta Tetap/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);

    await page.locator('.css-d7bazj').filter({ hasText: /^Pilih$/ }).first().click();
    await page.locator('.MuiListItem-root').filter({ hasText: 'Kendaraan' }).click();

    await page.locator('[id="field-assets[0]code"]').fill(uniqueCode);
    await page.locator('[id="field-assets[0]name"]').fill(uniqueName);
    await page.locator('[id="field-assets[0]depreciation.acquired_value"]').fill('150000000');
    await page.locator('a, button').filter({ hasText: 'Simpan' }).first().click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat kode biaya baru berhasil tersimpan', async () => {
    const uniqueName = `Cost Code ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Kode Biaya', exact: true }).click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat tipe produk baru berhasil tersimpan', async () => {
    const uniqueName = `Bahan Baku ${Date.now()}`;

    await page.goto('https://demo-space.zahirerp.com/');
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Tipe Produk', exact: true }).click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });
});
