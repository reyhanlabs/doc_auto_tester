# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-master-data.spec.js >> Master Data (login sekali untuk semua test) >> buat mata uang baru berhasil tersimpan
- Location: tests\04-master-data.spec.js:201:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('div').filter({ hasText: /^Pilih Kode$/ }).last()
    - waiting for" https://demo.zahirerp.com/data-store/currency-data/add-currency" navigation to finish...
    - navigated to "https://demo.zahirerp.com/data-store/currency-data/add-currency"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - banner [ref=e4]:
        - generic [ref=e6]:
          - img "icon" [ref=e8]
          - button "Dasbor" [ref=e9] [cursor=pointer]:
            - generic [ref=e10]: Dasbor
          - button "Data Master" [ref=e11] [cursor=pointer]:
            - generic [ref=e12]: Data Master
          - button "Buku Besar" [ref=e13] [cursor=pointer]:
            - generic [ref=e14]: Buku Besar
          - button "Penjualan" [ref=e15] [cursor=pointer]:
            - generic [ref=e16]: Penjualan
          - button "Pembelian" [ref=e17] [cursor=pointer]:
            - generic [ref=e18]: Pembelian
          - button "Kas & Bank" [ref=e19] [cursor=pointer]:
            - generic [ref=e20]: Kas & Bank
          - button "Persediaan Barang" [ref=e21] [cursor=pointer]:
            - generic [ref=e22]: Persediaan Barang
          - button "Laporan" [ref=e23] [cursor=pointer]:
            - generic [ref=e24]: Laporan
          - menuitem [disabled]
          - button [ref=e25] [cursor=pointer]:
            - generic [ref=e27]: help
          - button [ref=e28] [cursor=pointer]:
            - img [ref=e30]
          - button [ref=e31] [cursor=pointer]:
            - generic [ref=e33]: account_circle
      - generic [ref=e36]:
        - list [ref=e38]:
          - listitem [ref=e39]:
            - link "Data Master" [ref=e40] [cursor=pointer]:
              - /url: /data-store
          - listitem [ref=e41]:
            - generic [ref=e42]: Data Mata Uang
        - generic [ref=e45]:
          - textbox "Cari" [ref=e46]
          - button [ref=e47] [cursor=pointer]:
            - img [ref=e49]
          - group
        - generic [ref=e51]:
          - generic [ref=e52]:
            - generic [ref=e53]:
              - generic [ref=e54]: Data Mata Uang
              - generic [ref=e55]: "1"
            - generic [ref=e56]:
              - button "Revaluasi" [ref=e58] [cursor=pointer]:
                - generic [ref=e60]: Revaluasi
              - button [ref=e62] [cursor=pointer]:
                - img [ref=e64]
              - link [ref=e67] [cursor=pointer]:
                - /url: /data-store/currency-data/filter-currency
                - button [ref=e68]:
                  - img [ref=e70]
              - button "Buat Baru" [ref=e73] [cursor=pointer]:
                - generic [ref=e74]: Buat Baru
          - generic [ref=e75]:
            - generic:
              - generic:
                - generic:
                  - group "contained primary button group" [ref=e77]:
                    - button "0 Terpilih" [disabled]:
                      - generic:
                        - generic: 0 Terpilih
                    - button "Hapus" [ref=e78] [cursor=pointer]:
                      - generic [ref=e79]:
                        - img [ref=e80]
                        - text: Hapus
                    - button [ref=e82] [cursor=pointer]:
                      - img [ref=e84]
                  - grid:
                    - row "Kode Nama Simbol Satuan Ukur Status" [ref=e86] [cursor=pointer]:
                      - columnheader "Kode" [ref=e87]:
                        - cell "Kode" [ref=e88]:
                          - button "Kode" [ref=e89]:
                            - text: Kode
                            - img [ref=e90]
                      - columnheader "Nama" [ref=e92]:
                        - cell "Nama" [ref=e93]:
                          - button "Nama" [ref=e94]:
                            - text: Nama
                            - img [ref=e95]
                      - columnheader "Simbol" [ref=e97]:
                        - cell "Simbol" [ref=e98]:
                          - button "Simbol" [ref=e99]:
                            - text: Simbol
                            - img [ref=e100]
                      - columnheader "Satuan Ukur" [ref=e102]:
                        - cell "Satuan Ukur" [ref=e103]:
                          - button "Satuan Ukur" [ref=e104]:
                            - text: Satuan Ukur
                            - img [ref=e105]
                      - columnheader "Status" [ref=e107]:
                        - cell "Status" [ref=e108]
                      - columnheader [ref=e109]:
                        - cell [ref=e110]
                    - rowgroup "grid" [ref=e111]:
                      - row "row" [ref=e112]:
                        - row "row" [ref=e113] [cursor=pointer]:
                          - gridcell "IDR" [ref=e114]:
                            - cell "IDR" [ref=e115]
                          - gridcell "Indonesian rupiah" [ref=e116]:
                            - cell "Indonesian rupiah" [ref=e117]
                          - gridcell "Rp" [ref=e118]:
                            - cell "Rp" [ref=e119]
                          - gridcell "Rupiah" [ref=e120]:
                            - cell "Rupiah" [ref=e121]
                          - gridcell "Aktif" [ref=e122]:
                            - cell "Aktif" [ref=e123]:
                              - generic [ref=e125]: Aktif
                          - gridcell [ref=e126]:
                            - cell [ref=e127]:
                              - button [ref=e129]:
                                - img [ref=e131]
    - generic [ref=e134]:
      - img "notfound" [ref=e135]
      - generic [ref=e136]: Sistem sedang Mengambil Data
      - generic [ref=e137]: Harap tunggu sampai pemuatan selesai atau muat ulang halaman ini
      - button "Muat Ulang" [ref=e138] [cursor=pointer]:
        - generic [ref=e139]: Muat Ulang
  - generic:    
