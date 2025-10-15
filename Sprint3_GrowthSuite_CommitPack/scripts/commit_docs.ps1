Param([string]$Branch="main")
git add docs .github/ISSUE_TEMPLATE
git commit -m "chore(sprint3): add plan, blueprints, QA reports, issue template"
git push origin $Branch
Write-Host "✅ Docs Sprint 3 poussés sur $Branch"
