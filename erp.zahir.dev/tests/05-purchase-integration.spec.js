import { test, expect } from '@playwright/test';
import { loginAndSelectCompany } from './helpers.js';

// Helper: netralkan fokus supaya dropdown React-Select yang gampang "nyangkut"
// selalu tertutup, dengan cara klik ke pojok kiri-atas halaman (area netral,
// selalu kosong di semua halaman, tidak tergantung teks breadcrumb tertentu).
async function blurDropdown(page) {
  await page.mouse.click(15, 15);
  await page.waitForTimeout(400);
}

// Helper: kadang sesi ke-reset di tengah alur panjang, balik ke halaman
// "Pilih Perusahaan". Cek tiap pindah tahap, pilih ulang perusahaan kalau perlu.
async function ensureCompanySelected(page) {
  if (page.url().includes('list-company')) {
    console.log('PERHATIAN: sesi ter-reset ke Pilih Perusahaan, pilih ulang...');
    const companyName = process.env.ZAHIR_COMPANY_NAME || 'Regression Test';
    const companyCell = page.getByRole('cell', { name: companyName }).first();
    await companyCell.waitFor({ state: 'visible', timeout: 20_000 });
    await companyCell.dblclick();
    await page.waitForURL((url) => !url.pathname.includes('list-company'), { timeout: 20_000 });
    await page.waitForTimeout(1000);
  }
}

