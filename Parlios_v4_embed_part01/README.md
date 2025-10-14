# UA — External Agent Repo (Domino et la Grenouille)

Agent externe **dédié à l'Ultimate Agent (UA)**. Ce repo contient tout le nécessaire pour :
- orchestrer les intégrations **n8n ↔ UA ↔ GitHub** (et Notion/Drive en option),
- exécuter des **tests E2E** (PING/DEMO) via GitHub Actions,
- **journaliser** les rapports UA et le CREDIT_LOG,
- fournir des **scripts de replay** en local (bash/PowerShell).

> Politique Base44 appliquée: Blueprint, ComplexityProfile, CREDIT_LOG, checkpoint 70%, livrables XS/S, secrets jamais en clair.

## Démarrage rapide
1. Crée le secret **UA_N8N_BASE_URL** (Settings → Secrets and variables → Actions).
2. *(Optionnel)* Crée `NOTION_TOKEN` si miroir Notion activé.
3. Lance le workflow **UA E2E** (Actions → UA E2E → Run).
4. Télécharge l'artifact `ua-e2e-results` et vérifie les ACK.
5. Lis/commits le rapport généré: `deliverables/ua/UA_Report_YYYYMMDD.md`.

## Secrets attendus
- `UA_N8N_BASE_URL` : URL HTTPS du webhook n8n `/ua/chat` (prod ou test).
- `NOTION_TOKEN` (optionnel) : token API Notion pour miroir mémoire.
- `GH_PAT` (optionnel) : PAT si l'agent doit pousser sur d'autres repos.

## Structure
- `.github/workflows/ua-e2e.yml` — pipeline E2E + artifact.
- `scripts/replay.sh|ps1` — tests locaux PING/DEMO.
- `PING.json`, `DEMO.json` — charges utiles de test.
- `CREDIT_LOG.md` — journal anti-crédits (estimations → réels).
- `deliverables/ua/UA_Report_YYYYMMDD.md` — rapport quotidien.
- `workflows/n8n/ua_chat_webhook.json` — template workflow n8n (export).
- `ops/README_TestE2E.md` — guide court usage + dépannage.
- `ops/SECURITY.md` — règles secrets & logs.
- `ops/AGENT_LAUNCH_PROMPT.md` — prompt pour Mode Agent (à coller).
- `templates/notion_db_schema.json` — schéma DB Notion conseillé.

## Licence
Privé. Réservé à Domino et la Grenouille / Maxime.

# Blueprint (Base44)

## Goal
Intégrer, tester et opérer n8n ↔ UA ↔ GitHub (option: Notion/Drive) avec rapports et CREDIT_LOG.

## Scope (inclus)
- Secrets, webhook n8n, routes PING/DEMO.
- CI GitHub (E2E manuel + artifact).
- Scripts replay (bash/ps).
- Fichiers mémoire (CREDIT_LOG, rapports).

## Acceptance
- ACK 200 sur PING/DEMO (curl + replay).
- Artifact `ua-e2e-results` attaché.
- Rapport `deliverables/ua/UA_Report_YYYYMMDD.md` committé.
- CREDIT_LOG incrémenté (checkpoint 70%).

## Edge Cases
- Secret manquant, TLS, CORS, timeout, rate limit Notion, conflits Git.

## Tests
- Handshake: curl → webhook → JSON OK.
- E2E: GHA manuel → artifact lisible.
- Mémoire: diffs CREDIT_LOG & rapport.

## ComplexityProfile
scope_size: S, novelty: 3/5, data_volume: 2/5, integration_count: 3, ui_depth: 1/5, risk_level: 3/5, deadline_pressure: 2/5.
Budget cible: ~30 crédits, checkpoint à 70% (=21).

