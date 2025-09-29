# UA Agent Bootstrap Kit — Mode Agent (PR de bootstrap)

Ce kit contient les workflows GitHub Actions et les gabarits nécessaires pour activer la chaîne A→Z :
chat → création d'agent → PR auto → Knowledge Pack → familles/routage → CI QA.

## Contenu
- `.github/workflows/agent_autocreate.yml` : crée la branche/PR et le squelette d’agent à partir d’un `repository_dispatch`.
- `.github/workflows/agent_knowledge_pack.yml` : vérifie la qualité du Knowledge Pack (schéma, sources, bench >= 80).
- `.github/workflows/team_autoadapt.yml` : adaptation hebdo des familles et du routage, rapport d’équipe.
- `agents/_template/` : squelette d’agent (README, manifest, workflow de checks).
- `knowledge/agents/_template/` : squelette de Knowledge Pack (prompts, SOPs, sources, benchmarks, éval).
- `payloads/demo_payload.json` : exemple de payload pour tester la chaîne.
- `TEAM_REPORT.md` : rapport d’équipe (exemple minimal).
- `routing_matrix.json` : matrice de routage (exemple minimal).

## Utilisation rapide
1. Commiter le contenu de ce kit dans une PR de bootstrap.
2. Créer la GitHub App (contents/pull_requests/workflows:write) et configurer n8n (webhook HTTPS).
3. Déclencher un `repository_dispatch` avec `event_type=ua_agent_request` et `client_payload.payload = payloads/demo_payload.json`.
4. Vérifier la PR générée et la CI.
