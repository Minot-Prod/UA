
# Playbook d’intégration — UAS v2 (Switchboard + RAP Central)

## Objectif
Standardiser l’I/O de tous les agents et publier un rapport consolidé automatique (UAS v2).

## Architecture résumée
- Agents métiers (MA, MAP, etc.) produisent un _output brut_.
- **Switchboard_Normalizer** convertit en **UAS v2**.
- **UAS_Coordinator** collecte tous les UAS et appelle **RAP_Central_Condenser** pour produire un **UAS v2 consolidé** (+ KPIs).
- Publication (optionnel) vers Notion/Discord/Email.

## Fichiers clés
- `.github/workflows/uas_contract_check.yml` — (déjà fourni) valide le schéma UAS.
- `.github/workflows/uas_collect.yml` — collecte nocturne, consolidation, artefacts.
- `.github/workflows/uas_on_pr.yml` — consolidation sur chaque PR (aperçu).
- `scripts/rap_collect.mjs` — utilitaire Node pour rassembler les UAS JSON avant l’appel de RAP Central.
- `agents/UAS_Coordinator.gpt.txt` — prompt de l’agent coordinateur (orchestrateur).
- `templates/agent_adoption_message.txt` — message type pour imposer UAS v2 aux agents existants.

## Intégration rapide
1. Créer les deux GPTs: **Switchboard_Normalizer** et **RAP_Central_Condenser** (déjà fournis).
2. Créer un 3e GPT: **UAS_Coordinator** (contenu dans `agents/UAS_Coordinator.gpt.txt`).
3. Committer ce playbook dans `Minot-Prod/UA`.
4. Activer les workflows GitHub Actions.
5. Optionnel: brancher la publication Notion/Discord (webhooks secrets requis).
