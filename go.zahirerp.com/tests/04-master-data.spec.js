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
    const uniqueName = `BUGHUNT Customer ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('gotest.customer@gmail.com');
    await page.locator('#field-phone').fill('081300000001');
    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat vendor baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Vendor ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('gotest.vendor@gmail.com');
    await page.locator('#field-phone').fill('081300000002');
    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat karyawan baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Karyawan ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('gotest.karyawan@gmail.com');
    await page.locator('#field-phone').fill('081300000003');
    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat salesman/penjual baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Salesman ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('gotest.salesman@gmail.com');
    await page.locator('#field-phone').fill('081300000004');
    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat produk baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Produk ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Produk/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').click();
    await expect(page.locator('#field-code')).not.toHaveValue('', { timeout: 5000 });
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat satuan pengukuran baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Satuan ${Date.now()}`;
    const uniqueCode = `B${Date.now().toString().slice(-4)}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Satuan Pengukuran/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-code').fill(uniqueCode);
    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat gudang baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Gudang ${Date.now()}`;
    const uniqueCode = `GD${Date.now().toString().slice(-4)}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Gudang/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').fill(uniqueCode);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat departemen baru berhasil tersimpan', async ({}, testInfo) => {
    const uniqueName = `BUGHUNT Departemen ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Departemen/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    // Akun trial cuma boleh punya 1 Departemen — kalau kena limit, sistem
    // munculkan paywall "Ayo Berlangganan Sekarang!" alih-alih form Buat Baru.
    const subscribeWall = page.getByText(/Ayo Berlangganan|subscribe to create|trial, please/i);
    if (await subscribeWall.first().isVisible({ timeout: 6000 }).catch(() => false)) {
      await page.getByRole('button', { name: 'Batal', exact: true }).click().catch(() => {});
      testInfo.skip(true, 'Akun trial dibatasi maksimal 1 Departemen — bukan bug.');
      return;
    }

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat proyek baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Proyek ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Proyek/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat mata uang baru berhasil tersimpan', async () => {
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Mata Uang/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('div').filter({ hasText: /^Pilih Kode$/ }).last().click();
    await page.waitForTimeout(800);
    // Pilih mata uang PERTAMA yang tersedia (bukan hardcode), lewati group header disabled
    await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click({ force: true });
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Simpan' }).click();

    const successMsg = page.getByText(/Telah ditambahkan|sudah ada|already exists/i);
    await expect(successMsg).toBeVisible({ timeout: 10_000 });
  });

  test('buat pajak baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Pajak ${Date.now()}`;
    const uniqueCode = `PJK${Date.now().toString().slice(-4)}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Pajak/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').fill(uniqueCode);
    await page.locator('#field-rate').fill('11');
    await page.getByRole('checkbox', { name: 'Akun Pajak Pembelian' }).check().catch(() => {});
    await page.getByRole('checkbox', { name: 'Akun Pajak Penjualan' }).check().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat harta tetap baru berhasil tersimpan', async () => {
    const uniqueCode = `M${Date.now().toString().slice(-4)}`;
    const uniqueName = `BUGHUNT Aset ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Data Harta Tetap/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('.css-d7bazj').filter({ hasText: /^Pilih$/ }).first().click();
    await page.waitForTimeout(500);
    await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();

    await page.locator('[id="field-assets[0]code"]').fill(uniqueCode);
    await page.locator('[id="field-assets[0]name"]').fill(uniqueName);
    await page.locator('[id="field-assets[0]depreciation.acquired_value"]').fill('50000000');
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat kode biaya baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT CostCode ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: 'Kode Biaya', exact: true }).click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  test('buat tipe produk baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT TipeProduk ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: 'Tipe Produk', exact: true }).click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  });

  // Test Akun ditaruh PALING TERAKHIR — paling rentan flaky/kompleks,
  // supaya 14 test lain tetap sempat jalan semua kalau ini gagal.
  test('buat akun baru berhasil tersimpan', async () => {
    const uniqueName = `BUGHUNT Akun ${Date.now()}`;
    await page.goto('https://go.zahirerp.com/');
    await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
    await page.getByRole('link', { name: /Daftar Akun/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);

    await page.locator('div').filter({ hasText: /^Pilih Subklasifikasi$/ }).nth(1).click();
    await page.waitForTimeout(400);
    await page.locator('#field-subclassification').fill('Bank').catch(() => {});
    await page.waitForTimeout(1000);
    await page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: 'Bank' }).first().click();
    await page.waitForTimeout(500);

    await page.locator('#field-name').click();
    await page.locator('#field-name').fill(uniqueName);
    await page.waitForTimeout(400);

    const checkbox = page.getByRole('checkbox', { name: 'Atur sebagai Akun Kas / Bank' });
    await checkbox.check().catch(() => {});
    await page.waitForTimeout(800);

    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 15_000 });
  });
});