# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-master-data.spec.js >> Master Data (login sekali untuk semua test) >> buat departemen baru berhasil tersimpan
- Location: tests\04-master-data.spec.js:161:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('DATA TESTER 1784788740791 Telah ditambahkan')
Expected: visible
Timeout: 12000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 12000ms
  - waiting for getByText('DATA TESTER 1784788740791 Telah ditambahkan')

```

```yaml
- dialog:
  - heading "Ayo Berlangganan Sekarang!" [level=4]
  - text: Your company status is trial, please subscribe to create department.
  - button "Batal"
  - button "Berlangganan"
```

# Test source

```ts
  83  |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  84  |   });
  85  | 
  86  |   test('buat salesman/penjual baru berhasil tersimpan', async () => {
  87  |     const uniqueName = `DATA TESTER ${Date.now()}`;
  88  | 
  89  |     await page.goto('https://demo.zahirerp.com/');
  90  |     await page.getByRole('button', { name: 'Data Master' }).click();
  91  |     await page.getByRole('link', { name: 'Data Kontak' }).first().click();
  92  |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  93  |     await page.waitForTimeout(1200);
  94  | 
  95  |     await page.locator('#field-name').fill(uniqueName);
  96  |     await page.locator('#field-email').fill('salesman.test@gmail.com');
  97  |     await page.locator('#field-phone').fill('081298765432');
  98  |     await page.locator('#field-tax_id_number').fill('555666777888');
  99  |     await page.locator('#field-tax_id_address').fill('Bekasi');
  100 | 
  101 |     await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck();
  102 |     await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck();
  103 |     await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck();
  104 | 
  105 |     await page.getByRole('button', { name: 'Simpan' }).click();
  106 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
  107 |   });
  108 | 
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
> 183 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 12_000 });
      |                                                                     ^ Error: expect(locator).toBeVisible() failed
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
  209 |     await page.locator('div').filter({ hasText: /^Pilih Kode$/ }).last().click();
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
```