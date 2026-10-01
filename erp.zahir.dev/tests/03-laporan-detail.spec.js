import { test, expect } from '@playwright/test';
import { loginAndSelectCompany } from './helpers.js';

const LAPORAN_CATEGORIES = [
  'Laporan Keuangan', 'Laporan Penjualan dan Piutang', 'Laporan Pembelian dan Utang',
  'Laporan Produk', 'Laporan Lainnya', 'Bea Cukai Report',
  'Kustom Laporan', 'Kustom Laporan ERP', 'Report BAZ',
];

const MAX_REPORTS_PER_CATEGORY = 200;
const EXCLUDED_TEXTS = new Set([
  'Laporan Keuangan', 'Buku Besar', 'Kas & Bank', 'Laporan Pajak',
  'Laporan Penjualan dan Piutang', 'Laporan Pembelian dan Utang', 'Laporan Produk',
  'Laporan Lainnya', 'Bea Cukai Report', 'Kustom Laporan', 'Kustom Laporan ERP', 'Report BAZ',
  'My Favorite', 'Laporan',
]);

function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

async function getReportItems(page) {
  const items = page.locator('div[style*="cursor: pointer"], div[style*="cursor:pointer"]');
  const count = Math.min(await items.count(), 250);
  const texts = new Set();
  for (let i = 0; i < count; i++) {
    const el = items.nth(i);
    if (await el.isVisible().catch(() => false)) {
      const text = (await el.innerText().catch(() => '')).trim();
      if (text && text.length > 1 && text.length < 60 && !EXCLUDED_TEXTS.has(text)) {
        texts.add(text);
      }
    }
  }
  return texts;
}

test('setiap laporan di dalam menu Laporan bisa dibuka tanpa error', async ({ page }) => {
  test.setTimeout(45 * 60_000);

  const consoleErrors = [];
  const IGNORED_CONSOLE_PATTERNS = [
    /legacy \w*contextTypes API/i,
    /Material-UI/i,
    /Each child in a list should have a unique/i,
    /Failed %s type/i,
  ];
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !IGNORED_CONSOLE_PATTERNS.some((p) => p.test(msg.text()))) {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => consoleErrors.push(`[pageerror] ${err.message}`));

  await loginAndSelectCompany(page);
  const homeURL = page.url();
  const results = [];

  const laporanMenu = page.getByRole('button', { name: 'Laporan', exact: true })
    .or(page.getByRole('link', { name: 'Laporan', exact: true }));

  for (const categoryName of LAPORAN_CATEGORIES) {
    await page.goto(homeURL);
    await laporanMenu.first().click();
    await page.waitForTimeout(800);

    const categoryLink = page.locator('a, button, [role="link"], [role="button"]').filter({ hasText: categoryName });
    if ((await categoryLink.count()) === 0) {
      console.log(`⚠️  [${categoryName}] kategori tidak ditemukan`);
      results.push({ category: categoryName, report: '(kategori)', status: '⚠️  tidak ditemukan' });
      continue;
    }
    await categoryLink.first().click();
    await page.waitForTimeout(1500);

    let reportNames = [...(await getReportItems(page))];
    if (reportNames.length > MAX_REPORTS_PER_CATEGORY) {
      console.log(`ℹ️  [${categoryName}] ketemu ${reportNames.length} laporan, dibatasi cek ${MAX_REPORTS_PER_CATEGORY} pertama`);
      reportNames = reportNames.slice(0, MAX_REPORTS_PER_CATEGORY);
    }

    if (reportNames.length === 0) {
      console.log(`⚠️  [${categoryName}] tidak ada laporan terdeteksi di halaman ini`);
      results.push({ category: categoryName, report: '(tidak ada laporan terdeteksi)', status: '⚠️  DILEWATI' });
      continue;
    }

    for (const reportName of reportNames) {
      consoleErrors.length = 0;
      let status;
      try {
        const reportItem = page.locator('div[style*="cursor: pointer"], div[style*="cursor:pointer"]')
          .filter({ hasText: new RegExp(`^${escapeRegex(reportName)}\\s*$`) });
        await reportItem.first().click({ timeout: 5000 });
        await page.waitForTimeout(1000);

        const okButton = page.getByRole('button', { name: 'Ok', exact: true });
        if ((await okButton.count()) > 0 && (await okButton.first().isVisible().catch(() => false))) {
          await okButton.first().click().catch(() => {});
          await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(1000);
        const hasErrorText = await page.getByText(/terjadi kesalahan|failed to fetch|undefined is not/i).count();
        status = hasErrorText > 0 ? '❌ ada teks error di halaman'
          : consoleErrors.length > 0 ? `⚠️  console error: ${consoleErrors[0].slice(0, 80)}`
          : '✅ OK';
      } catch (e) {
        status = `❌ gagal diklik: ${e.message.slice(0, 80)}`;
      }
      console.log(`${status}  |  ${categoryName} > ${reportName}`);
      results.push({ category: categoryName, report: reportName, status });

      await page.goto(homeURL);
      await laporanMenu.first().click().catch(() => {});
      await page.waitForTimeout(600);
      await categoryLink.first().click().catch(() => {});
      await page.waitForTimeout(1200);
    }
  }

  console.log('\n=== RINGKASAN LAPORAN ===');
  for (const r of results) console.log(`${r.status}  |  ${r.category} > ${r.report}`);
  console.log('=========================\n');

  const failed = results.filter((r) => r.status.startsWith('❌'));
  expect(failed, `Bermasalah:\n${failed.map((f) => `${f.category} > ${f.report}`).join('\n')}`).toHaveLength(0);
});