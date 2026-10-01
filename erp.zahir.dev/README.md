# Zahir ERP Tester

Automation testing untuk `erp.zahir.dev` — 2 mode: Playwright test klasik + AI Agent bahasa natural.

## Setup (sekali saja, ~3 menit)

```bash
npm install
npx playwright install chromium --with-deps
cp .env.example .env
```

Buka `.env`, isi 3 hal ini saja:
- `ZAHIR_USERNAME` / `ZAHIR_PASSWORD` — akun login ERP
- `ANTHROPIC_API_KEY` — untuk mode AI Agent (skip kalau cuma mau pakai Playwright biasa)

## Mode 1 — Playwright Test (regression test terstruktur)

```bash
npm test              # jalan headless, cocok untuk CI/cron
npm run test:headed   # jalan dengan browser terlihat, buat debug
npm run test:report   # buka laporan HTML hasil test terakhir
```

Test ada di folder `tests/`. `auth.setup.js` login sekali dan simpan sesi,
semua test lain otomatis pakai sesi itu (tidak perlu login berulang).
Tambah test baru: copy `tests/smoke.spec.js`, sesuaikan langkahnya.

**Catatan:** selector login di `tests/auth.setup.js` saya buat generik (mendeteksi
field username/password otomatis). Kalau ternyata tidak cocok dengan form login
`erp.zahir.dev` yang sebenarnya, jalankan `npx playwright codegen https://erp.zahir.dev`
untuk merekam selector yang tepat lalu tempel ke situ — 1x saja, setelahnya jalan terus.

## Mode 2 — AI Agent (bahasa natural, tanpa selector)

```bash
npm run agent -- "login lalu buka menu Invoice, pastikan halaman list invoice muncul"
npm run agent -- "buat invoice baru untuk customer apapun, isi 1 item, simpan, cek muncul notifikasi berhasil"
```

Agent akan: buka browser → "lihat" elemen di halaman → minta Claude putuskan aksi
(klik/isi/navigasi) → eksekusi → ulangi sampai skenario selesai. Hasil akhir + screenshot
tersimpan di `reports/`.

Kalau mau lihat browsernya bergerak (bukan headless):
```bash
HEADLESS=false npm run agent -- "skenario kamu di sini"
```

## Struktur folder

```
tests/          -> test Playwright klasik (stabil, cocok dijadwalkan/CI)
agent/          -> AI agent (fleksibel, cocok eksplorasi/skenario baru)
reports/        -> screenshot, video, trace, storageState (auto-generated)
```

## Rekomendasi alur pakai

1. Hari-hari awal: pakai **AI Agent** untuk eksplorasi cepat — coba berbagai skenario tanpa nulis kode.
2. Skenario yang penting & sering diulang (login, buat invoice, dsb) → **pindahkan ke Playwright test** di `tests/`, jadi stabil & bisa dijadwalkan (misal cron tiap malam) tanpa biaya API.
3. Jalankan `npm test` di CI/CD atau cron server untuk regression check otomatis, pakai agent hanya untuk kasus baru/eksploratif.
