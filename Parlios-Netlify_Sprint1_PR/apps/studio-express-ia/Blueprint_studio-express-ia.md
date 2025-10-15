# Blueprint — Studio Express IA

**Goal** : Générateur de visuels rapides (mock) + export PNG en 1 clic.

**Scope (in/out)** : UI statique + branchement endpoints IA via `assets/config.js`. Pas d’auth ni back-office (v1).

**Acceptance** :
- UI cohérente Parlios (logo/halos/couleurs)
- Génération < 10 s (démo), téléchargement OK
- Lighthouse ≥ 90 / Pa11y AA

**Edge Cases** :
- Endpoint IA hors service → afficher un message clair et réessayer
- Surcharge → suggérer d’attendre ou réduire la taille

**Notes** :
- Prévoir migration vers Netlify Functions pour sécuriser les clés.
