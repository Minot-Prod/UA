#!/usr/bin/env bash
set -euo pipefail

# Arguments (optional): target repo path
TARGET="${1:-./parlios}"

echo ">>> Applying WebCreationTeam patch to $TARGET"

mkdir -p "$TARGET/modules" "$TARGET/manifests" "$TARGET/config"

cp -v "./modules/WebCreationTeam.json" "$TARGET/modules/WebCreationTeam.json"

# If AGENT_UltimateAgent.manifest.json does not exist, install example
if [ ! -f "$TARGET/manifests/AGENT_UltimateAgent.manifest.json" ]; then
  cp -v "./manifests/AGENT_UltimateAgent.manifest.json" "$TARGET/manifests/AGENT_UltimateAgent.manifest.json"
  echo "Installed example manifest (did not find existing one)."
else
  echo "NOTE: Existing manifest found. Please add the following module entry to its 'modules' array:"
  cat <<'JSON'
  {
    "id": "module.webcreationteam",
    "name": "Web Creation Team",
    "path": "./modules/WebCreationTeam.json",
    "enabled": true,
    "router": "agent.coordinator"
  }
JSON
fi

# Optional registries/config
cp -v "./manifests/Parlios.Modules.json" "$TARGET/manifests/Parlios.Modules.json" || true
cp -v "./config/WebCreation.router.json" "$TARGET/config/WebCreation.router.json"

echo ">>> Patch applied. Next:"
echo "1) Commit & push your repo."
echo "2) Run a dry run: create_website_brief (brief e-commerce bougies artisanales)."
echo "3) Verify pack contract outputs and QA report."