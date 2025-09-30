#!/usr/bin/env bash
# Usage:
#   export GITHUB_TOKEN=ghp_xxx
#   export OWNER=you
#   export REPO=yourrepo
#   ./dispatch_brainstorm.sh payload.md "optional note"
set -euo pipefail
FILE="${1:-}"
NOTE="${2:-}"
if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
  echo "Provide a markdown file to dispatch, e.g. payload.md"
  exit 1
fi
: "${GITHUB_TOKEN:?Set GITHUB_TOKEN}"
: "${OWNER:?Set OWNER}"
: "${REPO:?Set REPO}"

CONTENT=$(python - <<'PY'
import sys, json
p = sys.argv[1]
with open(p,'r') as f:
  print(json.dumps(f.read()))
PY
"$FILE")

curl -s -X POST   -H "Accept: application/vnd.github+json"   -H "Authorization: Bearer ${GITHUB_TOKEN}"   https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/brainstorms_sync.yml/dispatches   -d "{"ref":"main","inputs":{"mode":"append","note":${NOTE:+"$NOTE"},"content":$CONTENT}}"
echo "Workflow dispatched."
