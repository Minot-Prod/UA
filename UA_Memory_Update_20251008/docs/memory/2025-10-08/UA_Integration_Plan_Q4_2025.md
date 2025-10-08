# UA / Parlios — Plan d'intégration Q4 2025

## Objectifs
- Prouver en 7 jours la valeur des 3 briques : Mini‑App, Agent d’exécution, Vidéo Express.
- Étendre en 30 jours (stabilisation, métriques, documentation).

## Lot A (7 jours) — *Proof*
1) **Mini‑App Parlios** (Apps SDK)  
   - Scope: hooks→variantes→visuel→brouillon+calendar.  
   - Livrable: composant interactif dans le chat (liste, boutons, recap).  
2) **Agent d’exécution** (AgentKit/n8n)  
   - Scope: créer brouillon Notion, ranger médias, créer event Calendar, email recap Tazlow.  
   - Fallback: Claude “computer use” pour 1 tâche sans API.  
3) **Vidéo Express**  
   - Scope: 1 template court (vertical), logo Parlios, gén. à partir d’un hook validé, export brouillon.

## Lot B (≤ 30 jours) — *Stabilize & Measure*
- Métriques: durée cycle, % succès, taux adoption mini‑app, cadence vidéos.  
- QA boucles: 10x runs par scénario, alertes en cas d’échec répété.  
- Docs: guide usage (Notion+README), procédures incident.

## Risques & Mitigation
- Accès preview Apps SDK/AgentKit → feature flags et voies de contournement (n8n/Zapier/Claude).  
- Coûts API → seuils/alertes + CREDIT_LOG intégré.  
