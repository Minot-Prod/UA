# Parlios — EXV Étape 19 · QA E2E + Perf Budgets (v19)

Objectif : fournir un **harness QA** sans dépendances, vérifiant **routes clés**, **A11Y basique**, **headers sécurité**, et **budgets de perfs** (client).
- **/qa** : page d’audit visuelle (A11Y + perfs Web + bundles).
- **/api/qa/headers** : renvoie les **headers appliqués** pour vérification.
- **tools/qa_runner.js** : E2E léger en Node (fetch) pour ping des routes et vérifier headers/budgets serverside.
- **Budgets par défaut** : LCP ≤ 2.5s, CLS ≤ 0.10, TTFB ≤ 800ms, JS ≤ 300KB.

> Sans librairies (pas de Cypress/Playwright). À brancher sur Netlify/Vercel. Adaptable à tes seuils.
