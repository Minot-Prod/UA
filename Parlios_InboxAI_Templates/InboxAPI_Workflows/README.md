# 📩 Parlios — Inbox AI (Starter Templates)

Ce pack fournit des **templates prêts à l’emploi** pour intégrer un Inbox AI multi‑canaux (Email + Messenger + Instagram) avec **OAuth**, **webhooks**, et **orchestration** en **Node.js/TypeScript (Express)**.

## Contenu
```
InboxAPI_Workflows/
  ├─ oauth_flows/
  │     ├─ meta_oauth_template.md
  │     ├─ gmail_oauth_template.md
  │     └─ telegram_bot_template.md
  ├─ webhooks/
  │     ├─ meta_webhook_template.ts
  │     ├─ email_webhook_template.ts
  │     └─ telegram_webhook_template.ts
  ├─ orchestrator/
  │     ├─ send_message_interface.ts
  │     ├─ providers/
  │     │     ├─ provider_gmail.ts
  │     │     ├─ provider_messenger.ts
  │     │     └─ provider_instagram.ts
  │     └─ message_router.ts
  ├─ ia_logic/
  │     └─ auto_response_template.ts
  ├─ docs/
  │     └─ integration_guides.md
  ├─ package.json
  ├─ tsconfig.json
  └─ .env.example
```

## Démarrage rapide (dev)
1. Créer un dossier projet et y copier ce pack.
2. `npm install`
3. Dupliquer `.env.example` en `.env` et renseigner les variables.
4. `npm run dev` (démarre un serveur Express avec routes `/webhook/*` et `/oauth/*` — stubs).
5. Brancher les webhooks dans Meta/Google/Telegram sur `https://votre-domaine/webhook/...`.

> ⚠️ Sécurité : **ne commitez jamais `.env`**. Les tokens sont chiffrés côté serveur en production. Utilisez un coffre (Doppler, 1Password, AWS Secrets Manager…).

## Production minimale
- Déployer sur Netlify Functions, Vercel, Render, Fly.io ou un serveur Node. 
- Activez HTTPS (obligatoire) et configurez les URLs de callback OAuth et webhooks.
