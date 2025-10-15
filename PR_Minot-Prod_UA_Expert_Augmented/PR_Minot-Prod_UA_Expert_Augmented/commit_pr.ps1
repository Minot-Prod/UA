
param([string]$Branch="feat/expert-augmented-uas-v2")
git checkout -b $Branch
robocopy .\PR_Minot-Prod_UA_Expert_Augmented . /E /NFL /NDL /NJH /NJS /NC /NS | Out-Null
git add .
git commit -m "feat: expert-augmented workflow pack (UAS v2): policies, profiles, tests, CI"
git push -u origin $Branch
Write-Host "Done. Ouvrez le PR sur GitHub."
