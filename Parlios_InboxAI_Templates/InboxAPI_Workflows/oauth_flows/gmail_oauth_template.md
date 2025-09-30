# Gmail OAuth

## Étapes
1. Créer des **identifiants OAuth 2.0** (Google Cloud Console).
2. Configurer l’URL de redirection : `${APP_BASE_URL}/oauth/google/callback`.
3. Scopes : `gmail.readonly`, `gmail.send` (+ éventuellement `openid,email,profile`).
4. Flow :
   - `GET /oauth/google/login` → consentement Google
   - `GET /oauth/google/callback` → échange `code` → `access_token` + `refresh_token`
5. Stocker les tokens chiffrés (le `refresh_token` est indispensable).

## Webhook vs Polling
- Gmail n’expose pas de webhook HTTP simple; préférer **Gmail Push Notifications** (Pub/Sub) ou un **polling** régulier (60s) en MVP.
