
# Pack “Expert-Augmented” — Workflow multi‑agents (UAS v2)

Ce pack applique les recommandations d’un audit “sommités Prompt/Agents” : 
- élicitation bornée + fallback,
- critique automatique des prompts (corner cases),
- mémoire hiérarchique,
- garde‑fous “Never do this”,
- red‑team tests,
- seuils de confiance + second regard,
- métriques & logs structurés,
- CI de conformité (policy + KPIs),
- collecte & consolidation UAS (Switchboard + RAP Central).

## Mise en place (résumé)
1. Créer/mettre à jour les GPTs avec `profiles/*_v2.gpt.txt`.
2. Commiter le pack à la racine du repo.
3. Activer les workflows GitHub Actions (policy, metrics, redteam).
4. Définir les secrets si publication Notion/Discord (optionnel).
