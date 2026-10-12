// One-time Kakao login: opens the consent page, captures the code on
// localhost:3000, saves tokens to .kakao-tokens.json, and sends a test message.
// Run: node scripts/kakao-auth.js
const http = require("http");
const fs = require("fs");
const { exec } = require("child_process");
const { TOKEN_FILE, REDIRECT_URI, loadEnv, exchangeCode, sendToMe } = require("./kakao");

loadEnv();
if (!process.env.KAKAO_REST_API_KEY) {
  console.error(".env에 KAKAO_REST_API_KEY가 없습니다.");
  process.exit(1);
}

const authUrl = "https://kauth.kakao.com/oauth/authorize?" + new URLSearchParams({
  client_id: process.env.KAKAO_REST_API_KEY,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope: "talk_message",
  prompt: "login", // always show the account login so the right KakaoTalk account can be chosen
});

const page = (msg) => `<!doctype html><meta charset="utf-8"><body style="font-family:sans-serif;padding:40px"><h2>${msg}</h2><p>이 창은 닫아도 됩니다.</p>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3000");
  if (url.pathname !== "/callback") { res.writeHead(404); return res.end(); }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error_description") || url.searchParams.get("error");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  try {
    if (!code) throw new Error("동의가 취소되었거나 실패했습니다: " + error);
    const t = await exchangeCode(code);
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({
      access_token: t.access_token,
      refresh_token: t.refresh_token,
      refresh_token_expires_at: new Date(Date.now() + t.refresh_token_expires_in * 1000).toISOString(),
    }, null, 2));
    // The token response doesn't always list scopes, so verify consent by actually sending
    try {
      await sendToMe(t.access_token, "☕ BeanSpot 알림 연결 완료!\n앞으로 이 채팅방으로 업무 보고와 할 일 알림이 옵니다.");
    } catch (e) {
      if (e.message.includes("-402")) throw new Error("'카카오톡 메시지 전송' 동의가 빠졌습니다. 다시 실행해서 동의 화면에서 체크해 주세요.");
      if (e.message.includes("-501")) throw new Error("로그인한 카카오 계정이 카카오톡과 연결되어 있지 않습니다. 휴대폰 카카오톡에 쓰는 계정으로 다시 로그인해 주세요.");
      throw e;
    }
    res.end(page("✅ 연결 완료! 카카오톡 '나와의 채팅'을 확인하세요."));
    console.log("OK: 토큰 저장 완료, 테스트 메시지 전송 성공");
    console.log("refresh_token 만료:", new Date(Date.now() + t.refresh_token_expires_in * 1000).toISOString());
  } catch (e) {
    res.end(page("❌ 실패: " + e.message));
    console.error("FAIL:", e.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(3000, () => {
  console.log("브라우저에서 카카오 로그인/동의를 진행하세요. (5분 대기)");
  exec(`start "" "${authUrl}"`);
});
setTimeout(() => { console.error("FAIL: 5분 안에 로그인이 완료되지 않았습니다."); process.exit(1); }, 5 * 60 * 1000).unref();
