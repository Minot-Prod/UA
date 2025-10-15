#!/usr/bin/env bash
# Commit des docs Sprint 3 dans le repo courant
set -euo pipefail
BRANCH="${1:-main}"
git add docs .github/ISSUE_TEMPLATE
git commit -m "chore(sprint3): add plan, blueprints, QA reports, issue template"
git push origin "$BRANCH"
echo "✅ Docs Sprint 3 poussés sur $BRANCH"
