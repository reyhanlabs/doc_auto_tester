# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-master-data.spec.js >> Master Data (login sekali untuk semua test) >> buat departemen baru berhasil tersimpan
- Location: tests\04-master-data.spec.js:141:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('BUGHUNT Departemen 1787031489213 Telah ditambahkan')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('BUGHUNT Departemen 1787031489213 Telah ditambahkan')

```

```yaml
- dialog "Ayo Berlangganan Sekarang!":
  - heading "Ayo Berlangganan Sekarang!" [level=2]:
    - heading "Ayo Berlangganan Sekarang!" [level=4]
  - text: Your company status is trial, please subscribe to create department.
  - button "Batal"
  - button "Berlangganan"
```

# Test source

```ts
  61  |     await page.waitForTimeout(1200);
  62  | 
  63  |     await page.locator('#field-name').fill(uniqueName);
  64  |     await page.locator('#field-email').fill('gotest.karyawan@gmail.com');
  65  |     await page.locator('#field-phone').fill('081300000003');
  66  |     await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck().catch(() => {});
  67  |     await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck().catch(() => {});
  68  |     await page.getByRole('checkbox', { name: 'Penjual' }).uncheck().catch(() => {});
  69  |     await page.getByRole('button', { name: 'Simpan' }).click();
  70  | 
  71  |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
  72  |   });
  73  | 
  74  |   test('buat salesman/penjual baru berhasil tersimpan', async () => {
  75  |     const uniqueName = `BUGHUNT Salesman ${Date.now()}`;
  76  |     await page.goto('https://go.zahirerp.com/');
  77  |     await page.locator('a, div, span, button').filter({ hasText: /^Data Master$/ }).first().click();
  78  |     await page.getByRole('link', { name: 'Data Kontak' }).first().click();
  79  |     await page.locator('a, button').filter({ hasText: 'Buat Baru' }).first().click();
  80  |     await page.waitForTimeout(1200);
  81  | 
  82  |     await page.locator('#field-name').fill(uniqueName);
  83  |     await page.locator('#field-email').fill('gotest.salesman@gmail.com');
  84  |     await page.locator('#field-phone').fill('081300000004');
  85  |     await page.getByRole('checkbox', { name: 'Pelanggan' }).uncheck().catch(() => {});
  86  |     await page.getByRole('checkbox', { name: 'Pemasok' }).uncheck().catch(() => {});
  87  |     await page.getByRole('checkbox', { name: 'Karyawan' }).uncheck().catch(() => {});
  88  |     await page.getByRole('button', { name: 'Simpan' }).click();
  89  | 
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
> 161 |     await expect(page.getByText(`${uniqueName} Telah ditambahkan`)).toBeVisible({ timeout: 10_000 });
      |                                                                     ^ Error: expect(locator).toBeVisible() failed
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
  190 |     await page.getByRole('button', { name: 'Simpan' }).click();
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
```