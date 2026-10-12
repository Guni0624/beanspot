// BeanSpot web prototype end-to-end test.
// Opens index.html in headless Edge/Chrome, clicks through the main flows,
// and exits with code 1 if any check fails or the page throws.
// Run: npm test
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const INDEX = path.resolve(__dirname, "..", "index.html");
const BROWSERS = [
  process.env.BROWSER_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok, detail });

(async () => {
  const executablePath = BROWSERS.find(p => fs.existsSync(p));
  if (!executablePath) throw new Error("Edge/Chrome를 찾을 수 없습니다. BROWSER_PATH 환경변수로 지정하세요.");

  const browser = await puppeteer.launch({ executablePath, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  const pageErrors = [];
  const dialogs = [];
  page.on("pageerror", e => pageErrors.push(e.message));
  page.on("console", m => { if (m.type() === "error") pageErrors.push("console: " + m.text()); });
  page.on("dialog", async d => { dialogs.push(d.message()); await d.accept(); });

  await page.goto(pathToFileURL(INDEX).href, { waitUntil: "networkidle0" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle0" });

  const visiblePins = () => page.$$eval(".map-pin", ps => ps.filter(p => p.style.display !== "none").map(p => p.dataset.id));
  const click = sel => page.$eval(sel, el => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));

  // Initial load
  check("초기 핀 4개", (await visiblePins()).length === 4, JSON.stringify(await visiblePins()));
  check("lucide 아이콘 로드", await page.evaluate(() => typeof lucide !== "undefined"));

  // Search + tag filter combined
  await page.type("#map-search-input", "랩");
  check("검색 '랩' → 1개", (await visiblePins()).length === 1, JSON.stringify(await visiblePins()));
  await click('.chip[data-tag="산미"]');
  const afterChip = await visiblePins();
  check("검색 유지한 채 '산미' 태그 → 여전히 1개", afterChip.length === 1 && afterChip[0] === "aroma-lab", JSON.stringify(afterChip));
  await click('.chip[data-tag="산미"]');
  await click("#clear-search");
  check("검색 지우기 → 4개 복귀", (await visiblePins()).length === 4);

  // Review: star selection, rating math, XSS escaping
  await click('.map-pin[data-id="beanspot-coffee"]');
  const before = await page.$eval("#detail-rating-text", e => e.textContent);
  check("상세 진입 평점", before === "4.8 (128개 리뷰)", before);
  await click("#open-write-review-btn");
  await (await page.$('.write-star[data-value="1"]')).click(); // real mouse click
  check("별점 클릭 반영", (await page.$$eval(".write-star.filled", es => es.length)) === 1);
  const payload = '<img src=x onerror="window.__xss=1">악성테스트';
  await page.type("#review-text-input", payload);
  await click("#submit-review-btn");
  const after = await page.$eval("#detail-rating-text", e => e.textContent);
  check("1점 리뷰 후 평점 4.8 유지, 129개", after === "4.8 (129개 리뷰)", after);
  check("리뷰 XSS 미실행", await page.evaluate(() => window.__xss === undefined));
  const reviewTexts = await page.$$eval(".review-card .review-text", es => es.map(e => e.textContent));
  check("리뷰 본문 글자 그대로 표시", reviewTexts.includes(payload));

  // Owner notice XSS
  await click('.tab-item[data-target="screen-owner"]');
  await page.type("#owner-notice-input", '<svg onload="window.__xss2=1"></svg>공지테스트');
  await click("#owner-notice-submit-btn");
  check("공지 XSS 미실행", await page.evaluate(() => window.__xss2 === undefined));

  // Persistence after reload
  await page.reload({ waitUntil: "networkidle0" });
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("beanspot_cafes")).find(c => c.id === "beanspot-coffee"));
  check("새로고침 후 저장 유지", saved.reviewCount === 129 && saved.rating === 4.8, `${saved.rating} / ${saved.reviewCount}`);

  // My Spot -> detail -> back
  await click('.tab-item[data-target="screen-my-spot"]');
  await click(".my-spot-card");
  await click("#detail-back-btn");
  const active = await page.$eval(".app-screen.active", e => e.id);
  check("내스팟→상세→뒤로가기 시 내스팟 복귀", active === "screen-my-spot", "현재 화면: " + active);

  await page.screenshot({ path: path.join(__dirname, "screenshot.png") });
  await browser.close();

  check("페이지 스크립트 오류 없음", pageErrors.length === 0, pageErrors.join(" | "));

  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? "  — " + r.detail : ""}`);
  if (dialogs.length) console.log("알림창:", dialogs);
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error("TEST CRASH", e); process.exit(1); });
