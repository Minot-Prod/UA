# Parlios — Repo Charter

## Rôles
- **UA (Core & Gouvernance)**  
  Orchestration (UA/MA/MAP/BAS44), workflows réutilisables (GitHub Actions), règles, docs système, évaluations.
- **Site-Parlios (UI Vitrine)**  
  Site marketing public, pages, assets brand.
- **Parlios.app (UI Cockpit)**  
  Application (dashboard, modules utilisateurs).
- **Parlios-Hub (Décision)**  
  Soit bac à sable/PoC, soit archivié pour éviter le doublon avec Parlios.app.
- **Minot-Prod-Parlios-Public\***  
  Bruit → à archiver/supprimer.

## Règles transverses
- **Branche par défaut :** `main` (unifier `master` → `main`).
- **Protections :** pas de push direct sur `main`, PR obligatoire, ≥1 review, checks CI requis.
- **CODEOWNERS :**  
  - UA → @Minot-Prod + équipe UA/QA  
  - Site-Parlios, Parlios.app → @Minot-Prod + équipe UI/Frontend
- **CI/CD :** workflows **réutilisables** dans `UA/.github/workflows` (`on: workflow_call`), appelés depuis les UIs (pas de copie locale).
- **Qualité :** lint+tests+build obligatoires; QA Web (Lighthouse≥90, Pa11y AA, Linkinator 0x404) — d’abord *warning*, puis *blocking*.
- **Versioning :** Conventional Commits + SemVer + changelog auto (semantic-release ou changesets).
- **Secrets :** nommage par env (DEV/PREVIEW/PROD), portée minimale (read-only par défaut), doc d’usage dans README.
- **Docs :** `README` (setup→run→test→deploy), `CONTRIBUTING`, 1 ADR “UI ↔ Core”.

## Flux (lecture-seule → PR)
1. UA publie/évolue les workflows et la doc.  
2. Les UI consomment les workflows UA via `workflow_call`.  
3. Petites PRs, diff lisible, previews automatiques, rollback simple.
