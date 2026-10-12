// Kakao "나에게 보내기" helpers (no dependencies, Node 18+).
// Credentials come from process.env or the project .env file.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TOKEN_FILE = path.join(ROOT, ".kakao-tokens.json");
const REDIRECT_URI = "http://localhost:3000/callback";

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

async function postForm(url, params, accessToken) {
  const headers = { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const res = await fetch(url, { method: "POST", headers, body: new URLSearchParams(params) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Kakao ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

function clientParams() {
  const p = { client_id: process.env.KAKAO_REST_API_KEY };
  if (process.env.KAKAO_CLIENT_SECRET) p.client_secret = process.env.KAKAO_CLIENT_SECRET;
  return p;
}

// Exchange the one-time authorization code for access/refresh tokens
async function exchangeCode(code) {
  return postForm("https://kauth.kakao.com/oauth/token", {
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code,
    ...clientParams(),
  });
}

// Get a fresh access token. Kakao only returns a new refresh_token when the
// current one has less than a month left, so keep the old one otherwise.
async function refresh(refreshToken) {
  const r = await postForm("https://kauth.kakao.com/oauth/token", {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    ...clientParams(),
  });
  return { accessToken: r.access_token, refreshToken: r.refresh_token || refreshToken, rotated: !!r.refresh_token };
}

// Send a text message to the user's own KakaoTalk ("나와의 채팅").
// Kakao limits text templates to 200 characters.
async function sendToMe(accessToken, text, linkUrl = "https://github.com/Guni0624/beanspot", buttonTitle = "자세히 보기") {
  if (text.length > 200) text = text.slice(0, 197) + "...";
  const template = {
    object_type: "text",
    text,
    link: { web_url: linkUrl, mobile_web_url: linkUrl },
    button_title: buttonTitle,
  };
  return postForm("https://kapi.kakao.com/v2/api/talk/memo/default/send",
    { template_object: JSON.stringify(template) }, accessToken);
}

module.exports = { ROOT, TOKEN_FILE, REDIRECT_URI, loadEnv, exchangeCode, refresh, sendToMe };
