# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-master-data.spec.js >> Master Data (login sekali untuk semua test) >> buat harta tetap baru berhasil tersimpan
- Location: tests\04-master-data.spec.js:235:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('.css-d7bazj').filter({ hasText: /^Pilih$/ }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - img "Zahir ERP" [ref=e7]
      - button [ref=e8] [cursor=pointer]:
        - img [ref=e9]
    - separator [ref=e11]
    - list [ref=e12]:
      - button "My Favorite" [ref=e13] [cursor=pointer]:
        - img [ref=e16]
        - generic [ref=e19]: My Favorite
      - button "Dasbor" [ref=e20] [cursor=pointer]:
        - img [ref=e23]
        - generic [ref=e29]: Dasbor
      - button "Data Master" [ref=e30] [cursor=pointer]:
        - img [ref=e33]
        - generic [ref=e38]: Data Master
      - button "Buku Besar" [ref=e39] [cursor=pointer]:
        - img [ref=e42]
        - generic [ref=e45]: Buku Besar
      - button "Penjualan" [ref=e46] [cursor=pointer]:
        - img [ref=e49]
        - generic [ref=e54]: Penjualan
      - button "Pembelian" [ref=e55] [cursor=pointer]:
        - img [ref=e58]
        - generic [ref=e62]: Pembelian
      - button "Kas & Bank" [ref=e63] [cursor=pointer]:
        - img [ref=e66]
        - generic [ref=e70]: Kas & Bank
      - button "Persediaan Barang" [ref=e71] [cursor=pointer]:
        - img [ref=e74]
        - generic [ref=e85]: Persediaan Barang
      - button "Laporan" [ref=e86] [cursor=pointer]:
        - img [ref=e89]
        - generic [ref=e92]: Laporan
    - generic [ref=e93]:
      - separator [ref=e94]
      - button "Settings" [ref=e95] [cursor=pointer]:
        - img [ref=e98]
        - generic [ref=e102]: Settings
      - separator [ref=e103]
      - generic [ref=e104] [cursor=pointer]:
        - generic [ref=e105]: SA
        - generic [ref=e106]:
          - paragraph [ref=e107]: Syaiful Amri
          - paragraph [ref=e108]: Demo Zahir ERP (Official)
        - img [ref=e109]
  - generic [ref=e111]:
    - banner [ref=e112]:
      - generic [ref=e113]:
        - generic [ref=e114]: Data Harta Tetap
        - generic [ref=e115]:
          - button "Global search" [ref=e116] [cursor=pointer]:
            - img [ref=e117]
          - button [ref=e120] [cursor=pointer]:
            - img [ref=e121]
          - generic [ref=e126]:
            - button [ref=e127] [cursor=pointer]:
              - img [ref=e128]
            - generic: "0"
          - button "SA" [ref=e131] [cursor=pointer]:
            - generic [ref=e132]: SA
    - generic [ref=e135]:
      - list [ref=e137]:
        - listitem [ref=e138]:
          - link "Data Master" [ref=e139] [cursor=pointer]:
            - /url: /data-store
        - listitem [ref=e140]:
          - link "Data Harta Tetap" [ref=e141] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e142]:
          - generic [ref=e143]: Penerimaan Harta Tetap
      - generic [ref=e144]:
        - generic [ref=e149]:
          - generic [ref=e150]: No. Ref
          - generic [ref=e152]:
            - generic [ref=e153]: Select is focused ,type to refine list, press Down to open the menu,
            - generic [ref=e154]:
              - generic [ref=e155]:
                - generic [ref=e156]: Pilih No. Ref
                - textbox [active] [ref=e159]
              - img [ref=e163]
        - generic [ref=e165]:
          - table [ref=e168]:
            - rowgroup [ref=e169]:
              - 'row "# KATEGORI KODE NAMA TANGGAL PEROLEHAN NILAI PEROLEHAN NILAI RESIDU AKTIF #" [ref=e170]':
                - columnheader "#" [ref=e171]
                - columnheader "KATEGORI" [ref=e172]
                - columnheader "KODE" [ref=e173]
                - columnheader "NAMA" [ref=e174]
                - columnheader "TANGGAL PEROLEHAN" [ref=e175]
                - columnheader "NILAI PEROLEHAN" [ref=e176]
                - columnheader "NILAI RESIDU" [ref=e177]
                - columnheader "AKTIF" [ref=e178]
                - columnheader "#" [ref=e179]
            - rowgroup [ref=e180]:
              - row "Pilih Agt 10, 2026 Choose date, selected date is 10 Agt 2026 Rp 0 Rp 0" [ref=e181]:
                - cell [ref=e182]
                - cell "Pilih" [ref=e183]:
                  - generic [ref=e191]:
                    - generic [ref=e192]:
                      - generic [ref=e193]: Pilih
                      - textbox [ref=e196]
                    - img [ref=e200]
                - cell [ref=e202]:
                  - generic [ref=e207]:
                    - textbox [ref=e208]
                    - group
                - cell [ref=e209]:
                  - generic [ref=e210]:
                    - generic [ref=e214]:
                      - textbox [ref=e215]
                      - group
                    - textbox [ref=e218]
                - cell "Agt 10, 2026 Choose date, selected date is 10 Agt 2026" [ref=e219]:
                  - generic [ref=e224]:
                    - textbox "MMMM DD, YYYY" [ref=e225]: Agt 10, 2026
                    - button "Choose date, selected date is 10 Agt 2026" [ref=e227] [cursor=pointer]:
                      - img [ref=e228]
                    - group
                - cell "Rp 0" [ref=e230]:
                  - generic [ref=e235]:
                    - textbox [ref=e236]: Rp 0
                    - group
                - cell "Rp 0" [ref=e237]:
                  - generic [ref=e242]:
                    - textbox [ref=e243]: Rp 0
                    - group
                - cell [ref=e244]:
                  - generic [ref=e248] [cursor=pointer]:
                    - checkbox [checked] [ref=e249]
                    - img [ref=e250]
                - cell [ref=e252]:
                  - button [ref=e253] [cursor=pointer]:
                    - img [ref=e254]
              - row "Pilih Agt 10, 2026 Choose date, selected date is 10 Agt 2026 Rp 0 Rp 0" [ref=e257]:
                - cell [ref=e258]
                - cell "Pilih" [ref=e259]:
                  - generic [ref=e267]:
                    - generic [ref=e268]:
                      - generic [ref=e269]: Pilih
                      - textbox [ref=e272]
                    - img [ref=e276]
                - cell [ref=e278]:
                  - generic [ref=e283]:
                    - textbox [ref=e284]
                    - group
                - cell [ref=e285]:
                  - generic [ref=e286]:
                    - generic [ref=e290]:
                      - textbox [ref=e291]
                      - group
                    - textbox [ref=e294]
                - cell "Agt 10, 2026 Choose date, selected date is 10 Agt 2026" [ref=e295]:
                  - generic [ref=e300]:
                    - textbox "MMMM DD, YYYY" [ref=e301]: Agt 10, 2026
                    - button "Choose date, selected date is 10 Agt 2026" [ref=e303] [cursor=pointer]:
                      - img [ref=e304]
                    - group
                - cell "Rp 0" [ref=e306]:
                  - generic [ref=e311]:
                    - textbox [ref=e312]: Rp 0
                    - group
                - cell "Rp 0" [ref=e313]:
                  - generic [ref=e318]:
                    - textbox [ref=e319]: Rp 0
                    - group
                - cell [ref=e320]:
                  - generic [ref=e324] [cursor=pointer]:
                    - checkbox [checked] [ref=e325]
                    - img [ref=e326]
                - cell [ref=e328]:
                  - button [ref=e329] [cursor=pointer]:
                    - img [ref=e330]
          - generic [ref=e333]:
            - generic [ref=e334]:
              - button "Tambah Baris Baru" [ref=e336] [cursor=pointer]:
                - img [ref=e337]
                - generic [ref=e338]: Tambah Baris Baru
              - generic [ref=e341]:
                - generic [ref=e342]:
                  - generic [ref=e343]: Nilai Jurnal
                  - strong [ref=e344]: Rp 0.00
                - generic [ref=e345]:
                  - generic [ref=e346]: Nilai Harta Tetap
                  - strong [ref=e347]: Rp 0.00
                - generic [ref=e348]:
                  - generic [ref=e349]:  Selisih
                  - strong [ref=e350]: Rp 0.00
            - link "Batal" [ref=e352] [cursor=pointer]:
              - /url: /data-store/fixed-asset-data
              - button "Batal" [ref=e353]
    - button "AI Assistant" [ref=e354] [cursor=pointer]:
      - img [ref=e355]
    - generic:
      - generic:
        - generic: Zahir AI Chat
        - button:
          - img
