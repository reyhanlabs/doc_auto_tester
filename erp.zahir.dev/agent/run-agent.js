// Jalankan: npm run agent -- "login lalu buka menu Invoice dan pastikan halaman list invoice muncul"
//
// Cara kerja: loop "lihat halaman -> Claude putuskan aksi -> eksekusi -> ulangi"
// sampai Claude memanggil tool `finish`.

import 'dotenv/config';
import { chromium } from '@playwright/test';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import { toolDefinitions, executeTool, getPageSnapshot } from './tools.js';

const scenario = process.argv.slice(2).join(' ');
if (!scenario) {
  console.error('Kasih skenario testnya. Contoh:\n  npm run agent -- "login lalu cek dashboard muncul"');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
const MAX_STEPS = 25;

const SYSTEM_PROMPT = `Kamu adalah AI QA tester yang mengontrol browser untuk menguji aplikasi ERP di ${process.env.BASE_URL}.
Kamu akan diberi skenario test dalam bahasa natural. Tugasmu: jalankan skenario itu langkah demi langkah
menggunakan tools yang tersedia (click, fill, navigate, wait, assert_text_visible), lalu panggil tool "finish"
begitu skenario selesai (baik berhasil maupun gagal) dengan kesimpulan yang jelas.

Aturan penting:
- Sebelum klik/isi elemen, gunakan ref id ("eN") yang diberikan di snapshot halaman terbaru. Jangan menebak ref.
- Kalau login diperlukan, gunakan kredensial dari env (username: ${process.env.ZAHIR_USERNAME}). JANGAN minta password ke user, itu sudah tersedia di sistem.
- Kalau elemen yang dicari tidak ada di snapshot, coba scroll/klik menu lain dulu untuk memunculkannya, jangan langsung finish gagal.
- Batasi ke maksimal ${MAX_STEPS} langkah. Kalau mendekati batas dan belum selesai, panggil finish dengan success:false dan jelaskan sudah sampai mana.
- Jawab HANYA dengan tool call, jangan menulis penjelasan panjang di luar tool.`;

async function main() {
  const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  const context = fs.existsSync('reports/storageState.json')
    ? await browser.newContext({ storageState: 'reports/storageState.json' })
    : await browser.newContext();
  const page = await context.newPage();
  await page.goto(process.env.BASE_URL || 'https://erp.zahir.dev/');

  const messages = [
    { role: 'user', content: `Skenario test: ${scenario}\n\nMulai dengan melihat snapshot halaman saat ini.` },
  ];

  console.log(`\n🧪 Skenario: ${scenario}\n`);

  for (let step = 0; step < MAX_STEPS; step++) {
    const { text: snapshotText, refMap } = await getPageSnapshot(page);
    messages.push({
      role: 'user',
      content: `[Snapshot halaman langkah ${step + 1}, URL: ${page.url()}]\n${snapshotText}`,
    });

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: toolDefinitions,
      messages,
    });

    messages.push({ role: 'assistant', content: response.content });

    const toolUse = response.content.find((b) => b.type === 'tool_use');
    if (!toolUse) {
      console.log('⚠️  Claude tidak memanggil tool, menghentikan agent.');
      break;
    }

    console.log(`→ [${step + 1}] ${toolUse.name}(${JSON.stringify(toolUse.input)})`);

    if (toolUse.name === 'finish') {
      const { success, summary } = toolUse.input;
      console.log(`\n${success ? '✅ BERHASIL' : '❌ GAGAL'}: ${summary}\n`);
      await page.screenshot({ path: `reports/agent-final-${Date.now()}.png`, fullPage: true });
      break;
    }

    const result = await executeTool(page, refMap, toolUse.name, toolUse.input);
    messages.push({
      role: 'user',
      content: [{ type: 'tool_result', tool_use_id: toolUse.id, content: JSON.stringify(result) }],
    });
  }

  await context.storageState({ path: 'reports/storageState.json' });
  await browser.close();
}

main().catch((err) => {
  console.error('Agent error:', err);
  process.exit(1);
});
