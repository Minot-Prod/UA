# UA Template Library — Consolidated ENRICHED (v0.4 + v0.5)

Ce paquet unifie **v0.4 (75 templates)** et **v0.5 (extension business)** avec des **colonnes de métriques normalisées**.

## Champs de métriques
- `metric_type` : clones (Base44), downloads_or_favorites (n8n), popularity_badge_or_usage (Zapier), prompt_official (Base44 prompts), tutorial_or_usecase (Zapier how-to).
- `metric_value` : **non inventé** — à remplir quand la plateforme affiche le chiffre (beaucoup d'indicateurs sont visibles, certains nécessitent d'être connecté).
- `metric_last_checked` : 2025-09-27
- `metrics_status` : état d'accès (ex. `catalog_hub_login_required`, `public_page_counter_available`, `popular_template_indicator`, `no_counter_official_source`).
- `proof_of_value` : justification qualitative (officiel, popularité, usage réel).

## Fichiers
- `v0.4/meta/SOURCES_v0.4_75_enriched.csv`
- `v0.5/meta/SOURCES_v0.5_enriched.csv`
- `meta/SOURCES_all_enriched.csv` (consolidé)

## Bonnes pratiques pour mise à jour des chiffres
1. **Base44** : se connecter à l'App Templates Hub, relever les **clones** par app → renseigner `metric_value` et laisser `metric_type=clones`.
2. **n8n** : ouvrir chaque page workflow, relever **downloads/favorites** → `metric_type=downloads_or_favorites`.
3. **Zapier** : noter la présence d'un badge **Popular** / mentions d'usage → `metric_type=popularity_badge_or_usage` et `metric_value=popular/high/…` si quantifié par Zapier.

> Remarque : on ne met pas de chiffres fantômes. Chaque valeur doit venir d'un indicateur visible (doc officielle / page template / compteur public).