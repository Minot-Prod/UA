Param([string]$Owner="Minot-Prod",[string]$Repo="Parlios-Public")
$TITLE = "Sprint 3 — Growth Suite"
$BODY = ".github/ISSUE_TEMPLATE/sprint3_growth_suite.md"
if (!(Test-Path $BODY)) { $BODY = "docs/SPRINT3_PLAN.md" }
gh issue create -R "$Owner/$Repo" -t $TITLE -F $BODY -l "sprint3,planning,base44"
Write-Host "✅ Issue créée: $TITLE"
