# demo-zahirerp-tester

Automation tester untuk `demo.zahirerp.com` — struktur identik dengan `zahirerp-demo-tester`
(untuk `demo-space.zahirerp.com`), cuma beda domain target.

## Setup (sekali saja)

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

`.env` sudah saya isi otomatis dengan kredensial & nama perusahaan yang sama seperti
`demo-space` (karena Anda konfirmasi sama). Cek dulu isinya sebelum jalan, ganti kalau ternyata beda.

## Isi project

```
tests/
├── helpers.js               (fungsi login + pilih perusahaan)
├── 01-navigation-menu.spec.js   (cek semua menu & submenu bisa dibuka)
├── 02-create-button.spec.js     (cek tombol "Buat Baru" di tiap halaman)
├── 03-laporan-detail.spec.js    (cek semua laporan spesifik bisa dibuka)
└── 04-master-data.spec.js       (bikin 15 master data: customer, vendor, dst — login sekali untuk semua)
```

## Jalankan

```bash
npx playwright test 01-navigation-menu --headed
npx playwright test 02-create-button --headed
npx playwright test 03-laporan-detail --headed
npx playwright test 04-master-data --headed
```

Atau semua sekaligus (tanpa browser terlihat, lebih cepat):
```bash
npm test
```

## Catatan penting

File-file ini **belum pernah dites langsung** di `demo.zahirerp.com` — dibuat berdasarkan
pola yang sudah terbukti jalan di `demo-space.zahirerp.com` (produk yang sama, environment beda).
Kemungkinan besar sebagian besar langsung jalan, tapi seperti biasa mungkin ada 1-2 penyesuaian kecil
dibutuhkan (nama field, label tombol, dll) — jalankan satu-satu dulu, laporkan hasilnya untuk
diperbaiki bareng kalau ada yang meleset.
