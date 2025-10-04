# Readiness PR Workflow
This GitHub Action posts a comment on each Pull Request with a summary extracted from `GitHub_Readiness_Report.json`.

## How it works
- Triggers on PR events.
- Locates `reports/GitHub_Readiness_Report.json` (or searches the repo).
- Parses key fields with `jq`.
- Uses `actions/github-script` to post a formatted comment.

## Install
1. Copy `.github/workflows/readiness-comment.yml` into your repo.
2. Ensure `reports/GitHub_Readiness_Report.json` is committed in your PR branch.
3. Open a PR — the bot will comment automatically.

_No extra secrets required; it uses the built-in `GITHUB_TOKEN` with `pull-requests: write` permission._
