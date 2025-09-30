# Telegram Bot (Upsell Premium)

Pas d’OAuth classique : créer un **Bot** via @BotFather → récupérer le **token**.

## Webhook
- `POST /webhook/telegram` avec un secret custom (entête `X-Telegram-Secret`).
- Alternative : `getUpdates` en polling (moins fiable en prod).