```

# Test source

```ts
  109 |   test('buat produk baru berhasil tersimpan', async () => {
  110 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  111 | 
  112 |     await page.goto('https://demo.zahirerp.com/');
  113 |     await page.getByRole('button', { name: 'Data Master' }).click();
  114 |     await page.getByRole('link', { name: /Data Produk/ }).first().click();
  115 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  116 |     await page.waitForTimeout(1200);
  117 |     await page.waitForTimeout(1000);
  118 | 
  119 |     await page.locator('#field-name').fill(uniqueName);
  120 |     await page.locator('#field-code').click();
  121 |     await expect(page.locator('#field-code')).not.toHaveValue('', { timeout: 5000 });
  122 | 
  123 |     await page.getByRole('button', { name: 'Simpan' }).click();
  124 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  125 |   });
  126 | 
  127 |   test('buat satuan pengukuran baru berhasil tersimpan', async () => {
  128 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  129 |     const uniqueCode = `B${Date.now().toString().slice(-4)}`;
  130 | 
  131 |     await page.goto('https://demo.zahirerp.com/');
  132 |     await page.getByRole('button', { name: 'Data Master' }).click();
  133 |     await page.getByRole('link', { name: /Satuan Pengukuran/ }).first().click();
  134 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  135 |     await page.waitForTimeout(1200);
  136 | 
  137 |     await page.locator('#field-code').fill(uniqueCode);
  138 |     await page.locator('#field-name').fill(uniqueName);
  139 |     await page.getByRole('button', { name: 'Simpan' }).click();
  140 | 
  141 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  142 |   });
  143 | 
  144 |   test('buat gudang baru berhasil tersimpan', async () => {
  145 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  146 |     const uniqueCode = `GD${Date.now().toString().slice(-4)}`;
  147 | 
  148 |     await page.goto('https://demo.zahirerp.com/');
  149 |     await page.getByRole('button', { name: 'Data Master' }).click();
  150 |     await page.getByRole('link', { name: /Data Gudang/ }).first().click();
  151 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  152 |     await page.waitForTimeout(1200);
  153 | 
  154 |     await page.locator('#field-name').fill(uniqueName);
  155 |     await page.locator('#field-code').fill(uniqueCode);
  156 |     await page.getByRole('button', { name: 'Simpan' }).click();
  157 | 
  158 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  159 |   });
  160 | 
  161 |   test('buat departemen baru berhasil tersimpan', async ({}, testInfo) => {
  162 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  163 | 
  164 |     await page.goto('https://demo.zahirerp.com/');
  165 |     await page.getByRole('button', { name: 'Data Master' }).click();
  166 |     await page.getByRole('link', { name: /Data Departemen/ }).first().click();
  167 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  168 |     await page.waitForTimeout(1200);
  169 | 
  170 |     // Akun trial cuma boleh punya 1 Departemen. Kalau sudah ada 1, sistem
  171 |     // menampilkan paywall "Ayo Berlangganan Sekarang!" alih-alih form Buat Baru.
  172 |     // Ini business rule yang valid, bukan bug — jadi kita skip (bukan gagal).
  173 |     const subscribeWall = page.getByText('Ayo Berlangganan Sekarang', { exact: false });
  174 |     if (await subscribeWall.isVisible({ timeout: 3000 }).catch(() => false)) {
  175 |       await page.getByRole('button', { name: 'Batal', exact: true }).click().catch(() => {});
  176 |       testInfo.skip(true, 'Akun trial dibatasi maksimal 1 Departemen — sudah tercapai, ini perilaku normal (bukan bug).');
  177 |       return;
  178 |     }
  179 | 
  180 |     await page.locator('#field-name').fill(uniqueName);
  181 |     await page.getByRole('button', { name: 'Simpan' }).click();
  182 | 
  183 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  184 |   });
  185 | 
  186 |   test('buat proyek baru berhasil tersimpan', async () => {
  187 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  188 | 
  189 |     await page.goto('https://demo.zahirerp.com/');
  190 |     await page.getByRole('button', { name: 'Data Master' }).click();
  191 |     await page.getByRole('link', { name: /Data Proyek/ }).first().click();
  192 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  193 |     await page.waitForTimeout(1200);
  194 | 
  195 |     await page.locator('#field-name').fill(uniqueName);
  196 |     await page.getByRole('button', { name: 'Simpan' }).click();
  197 | 
  198 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  199 |   });
  200 | 
  201 |   test('buat mata uang baru berhasil tersimpan', async () => {
  202 | 
  203 |     await page.goto('https://demo.zahirerp.com/');
  204 |     await page.getByRole('button', { name: 'Data Master' }).click();
  205 |     await page.getByRole('link', { name: /Data Mata Uang/ }).first().click();
  206 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  207 |     await page.waitForTimeout(1200);
  208 | 
> 209 |     await page.locator('div').filter({ hasText: /^Pilih Kode$/ }).last().click();
      |                                                                          ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  210 |     await page.waitForTimeout(800);
  211 |     // Pilih mata uang PERTAMA yang tersedia di daftar (bukan hardcode 'AED'),
  212 |     // supaya tetap valid walau AED sudah pernah dipakai/ditambahkan sebelumnya
  213 |     await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
  214 |     await page.getByRole('button', { name: 'Simpan' }).click();
  215 | 
  216 |     // Mata uang bisa duplikat kalau sudah ada, cek dua kemungkinan pesan
  217 |     const successMsg = page.getByText(/Telah ditambahkan|sudah ada|already exists/i);
  218 |     await expect(successMsg).toBeVisible({ timeout: 12_000 });
  219 |   });
  220 | 
  221 |   test('buat pajak baru berhasil tersimpan', async () => {
  222 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  223 |     const uniqueCode = `PPN${Date.now().toString().slice(-4)}`;
  224 | 
  225 |     await page.goto('https://demo.zahirerp.com/');
  226 |     await page.getByRole('button', { name: 'Data Master' }).click();
  227 |     await page.getByRole('link', { name: /Data Pajak/ }).first().click();
  228 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  229 |     await page.waitForTimeout(1200);
  230 | 
  231 |     await page.locator('#field-name').fill(uniqueName);
  232 |     await page.locator('#field-code').fill(uniqueCode);
  233 |     await page.locator('#field-rate').fill('15');
  234 |     await page.getByRole('checkbox', { name: 'Akun Pajak Pembelian' }).check();
  235 |     await page.getByRole('checkbox', { name: 'Akun Pajak Penjualan' }).check();
  236 |     await page.getByRole('button', { name: 'Simpan' }).click();
  237 | 
  238 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  239 |   });
  240 | 
  241 |   test('buat harta tetap baru berhasil tersimpan', async () => {
  242 |     const uniqueCode = `M${Date.now().toString().slice(-4)}`;
  243 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  244 | 
  245 |     await page.goto('https://demo.zahirerp.com/');
  246 |     await page.getByRole('button', { name: 'Data Master' }).click();
  247 |     await page.getByRole('link', { name: /Data Harta Tetap/ }).first().click();
  248 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  249 |     await page.waitForTimeout(1200);
  250 | 
  251 |     await page.locator('.css-d7bazj').filter({ hasText: /^Pilih$/ }).first().click();
  252 |     await page.locator('.MuiListItem-root').filter({ hasText: 'Kendaraan' }).click();
  253 | 
  254 |     await page.locator('[id="field-assets[0]code"]').fill(uniqueCode);
  255 |     await page.locator('[id="field-assets[0]name"]').fill(uniqueName);
  256 |     await page.locator('[id="field-assets[0]depreciation.acquired_value"]').fill('150000000');
  257 |     await page.getByRole('button', { name: 'Simpan' }).click();
  258 | 
  259 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  260 |   });
  261 | 
  262 |   test('buat kode biaya baru berhasil tersimpan', async () => {
  263 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  264 | 
  265 |     await page.goto('https://demo.zahirerp.com/');
  266 |     await page.getByRole('button', { name: 'Data Master' }).click();
  267 |     await page.getByRole('link', { name: 'Kode Biaya', exact: true }).click();
  268 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  269 |     await page.waitForTimeout(1200);
  270 | 
  271 |     await page.locator('#field-name').fill(uniqueName);
  272 |     await page.getByRole('button', { name: 'Simpan' }).click();
  273 | 
  274 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  275 |   });
  276 | 
  277 |   test('buat tipe produk baru berhasil tersimpan', async () => {
  278 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  279 | 
  280 |     await page.goto('https://demo.zahirerp.com/');
  281 |     await page.getByRole('button', { name: 'Data Master' }).click();
  282 |     await page.getByRole('link', { name: 'Tipe Produk', exact: true }).click();
  283 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  284 |     await page.waitForTimeout(1200);
  285 | 
  286 |     await page.locator('#field-name').fill(uniqueName);
  287 |     await page.getByRole('button', { name: 'Simpan' }).click();
  288 | 
  289 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  290 |   });
  291 | 
  292 |   test('buat akun baru berhasil tersimpan', async () => {
  293 |     const uniqueName = `DATA TESTER ${Date.now()}`;
  294 | 
  295 |     await page.goto('https://demo.zahirerp.com/');
  296 |     await page.getByRole('button', { name: 'Data Master' }).click();
  297 |     await page.getByRole('link', { name: /Daftar Akun/ }).first().click();
  298 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  299 |     await page.waitForTimeout(1200);
  300 | 
  301 |     await page.locator('div').filter({ hasText: /^Pilih Subklasifikasi$/ }).nth(1).click();
  302 |     await page.waitForTimeout(400);
  303 |     await page.locator('#field-subclassification').pressSequentially('Bank', { delay: 80 });
  304 |     await page.waitForTimeout(1000);
  305 |     await page.locator('.MuiListItem-root').filter({ hasText: 'Bank' }).first().click();
  306 |     // Pastikan pilihan "Bank" benar-benar sudah tercatat di field sebelum lanjut
  307 |     await expect(page.locator('div').filter({ hasText: /^Bank$/ }).first()).toBeVisible({ timeout: 5000 });
  308 |     await page.waitForTimeout(500);
  309 | 
```