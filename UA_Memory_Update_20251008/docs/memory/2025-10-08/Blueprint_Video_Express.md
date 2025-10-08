# Blueprint
Goal: Insérer un maillon rapide text→short vidéo brandé Parlios dans le pipeline contenu.
Context: production
Sources: Content Agent, MAP
Decision criteria: Vitesse, Cohérence de marque, Qualité suffisante
Acceptance: - 2 vidéos/semaine en brouillon; watermark/logo Parlios; format vertical; export planifié
Edge cases: - Accès restreint à certains moteurs; prompts inadéquats; incohérences visuelles
Tests: - 4 générations; 3 acceptées; délais < 5 min/vidéo

## ComplexityProfile
scope_size: S
novelty: 3/5
data_volume: 2/5
integration_count: 3 (générateur vidéo, stockage médias, calendrier)
ui_depth: 2/5
risk_level: 3/5
deadline_pressure: 2/5

**Budget (indicatif)**: ~20 crédits
**Checkpoint 70%**: Go/No-Go requis.


## Notes d'implémentation
- Démarrage avec un template fixe (hook→script court→vidéo).
- Sortie en “brouillon” plateforme cible, jamais publication directe sans validation.
