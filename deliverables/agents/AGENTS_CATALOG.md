# AGENTS_CATALOG — Rôles & Interfaces (Version 2025)

Ce document liste les agents clés du système **Parlios**, avec leur mission et leurs interfaces, en conformité avec le schéma UAS++ (entrées/sorties JSON normalisées). Les doublons ont été fusionnés et les agents obsolètes écartés afin de constituer une équipe cohérente et performante.

## Agents centraux

| Nom                        | Description                                                                                     | Source        | Notes          |
| -------------------------- | ----------------------------------------------------------------------------------------------- | ------------- | -------------- |
| **Ultimate Agent (UA)**    | Orchestrateur central supervisant tous les autres agents.                                       | Config        | Indispensable  |
| **Master Agent (MA)**      | Gère l’idéation créative et génère les réponses complètes (pas de contrainte de crédits).        | Config/Notion | À conserver    |
| **Master Agent Project (MAP)** | Coordonne la gestion de projet et délègue les tâches aux agents spécialisés.               | Config        | À conserver    |
| **Central Agent**          | Agrège les états et rapports multi‑équipes, puis les synthétise pour UA【28†L11-L14】.           | Notion        | À conserver    |
| **Agent Admittance**       | Contrôle l’accès et l’entrée des requêtes【30†L11-L14】 (filtrage initial des demandes entrantes). | Notion        | À conserver    |
| **Otis (Prompt Optimizer)**| Clarificateur de prompts utilisateur, fournissant des variantes optimisées et astuces. | Module        | Nouveau 2025, à intégrer |
| **Fact Checker**           | Vérifie la validité factuelle de chaque information fournie (cross-check sources).              | Config        | À conserver    |
| **QA Guardian**            | Assure la qualité des réponses (cohérence, style, conformité directives techniques).            | Config        | À conserver (fusion QA technique) |
| **Archiviste**             | Archive et indexe tous les livrables et décisions dans la base de connaissances.                | Config        | À conserver (inclut fonctions avancées) |
| **A11y Compliance Agent**  | Vérifie la conformité des outputs aux normes d’accessibilité (WCAG 2.2 AA).                    | Config        | À conserver    |
| **API Contract Agent**     | Maintient et valide les contrats d’API (spécifications OpenAPI) et leur versioning.             | Config        | À conserver    |
| **Performance Agent**      | Surveille les indicateurs de performance web (Lighthouse, LCP, CLS, INP) et alerte si anomalies. | Config        | À conserver    |
| **Agent Sécurité OWASP**   | Applique les normes de sécurité (OWASP Top 10, ASVS, WSTG) et déclenche des scans CI au besoin.  | Config        | À conserver    |
| **Test Synthétiseur**      | Coordonne les frameworks de tests (Jest, Cypress…) et le suivi de la couverture de code.        | Config        | À conserver    |
| **Consensus Builder**      | Agent médiateur proposant des solutions consensuelles entre agents (avec % de confiance).       | Config        | À conserver (Dream Team Innovation) |
| **Benchmark Agent**        | Évalue les outils/performances et produit un rapport comparatif mensuel des solutions.         | Config        | À conserver (Dream Team Innovation) |
| **Shadow Agents**          | Agents de secours s’activant automatiquement en cas de surcharge (backup Fact-Check/QA/Archive).| Config        | À conserver (Dream Team Innovation) |

## Agents spécialisés (sélection)

| Nom                     | Secteur    | Rôle / Notes                                                                   | Source | Statut       |
| ----------------------- | ---------- | ------------------------------------------------------------------------------ | ------ | ------------ |
| **Agent CI Optimizer**  | Ops        | Optimise les workflows CI/CD et réduit le flakiness des tests                | Notion | À conserver  |
| **Agent Infra Watcher** | Ops        | Surveille GitHub Actions, n8n, les serveurs, et déclenche des alertes proactives | Notion | À conserver  |
| **Agent Replay Master** | Ops        | Orchestre les scripts de replay et archivage des logs d’exécution | Notion | À conserver  |
| **Agent WealthSync**    | Finance    | Synchronise les données financières (Firefly III, Wealthica, Questrade, NDAX) | Notion | À conserver  |
| **Agent Cost Tracker**  | Finance    | Suit l’usage des API/SaaS et envoie des alertes budgétaires | Notion | À conserver  |
| **Agent Dealflow Scout**| Business   | Recherche des prospects/partenariats et attribue un score d’intérêt | Notion | À conserver  |
| **Agent Pack Builder**  | Musique    | Assemble des sound packs normalisés, prêts à l’emploi | Notion | À conserver  |
| **Agent Clip Booster**  | Musique    | Génère des micro‑clips optimisés pour TikTok/Instagram (accroche virale) | Notion | À conserver  |
| **Agent Sound Analyzer**| Musique    | Analyse le BPM, la tonalité et le mood des fichiers audio importés | Notion | À conserver  |
| **Agent Audience Radar**| Marketing  | Page existante, description à définir – pourrait analyser l’audience et l’engagement | Notion | À clarifier |
| **Agent CRM Sync**      | CRM        | Page existante, description à définir – synchronise les données CRM inter-plateformes | Notion | À clarifier |
| **Agent Onboarding Coach** | RH     | Page existante, description à définir – guide les nouveaux utilisateurs (tutoriels) | Notion | À clarifier |
| **Agent Secrets Keeper**| Sécurité   | Page existante, description à définir – gère les secrets et identifiants sensibles | Notion | À clarifier |
| **Agent Scheduler XL**  | Gestion    | Page existante, description à définir – prise en charge de planifications complexes | Notion | À clarifier |
| **Agent LivePrep**      | N/D    | Page existante sans contenu – à évaluer | Notion | À évaluer |
| **Agent MySafeCup Bot** | N/D    | Page existante sans contenu – à évaluer | Notion | À évaluer |
| **Agent Media Balance** | N/D    | Page existante sans contenu – à évaluer | Notion | À évaluer |
| **Agent Invoice Automator** | Finance | Page existante sans contenu – à évaluer | Notion | À évaluer |
| **Agent StoryTeller Pro** | Contenu  | Page existante sans contenu – à évaluer – production de contenus narratifs | Notion | À évaluer |

Remarque : Les doublons issus des anciennes listes (ex: Partnership Scout, Sentinelle Cyber) ont été éliminés ou fusionnés avec leur définition principale. Les agents sans description ou rôle clair sont marqués comme « À clarifier » ou « À évaluer » – ils devront être définis plus précisément avant d’entrer en service actif. Ce catalogue à jour sert de référence officielle pour l’équipe d’agents Parlios en 2025‑2026.
