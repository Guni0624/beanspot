// Sends BeanSpot daily KakaoTalk messages based on 업무일지/YYYY-MM-DD.txt.
//   node scripts/daily-report.js report [file]  → 일과 끝 보고 (오늘 한 일 / 수정·새로 만든 것 / 내일 할 일)
//   node scripts/daily-report.js todo           → 평일 17시 "오늘 할 일" (가장 최근 이전 일지의 [내일 할 일])
//   add --dry-run to print messages instead of sending.
// Token source: KAKAO_REFRESH_TOKEN env (GitHub Actions) or .kakao-tokens.json (local).
// If Kakao rotates the refresh token, it is written to $NEW_REFRESH_TOKEN_FILE so the
// workflow can save it back to the repo secrets.
const fs = require("fs");
const path = require("path");
const { ROOT, TOKEN_FILE, loadEnv, refresh, sendToMe } = require("./kakao");

const JOURNAL_DIR = process.env.JOURNAL_DIR || path.join(ROOT, "업무일지"); // override for tests
const REPO_URL = "https://github.com/Guni0624/beanspot";
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// Today's date in KST as YYYY-MM-DD (Actions runners use UTC)
function todayKST() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function label(date) {
  const d = new Date(date + "T00:00:00Z");
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}(${WEEKDAYS[d.getUTCDay()]})`;
}

function journalFiles() {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter(f => /^\d{4}-\d{2}-\d{2}\.txt$/.test(f)).sort();
}

// Parse "[섹션 이름]" blocks; a block ends at the next header or a ---/=== rule
function parseSections(text) {
  const sections = {};
  let current = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const header = line.match(/^\[(.+)\]$/);
    if (header) { current = header[1].trim(); sections[current] = []; continue; }
    if (/^(-{3,}|={3,})/.test(line)) { current = null; continue; }
    if (current && line.trim()) sections[current].push(line.trim());
  }
  return sections;
}

// Split lines into chunks that fit Kakao's 200-char text limit
function chunk(title, lines, limit = 200) {
  const out = [];
  let buf = title;
  for (const line of lines.length ? lines : ["- (없음)"]) {
    const next = buf + "\n" + line;
    if (next.length > limit && buf !== title) { out.push(buf); buf = title + " (계속)\n" + line; }
    else buf = next;
  }
  out.push(buf.length > limit ? buf.slice(0, limit - 3) + "..." : buf);
  return out;
}

function fileUrl(file) {
  return `${REPO_URL}/blob/main/${encodeURIComponent("업무일지")}/${file}`;
}

function buildReport(file) {
  const date = file.replace(".txt", "");
  const s = parseSections(fs.readFileSync(path.join(JOURNAL_DIR, file), "utf8"));
  return [
    ...chunk(`📋 BeanSpot ${label(date)} 업무 보고\n\n✅ 오늘 한 일`, s["카톡: 오늘 한 일"] || []),
    ...chunk("🛠 수정한 것", s["카톡: 수정한 것"] || []),
    ...chunk("✨ 새로 만든 것", s["카톡: 새로 만든 것"] || []),
    ...chunk("📌 내일 할 일", s["내일 할 일"] || []),
  ];
}

function buildTodo() {
  const today = todayKST();
  // Use the most recent journal written before today; its [내일 할 일] is today's plan
  const prev = journalFiles().filter(f => f.replace(".txt", "") < today).pop();
  if (!prev) return { file: null, messages: [`☕ BeanSpot ${label(today)} 오늘 할 일\n\n등록된 할 일이 없어요. 오늘 작업 계획을 정해 주세요!`] };
  const s = parseSections(fs.readFileSync(path.join(JOURNAL_DIR, prev), "utf8"));
  return { file: prev, messages: chunk(`☕ BeanSpot ${label(today)} 오늘 할 일`, s["내일 할 일"] || []) };
}

async function getAccessToken() {
  const fromEnv = process.env.KAKAO_REFRESH_TOKEN;
  const local = !fromEnv && fs.existsSync(TOKEN_FILE) ? JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8")) : null;
  const current = fromEnv || (local && local.refresh_token);
  if (!current) throw new Error("KAKAO_REFRESH_TOKEN 또는 .kakao-tokens.json이 필요합니다.");

  const r = await refresh(current);
  if (r.rotated) {
    if (process.env.NEW_REFRESH_TOKEN_FILE) fs.writeFileSync(process.env.NEW_REFRESH_TOKEN_FILE, r.refreshToken);
    console.log("refresh token rotated");
  }
  if (local) {
    local.access_token = r.accessToken;
    local.refresh_token = r.refreshToken;
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(local, null, 2));
  }
  return r.accessToken;
}

(async () => {
  loadEnv();
  const [mode, fileArg] = process.argv.slice(2).filter(a => !a.startsWith("--"));
  const dryRun = process.argv.includes("--dry-run");

  let file, messages;
  if (mode === "report") {
    file = fileArg ? path.basename(fileArg) : journalFiles().pop();
    if (!file) throw new Error("업무일지 파일이 없습니다.");
    messages = buildReport(file);
  } else if (mode === "todo") {
    ({ file, messages } = buildTodo());
  } else {
    throw new Error("사용법: node scripts/daily-report.js <report|todo> [file] [--dry-run]");
  }

  const link = file ? fileUrl(file) : REPO_URL;
  if (dryRun) {
    messages.forEach((m, i) => console.log(`--- 메시지 ${i + 1} (${m.length}자) ---\n${m}\n`));
    console.log("링크:", link);
    return;
  }
  const token = await getAccessToken();
  for (const m of messages) await sendToMe(token, m, link, "업무일지 보기");
  console.log(`OK: ${messages.length}개 메시지 전송 (${file || "일지 없음"})`);
})().catch(e => { console.error("FAIL:", e.message); process.exit(1); });
