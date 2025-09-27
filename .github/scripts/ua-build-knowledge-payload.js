#!/usr/bin/env node
/**
 * Construit un payload JSON prêt à poster vers n8n:
 * - métadonnées commit/PR
 * - liste des fichiers modifiés (status)
 * - contenu des fichiers whitelisted (base64)
 * - extrait diff contextuel (added/removed)
 * Sortie: ./artifacts/ua_knowledge_payload.json
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Prépare dossier artifacts
fs.mkdirSync("./artifacts", { recursive: true });

const BEFORE = process.env.BEFORE_SHA || "";
const AFTER = process.env.AFTER_SHA || execSync("git rev-parse HEAD").toString().trim();
const REPO = process.env.GITHUB_REPO || "";
const BRANCH = process.env.GITHUB_REF_NAME || "";
const ACTOR = process.env.GITHUB_ACTOR || "";
const EVENT = process.env.GITHUB_EVENT_NAME || "";

function sh(cmd) {
  return execSync(cmd, { stdio: ["pipe", "pipe", "inherit"] }).toString();
}

// Détermine liste fichiers modifiés entre BEFORE et AFTER (si BEFORE absent: dernier commit seulement)
let diffRange = "";
if (BEFORE && BEFORE !== "0000000000000000000000000000000000000000") {
  diffRange = `${BEFORE} ${AFTER}`;
} else {
  // Cas PR opened ou 1er commit: fallback sur HEAD~1..HEAD si dispo
  try {
    diffRange = `${sh("git rev-parse HEAD~1").trim()} ${AFTER}`;
  } catch {
    diffRange = `${AFTER} ${AFTER}`;
  }
}

const raw = sh(`git diff --name-status ${diffRange}`).split("\n").filter(Boolean);
const changes = raw.map(line => {
  const [status, ...rest] = line.trim().split(/\s+/);
  const file = rest.join(" ");
  return { status, file };
});

// Whitelist extensions (ajoute ce que tu veux suivre)
const exts = new Set([".md", ".yml", ".yaml", ".json", ".sh", ".ps1", ".ts", ".js"]);
function isWhitelisted(file) {
  const ext = path.extname(file).toLowerCase();
  return exts.has(ext);
}

// Récupère contenu base64 + diff contextuel (--unified=2)
function fileContentBase64(file) {
  try {
    const data = fs.readFileSync(file);
    return data.toString("base64");
  } catch {
    return null;
  }
}
function fileDiff(file) {
  try {
    return sh(`git diff --unified=2 ${diffRange} -- "${file}"`);
  } catch {
    return "";
  }
}

// Construit objets de fichier
const files = changes.map(({ status, file }) => {
  const item = { status, path: file, whitelisted: isWhitelisted(file) };
  if (item.whitelisted) {
    item.base64 = fileContentBase64(file);
    item.diff = fileDiff(file);
  }
  return item;
});

// Récup info commit
const commitMsg = sh(`git log -1 --pretty=format:%s ${AFTER}`).trim();
const commitId = AFTER;

// Payload final
const payload = {
  source: "github",
  repo: REPO,
  branch: BRANCH,
  actor: ACTOR,
  event: EVENT,
  commit: {
    id: commitId,
    message: commitMsg,
  },
  timestamp: new Date().toISOString(),
  files,
  stats: {
    total_changed: files.length,
    whitelisted_count: files.filter(f => f.whitelisted).length,
  }
};

fs.writeFileSync("./artifacts/ua_knowledge_payload.json", JSON.stringify(payload, null, 2));
console.log("Wrote artifacts/ua_knowledge_payload.json");
