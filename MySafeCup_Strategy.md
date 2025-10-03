# 🥤 MySafeCup — Stratégie & Déploiement complet (A+)
_Last update: 2025-10-03 22:24:30_

## 1️⃣ Introduction & Contexte
Automatisation complète du traitement des devis Shopify vers Sellsy + Google Drive + Email (+ Option Pro Canva).

## 2️⃣ Roadmap stratégique
- Création des comptes et champs Sellsy
- Import workflows n8n (MVP & Pro)
- Connexions OAuth & ENV
- Tests QA (5 devis)
- Validation → Go Prod
- Monitoring + Option Pro

## 3️⃣ Checklist Toi vs Agent IA
| Action | Toi | Agent IA |
|--------|-----|----------|
| Créer comptes Google/Sellsy/Canva | ✅ | ❌ |
| Configurer OAuth & ENV | ✅ | ❌ |
| Import workflows | ✅ | ❌ |
| Générer Function nodes & Error WF | ❌ | ✅ |
| Rédiger docs/README | ❌ | ✅ |
| QA tests simulés | ✅ | ✅ |
| Go Prod | ✅ | ❌ |

## 4️⃣ Prompts Mode Agent (copier-coller)

### Prompt Workflow n8n (MVP)
```
Rôle : Architecte n8n senior
Tâche : Génère workflow complet pour devis Shopify → Sellsy + Drive + Email
Contrainte : OAuth Google & Sellsy, Retry/backoff, Anti-doublon quote_number, Logs & notes
Format : JSON importable n8n
```

### Prompt Function Node
```
Rôle : Dev n8n
Tâche : Extraire quote_number, client, total, items, devise, PDF ou lien PDF à partir d’un email Shopify.
Sortie : JSON unifié pour Sellsy/Drive.
```

### Prompt Error Workflow
```
Rôle : DevOps n8n
Tâche : Créer Error Workflow global → Slack/Email avec runId, node, message, timestamp.
```

### Prompt Tests QA
```
Rôle : QA Engineer
Tâche : Générer 5 devis tests (PDF, doublon, sans PDF, Sellsy 429, quota Gmail).
Format : JSON + PDF mock.
```

### Prompt Option Pro
```
Rôle : Designer IA
Tâche : Créer workflow visuel (logo → Canva API ou fallback overlay), attacher à Sellsy & Email.
```

## 5️⃣ Configuration technique

### ENV n8n
```
N8N_DRIVE_PARENT_FOLDER_ID=...
N8N_SALES_TEAM_EMAIL=sales@mysafecup.com
N8N_SELLSY_PIPELINE_ID=...
N8N_SELLSY_STAGE_ID=...
N8N_TIMEZONE=America/Toronto
N8N_CANVA_API_KEY=...
N8N_CANVA_TEMPLATE_ID=...
N8N_FALLBACK_OVERLAY_TOKEN=...
```

### Champs Sellsy
- quote_number (texte, unique)
- quote_pdf_url (url)
- logo_url (url)

### Drive
MySafeCup/Devis/YYYY/MM/DEVIS_{quote_number}_{client}_{YYYYMMDD}.pdf

## 6️⃣ QA & Tests
| Cas | Attendu |
|-----|----------|
| PDF OK | Opp créée + email envoyé |
| Doublon | Opp mise à jour (pas doublon) |
| Pas PDF | Téléchargement lien OK |
| Sellsy erreur | Retry 3× |
| Quota Gmail | Retry + log erreur |

## 7️⃣ Runbook
1. Import JSON (MVP puis Pro)
2. Connecter Credentials OAuth
3. Saisir ENV
4. Tester 5 devis
5. Activer Gmail Trigger
6. Surveiller 48h
7. Ajouter Option Pro si validée

## 8️⃣ Option Pro — Canva/Fallback
| Élément | Canva | Fallback |
|----------|--------|----------|
| API | ✅ | ✅ |
| Résultat | PNG/PDF design | Overlay logo |
| Activation | Variable Option Pro | Auto si Canva down |

---
_© 2025 Parlios / Ultimate Agent — Architecture validée Base44 + UA Standard_
