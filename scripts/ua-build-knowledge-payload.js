#!/usr/bin/env node
/**
 * Construit un payload JSON pour n8n à partir du repo courant :
 * - métadonnées du run/commit
 * - liste des fichiers modifiés (status)
 * - extrait de diff (tronqué)
 * - contenus (base64) des fichiers whitelistes
 * Écrit: artifacts/ua_knowledge_payload.json
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function sh(cmd) {
  return execSync(cmd, { stdio: ["pipe", "pipe", "inherit"] }).toString().trim();
}

// --- Contexte GitHub Actions / Git local ---
const REPO  = process.env.GITHUB_REPOSITORY || "";
const BRANCH = process.env.GITHUB_REF_NAME || sh("git rev-parse --abbrev-ref HEAD");
const ACTOR  = process.env.GITHUB_ACTOR || "";
const EVENT  = process.env.GITHUB_EVENT_NAME || "push";
const AFTER  = process.env.GITHUB_SHA || sh("git rev-parse HEAD");
const BEFORE_ENV = process.env.BEFORE_SHA;
let BEFORE = BEFORE_ENV;

// Déterminer le range de diff
if (!BEFORE || BEFORE === "0000000000000000000000000000000000000000") {
  try { BEFORE = sh("git rev-parse HEAD~1"); }
  catch { BEFORE = AFTER; } // premier commit
}

// Infos commit
function safeLogMsg(sha) {
  try { return sh(`git log -1 --pretty=%s ${sha}`); }
  catch { return ""; }
}
const commitMessage = safeLogMsg(AFTER);

// Fichiers modifiés
const nameStatus = sh(`git diff --name-status ${BEFORE} ${AFTER}`).split("\n").filter(Boolean);
const changes = nameStatus.map(line => {
  const [status, ...rest] = line.split(/\s+/);
  return { status, path: rest.join(" ") };
});

// Whitelist d’extensions
const WL = new Set([".md", ".yml", ".yaml", ".json", ".sh", ".ps1", ".ts", ".js"]);
const files = changes.map(({ status, path: p }) => {
  const ext = path.extname(p).toLowerCase();
  const whitelisted = WL.has(ext);
  let base64 = null, diff = "";
  if (whitelisted) {
    try { base64 = fs.readFileSync(p).toString("base64"); } catch {}
    try { diff = sh(`git diff --unified=2 ${BEFORE} ${AFTER} -- "${p}"`); } catch {}
    if (diff.length > 8000) diff = diff.slice(0, 8000) + "\n...[truncated]";
  }
  return { status, path: p, whitelisted, base64, diff };
});

// Payload
const payload = {
  source: "github",
  repo: REPO,
  branch: BRANCH,
  actor: ACTOR,
  event: EVENT,
  commit: { id: AFTER, message: commitMessage },
  timestamp: new Date().toISOString(),
  files,
  stats: { total_changed: files.length, whitelisted_count: files.filter(f => f.whitelisted).length }
};

// Écriture
fs.mkdirSync("artifacts", { recursive: true });
fs.writeFileSync("artifacts/ua_knowledge_payload.json", JSON.stringify(payload, null, 2));
console.log("✅ Wrote artifacts/ua_knowledge_payload.json");
