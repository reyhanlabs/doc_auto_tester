# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-master-data.spec.js >> Master Data (login sekali untuk semua test) >> buat mata uang baru berhasil tersimpan
- Location: tests\04-master-data.spec.js:178:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Simpan' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - img "Zahir ERP" [ref=e7]
        - button [ref=e8] [cursor=pointer]:
          - img [ref=e9]
      - separator [ref=e11]
      - list [ref=e12]:
        - listitem [ref=e13] [cursor=pointer]:
          - img [ref=e16]
          - generic [ref=e19]: My Favorite
        - listitem [ref=e20] [cursor=pointer]:
          - img [ref=e23]
          - generic [ref=e29]: Dasbor
        - listitem [ref=e30] [cursor=pointer]:
          - img [ref=e33]
          - generic [ref=e38]: Data Master
        - listitem [ref=e39] [cursor=pointer]:
          - img [ref=e42]
          - generic [ref=e45]: Buku Besar
        - listitem [ref=e46] [cursor=pointer]:
          - img [ref=e49]
          - generic [ref=e54]: Penjualan
        - listitem [ref=e55] [cursor=pointer]:
          - img [ref=e58]
          - generic [ref=e62]: Pembelian
        - listitem [ref=e63] [cursor=pointer]:
          - img [ref=e66]
          - generic [ref=e70]: Kas & Bank
        - listitem [ref=e71] [cursor=pointer]:
          - img [ref=e74]
          - generic [ref=e85]: Persediaan Barang
        - listitem [ref=e86] [cursor=pointer]:
          - img [ref=e89]
          - generic [ref=e92]: Laporan
      - generic [ref=e93]:
        - separator [ref=e94]
        - listitem [ref=e95] [cursor=pointer]:
          - img [ref=e98]
          - generic [ref=e102]: Settings
        - separator [ref=e103]
        - generic [ref=e104] [cursor=pointer]:
          - generic [ref=e105]: SA
          - generic [ref=e106]:
            - paragraph [ref=e107]: Syaiful Amri
            - paragraph [ref=e108]: AUTO TESTER
          - img [ref=e109]
    - generic [ref=e111]:
      - banner [ref=e112]:
        - generic [ref=e113]:
          - heading "Data Mata Uang" [level=6] [ref=e114]
          - generic [ref=e115]:
            - button [ref=e116] [cursor=pointer]:
              - img [ref=e117]
            - generic [ref=e122]:
              - button [ref=e123] [cursor=pointer]:
                - img [ref=e124]
              - generic: "0"
            - button "SA" [ref=e127] [cursor=pointer]:
              - generic [ref=e128]: SA
      - generic [ref=e132]:
        - list [ref=e134]:
          - listitem [ref=e135]:
            - link "Data Master" [ref=e136] [cursor=pointer]:
              - /url: /data-store
          - listitem [ref=e137]:
            - generic [ref=e138]: Data Mata Uang
        - generic [ref=e141]:
          - textbox "Cari" [ref=e142]
          - button [ref=e143] [cursor=pointer]:
            - img [ref=e144]
          - group
        - generic [ref=e147]:
          - generic [ref=e148]:
            - generic [ref=e149]:
              - generic [ref=e150]: Data Mata Uang
              - generic [ref=e151]: "2"
            - generic [ref=e152]:
              - button "Revaluasi" [ref=e154] [cursor=pointer]:
                - generic [ref=e155]: Revaluasi
              - button [ref=e157] [cursor=pointer]:
                - img [ref=e158]
              - link [ref=e164] [cursor=pointer]:
                - /url: /data-store/currency-data/filter-currency
                - button [ref=e165]:
                  - img [ref=e166]
              - link "Buat Baru" [ref=e168] [cursor=pointer]:
                - /url: /data-store/currency-data/add-currency
                - text: Buat Baru
          - generic [ref=e169]:
            - generic:
              - generic:
                - generic:
                  - group "contained primary button group" [ref=e171]:
                    - button "0 Terpilih" [disabled]:
                      - generic: 0 Terpilih
                    - button "Hapus" [ref=e172] [cursor=pointer]:
                      - img [ref=e173]
                      - text: Hapus
                    - button [ref=e176] [cursor=pointer]:
                      - img [ref=e177]
                  - grid [ref=e181]:
                    - row "Kode Nama Simbol Satuan Ukur Status" [ref=e182] [cursor=pointer]:
                      - columnheader "Kode" [ref=e183]:
                        - button "Kode" [ref=e185]:
                          - text: Kode
                          - img [ref=e186]
                      - columnheader "Nama" [ref=e188]:
                        - button "Nama" [ref=e190]:
                          - text: Nama
                          - img [ref=e191]
                      - columnheader "Simbol" [ref=e193]:
                        - button "Simbol" [ref=e195]:
                          - text: Simbol
                          - img [ref=e196]
                      - columnheader "Satuan Ukur" [ref=e198]:
                        - button "Satuan Ukur" [ref=e200]:
                          - text: Satuan Ukur
                          - img [ref=e201]
                      - columnheader "Status" [ref=e203]:
                        - generic [ref=e204]: Status
                      - columnheader [ref=e205]
                    - rowgroup "grid" [ref=e207]:
                      - row "row row" [ref=e208]:
                        - row "row" [ref=e209] [cursor=pointer]:
                          - gridcell "AED" [ref=e210]:
                            - generic [ref=e211]: AED
                          - gridcell "United Arab Emirates dirham" [ref=e212]:
                            - generic [ref=e213]: United Arab Emirates dirham
                          - gridcell "د.إ" [ref=e214]:
                            - generic [ref=e215]: د.إ
                          - gridcell "Dirham" [ref=e216]:
                            - generic [ref=e217]: Dirham
                          - gridcell "Aktif" [ref=e218]:
                            - generic [ref=e221]: Aktif
                          - gridcell [ref=e222]:
                            - button [ref=e225]:
                              - img [ref=e226]
                        - row "row" [ref=e230] [cursor=pointer]:
                          - gridcell "IDR" [ref=e231]:
                            - generic [ref=e232]: IDR
                          - gridcell "Indonesian rupiah" [ref=e233]:
                            - generic [ref=e234]: Indonesian rupiah
                          - gridcell "Rp" [ref=e235]:
                            - generic [ref=e236]: Rp
                          - gridcell "Rupiah" [ref=e237]:
                            - generic [ref=e238]: Rupiah
                          - gridcell "Aktif" [ref=e239]:
                            - generic [ref=e242]: Aktif
                          - gridcell [ref=e243]:
                            - button [ref=e246]:
                              - img [ref=e247]
      - button "AI Assistant" [ref=e251] [cursor=pointer]:
        - img [ref=e252]
      - generic:
        - generic:
          - generic: Zahir AI Chat
          - button:
            - img
  - generic:    