```

# Test source

```ts
  145 |     await page.getByRole('button', { name: 'Data Master' }).click();
  146 |     await page.getByRole('link', { name: /Satuan Pengukuran/ }).first().click();
  147 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  148 | 
  149 |     await page.locator('#field-code').fill(uniqueCode);
  150 |     await page.locator('#field-name').fill(uniqueName);
  151 |     await page.getByRole('button', { name: 'Simpan' }).click();
  152 | 
  153 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  154 |   });
  155 | 
  156 |   test('buat gudang baru berhasil tersimpan', async () => {
  157 |     const uniqueName = `Gudang Cirebon ${Date.now()}`;
  158 |     const uniqueCode = `GD${Date.now().toString().slice(-4)}`;
  159 | 
  160 |     await page.goto('https://demo-space.zahirerp.com/');
  161 |     await page.getByRole('button', { name: 'Data Master' }).click();
  162 |     await page.getByRole('link', { name: /Data Gudang/ }).first().click();
  163 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  164 | 
  165 |     await page.locator('#field-name').fill(uniqueName);
  166 |     await page.locator('#field-code').fill(uniqueCode);
  167 |     await page.getByRole('button', { name: 'Simpan' }).click();
  168 | 
  169 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  170 |   });
  171 | 
  172 |   test('buat departemen baru berhasil tersimpan', async () => {
  173 |     const uniqueName = `Finance ${Date.now()}`;
  174 | 
  175 |     await page.goto('https://demo-space.zahirerp.com/');
  176 |     await page.getByRole('button', { name: 'Data Master' }).click();
  177 |     await page.getByRole('link', { name: /Data Departemen/ }).first().click();
  178 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  179 | 
  180 |     await page.locator('#field-name').fill(uniqueName);
  181 |     await page.getByRole('button', { name: 'Simpan' }).click();
  182 | 
  183 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  184 |   });
  185 | 
  186 |   test('buat proyek baru berhasil tersimpan', async () => {
  187 |     const uniqueName = `Proyek A ${Date.now()}`;
  188 | 
  189 |     await page.goto('https://demo-space.zahirerp.com/');
  190 |     await page.getByRole('button', { name: 'Data Master' }).click();
  191 |     await page.getByRole('link', { name: /Data Proyek/ }).first().click();
  192 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  193 | 
  194 |     await page.locator('#field-name').fill(uniqueName);
  195 |     await page.getByRole('button', { name: 'Simpan' }).click();
  196 | 
  197 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  198 |   });
  199 | 
  200 |   test('buat mata uang baru berhasil tersimpan', async () => {
  201 | 
  202 |     await page.goto('https://demo-space.zahirerp.com/');
  203 |     await page.getByRole('button', { name: 'Data Master' }).click();
  204 |     await page.getByRole('link', { name: /Data Mata Uang/ }).first().click();
  205 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  206 | 
  207 |     await page.locator('div').filter({ hasText: /^Pilih Kode$/ }).last().click();
  208 |     await page.getByText('AED - United Arab Emirates').click();
  209 |     await page.getByRole('button', { name: 'Simpan' }).click();
  210 | 
  211 |     // Mata uang bisa duplikat kalau sudah ada, cek dua kemungkinan pesan
  212 |     const successMsg = page.getByText(/Telah ditambahkan|sudah ada|already exists/i);
  213 |     await expect(successMsg).toBeVisible({ timeout: 10_000 });
  214 |   });
  215 | 
  216 |   test('buat pajak baru berhasil tersimpan', async () => {
  217 |     const uniqueName = `PPN Test ${Date.now()}`;
  218 |     const uniqueCode = `PPN${Date.now().toString().slice(-4)}`;
  219 | 
  220 |     await page.goto('https://demo-space.zahirerp.com/');
  221 |     await page.getByRole('button', { name: 'Data Master' }).click();
  222 |     await page.getByRole('link', { name: /Data Pajak/ }).first().click();
  223 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  224 | 
  225 |     await page.locator('#field-name').fill(uniqueName);
  226 |     await page.locator('#field-code').fill(uniqueCode);
  227 |     await page.locator('#field-rate').fill('15');
  228 |     await page.getByRole('checkbox', { name: 'Akun Pajak Pembelian' }).check();
  229 |     await page.getByRole('checkbox', { name: 'Akun Pajak Penjualan' }).check();
  230 |     await page.getByRole('button', { name: 'Simpan' }).click();
  231 | 
  232 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  233 |   });
  234 | 
  235 |   test('buat harta tetap baru berhasil tersimpan', async () => {
  236 |     const uniqueCode = `M${Date.now().toString().slice(-4)}`;
  237 |     const uniqueName = `Mobil Test ${Date.now()}`;
  238 | 
  239 |     await page.goto('https://demo-space.zahirerp.com/');
  240 |     await page.getByRole('button', { name: 'Data Master' }).click();
  241 |     await page.getByRole('link', { name: /Data Harta Tetap/ }).first().click();
  242 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  243 |     await page.waitForTimeout(1000);
  244 | 
> 245 |     await page.locator('.css-d7bazj').filter({ hasText: /^Pilih$/ }).first().click();
      |                                                                              ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  246 |     await page.locator('.MuiListItem-root').filter({ hasText: 'Kendaraan' }).click();
  247 | 
  248 |     await page.locator('[id="field-assets[0]code"]').fill(uniqueCode);
  249 |     await page.locator('[id="field-assets[0]name"]').fill(uniqueName);
  250 |     await page.locator('[id="field-assets[0]depreciation.acquired_value"]').fill('150000000');
  251 |     await page.locator('a, button').filter({ hasText: 'Simpan' }).first().click();
  252 | 
  253 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  254 |   });
  255 | 
  256 |   test('buat kode biaya baru berhasil tersimpan', async () => {
  257 |     const uniqueName = `Cost Code ${Date.now()}`;
  258 | 
  259 |     await page.goto('https://demo-space.zahirerp.com/');
  260 |     await page.getByRole('button', { name: 'Data Master' }).click();
  261 |     await page.getByRole('link', { name: 'Kode Biaya', exact: true }).click();
  262 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  263 | 
  264 |     await page.locator('#field-name').fill(uniqueName);
  265 |     await page.getByRole('button', { name: 'Simpan' }).click();
  266 | 
  267 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  268 |   });
  269 | 
  270 |   test('buat tipe produk baru berhasil tersimpan', async () => {
  271 |     const uniqueName = `Bahan Baku ${Date.now()}`;
  272 | 
  273 |     await page.goto('https://demo-space.zahirerp.com/');
  274 |     await page.getByRole('button', { name: 'Data Master' }).click();
  275 |     await page.getByRole('link', { name: 'Tipe Produk', exact: true }).click();
  276 |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  277 | 
  278 |     await page.locator('#field-name').fill(uniqueName);
  279 |     await page.getByRole('button', { name: 'Simpan' }).click();
  280 | 
  281 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  282 |   });
  283 | });
  284 | 
```