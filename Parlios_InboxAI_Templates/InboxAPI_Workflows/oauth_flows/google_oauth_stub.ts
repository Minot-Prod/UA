import { Router } from 'express';

export const router = Router();

router.get('/login', (_req, res) => {
  // Rediriger vers l'écran de consentement Google
  // https://accounts.google.com/o/oauth2/v2/auth?...&scope=gmail.readonly%20gmail.send
  res.status(200).send('Redirect to Google OAuth here (stub).');
});

router.get('/callback', async (_req, res) => {
  // Échanger code -> tokens (access + refresh)
  // Stocker (chiffré) et rediriger vers UI Parlios
  res.status(200).send('Google OAuth callback received (stub).');
});
