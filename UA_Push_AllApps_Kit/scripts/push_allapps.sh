#!/usr/bin/env bash
set -euo pipefail
: "${GH_OWNER:?Set GH_OWNER}"
: "${GH_REPO:?Set GH_REPO}"
BRANCH="${BRANCH:-main}"
TAG_NAME="${TAG_NAME:-sprint-bundle-1-3}"
PACK="${PACK:-Parlios_All_Apps_Full.zip}"

REPO_URL="https://github.com/${GH_OWNER}/${GH_REPO}.git"
WORK=".ua_allapps_out"
rm -rf "$WORK"; mkdir -p "$WORK"
cd "$WORK"
git init -q

if gh repo view "${GH_OWNER}/${GH_REPO}" >/dev/null 2>&1; then
  git remote add origin "$REPO_URL" || true
  git fetch origin "$BRANCH" || true
  if git rev-parse --verify "origin/$BRANCH" >/dev/null 2>&1; then
    git checkout -b "$BRANCH" "origin/$BRANCH" || git checkout "$BRANCH"
  else
    git checkout -b "$BRANCH"
  fi
else
  gh repo create "${GH_OWNER}/${GH_REPO}" --public --confirm
  git remote add origin "$REPO_URL"
  git checkout -b "$BRANCH"
fi

mkdir -p deliverables/all-apps
cp "../$PACK" "deliverables/all-apps/$PACK"
unzip -q "../$PACK" -d "deliverables/all-apps/expanded"

cat > deliverables/all-apps/README.md <<'MD'
# All Apps (Sprints 1–3)
Contenu: 15 apps fonctionnelles (Netlify Drop) avec README/QA/Blueprint + INVENTORY.json.
Archive: Parlios_All_Apps_Full.zip
MD

git add -A
git commit -m "chore(all-apps): import full pack (Sprints 1–3) + expanded inventory"
git push -u origin "$BRANCH"
git tag -f "$TAG_NAME"
git push -f origin "$TAG_NAME"
echo "✅ Pushed pack to ${GH_OWNER}/${GH_REPO}@${BRANCH} and tag ${TAG_NAME}"
