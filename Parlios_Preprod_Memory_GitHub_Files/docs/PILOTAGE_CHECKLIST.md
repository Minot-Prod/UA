# Checklist — Pilotage Production (Parlios)

## Jour 0 (Kickoff)
- [ ] Créer branches `preprod` (green) et `main` (blue).
- [ ] Vérifier secrets GitHub (UA_N8N_BASE_URL, SUPABASE_ANON_KEY, etc.).
- [ ] Installer CI `qa.yml` & `security-weekly.yml`.

## À chaque PR
- [ ] Orchestrateur → génère build statique.
- [ ] QA Guardian → Lighthouse/Pa11y/Linkinator (seuils atteints).
- [ ] Netlify‑Deployer → deploy preview (green).
- [ ] MAP → résumé chiffré (STATUS.md).

## Go/No‑Go
- [ ] Scores atteints (≥90 / 0 / 0).
- [ ] Headers sécurité vérifiés.
- [ ] Rapport complété (REPORT.md).
- [ ] Merge vers `main` (switch blue‑green).

## Post‑déploiement
- [ ] Smoke test manuel (pages clés).
- [ ] Tag version + changelog.
- [ ] Créer ticket d'amélioration si frictions.
