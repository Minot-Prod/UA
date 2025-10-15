#!/usr/bin/env bash
# Usage: GH_OWNER=Minot-Prod GH_REPO=Parlios-Public ./scripts/create_sprint3_issue.sh
set -euo pipefail
: "${GH_OWNER:?Missing GH_OWNER}"
: "${GH_REPO:?Missing GH_REPO}"
TITLE="Sprint 3 — Growth Suite"
BODY_FILE="docs/SPRINT3_PLAN.md"
EXTRA_BODY=".github/ISSUE_TEMPLATE/sprint3_growth_suite.md"
if [ -f "$EXTRA_BODY" ]; then BODY_FILE="$EXTRA_BODY"; fi
gh issue create -R "$GH_OWNER/$GH_REPO" -t "$TITLE" -F "$BODY_FILE" -l "sprint3,planning,base44"
echo "✅ Issue créée: $TITLE"