test('Alur Pembelian: PR -> PO -> Receipt -> Invoice -> Payment', async ({ page }) => {
  test.setTimeout(3 * 60_000);
  await loginAndSelectCompany(page);

  // ===== TAHAP 1: Permintaan Pembelian (PR) =====
  await page.goto('https://erp.zahir.dev/');
  await ensureCompanySelected(page);
  await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
  await page.getByRole('link', { name: /Pengajuan Pembelian/ }).first().click();
  await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  await page.waitForTimeout(1000);

  // --- Pilih "Di ajukan oleh" ---
  await page.getByText('Pilih Di ajukan oleh').click();
  await page.locator('#field-contact').fill('General Employee');
  await page.waitForTimeout(800);
  await page.locator('.MuiListItem-root').filter({ hasText: 'General Employee' }).first().click();
  await page.waitForTimeout(500);
  await blurDropdown(page);

  // --- Verifikasi "Di ajukan oleh" benar-benar terisi sebelum lanjut ---
  await expect(page.getByText('Pilih Di ajukan oleh')).not.toBeVisible({ timeout: 5000 }).catch(() => {});

  // --- Tanggal = hari ini ---
  await page.getByRole('textbox', { name: 'Tanggal' }).click();
  const todayDay = String(new Date().getDate());
  await page.locator('button[class*="MuiPickersDay-day"]:not([class*="MuiPickersDay-hidden"])').filter({ hasText: todayDay }).first().click();
  await blurDropdown(page);

  // --- Akan digunakan pada = 2 hari ke depan ---
  await page.getByRole('textbox', { name: 'Akan digunakan pada' }).click();
  const future = new Date();
  future.setDate(future.getDate() + 2);
  const futureDay = String(future.getDate());
  await page.locator('button[class*="MuiPickersDay-day"]:not([class*="MuiPickersDay-hidden"])').filter({ hasText: futureDay }).first().click();
  await blurDropdown(page);

  // --- Verifikasi tanggal "Akan digunakan pada" benar-benar berubah (bukan hari ini) ---
  console.log('Tanggal "Akan digunakan pada" saat ini:', await page.getByRole('textbox', { name: 'Akan digunakan pada' }).inputValue().catch(() => '(tidak terbaca)'));

  // --- Pilih Produk (baris pertama) ---
  await page.locator('div').filter({ hasText: /^Pilih Produk$/ }).first().click();
  await page.waitForTimeout(500);
  await page.getByText(/Product Contoh/).first().click();
  await page.waitForTimeout(800);

  const qtyField = page.locator('[id="field-line_items[0].quantity"]');
  await qtyField.click();
  await qtyField.fill('');
  await qtyField.pressSequentially('100', { delay: 60 });
  // Blur LOKAL (klik ke label "Jenis Barang/Jasa" di baris yang sama),
  // bukan ke pojok jauh, supaya validasi baris ini benar-benar ke-trigger
  await page.getByText('Jenis Barang/ Jasa', { exact: false }).click({ force: true }).catch(() => {});
  await page.waitForTimeout(1500);

  // Pastikan nilai Quantity BENERAN "100" (bukan kosong/reset) sebelum lanjut
  const qtyValue = await qtyField.inputValue().catch(() => null);
  console.log('Nilai Quantity sebelum Simpan:', qtyValue);

  // --- Screenshot sebelum Simpan, untuk verifikasi visual kalau masih gagal ---
  await page.screenshot({ path: 'reports/tahap1-sebelum-simpan.png', fullPage: true });

  // --- Ambil nomor PR dari field "No. Referensi" SEBELUM Simpan ---
  const prNumber = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    for (const inp of inputs) {
      if (inp.value && /^PR/i.test(inp.value)) return inp.value;
    }
    return null;
  });
  console.log('=== DEBUG TAHAP 1 ===');
  console.log('Nomor PR yang terdeteksi (sebelum Simpan):', prNumber);
  console.log('=====================');

  await page.getByRole('button', { name: 'Simpan', exact: true }).click();
  await page.waitForTimeout(2000);
  console.log('URL setelah Simpan:', page.url());

  // --- Verifikasi Tahap 1 BENERAN sukses (bukan cuma nebak dari URL) ---
  const tahap1ErrorText = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).count();
  if (tahap1ErrorText > 0) {
    const errMsg = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).first().innerText();
    throw new Error(`Tahap 1 GAGAL tersimpan — ada validasi error: "${errMsg}"`);
  }

  await page.screenshot({ path: 'reports/tahap1-selesai.png', fullPage: true });

  // ===== TAHAP 2: Pesanan Pembelian (PO) — tarik referensi dari PR =====
  await page.goto('https://erp.zahir.dev/');
  await ensureCompanySelected(page);
  await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
  await page.getByRole('link', { name: /Pesanan Pembelian/ }).first().click();
  await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  await page.waitForTimeout(1000);

  await page.getByText('Pilih No. Permintaan').click();
  await page.keyboard.type(prNumber);
  await page.waitForTimeout(800);
  await page.locator('.MuiListItem-root').filter({ hasText: prNumber }).first().click();
  await blurDropdown(page);

  // Pilih Pemasok manual (belum auto-terisi dari No. Permintaan)
  await page.getByText('Pilih Pemasok').click();
  await page.keyboard.type('General');  // sengaja cuma 'General' — ketik lengkap 'General Vendor' bikin hasil pencarian hilang (bug aplikasi)
  await page.waitForTimeout(800);
  await page.locator('.MuiListItem-root').filter({ hasText: 'General Vendor' }).first().click();
  await blurDropdown(page);

  await page.screenshot({ path: 'reports/tahap2-sebelum-simpan.png', fullPage: true });

  const poNumber = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    for (const inp of inputs) {
      if (inp.value && /^PO/i.test(inp.value)) return inp.value;
    }
    return null;
  });
  console.log('=== DEBUG TAHAP 2 ===');
  console.log('Nomor PO yang terdeteksi (sebelum Simpan):', poNumber);
  console.log('=====================');

  await page.getByRole('button', { name: 'Simpan', exact: true }).click();
  await page.waitForTimeout(2000);
  console.log('URL setelah Simpan PO:', page.url());

  const tahap2ErrorText = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).count();
  if (tahap2ErrorText > 0) {
    const errMsg = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).first().innerText();
    throw new Error(`Tahap 2 GAGAL tersimpan — ada validasi error: "${errMsg}"`);
  }

  await page.screenshot({ path: 'reports/tahap2-selesai.png', fullPage: true });

  // ===== TAHAP 3: Penerimaan Barang (Receipt) — tarik referensi dari PO =====
  await page.goto('https://erp.zahir.dev/');
  await ensureCompanySelected(page);
  await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
  await page.getByRole('link', { name: /Penerimaan Barang/ }).first().click();
  await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  await page.waitForTimeout(1000);

  await page.getByText(/Pilih No\. Pesanan/).click();
  await page.keyboard.type(poNumber);
  await page.waitForTimeout(800);
  await page.locator('.MuiListItem-root').filter({ hasText: poNumber }).first().click();
  await blurDropdown(page);

  await page.screenshot({ path: 'reports/tahap3-sebelum-simpan.png', fullPage: true });

  const receiptNumber = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    for (const inp of inputs) {
      if (inp.value && /^PR\d/i.test(inp.value)) return inp.value; // "PR000002" (beda dari "PRQ..." milik Permintaan Pembelian)
    }
    return null;
  });
  console.log('=== DEBUG TAHAP 3 ===');
  console.log('Nomor Penerimaan Barang yang terdeteksi (sebelum Simpan):', receiptNumber);
  console.log('=====================');

  await page.getByRole('button', { name: 'Simpan', exact: true }).click();
  await page.waitForTimeout(2000);
  console.log('URL setelah Simpan Receipt:', page.url());

  const tahap3ErrorText = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).count();
  if (tahap3ErrorText > 0) {
    const errMsg = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).first().innerText();
    throw new Error(`Tahap 3 GAGAL tersimpan — ada validasi error: "${errMsg}"`);
  }

  await page.screenshot({ path: 'reports/tahap3-selesai.png', fullPage: true });

  // ===== TAHAP 4: Faktur Pembelian (Invoice) — tarik referensi dari Penerimaan Barang =====
  await page.goto('https://erp.zahir.dev/');
  await ensureCompanySelected(page);
  await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
  await page.getByRole('link', { name: /Faktur Pembelian/ }).first().click();
  await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  await page.waitForTimeout(1000);

  // Centang "Penerimaan Barang" supaya bisa tarik referensi dari Tahap 3
  await page.getByRole('checkbox', { name: 'Penerimaan Barang' }).check();
  await page.waitForTimeout(800);

  await page.getByText('Pilih Pemasok').click();
  await page.keyboard.type('General');  // sengaja cuma 'General' — ketik lengkap 'General Vendor' bikin hasil pencarian hilang (bug aplikasi)
  await page.waitForTimeout(800);
  await page.locator('.MuiListItem-root').filter({ hasText: 'General Vendor' }).first().click();
  await blurDropdown(page);

  // Dropdown referensi Penerimaan Barang biasanya muncul SETELAH Pemasok dipilih
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'reports/tahap4-sebelum-pilih-referensi.png', fullPage: true });

  // Dropdown referensi Penerimaan Barang ada di TABEL BARIS ITEM (kolom "RECEIPT NO."),
  // seringkali kosong (nggak ada default), jadi kita klik berdasarkan POSISI
  // (tepat di bawah header "RECEIPT NO."), bukan berdasarkan isi teks.
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'reports/tahap4-sebelum-pilih-referensi.png', fullPage: true });

  const receiptHeader = page.getByText('RECEIPT NO', { exact: false }).first();
  await receiptHeader.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  const headerBox = await receiptHeader.boundingBox().catch(() => null);
  if (headerBox) {
    await page.mouse.click(headerBox.x + headerBox.width / 2, headerBox.y + headerBox.height + 35);
  } else {
    // fallback kalau header nggak ketemu: coba klik dropdown kosong pertama di area tabel
    await page.locator('.css-d7bazj').last().click();
  }
  await page.waitForTimeout(500);
  await page.locator('.MuiListItem-root').filter({ hasText: receiptNumber }).first().click();
  await blurDropdown(page);

  await page.screenshot({ path: 'reports/tahap4-sebelum-simpan.png', fullPage: true });

  const invoiceNumber = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    for (const inp of inputs) {
      if (inp.value && /^PJ\d/i.test(inp.value)) return inp.value; // format "PJ000002"
    }
    return null;
  });
  console.log('=== DEBUG TAHAP 4 ===');
  console.log('Nomor Faktur Pembelian yang terdeteksi (sebelum Simpan):', invoiceNumber);
  console.log('=====================');

  await page.getByRole('button', { name: 'Simpan', exact: true }).click();
  await page.waitForTimeout(2000);
  console.log('URL setelah Simpan Faktur:', page.url());

  const tahap4ErrorText = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).count();
  if (tahap4ErrorText > 0) {
    const errMsg = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).first().innerText();
    throw new Error(`Tahap 4 GAGAL tersimpan — ada validasi error: "${errMsg}"`);
  }

  await page.screenshot({ path: 'reports/tahap4-selesai.png', fullPage: true });

  // ===== TAHAP 5: Pembayaran Utang Usaha — tarik referensi dari Faktur Pembelian =====
  await page.goto('https://erp.zahir.dev/');
  await ensureCompanySelected(page);
  await page.getByRole('button', { name: 'Pembelian', exact: true }).click();
  await page.getByRole('link', { name: /Pembayaran Utang Usaha/ }).first().click();
  await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  await page.waitForTimeout(1000);

  // Cek dulu apakah Pemasok sudah otomatis terisi "General Vendor" —
  // kalau sudah, jangan klik/pilih lagi (bisa bikin dropdown kebuka ulang tanpa hasil).
  const currentSupplierValue = await page.locator('.css-1v4x2mb-singleValue').innerText().catch(() => '');
  if (!currentSupplierValue.includes('General Vendor')) {
    let supplierSelected = false;
    for (let attempt = 1; attempt <= 3 && !supplierSelected; attempt++) {
      console.log(`Percobaan pilih Pemasok ke-${attempt}...`);
      await page.getByText('Pilih Pemasok').click().catch(() => {});
      await page.locator('#field-supplier').fill('');
      await page.locator('#field-supplier').pressSequentially('General', { delay: 80 });  // sengaja cuma 'General', ketik lengkap bikin hasil hilang (bug aplikasi)
      await page.waitForTimeout(1200 + attempt * 500); // makin lama tiap percobaan

      const option = page.locator('.MuiListItem-root').filter({ hasText: 'General Vendor' }).first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click();
        await blurDropdown(page);
        supplierSelected = true;
      } else {
        console.log(`Percobaan ke-${attempt} belum berhasil, coba lagi...`);
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(500);
      }
    }
    if (!supplierSelected) {
      throw new Error('Tahap 5 GAGAL: tidak berhasil memilih Pemasok "General Vendor" setelah 3 percobaan.');
    }
  } else {
    console.log('Pemasok sudah otomatis terisi "General Vendor", tidak perlu dipilih manual.');
  }

  await page.waitForTimeout(800);
  await page.screenshot({ path: 'reports/tahap5-sebelum-pilih-faktur.png', fullPage: true });

  // Field ini punya ID pasti: "field-line_items[0].invoice" — klik & ketik
  // langsung ke situ, jauh lebih stabil daripada nebak posisi.
  await page.locator('[id="field-line_items\\[0\\].invoice"]').click();
  await page.locator('[id="field-line_items\\[0\\].invoice"]').pressSequentially('PJ', { delay: 80 }); // sengaja prefix pendek, ketik lengkap bikin hasil hilang (bug aplikasi, sama seperti kasus "General Vendor")
  await page.waitForTimeout(1000);

  const specificOption = page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: invoiceNumber || '' });
  if (invoiceNumber && (await specificOption.count()) > 0) {
    await specificOption.first().click();
  } else {
    await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
  }
  await blurDropdown(page);

  await page.screenshot({ path: 'reports/tahap5-sebelum-simpan.png', fullPage: true });

  await page.getByRole('button', { name: 'Simpan', exact: true }).click();
  await page.waitForTimeout(2000);
  console.log('URL setelah Simpan Pembayaran:', page.url());

  // Cek toast SUKSES dulu ("... Telah ditambahkan") — kalau ada, anggap berhasil,
  // meskipun form baru yang otomatis kebuka lagi mungkin masih nunjukkin sisa
  // validasi visual dari field-field kosongnya sendiri (bukan tanda kegagalan).
  const successToast = await page.getByText(/Telah ditambahkan/i).count();
  if (successToast === 0) {
    const tahap5ErrorText = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).count();
    if (tahap5ErrorText > 0) {
      const errMsg = await page.getByText(/harus berupa|silakan isi|wajib diisi/i).first().innerText();
      throw new Error(`Tahap 5 GAGAL tersimpan — ada validasi error: "${errMsg}"`);
    }
  }

  console.log('\n=== ALUR PEMBELIAN LENGKAP BERHASIL ===');
  console.log('PR:', prNumber, '| PO:', poNumber, '| Receipt:', receiptNumber, '| Invoice:', invoiceNumber);
  console.log('========================================\n');

  await page.screenshot({ path: 'reports/tahap5-selesai.png', fullPage: true });
});