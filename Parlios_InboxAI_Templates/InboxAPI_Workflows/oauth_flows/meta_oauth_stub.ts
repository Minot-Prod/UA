import { Router } from 'express';

export const router = Router();

router.get('/login', (_req, res) => {
  // Rediriger vers l'écran d'autorisation Meta (FB)
  // Ex: https://www.facebook.com/v20.0/dialog/oauth?client_id=...&redirect_uri=...
  res.status(200).send('Redirect to Meta OAuth here (stub).');
});

router.get('/callback', async (_req, res) => {
  // Échanger code -> access_token + page_access_token
  // Stocker (chiffré) et rediriger vers UI Parlios
  res.status(200).send('Meta OAuth callback received (stub).');
});
