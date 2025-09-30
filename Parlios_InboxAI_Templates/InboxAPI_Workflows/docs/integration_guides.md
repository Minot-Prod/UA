# Guides d'intégration — Inbox AI

## 1) Meta (Messenger + Instagram)
- Créer une app Meta, activer Messenger & Instagram.
- Ajouter les permissions: `pages_messaging`, `instagram_manage_messages`.
- Définir l'URL de callback OAuth: `${APP_BASE_URL}/oauth/meta/callback`.
- Définir l'URL Webhook: `${APP_BASE_URL}/webhook/meta` (GET pour vérif, POST pour events).

## 2) Gmail
- Créer des credentials OAuth 2.0 (type Web application).
- Scopes: `gmail.readonly` et `gmail.send`.
- Utiliser Pub/Sub (idéal) ou polling (MVP).

## 3) Telegram (premium)
- Créer un bot via @BotFather.
- Définir webhook sur `${APP_BASE_URL}/webhook/telegram` avec un secret custom.
