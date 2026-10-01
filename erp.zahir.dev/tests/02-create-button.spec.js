import { test, expect } from '@playwright/test';
import { loginAndSelectCompany } from './helpers.js';

const TOP_LEVEL_MENUS = [
  'Dasbor', 'Data Master', 'Buku Besar', 'Penjualan',
  'Pembelian', 'Kas & Bank', 'Persediaan Barang', 'Laporan',
];

const MAX_SUBMENU_PER_MENU = 20;
const EXCLUDED_LINK_TEXTS = ['Help', 'help', '?', 'Logout', 'Keluar', 'Profil', 'Profile'];
const CREATE_BUTTON_PATTERN = /buat baru|tambah baru|\+ buat|\+ tambah/i;

async function getVisibleLinkTexts(page) {
  const links = page.locator('a, [role="link"]');
  const count = Math.min(await links.count(), 300);
  const texts = new Set();
  for (let i = 0; i < count; i++) {
    const el = links.nth(i);
    if (await el.isVisible().catch(() => false)) {
      const fullText = (await el.innerText().catch(() => '')).trim();
      const text = fullText.split('\n')[0].trim();
      const href = await el.getAttribute('href').catch(() => null);
      const isExternal = href && /^https?:\/\//.test(href) && !href.includes('erp.zahir.dev');
      if (text && text.length < 60 && !isExternal) texts.add(text);
    }
  }
  return texts;
}

test('tombol Buat Baru di setiap menu bisa diklik tanpa error', async ({ page }) => {
  test.setTimeout(20 * 60_000);

  const consoleErrors = [];
  const IGNORED_CONSOLE_PATTERNS = [
    /legacy \w*contextTypes API/i,
    /componentWillReceiveProps/i, // warning React deprecated lain yang sering bareng ini
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

  for (const menuName of TOP_LEVEL_MENUS) {
    const topElement = page.getByRole('button', { name: menuName, exact: true })
      .or(page.getByRole('link', { name: menuName, exact: true }));

    if ((await topElement.count()) === 0) continue;

    const beforeLinks = await getVisibleLinkTexts(page);
    await topElement.first().click();
    await page.waitForTimeout(1000);
    const afterLinks = await getVisibleLinkTexts(page);

    let subMenuNames = [...afterLinks].filter((t) =>
      !beforeLinks.has(t) && t !== menuName && !EXCLUDED_LINK_TEXTS.includes(t)
    );
    if (subMenuNames.length > MAX_SUBMENU_PER_MENU) subMenuNames = subMenuNames.slice(0, MAX_SUBMENU_PER_MENU);

    const pagesToCheck = subMenuNames.length > 0 ? subMenuNames : [null];

    for (const subName of pagesToCheck) {
      const label = subName ? `${menuName} > ${subName}` : menuName;
      consoleErrors.length = 0;

      try {
        if (subName) {
          const subLink = page.locator('a, button, [role="link"], [role="button"]').filter({ hasText: subName });
          await subLink.first().click({ timeout: 5000 });
          await page.waitForTimeout(1200);
        }

        const createButton = page.locator('a, button').filter({ hasText: CREATE_BUTTON_PATTERN }).first();
        const buttonExists = (await createButton.count()) > 0;

        if (!buttonExists) {
          results.push({ menu: label, status: 'DILEWATI (tidak ada tombol Buat Baru)' });
        } else {
          await createButton.click({ timeout: 5000 });
          await page.waitForTimeout(1200);

          const hasErrorText = await page.getByText(/terjadi kesalahan|failed to fetch|undefined is not/i).count();
          const status = hasErrorText > 0 ? '❌ ERROR saat buka form'
            : consoleErrors.length > 0 ? `⚠️  console error: ${consoleErrors[0].slice(0, 80)}`
            : '✅ OK';
          results.push({ menu: label, status });

          await page.keyboard.press('Escape').catch(() => {});
          await page.waitForTimeout(500);
        }
      } catch (e) {
        results.push({ menu: label, status: `❌ gagal: ${e.message.slice(0, 80)}` });
      }

      console.log(`${results[results.length - 1].status}  |  ${label}`);
      await page.goto(homeURL);
      await topElement.first().click().catch(() => {});
      await page.waitForTimeout(800);
    }
    await page.goto(homeURL);
  }

  console.log('\n=== RINGKASAN TOMBOL BUAT BARU ===');
  for (const r of results) console.log(`${r.status}  |  ${r.menu}`);
  console.log('===================================\n');

  const failed = results.filter((r) => r.status.startsWith('❌'));
  expect(failed, `Bermasalah:\n${failed.map((f) => f.menu).join('\n')}`).toHaveLength(0);
});