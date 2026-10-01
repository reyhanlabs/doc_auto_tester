import { test, expect } from '@playwright/test';
import { loginAndSelectCompany } from './helpers.js';
import fs from 'fs';

// ============================================================
// Helper: netralkan fokus dropdown React-Select yang suka "nyangkut"
// ============================================================
async function blurDropdown(page) {
  await page.mouse.click(15, 15);
  await page.waitForTimeout(400);
}

async function ensureCompanySelected(page) {
  if (page.url().includes('list-company')) {
    console.log('PERHATIAN: sesi ter-reset ke Pilih Perusahaan, pilih ulang...');
    const companyName = process.env.ZAHIR_COMPANY_NAME || 'Demo Zahir ERP';
    const companyOption = page.getByText(companyName).first();
    await companyOption.waitFor({ state: 'visible', timeout: 20_000 });
    await companyOption.dblclick();
    await page.waitForURL((url) => !url.pathname.includes('list-company'), { timeout: 20_000 });
    await page.waitForTimeout(1000);
  }
}

// ============================================================
// Kumpulan temuan (bukan throw langsung) — dipakai buat bug report akhir
// ============================================================
const findings = [];

function record(area, item, status, detail = '') {
  findings.push({ area, item, status, detail, time: new Date().toISOString() });
  const icon = status === 'OK' ? '✅' : status === 'WARNING' ? '⚠️' : '❌';
  console.log(`${icon} [${area}] ${item}${detail ? ' — ' + detail : ''}`);
}

// Cek apakah ada teks error/validasi FE yang KELIHATAN di layar (bukan console)
async function detectVisibleError(page) {
  const successFirst = await page.getByText(/Telah ditambahkan/i).count();
  if (successFirst > 0) return null; // ada toast sukses, jangan cap error walau ada sisa validasi form baru

  // Pola 1: validasi form biasa (toast/inline kecil)
  const validationPatterns = /harus berupa|silakan isi|wajib diisi|failed to fetch|undefined is not|error 500|error 404/i;
  const validationEl = page.getByText(validationPatterns).first();
  if (await validationEl.isVisible({ timeout: 1000 }).catch(() => false)) {
    return (await validationEl.innerText().catch(() => 'Error validasi (teks tidak terbaca)')).slice(0, 150);
  }

  // Pola 2: crash halaman PENUH (loading macet, kode ERR-xxxx, "Sistem sedang Mengambil Data", dll)
  const crashPatterns = /ERR-\d{10,}|Sistem sedang Mengambil Data|Terjadi kesalahan|Something went wrong|Error details|Muat Ulang/i;
  const crashEl = page.getByText(crashPatterns).first();
  if (await crashEl.isVisible({ timeout: 1000 }).catch(() => false)) {
    // Coba tangkap kode error spesifik (format ERR-20260810061459-XXXXXX) kalau ada
    const errCodeEl = page.getByText(/ERR-\d{10,}-\w+/i).first();
    const errCode = await errCodeEl.isVisible({ timeout: 500 }).catch(() => false)
      ? await errCodeEl.innerText().catch(() => '')
      : '';

    // Coba klik "Error details" buat expand & tangkap detail teknisnya, kalau ada
    let errDetail = '';
    const detailsToggle = page.getByText('Error details', { exact: false }).first();
    if (await detailsToggle.isVisible({ timeout: 500 }).catch(() => false)) {
      await detailsToggle.click().catch(() => {});
      await page.waitForTimeout(500);
      errDetail = await page.locator('body').innerText().catch(() => '');
      // ambil cuma sekitar area "Error details" biar nggak kepanjangan
      const idx = errDetail.indexOf('Error details');
      if (idx >= 0) errDetail = errDetail.slice(idx, idx + 500);
    }

    return `CRASH HALAMAN PENUH${errCode ? ' [' + errCode + ']' : ''}${errDetail ? ' — ' + errDetail : ''}`.slice(0, 500);
  }

  return null;
}

// Jalankan 1 langkah dengan aman: kalau error/exception, catat dan LANJUT (jangan throw)
async function safeStep(area, item, fn) {
  try {
    await fn();
    record(area, item, 'OK');
    return true;
  } catch (e) {
    record(area, item, 'ERROR', e.message.slice(0, 200));
    return false;
  }
}

