#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function sh(cmd) {
  try { return execSync(cmd, { stdio: ["pipe", "pipe", "inherit"] }).toString().trim(); }
  catch { return ""; }
}

const REPO   = process.env.GITHUB_REPO || process.env.GITHUB_REPOSITORY || "";
const BRANCH = process.env.GITHUB_REF_NAME || sh("git rev-parse --abbrev-ref HEAD");
const ACTOR  = process.env.GITHUB_ACTOR || "";
const EVENT  = process.env.GITHUB_EVENT_NAME || "push";
const AFTER  = process.env.AFTER_SHA || process.env.GITHUB_SHA || sh("git rev-parse HEAD");
let BEFORE   = process.env.BEFORE_SHA;

// fallback pour premier commit / PR opened
if (!BEFORE || BEFORE === "0000000000000000000000000000000000000000") {
  const prev = sh("git rev-parse HEAD~1");
  BEFORE = prev || AFTER;
}

// message du commit
const commitMsg = sh(`git log -1 --pretty=%s ${AFTER}`);

// fichiers modifiés
const nameStatus = sh(`git diff --name-status ${BEFORE} ${AFTER}`)
  .split("\n").filter(Boolean);

const WL = new Set([".md", ".yml", ".yaml", ".json", ".sh", ".ps1", ".ts", ".js"]);
const files = nameStatus.map(line => {
  const [status, ...rest] = line.split(/\s+/);
  const p = rest.join(" ");
  const ext = path.extname(p).toLowerCase();
  const whitelisted = WL.has(ext);
  let base64 = null, diff = "";
  if (whitelisted) {
    try { base64 = fs.readFileSync(p).toString("base64"); } catch {}
    diff = sh(`git diff --unified=2 ${BEFORE} ${AFTER} -- "${p}"`);
    if (diff && diff.length > 8000) diff = diff.slice(0, 8000) + "\n...[truncated]";
  }
  return { status, path: p, whitelisted, base64, diff };
});

const payload = {
  source: "github",
  repo: REPO,
  branch: BRANCH,
  actor: ACTOR,
  event: EVENT,
  commit: { id: AFTER, message: commitMsg },
  timestamp: new Date().toISOString(),
  files,
  stats: { total_changed: files.length, whitelisted_count: files.filter(f => f.whitelisted).length }
};

fs.mkdirSync("artifacts", { recursive: true });
fs.writeFileSync("artifacts/ua_knowledge_payload.json", JSON.stringify(payload, null, 2));
console.log("✅ Wrote artifacts/ua_knowledge_payload.json");
