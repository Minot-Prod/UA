# BUSINESS_CONTINUITY_PLAN.md

## Objectif
Assurer la continuité d’activité UA en cas d’incident majeur.

## Risques clés
- Indisponibilité n8n / CI
- Expiration certificat TLS
- Secrets compromis
- Perte artefacts

## Mesures
- Redondance endpoint (staging/prod)
- Renouvellement auto certs + alerte 14j
- Rotation secrets + audit
- Artefacts stockés 30 jours minimum

## Procédure d’incident
1) Déclenchement issue `BCP-INCIDENT` (template)  
2) Bascule endpoint secondaire  
3) Post-mortem sous 72h  

## Tests
Exercice trimestriel (table-top) + 1 failover contrôlé/an.
