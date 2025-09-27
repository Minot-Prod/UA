const fs = require("fs");

async function main() {
  const payload = {
    source: "github",
    repo: process.env.GITHUB_REPOSITORY,
    branch: process.env.GITHUB_REF_NAME,
    actor: process.env.GITHUB_ACTOR,
    event: process.env.GITHUB_EVENT_NAME,
    commit: {
      id: process.env.GITHUB_SHA,
      message: process.env.GITHUB_EVENT_HEAD_COMMIT_MESSAGE || "",
    },
    timestamp: new Date().toISOString(),
    files: [],
    stats: {
      total_changed: 0,
      whitelisted_count: 0,
    }
  };

  // Ecrit le payload dans un fichier
  fs.mkdirSync("artifacts", { recursive: true });
  fs.writeFileSync("artifacts/ua_knowledge_payload.json", JSON.stringify(payload, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