test('Bug Hunt Menyeluruh: Master Data + Transaksi Pembelian + Laporan', async ({ page }) => {
  test.setTimeout(25 * 60_000); // 25 menit

  await loginAndSelectCompany(page);
  const homeURL = page.url();

  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  // ============================================================
  // BAGIAN 1: MASTER DATA (6 item paling penting)
  // ============================================================
  console.log('\n########## BAGIAN 1: MASTER DATA ##########\n');

  await safeStep('Master Data', 'Buat Customer', async () => {
    const uniqueName = `BUGHUNT Customer ${Date.now()}`;
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);
    const crashCheck1 = await detectVisibleError(page);
    if (crashCheck1) throw new Error(crashCheck1);
    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('bughunt.customer@gmail.com');
    await page.locator('#field-phone').fill('081200000001');
    await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.waitForTimeout(1500);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
  });

  await safeStep('Master Data', 'Buat Vendor', async () => {
    const uniqueName = `BUGHUNT Vendor ${Date.now()}`;
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Data Kontak' }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);
    const crashCheck1 = await detectVisibleError(page);
    if (crashCheck1) throw new Error(crashCheck1);
    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-email').fill('bughunt.vendor@gmail.com');
    await page.locator('#field-phone').fill('081200000002');
    await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck().catch(() => {});
    await page.getByRole('checkbox', { name: 'Penjual' }).uncheck().catch(() => {});
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.waitForTimeout(1500);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
  });

  await safeStep('Master Data', 'Buat Produk', async () => {
    const uniqueName = `BUGHUNT Produk ${Date.now()}`;
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Produk/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1200);
    const crashCheck1b = await detectVisibleError(page);
    if (crashCheck1b) throw new Error(crashCheck1b);
    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').click();
    await expect(page.locator('#field-code')).not.toHaveValue('', { timeout: 5000 });
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.waitForTimeout(1500);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
  });

  await safeStep('Master Data', 'Buat Satuan Pengukuran', async () => {
    const uniqueName = `BUGHUNT Satuan ${Date.now()}`;
    const uniqueCode = `BH${Date.now().toString().slice(-4)}`;
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Satuan Pengukuran/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);
    const crashCheck1 = await detectVisibleError(page);
    if (crashCheck1) throw new Error(crashCheck1);
    await page.locator('#field-code').fill(uniqueCode);
    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.waitForTimeout(1500);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
  });

  await safeStep('Master Data', 'Buat Gudang', async () => {
    const uniqueName = `BUGHUNT Gudang ${Date.now()}`;
    const uniqueCode = `BHG${Date.now().toString().slice(-4)}`;
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: /Data Gudang/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);
    const crashCheck1 = await detectVisibleError(page);
    if (crashCheck1) throw new Error(crashCheck1);
    await page.locator('#field-name').fill(uniqueName);
    await page.locator('#field-code').fill(uniqueCode);
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.waitForTimeout(1500);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
  });

  await safeStep('Master Data', 'Buat Kode Biaya', async () => {
    const uniqueName = `BUGHUNT CostCode ${Date.now()}`;
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Data Master' }).click();
    await page.getByRole('link', { name: 'Kode Biaya', exact: true }).click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);
    const crashCheck1 = await detectVisibleError(page);
    if (crashCheck1) throw new Error(crashCheck1);
    await page.locator('#field-name').fill(uniqueName);
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.waitForTimeout(1500);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
  });

  // ============================================================
  // BAGIAN 2: TRANSAKSI PEMBELIAN (PR -> PO -> Receipt -> Invoice -> Payment)
  // ============================================================
  console.log('\n########## BAGIAN 2: TRANSAKSI PEMBELIAN ##########\n');

  let prNumber = null, poNumber = null, receiptNumber = null, invoiceNumber = null;

  const tahap1Ok = await safeStep('Transaksi Pembelian', 'Tahap 1 - Permintaan Pembelian', async () => {
    await page.goto(homeURL);
    await ensureCompanySelected(page);
    await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
    await page.getByRole('link', { name: /Pengajuan Pembelian/ }).first().click();
    await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
    await page.waitForTimeout(1000);
    const crashCheck1 = await detectVisibleError(page);
    if (crashCheck1) throw new Error(crashCheck1);

    await page.getByText('Pilih Di ajukan oleh').click();
    await page.keyboard.type('General');
    await page.waitForTimeout(800);
    await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
    await blurDropdown(page);

    await page.getByRole('textbox', { name: 'Tanggal' }).click();
    const todayDay = String(new Date().getDate());
    await page.locator('button[class*="MuiPickersDay-day"]:not([class*="MuiPickersDay-hidden"])').filter({ hasText: todayDay }).first().click();
    await blurDropdown(page);

    await page.getByRole('textbox', { name: 'Akan digunakan pada' }).click();
    const future = new Date();
    future.setDate(future.getDate() + 2);
    const futureDay = String(future.getDate());
    await page.locator('button[class*="MuiPickersDay-day"]:not([class*="MuiPickersDay-hidden"])').filter({ hasText: futureDay }).first().click();
    await blurDropdown(page);

    await page.locator('div').filter({ hasText: /^Pilih Produk$/ }).first().click();
    await page.waitForTimeout(500);
    const anyProduct = page.locator('.MuiListItem-root:not([aria-disabled="true"])').first();
    await anyProduct.click();
    await page.waitForTimeout(800);

    const qtyField = page.locator('[id="field-line_items[0].quantity"]');
    await qtyField.click();
    await qtyField.fill('');
    await qtyField.pressSequentially('10', { delay: 60 });
    await blurDropdown(page);

    prNumber = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      for (const inp of inputs) if (inp.value && /^PRQ?\d/i.test(inp.value)) return inp.value;
      return null;
    });

    await page.getByRole('button', { name: 'Simpan', exact: true }).click();
    await page.waitForTimeout(2000);
    const err = await detectVisibleError(page);
    if (err) throw new Error(err);
    if (!prNumber) throw new Error('Nomor PR tidak terdeteksi — data mungkin tidak tersimpan dengan benar');
  });

  if (tahap1Ok && prNumber) {
    await safeStep('Transaksi Pembelian', 'Tahap 2 - Pesanan Pembelian (PO)', async () => {
      await page.goto(homeURL);
      await ensureCompanySelected(page);
      await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
      await page.getByRole('link', { name: /Pesanan Pembelian/ }).first().click();
      await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
      await page.waitForTimeout(1000);
      const crashCheckTx = await detectVisibleError(page);
      if (crashCheckTx) throw new Error(crashCheckTx);

      await page.getByText('Pilih No. Permintaan').click();
      await page.keyboard.type(prNumber);
      await page.waitForTimeout(800);
      await page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: prNumber }).first().click();
      await blurDropdown(page);

      const currentSupplierValue = await page.locator('.css-1v4x2mb-singleValue').innerText().catch(() => '');
      if (!currentSupplierValue) {
        await page.getByText('Pilih Pemasok').click();
        await page.keyboard.type('General');
        await page.waitForTimeout(800);
        await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
        await blurDropdown(page);
      }

      poNumber = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input');
        for (const inp of inputs) if (inp.value && /^PO\d/i.test(inp.value)) return inp.value;
        return null;
      });

      await page.getByRole('button', { name: 'Simpan', exact: true }).click();
      await page.waitForTimeout(2000);
      const err = await detectVisibleError(page);
      if (err) throw new Error(err);
      if (!poNumber) throw new Error('Nomor PO tidak terdeteksi');
    });
  } else {
    record('Transaksi Pembelian', 'Tahap 2 - Pesanan Pembelian (PO)', 'WARNING', 'Dilewati, Tahap 1 gagal/nomor PR tidak ada');
  }

  if (poNumber) {
    await safeStep('Transaksi Pembelian', 'Tahap 3 - Penerimaan Barang', async () => {
      await page.goto(homeURL);
      await ensureCompanySelected(page);
      await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
      await page.getByRole('link', { name: /Penerimaan Barang/ }).first().click();
      await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
      await page.waitForTimeout(1000);
      const crashCheckTx = await detectVisibleError(page);
      if (crashCheckTx) throw new Error(crashCheckTx);

      await page.getByText(/Pilih No\. Pesanan/).click();
      await page.keyboard.type(poNumber);
      await page.waitForTimeout(800);
      await page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: poNumber }).first().click();
      await blurDropdown(page);

      receiptNumber = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input');
        for (const inp of inputs) if (inp.value && /^PR\d/i.test(inp.value)) return inp.value;
        return null;
      });

      await page.getByRole('button', { name: 'Simpan', exact: true }).click();
      await page.waitForTimeout(2000);
      const err = await detectVisibleError(page);
      if (err) throw new Error(err);
      if (!receiptNumber) throw new Error('Nomor Penerimaan Barang tidak terdeteksi');
    });
  } else {
    record('Transaksi Pembelian', 'Tahap 3 - Penerimaan Barang', 'WARNING', 'Dilewati, nomor PO tidak ada');
  }

  if (receiptNumber) {
    await safeStep('Transaksi Pembelian', 'Tahap 4 - Faktur Pembelian', async () => {
      await page.goto(homeURL);
      await ensureCompanySelected(page);
      await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
      await page.getByRole('link', { name: /Faktur Pembelian/ }).first().click();
      await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
      await page.waitForTimeout(1000);
      const crashCheckTx = await detectVisibleError(page);
      if (crashCheckTx) throw new Error(crashCheckTx);

      await page.getByRole('checkbox', { name: 'Penerimaan Barang' }).check();
      await page.waitForTimeout(800);

      const currentSupplierValue = await page.locator('.css-1v4x2mb-singleValue').innerText().catch(() => '');
      if (!currentSupplierValue) {
        await page.getByText('Pilih Pemasok').click();
        await page.keyboard.type('General');
        await page.waitForTimeout(800);
        await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
        await blurDropdown(page);
      }
      await page.waitForTimeout(800);

      const receiptHeader = page.getByText('RECEIPT NO', { exact: false }).first();
      await receiptHeader.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(500);

      const specificReceiptOption = page.locator('div').filter({ hasText: receiptNumber }).first();
      const alreadyFilled = await page.locator('.css-1v4x2mb-singleValue').filter({ hasText: receiptNumber }).count();
      if (alreadyFilled === 0) {
        const headerBox = await receiptHeader.boundingBox().catch(() => null);
        if (headerBox) {
          await page.mouse.click(headerBox.x + headerBox.width / 2, headerBox.y + headerBox.height + 35);
          await page.waitForTimeout(800);
          const opt = page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: receiptNumber });
          if ((await opt.count()) > 0) await opt.first().click();
          else await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
          await blurDropdown(page);
        }
      }

      invoiceNumber = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input');
        for (const inp of inputs) if (inp.value && /^PJ\d/i.test(inp.value)) return inp.value;
        return null;
      });

      await page.getByRole('button', { name: 'Simpan', exact: true }).click();
      await page.waitForTimeout(2000);
      const err = await detectVisibleError(page);
      if (err) throw new Error(err);
      if (!invoiceNumber) throw new Error('Nomor Faktur tidak terdeteksi');
    });
  } else {
    record('Transaksi Pembelian', 'Tahap 4 - Faktur Pembelian', 'WARNING', 'Dilewati, nomor Penerimaan Barang tidak ada');
  }

  if (invoiceNumber) {
    await safeStep('Transaksi Pembelian', 'Tahap 5 - Pembayaran Utang Usaha', async () => {
      await page.goto(homeURL);
      await ensureCompanySelected(page);
      await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
      await page.getByRole('link', { name: /Pembayaran Utang Usaha/ }).first().click();
      await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
      await page.waitForTimeout(1000);
      const crashCheckTx = await detectVisibleError(page);
      if (crashCheckTx) throw new Error(crashCheckTx);

      const currentSupplierValue = await page.locator('.css-1v4x2mb-singleValue').innerText().catch(() => '');
      if (!currentSupplierValue) {
        await page.getByText('Pilih Pemasok').click();
        await page.locator('#field-supplier').pressSequentially('General', { delay: 80 }).catch(async () => {
          await page.keyboard.type('General');
        });
        await page.waitForTimeout(1200);
        const opt = page.locator('.MuiListItem-root:not([aria-disabled="true"])').first();
        if (await opt.isVisible({ timeout: 3000 }).catch(() => false)) await opt.click();
        await blurDropdown(page);
      }

      await page.waitForTimeout(800);
      const invoiceField = page.locator('[id="field-line_items\\[0\\].invoice"]');
      if (await invoiceField.count() > 0) {
        await invoiceField.click();
        await invoiceField.pressSequentially('PJ', { delay: 80 });
        await page.waitForTimeout(1000);
        const opt = page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: invoiceNumber });
        if ((await opt.count()) > 0) await opt.first().click();
        else await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
        await blurDropdown(page);
      }

      await page.getByRole('button', { name: 'Simpan', exact: true }).click();
      await page.waitForTimeout(2000);

      const successToast = await page.getByText(/Telah ditambahkan/i).count();
      if (successToast === 0) {
        const err = await detectVisibleError(page);
        if (err) throw new Error(err);
      }
    });
  } else {
    record('Transaksi Pembelian', 'Tahap 5 - Pembayaran Utang Usaha', 'WARNING', 'Dilewati, nomor Faktur tidak ada');
  }

  // ============================================================
  // BAGIAN 3: BUKA BEBERAPA LAPORAN
  // ============================================================
  console.log('\n########## BAGIAN 3: LAPORAN ##########\n');

  const reportsToCheck = [
    { category: 'Laporan Keuangan', report: 'Neraca' },
    { category: 'Laporan Keuangan', report: 'Laba Rugi Standar' },
    { category: 'Laporan Keuangan', report: 'Jurnal Umum' },
    { category: 'Laporan Pembelian dan Utang', report: 'Faktur Pembelian - Ringkas' },
    { category: 'Laporan Pembelian dan Utang', report: 'Umur Utang' },
    { category: 'Laporan Produk', report: 'Daftar Produk' },
  ];

  const laporanMenu = page.getByRole('button', { name: 'Laporan', exact: true });

  for (const { category, report } of reportsToCheck) {
    await safeStep('Laporan', `${category} > ${report}`, async () => {
      await page.goto(homeURL);
      await ensureCompanySelected(page);
      await laporanMenu.click();
      await page.waitForTimeout(800);
      const categoryLink = page.locator('a, button, [role="link"], [role="button"]').filter({ hasText: category });
      if ((await categoryLink.count()) === 0) throw new Error('Kategori laporan tidak ditemukan');
      await categoryLink.first().click();
      await page.waitForTimeout(1500);

      const reportItem = page.locator('div[style*="cursor: pointer"], div[style*="cursor:pointer"]')
        .filter({ hasText: new RegExp(`^${report.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`) });
      if ((await reportItem.count()) === 0) throw new Error('Laporan spesifik tidak ditemukan di kategori ini');
      await reportItem.first().click();
      await page.waitForTimeout(1000);

      const okButton = page.getByRole('button', { name: 'Ok', exact: true });
      if (await okButton.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await okButton.first().click().catch(() => {});
        await page.waitForTimeout(1000);
      }

      await page.waitForTimeout(1000);
      const err = await detectVisibleError(page);
      if (err) throw new Error(err);
    });
  }

  // ============================================================
  // RINGKASAN & SIMPAN HASIL
  // ============================================================
  console.log('\n\n========== RINGKASAN BUG HUNT ==========');
  const okCount = findings.filter((f) => f.status === 'OK').length;
  const warnCount = findings.filter((f) => f.status === 'WARNING').length;
  const errCount = findings.filter((f) => f.status === 'ERROR').length;
  console.log(`Total langkah: ${findings.length} | OK: ${okCount} | Warning: ${warnCount} | Error: ${errCount}`);
  console.log('==========================================\n');

  for (const f of findings) {
    const icon = f.status === 'OK' ? '✅' : f.status === 'WARNING' ? '⚠️' : '❌';
    console.log(`${icon} [${f.area}] ${f.item}${f.detail ? ' — ' + f.detail : ''}`);
  }

  if (consoleErrors.length > 0) {
    console.log('\n--- JavaScript pageerror yang tertangkap (tambahan) ---');
    consoleErrors.slice(0, 10).forEach((e) => console.log('  •', e.slice(0, 150)));
  }

  // Simpan hasil ke file JSON supaya bisa diolah jadi laporan Word nanti
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(
    'reports/bug-hunt-results.json',
    JSON.stringify({ findings, consoleErrors, prNumber, poNumber, receiptNumber, invoiceNumber, timestamp: new Date().toISOString() }, null, 2)
  );
  console.log('\nHasil lengkap tersimpan di: reports/bug-hunt-results.json\n');

  // Test ini TIDAK gagal walau ada ERROR di dalamnya — tujuannya mengumpulkan
  // semua temuan dulu, bukan berhenti di error pertama. Cek reports/bug-hunt-results.json
  // untuk detail lengkap.
});
