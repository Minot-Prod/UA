Param(
  [Parameter(Mandatory=$true)][string]$Owner,
  [Parameter(Mandatory=$true)][string]$Repo,
  [string]$Branch = "main",
  [string]$TagName = "sprint-bundle-1-3",
  [string]$Pack = "Parlios_All_Apps_Full.zip"
)
$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/$Owner/$Repo.git"
$work = ".ua_allapps_out"
if (Test-Path $work) { Remove-Item $work -Recurse -Force }
New-Item $work -ItemType Directory | Out-Null
Set-Location $work
git init | Out-Null

$exists = (& gh repo view "$Owner/$Repo" 2>$null)
if ($LASTEXITCODE -eq 0) {
  git remote add origin $repoUrl 2>$null
  git fetch origin $Branch 2>$null
  try { git checkout -b $Branch "origin/$Branch" } catch { git checkout $Branch }
} else {
  gh repo create "$Owner/$Repo" --public --confirm
  git remote add origin $repoUrl
  git checkout -b $Branch
}

New-Item -ItemType Directory -Force -Path "deliverables/all-apps" | Out-Null
Copy-Item "..\$Pack" -Destination "deliverables/all-apps\$Pack"
Expand-Archive "..\$Pack" -DestinationPath "deliverables/all-apps\expanded" -Force

@"
# All Apps (Sprints 1–3)
Archive: Parlios_All_Apps_Full.zip
Contenu: 15 apps (build.zip + README + QA + Blueprint) + INVENTORY.json.
"@ | Set-Content "deliverables/all-apps\README.md" -Encoding UTF8

git add -A
git commit -m "chore(all-apps): import full pack (Sprints 1–3) + expanded inventory"
git push -u origin $Branch
git tag -f $TagName
git push -f origin $TagName
Write-Host "✅ Pushed pack to $Owner/$Repo@$Branch and tag $TagName"
