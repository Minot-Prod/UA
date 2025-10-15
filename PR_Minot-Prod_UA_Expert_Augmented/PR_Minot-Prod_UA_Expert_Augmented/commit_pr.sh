
#!/usr/bin/env bash
set -euo pipefail
BRANCH="${1:-feat/expert-augmented-uas-v2}"
echo "Creating branch $BRANCH"
git checkout -b "$BRANCH"
rsync -av --exclude 'commit_pr.*' ./PR_Minot-Prod_UA_Expert_Augmented/ ./
git add .
git commit -m "feat: expert-augmented workflow pack (UAS v2): policies, profiles, tests, CI"
git push -u origin "$BRANCH"
echo "Done. Open a PR on GitHub."
