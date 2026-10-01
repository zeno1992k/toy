const { chromium } = require("playwright");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

(async () => {
  const errors = [];
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:8766/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector(".tree-row");

  assert(await page.locator("#sidebar").isVisible(), "사이드바가 보이지 않습니다.");
  assert(await page.locator("#toolbar").isVisible(), "편집 툴바가 보이지 않습니다.");
  assert((await page.title()).startsWith("Zeno Notion"), "문서 제목에 Zeno Notion 브랜드가 없습니다.");
  assert(await page.locator(".brand-box img").evaluate((image) => image.complete && image.naturalWidth === 512), "Zeno 로고가 로드되지 않았습니다.");
  assert((await page.locator("html").evaluate((element) => getComputedStyle(element).getPropertyValue("--brand").trim())) === "#4913ec", "Zeno 브랜드 컬러 토큰이 다릅니다.");
  assert((await page.locator("#titleInput").inputValue()) === "Welcome to Zeno Notion", "초기 Zeno Notion 문서가 열리지 않았습니다.");

  await page.locator('.tree-row[data-id="welcome"] button[title="Add child"]').click();
  await page.waitForTimeout(100);
  const childId = await page.locator(".tree-row.active").getAttribute("data-id");
  assert(Boolean(childId && childId !== "welcome"), "하위 페이지가 선택되지 않았습니다.");
  assert(await page.locator(`.tree-row[data-id="${childId}"]`).isVisible(), "생성한 하위 페이지가 트리에 표시되지 않았습니다.");

  await page.locator("#editor").fill("빠른 전환 직전 저장 테스트");
  await page.locator('.tree-row[data-id="guides"]').click();
  await page.waitForTimeout(500);
  const savedChildContent = await page.evaluate((id) => {
    const state = JSON.parse(localStorage.getItem("zeno-notion:state:v1"));
    return state.docs.find((document) => document.id === id)?.content;
  }, childId);
  assert(savedChildContent.includes("빠른 전환 직전 저장 테스트"), "페이지 전환 직전 편집 내용이 저장되지 않았습니다.");

  await page.locator('[data-action="open-search"]').first().click();
  assert((await page.locator("#searchOverlay").evaluate((element) => getComputedStyle(element).display)) === "grid", "검색 Overlay가 열리지 않았습니다.");
  await page.locator("#searchInput").fill("Zeno Notion");
  await page.locator("#searchInput").press("ArrowDown");
  await page.locator("#searchInput").press("Enter");
  await page.waitForTimeout(100);
  assert((await page.locator("#titleInput").inputValue()) === "Welcome to Zeno Notion", "검색 결과로 이동하지 못했습니다.");

  await page.locator("#iconBtn").click();
  await page.locator("#emojiGrid button").filter({ hasText: "📘" }).first().click();
  await page.locator('.tree-row[data-id="guides"]').click();
  await page.locator('.tree-row[data-id="welcome"]').click();
  await page.waitForTimeout(100);
  assert((await page.locator("#iconBtn").textContent()).trim() === "📘", "문서 이동 후 Emoji가 동기화되지 않았습니다.");

  await page.locator("#openFavoritesModal").click();
  assert((await page.locator("#favoritesOverlay").evaluate((element) => getComputedStyle(element).display)) === "grid", "즐겨찾기 Overlay가 열리지 않았습니다.");
  await page.locator("#favoritesClose").click();
  await page.locator('[data-action="open-settings"]').first().click();
  await page.locator("#themeToggle").check();
  assert((await page.locator("html").getAttribute("data-theme")) === "light", "라이트 테마가 적용되지 않았습니다.");
  assert((await page.locator("#themeColorMeta").getAttribute("content")) === "#f7f5fc", "브라우저 테마 색상이 라이트 테마와 동기화되지 않았습니다.");
  await page.locator("#settingsClose").click();

  await page.locator("#actionAddPage").click();
  await page.waitForTimeout(100);
  assert((await page.locator("#titleInput").inputValue()) === "Untitled", "루트 페이지가 생성되지 않았습니다.");

  await page.screenshot({ path: "smoke.png", fullPage: true });
  const result = {
    treeRows: await page.locator(".tree-row").count(),
    activeTitle: await page.locator("#titleInput").inputValue(),
    theme: await page.locator("html").getAttribute("data-theme"),
    errors,
  };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
