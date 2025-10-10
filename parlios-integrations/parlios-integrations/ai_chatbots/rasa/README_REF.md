# Rasa

**Stack :** Python (NLP)  
**Licence :** Apache-2.0 (open‑source)  
**Description :** Framework NLP/assistant conversationnel souverain (NLU + Core).

**Docs / API :** https://rasa.com/docs & https://github.com/RasaHQ/rasa

## Installation rapide
```bash
docker build -t rasa . && docker run -it --rm rasa shell
```

## Fichiers clés
- `Dockerfile`
- `.env`
- `examples/`

## Intégration n8n / UA
- Webhooks REST `/webhooks/rest/webhook` → n8n
- Suivi des conversations (tracker)
