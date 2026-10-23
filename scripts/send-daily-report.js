// "일과 끝" 마지막 단계를 한 번에: 업무일지 확인 → 커밋 → GitHub에 올리기 → 카톡 전송 성공 확인
// 사용법: node scripts/send-daily-report.js 2026-10-23 "한 줄 요약"
// (구니 님이 쉬러 간 사이 승인 창에서 멈추지 않도록, 이 명령 하나만 허용해 두면 되게 만든 스크립트예요)
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const [date, summary = ''] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const run = (cmd) => execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();

function fail(message) {
  console.log(`RESULT: FAIL — ${message}`);
  process.exit(1);
}

(async () => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) fail('날짜를 YYYY-MM-DD로 주세요. 예: node scripts/send-daily-report.js 2026-10-23 "요약"');
  const rel = `업무일지/${date}.txt`;
  if (!fs.existsSync(path.join(ROOT, rel))) fail(`${rel} 파일이 없어요.`);

  // 1) 카톡 메시지 모양 미리 확인 (대괄호 제목이 깨졌으면 여기서 멈춰요)
  try {
    const preview = run(`node scripts/daily-report.js report "${rel}" --dry-run`);
    const count = (preview.match(/--- 메시지 /g) || []).length;
    if (count === 0) fail('카톡 메시지가 만들어지지 않았어요. 대괄호 제목을 확인해 주세요.');
    console.log(`미리보기: 카톡 메시지 ${count}개`);
  } catch (e) {
    fail(`미리보기 실패: ${e.stderr?.toString() || e.message}`);
  }

  // 2) 최신으로 받고, 업무일지 파일만 커밋
  try {
    run('git pull -q origin main');
  } catch (e) {
    fail(`git pull 실패: ${e.stderr?.toString() || e.message}`);
  }
  run(`git add "${rel}"`);
  const staged = run('git diff --cached --name-only');
  if (staged) {
    const msg = `업무일지: ${date}${summary ? ` (${summary})` : ''}`;
    const trailer = 'Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>';
    run(`git commit -q -m "${msg.replace(/"/g, "'")}" -m "${trailer}"`);
    console.log(`커밋: ${msg}`);
  } else {
    console.log('바뀐 내용 없음 (이미 커밋됨)');
  }

  // 3) GitHub에 올리기 (아직 안 올라간 커밋이 있을 때만)
  const ahead = run('git rev-list --count origin/main..HEAD');
  const sha = run('git rev-parse HEAD');
  if (ahead !== '0') {
    try {
      run('git push -q origin main');
      console.log(`올림: ${sha.slice(0, 7)}`);
    } catch (e) {
      fail(`git push 실패: ${e.stderr?.toString() || e.message}`);
    }
  } else {
    console.log(`이미 올라가 있음: ${sha.slice(0, 7)}`);
  }

  // 4) GitHub Actions "일과 끝 보고"가 카톡을 보냈는지 확인 (최대 15분)
  const deadline = Date.now() + 15 * 60 * 1000;
  while (Date.now() < deadline) {
    let runs = [];
    try {
      runs = JSON.parse(run('gh run list --workflow daily-report.yml --limit 5 --json status,conclusion,headSha,databaseId'));
    } catch {
      // gh가 잠깐 안 될 때는 다시 시도
    }
    const mine = runs.find((r) => r.headSha === sha);
    if (mine && mine.status === 'completed') {
      if (mine.conclusion === 'success') {
        console.log('RESULT: SUCCESS — 카톡 전송 성공');
        process.exit(0);
      }
      fail(`카톡 보내기 실패 (gh run view ${mine.databaseId} --log-failed 로 원인 확인)`);
    }
    await sleep(30000);
  }
  fail('15분 안에 카톡 보내기가 끝나지 않았어요. 나중에 gh run list --workflow daily-report.yml 로 확인해 주세요.');
})();
