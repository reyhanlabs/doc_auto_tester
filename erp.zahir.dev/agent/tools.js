// Daftar "tools" yang boleh dipanggil Claude untuk mengontrol browser.
// Setiap tool dipetakan ke aksi Playwright nyata di executeTool().

export const toolDefinitions = [
  {
    name: 'click',
    description: 'Klik sebuah elemen berdasarkan ref id yang muncul di snapshot halaman.',
    input_schema: {
      type: 'object',
      properties: { ref: { type: 'string', description: 'ref id elemen, contoh: e12' } },
      required: ['ref'],
    },
  },
  {
    name: 'fill',
    description: 'Isi input/textarea dengan teks tertentu.',
    input_schema: {
      type: 'object',
      properties: {
        ref: { type: 'string' },
        value: { type: 'string' },
      },
      required: ['ref', 'value'],
    },
  },
  {
    name: 'press_key',
    description: 'Tekan tombol keyboard, contoh: Enter, Escape, Tab.',
    input_schema: {
      type: 'object',
      properties: { key: { type: 'string' } },
      required: ['key'],
    },
  },
  {
    name: 'navigate',
    description: 'Buka URL tertentu (relatif terhadap BASE_URL atau absolut).',
    input_schema: {
      type: 'object',
      properties: { url: { type: 'string' } },
      required: ['url'],
    },
  },
  {
    name: 'wait',
    description: 'Tunggu beberapa detik, dipakai jika halaman butuh waktu loading/animasi.',
    input_schema: {
      type: 'object',
      properties: { seconds: { type: 'number' } },
      required: ['seconds'],
    },
  },
  {
    name: 'assert_text_visible',
    description: 'Cek apakah suatu teks tampil di halaman. Dipakai untuk verifikasi hasil test.',
    input_schema: {
      type: 'object',
      properties: { text: { type: 'string' } },
      required: ['text'],
    },
  },
  {
    name: 'finish',
    description: 'Panggil ini saat skenario test SELESAI (berhasil atau gagal), sertakan kesimpulan.',
    input_schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        summary: { type: 'string', description: 'Ringkasan apa yang terjadi / hasil verifikasi' },
      },
      required: ['success', 'summary'],
    },
  },
];

export async function executeTool(page, refMap, name, input) {
  switch (name) {
    case 'click': {
      const locator = refMap.get(input.ref);
      if (!locator) return { error: `ref ${input.ref} tidak ditemukan, minta snapshot ulang` };
      await locator.click({ timeout: 10_000 });
      return { ok: true };
    }
    case 'fill': {
      const locator = refMap.get(input.ref);
      if (!locator) return { error: `ref ${input.ref} tidak ditemukan, minta snapshot ulang` };
      await locator.fill(input.value, { timeout: 10_000 });
      return { ok: true };
    }
    case 'press_key': {
      await page.keyboard.press(input.key);
      return { ok: true };
    }
    case 'navigate': {
      await page.goto(input.url);
      return { ok: true };
    }
    case 'wait': {
      await page.waitForTimeout(input.seconds * 1000);
      return { ok: true };
    }
    case 'assert_text_visible': {
      const visible = await page.getByText(input.text, { exact: false }).first().isVisible().catch(() => false);
      return { visible };
    }
    default:
      return { error: `tool tidak dikenal: ${name}` };
  }
}

// Ambil "snapshot" ringkas elemen interaktif di halaman (role, text, ref id)
// supaya Claude bisa "melihat" halaman tanpa screenshot mentah tiap step.
export async function getPageSnapshot(page) {
  const elements = await page.evaluate(() => {
    const selector = 'a, button, input, textarea, select, [role="button"], [role="link"], [role="tab"]';
    const nodes = Array.from(document.querySelectorAll(selector));
    return nodes.slice(0, 200).map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        idx: i,
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role') || '',
        type: el.getAttribute('type') || '',
        name: (el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.innerText || el.value || '').trim().slice(0, 80),
        visible: rect.width > 0 && rect.height > 0,
      };
    }).filter(e => e.visible && e.name);
  });

  const refMap = new Map();
  const lines = elements.map((el, i) => {
    const ref = `e${i}`;
    refMap.set(ref, page.locator('a, button, input, textarea, select, [role="button"], [role="link"], [role="tab"]').nth(el.idx));
    return `[${ref}] <${el.tag}${el.role ? ' role=' + el.role : ''}${el.type ? ' type=' + el.type : ''}> "${el.name}"`;
  });

  return { text: lines.join('\n') || '(tidak ada elemen interaktif terlihat)', refMap };
}
