#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

const TEMPLATES = {
  "landing:shadcn": {
    repo: "https://github.com/nobruf/shadcn-landing-page.git",
    path: "."
  },
  "landing:tailnext": {
    repo: "https://github.com/arthelokyo/tailnext.git",
    path: "."
  },
  "saas:starter": {
    repo: "https://github.com/vercel/next-js-saas-starter.git",
    path: "."
  },
  "ai:chatbot": {
    repo: "https://github.com/vercel/ai-chatbot.git",
    note: "Si le repo alias change, utiliser la page template Vercel.",
    path: "."
  },
  "commerce:next": {
    repo: "https://github.com/vercel/commerce.git",
    path: "."
  },
  "commerce:medusa": {
    repo: "https://github.com/medusajs/nextjs-starter-medusa.git",
    path: "."
  }
};

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: "inherit", ...opts });
}

function usage() {
  console.log(`Usage:
  pnpm scaffold <templateKey> <appName>

Templates:
  ${Object.keys(TEMPLATES).join("\n  ")}
`);
  process.exit(1);
}

const [, , tplKey, appName] = process.argv;
if (!tplKey || !appName || !TEMPLATES[tplKey]) usage();

const root = process.cwd();
const appsDir = path.join(root, "apps");
if (!existsSync(appsDir)) mkdirSync(appsDir, { recursive: true });

const target = path.join(appsDir, appName);
if (existsSync(target)) {
  console.error(`❌ Dossier déjà existant: ${target}`);
  process.exit(2);
}
mkdirSync(target);

const { repo } = TEMPLATES[tplKey];
console.log(`➡️  Clonage ${tplKey} depuis ${repo}…`);
run(`git clone --depth 1 ${repo} "${target}"`);

process.chdir(target);

// Nettoyage: retirer .git, ajuster package.json name, ajouter netlify.toml
try { run("rm -rf .git"); } catch {}

try {
  const pkgPath = path.join(target, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    pkg.name = appName;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
} catch {}

const netlifyToml = `[build]
command = "pnpm install --frozen-lockfile && pnpm build"
publish = ".next"

[[plugins]]
package = "@netlify/plugin-nextjs"
`;
writeFileSync(path.join(target, "netlify.toml"), netlifyToml);

console.log("➡️  Init Git…");
run("git init && git add . && git commit -m \"init: scaffold from template\"");

console.log(`✅ Fini. App créée: apps/${appName}
Prochaines étapes:
  cd apps/${appName}
  pnpm install
  pnpm dev
`);