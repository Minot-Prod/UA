# ✅ QA Checklist — EXV #18 · Paiement & Facturation (v18)

- [x] /billing affiche plans Free/Pro/Pro+ avec CTA.
- [x] /api/stripe/checkout crée une session (Stripe) **ou** simule (mock) si pas de clé.
- [x] /success déclenche l’activation du plan via /api/plan/set.
- [x] /api/stripe/webhook journalise `checkout.session.completed` (si Stripe CLI branché).
- [x] Zéro DB; cookies `SameSite=Lax; Secure`.
- [x] Headers sécurité (_headers) présents pour Netlify.
