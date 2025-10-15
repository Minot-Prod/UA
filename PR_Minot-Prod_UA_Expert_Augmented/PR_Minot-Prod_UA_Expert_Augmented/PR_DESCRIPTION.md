
# PR — Expert-Augmented Workflow Pack (UAS v2)

## Objet
Intégrer les améliorations validées par audit “sommités prompt/agents” :
- élicitation bornée + fallback,
- critique de prompts (corner cases + inputs adverses),
- mémoire hiérarchique,
- garde‑fous “Never do this”,
- red-team tests,
- seuils de confiance & second regard,
- métriques & logs structurés,
- CI policy + KPIs,
- backbone UAS (Switchboard + RAP Central) conservé.

## Contenu
- `profiles/*_v2.gpt.txt` — profils améliorés.
- `policies/never_do.md` — garde‑fous.
- `configs/thresholds.json` — seuils.
- `memory/` — schéma mémoire hiérarchique.
- `tests/redteam/*` — scénarios adverses.
- `.github/workflows/uas_policy_check.yml` — vérification policies/configs.
- `.github/workflows/uas_metrics.yml` — consolidation de KPIs.
- `.github/workflows/uas_redteam.yml` — orchestration red-team.

## Étapes d’activation
1. Créer/mettre à jour les GPTs avec `profiles/*_v2.gpt.txt`.
2. Commiter ce pack à la racine du repo.
3. Activer les workflows CI dans l’onglet “Actions”.
4. (Optionnel) Ajouter secrets pour publication Notion/Discord, si besoin.
5. Vérifier artefacts `reports/kpis.json` après premier run “UAS Metrics Consolidation”.

## Acceptance
- CI `UAS Policy Check` passe en vert (présence des policies/configs).
- `UAS Metrics Consolidation` produit un artefact `uas-kpis`.
- Les agents produisent des sorties UAS v2 valides (Switchboard OK).
- RAP Central sort un rapport consolidé exploitable.
