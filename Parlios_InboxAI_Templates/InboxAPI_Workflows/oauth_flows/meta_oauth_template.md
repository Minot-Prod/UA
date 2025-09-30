# Meta OAuth (Messenger + Instagram)

## Étapes
1. Créer une **Meta App** (developers.facebook.com) et activer Messenger + Instagram.
2. Configurer l’URL de redirection OAuth : `${APP_BASE_URL}/oauth/meta/callback`.
3. Demander les permissions : `pages_messaging`, `instagram_manage_messages`.
4. Flow :
   - `GET /oauth/meta/login` → redirige vers Facebook OAuth.
   - Facebook → `redirect_uri` avec `code` + `state`.
   - `GET /oauth/meta/callback` → échange `code` → `access_token` + `page_access_token`.
5. Stocker les tokens chiffrés; rafraîchir si nécessaire.

## Webhook
- Endpoint : `POST /webhook/meta`
- Validation : `GET /webhook/meta?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...`
- Vérifier `META_VERIFY_TOKEN` (shared secret).
