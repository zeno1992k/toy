const { chromium } = require("playwright");

(async () => {
  const errors = [];
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:8766/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  await page.locator('[data-action="open-settings"]').first().click();
  await page.locator("#importFile").setInputFiles("data.json");
  await page.waitForTimeout(250);
  const imported = await page.evaluate(() => JSON.parse(localStorage.getItem("zeno-notion:state:v1")));
  if (imported.docs.length !== 16 || imported.trash.length !== 2) {
    throw new Error("원본 data.json을 정상적으로 가져오지 못했습니다.");
  }
  if (!imported.docs.every((document) => Number.isFinite(document.order))) {
    throw new Error("누락된 order 마이그레이션이 실패했습니다.");
  }

  await page.locator("#importFile").setInputFiles("tests/invalid.json");
  await page.waitForTimeout(250);
  const afterInvalid = await page.evaluate(() => JSON.parse(localStorage.getItem("zeno-notion:state:v1")));
  if (afterInvalid.docs.length !== 16) throw new Error("잘못된 Import가 기존 데이터를 손상했습니다.");
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ importedDocs: imported.docs.length, importedTrash: imported.trash.length, invalidImportPreservedState: true }, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