```

# Test source

```ts
  90  |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  91  |   });
  92  | 
  93  |   test('buat produk baru berhasil tersimpan', async () => {
  94  |     const uniqueName = `BUGHUNT Produk ${Date.now()}`;
  95  |     await page.goto('https://go.zahirerp.com/');
  96  |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  97  |     await page.getByRole('link', { name: /Data Produk/ }).first().click();
  98  |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  99  |     await page.waitForTimeout(1200);
  100 | 
  101 |     await page.locator('#field-name').fill(uniqueName);
  102 |     await page.locator('#field-code').click();
  103 |     await expect(page.locator('#field-code')).not.toHaveValue('', { timeout: 5000 });
  104 |     await page.getByRole('button', { name: 'Simpan' }).click();
  105 | 
  106 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  107 |   });
  108 | 
  109 |   test('buat satuan pengukuran baru berhasil tersimpan', async () => {
  110 |     const uniqueName = `BUGHUNT Satuan ${Date.now()}`;
  111 |     const uniqueCode = `B${Date.now().toString().slice(-4)}`;
  112 |     await page.goto('https://go.zahirerp.com/');
  113 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  114 |     await page.getByRole('link', { name: /Satuan Pengukuran/ }).first().click();
  115 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  116 |     await page.waitForTimeout(1200);
  117 | 
  118 |     await page.locator('#field-code').fill(uniqueCode);
  119 |     await page.locator('#field-name').fill(uniqueName);
  120 |     await page.getByRole('button', { name: 'Simpan' }).click();
  121 | 
  122 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  123 |   });
  124 | 
  125 |   test('buat gudang baru berhasil tersimpan', async () => {
  126 |     const uniqueName = `BUGHUNT Gudang ${Date.now()}`;
  127 |     const uniqueCode = `GD${Date.now().toString().slice(-4)}`;
  128 |     await page.goto('https://go.zahirerp.com/');
  129 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  130 |     await page.getByRole('link', { name: /Data Gudang/ }).first().click();
  131 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  132 |     await page.waitForTimeout(1200);
  133 | 
  134 |     await page.locator('#field-name').fill(uniqueName);
  135 |     await page.locator('#field-code').fill(uniqueCode);
  136 |     await page.getByRole('button', { name: 'Simpan' }).click();
  137 | 
  138 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  139 |   });
  140 | 
  141 |   test('buat departemen baru berhasil tersimpan', async ({}, testInfo) => {
  142 |     const uniqueName = `BUGHUNT Departemen ${Date.now()}`;
  143 |     await page.goto('https://go.zahirerp.com/');
  144 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  145 |     await page.getByRole('link', { name: /Data Departemen/ }).first().click();
  146 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  147 |     await page.waitForTimeout(1200);
  148 | 
  149 |     // Akun trial cuma boleh punya 1 Departemen — kalau kena limit, sistem
  150 |     // munculkan paywall "Ayo Berlangganan Sekarang!" alih-alih form Buat Baru.
  151 |     const subscribeWall = page.getByText(/Ayo Berlangganan|subscribe to create|trial, please/i);
  152 |     if (await subscribeWall.first().isVisible({ timeout: 6000 }).catch(() => false)) {
  153 |       await page.getByRole('button', { name: 'Batal', exact: true }).click().catch(() => {});
  154 |       testInfo.skip(true, 'Akun trial dibatasi maksimal 1 Departemen — bukan bug.');
  155 |       return;
  156 |     }
  157 | 
  158 |     await page.locator('#field-name').fill(uniqueName);
  159 |     await page.getByRole('button', { name: 'Simpan' }).click();
  160 | 
  161 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  162 |   });
  163 | 
  164 |   test('buat proyek baru berhasil tersimpan', async () => {
  165 |     const uniqueName = `BUGHUNT Proyek ${Date.now()}`;
  166 |     await page.goto('https://go.zahirerp.com/');
  167 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  168 |     await page.getByRole('link', { name: /Data Proyek/ }).first().click();
  169 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  170 |     await page.waitForTimeout(1200);
  171 | 
  172 |     await page.locator('#field-name').fill(uniqueName);
  173 |     await page.getByRole('button', { name: 'Simpan' }).click();
  174 | 
  175 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  176 |   });
  177 | 
  178 |   test('buat mata uang baru berhasil tersimpan', async () => {
  179 |     await page.goto('https://go.zahirerp.com/');
  180 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  181 |     await page.getByRole('link', { name: /Data Mata Uang/ }).first().click();
  182 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  183 |     await page.waitForTimeout(1200);
  184 | 
  185 |     await page.locator('div').filter({ hasText: /^Pilih Kode$/ }).last().click();
  186 |     await page.waitForTimeout(800);
  187 |     // Pilih mata uang PERTAMA yang tersedia (bukan hardcode), lewati group header disabled
  188 |     await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click({ force: true });
  189 |     await page.waitForTimeout(500);
> 190 |     await page.getByRole('button', { name: 'Simpan' }).click();
      |                                                        ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  191 | 
  192 |     const successMsg = page.getByText(/Telah ditambahkan|sudah ada|already exists/i);
  193 |     await expect(successMsg).toBeVisible({ timeout: 10_000 });
  194 |   });
  195 | 
  196 |   test('buat pajak baru berhasil tersimpan', async () => {
  197 |     const uniqueName = `BUGHUNT Pajak ${Date.now()}`;
  198 |     const uniqueCode = `PJK${Date.now().toString().slice(-4)}`;
  199 |     await page.goto('https://go.zahirerp.com/');
  200 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  201 |     await page.getByRole('link', { name: /Data Pajak/ }).first().click();
  202 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  203 |     await page.waitForTimeout(1200);
  204 | 
  205 |     await page.locator('#field-name').fill(uniqueName);
  206 |     await page.locator('#field-code').fill(uniqueCode);
  207 |     await page.locator('#field-rate').fill('11');
  208 |     await page.getByRole('checkbox', { name: 'Akun Pajak Pembelian' }).check().catch(() => {});
  209 |     await page.getByRole('checkbox', { name: 'Akun Pajak Penjualan' }).check().catch(() => {});
  210 |     await page.getByRole('button', { name: 'Simpan' }).click();
  211 | 
  212 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  213 |   });
  214 | 
  215 |   test('buat harta tetap baru berhasil tersimpan', async () => {
  216 |     const uniqueCode = `M${Date.now().toString().slice(-4)}`;
  217 |     const uniqueName = `BUGHUNT Aset ${Date.now()}`;
  218 |     await page.goto('https://go.zahirerp.com/');
  219 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  220 |     await page.getByRole('link', { name: /Data Harta Tetap/ }).first().click();
  221 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  222 |     await page.waitForTimeout(1200);
  223 | 
  224 |     await page.locator('.css-d7bazj').filter({ hasText: /^Pilih$/ }).first().click();
  225 |     await page.waitForTimeout(500);
  226 |     await page.locator('.MuiListItem-root:not([aria-disabled="true"])').first().click();
  227 | 
  228 |     await page.locator('[id="field-assets[0]code"]').fill(uniqueCode);
  229 |     await page.locator('[id="field-assets[0]name"]').fill(uniqueName);
  230 |     await page.locator('[id="field-assets[0]depreciation.acquired_value"]').fill('50000000');
  231 |     await page.getByRole('button', { name: 'Simpan' }).click();
  232 | 
  233 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  234 |   });
  235 | 
  236 |   test('buat kode biaya baru berhasil tersimpan', async () => {
  237 |     const uniqueName = `BUGHUNT CostCode ${Date.now()}`;
  238 |     await page.goto('https://go.zahirerp.com/');
  239 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  240 |     await page.getByRole('link', { name: 'Kode Biaya', exact: true }).click();
  241 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  242 |     await page.waitForTimeout(1200);
  243 | 
  244 |     await page.locator('#field-name').fill(uniqueName);
  245 |     await page.getByRole('button', { name: 'Simpan' }).click();
  246 | 
  247 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  248 |   });
  249 | 
  250 |   test('buat tipe produk baru berhasil tersimpan', async () => {
  251 |     const uniqueName = `BUGHUNT TipeProduk ${Date.now()}`;
  252 |     await page.goto('https://go.zahirerp.com/');
  253 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  254 |     await page.getByRole('link', { name: 'Tipe Produk', exact: true }).click();
  255 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  256 |     await page.waitForTimeout(1200);
  257 | 
  258 |     await page.locator('#field-name').fill(uniqueName);
  259 |     await page.getByRole('button', { name: 'Simpan' }).click();
  260 | 
  261 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  262 |   });
  263 | 
  264 |   // Test Akun ditaruh PALING TERAKHIR — paling rentan flaky/kompleks,
  265 |   // supaya 14 test lain tetap sempat jalan semua kalau ini gagal.
  266 |   test('buat akun baru berhasil tersimpan', async () => {
  267 |     const uniqueName = `BUGHUNT Akun ${Date.now()}`;
  268 |     await page.goto('https://go.zahirerp.com/');
  269 |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  270 |     await page.getByRole('link', { name: /Daftar Akun/ }).first().click();
  271 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  272 |     await page.waitForTimeout(1200);
  273 | 
  274 |     await page.locator('div').filter({ hasText: /^Pilih Subklasifikasi$/ }).nth(1).click();
  275 |     await page.waitForTimeout(400);
  276 |     await page.locator('#field-subclassification').fill('Bank').catch(() => {});
  277 |     await page.waitForTimeout(1000);
  278 |     await page.locator('.MuiListItem-root:not([aria-disabled="true"])').filter({ hasText: 'Bank' }).first().click();
  279 |     await page.waitForTimeout(500);
  280 | 
  281 |     await page.locator('#field-name').click();
  282 |     await page.locator('#field-name').fill(uniqueName);
  283 |     await page.waitForTimeout(400);
  284 | 
  285 |     const checkbox = page.getByRole('checkbox', { name: 'Atur sebagai Akun Kas / Bank' });
  286 |     await checkbox.check().catch(() => {});
  287 |     await page.waitForTimeout(800);
  288 | 
  289 |     await page.getByRole('button', { name: 'Simpan' }).click();
  290 | 
```