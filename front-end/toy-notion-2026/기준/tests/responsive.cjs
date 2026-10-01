const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:8766/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(350);
  const collapsed = await page.locator("#sidebar").evaluate((element) => element.getBoundingClientRect().width);
  if (collapsed > 1) throw new Error(`모바일 초기 사이드바가 접히지 않았습니다: ${collapsed}`);
  if (!(await page.locator("#menuBtn").isVisible())) throw new Error("모바일 메뉴 버튼이 보이지 않습니다.");
  await page.locator("#menuBtn").click();
  await page.waitForTimeout(350);
  const opened = await page.locator("#sidebar").evaluate((element) => element.getBoundingClientRect().width);
  if (opened < 220) throw new Error(`모바일 사이드바가 열리지 않았습니다: ${opened}`);
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify({ viewport: "390x844", collapsed, opened, errors }, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
