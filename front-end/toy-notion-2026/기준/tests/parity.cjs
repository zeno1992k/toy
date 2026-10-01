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
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const stored = () => page.evaluate(() => JSON.parse(localStorage.getItem("zeno-notion:state:v1")));

  await page.goto("http://127.0.0.1:8766/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector('.tree-row[data-id="guides"]');

  // Tree expand + inline rename
  await page.locator('.tree-row[data-id="guides"] .caret').click();
  assert(await page.locator('.tree-row[data-id="setup"]').isVisible(), "트리 펼치기가 동작하지 않습니다.");
  await page.locator('.tree-row[data-id="setup"] .label').dblclick();
  await page.locator(".label-edit").fill("Setup Renamed");
  await page.locator(".label-edit").press("Enter");
  assert((await stored()).docs.find((item) => item.id === "setup").title === "Setup Renamed", "인라인 이름 변경이 저장되지 않았습니다.");

  // More dropdown + favorite
  await page.locator('.tree-row[data-id="setup"] button[title="More"]').click();
  await page.getByText("Add to favorites", { exact: true }).click();
  assert((await stored()).docs.find((item) => item.id === "setup").starred, "더보기 메뉴의 즐겨찾기가 동작하지 않습니다.");

  // Selection/Range formatting
  await page.locator('.tree-row[data-id="setup"] .label').click();
  await page.locator("#editor").evaluate((editor) => {
    editor.innerHTML = "<p>format me</p>";
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(editor.querySelector("p"));
    selection.removeAllRanges();
    selection.addRange(range);
  });
  await page.locator('#toolbar button[data-cmd="bold"]').click();
  assert((await page.locator("#editor").innerHTML()).includes("<strong>"), "굵게 서식이 적용되지 않았습니다.");

  // Drag setup inside Welcome
  await page.locator('.tree-row[data-id="setup"]').dragTo(page.locator('.tree-row[data-id="welcome"]'));
  await page.waitForTimeout(100);
  assert((await stored()).docs.find((item) => item.id === "setup").parentId === "welcome", "문서 Drag and Drop 이동이 저장되지 않았습니다.");

  // Archive Guides through source-compatible dropdown and confirm
  await page.locator('.tree-row[data-id="guides"] button[title="More"]').click();
  await page.getByText("Delete (move to trash)", { exact: true }).click();
  await page.locator("#modalConfirm").click();
  let state = await stored();
  assert(!state.docs.some((item) => item.id === "guides"), "문서가 휴지통으로 이동하지 않았습니다.");
  assert(state.trash.some((item) => item.id === "guides"), "휴지통 데이터가 저장되지 않았습니다.");

  // Trash restore
  await page.locator("#trashTrigger").click();
  const guideTrashRow = page.locator("#trashList .trash-row").filter({ hasText: "Guides" });
  await guideTrashRow.locator('button[title="Restore"]').click();
  state = await stored();
  assert(state.docs.some((item) => item.id === "guides"), "휴지통 복원이 동작하지 않았습니다.");

  // Sidebar collapse + peek reopen
  await page.locator("#collapseBtn").click();
  await page.waitForTimeout(350);
  assert(await page.locator("#sidebarPeekBtn").isVisible(), "접힌 상태에서 Peek 버튼이 보이지 않습니다.");
  await page.locator("#sidebarPeekBtn").click();
  await page.waitForTimeout(350);
  const reopenedSidebar = await page.locator("#sidebar").evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    className: element.className,
    cssVariable: getComputedStyle(document.documentElement).getPropertyValue("--sidebar-w"),
  }));
  console.log("reopenedSidebar", reopenedSidebar);
  assert(reopenedSidebar.width >= 220, "Peek 버튼으로 사이드바를 열지 못했습니다.");

  // Keyboard shortcut creates subpage; F2 starts rename
  await page.locator('.tree-row[data-id="welcome"] .label').click();
  await page.waitForTimeout(300);
  await page.keyboard.press("Control+Alt+N");
  await page.waitForTimeout(100);
  const activeId = await page.locator(".tree-row.active").getAttribute("data-id");
  assert((await stored()).docs.find((item) => item.id === activeId).parentId === "welcome", "새 하위 문서 단축키가 동작하지 않았습니다.");
  await page.keyboard.press("F2");
  assert(await page.locator(".label-edit").isVisible(), "F2 이름 변경이 동작하지 않았습니다.");
  await page.locator(".label-edit").press("Escape");

  console.log(JSON.stringify({ checks: 10, errors }, null, 2));
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
