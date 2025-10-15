# UA Push — All Apps Kit
_MAJ_: 2025-10-15 19:31

Contenu:
- `Parlios_All_Apps_Full.zip` (15 apps fonctionnelles, Sprints 1–3)
- `scripts/push_allapps.sh` (Linux/macOS)
- `scripts/push_allapps.ps1` (Windows PowerShell)

Prérequis:
- Git + GitHub CLI (`gh`) installés et authentifiés.
- Droits push sur `Minot-Prod/UA`.

Linux/macOS:
```bash
unzip UA_Push_AllApps_Kit.zip -d ua_all
cd ua_all/scripts
GH_OWNER="Minot-Prod" GH_REPO="UA" BRANCH="main" TAG_NAME="sprint-bundle-1-3" bash push_allapps.sh
```

Windows PowerShell:
```powershell
Expand-Archive .\UA_Push_AllApps_Kit.zip -DestinationPath ua_all
Set-Location ua_all\scripts
.\push_allapps.ps1 -Owner "Minot-Prod" -Repo "UA" -Branch "main" -TagName "sprint-bundle-1-3"
```
