# Parlios — EXV Étape 18 · Paiement & Facturation (Stripe Light) (v18)

Objectif : activer **Pro / Pro+** via **Stripe Checkout** (mode test), sans base de données.
- Création de session Checkout (`/api/stripe/checkout?plan=pro`).
- Pages : `/billing`, `/success`, `/cancel`.
- **Activation plan** : à la fin du paiement (ou mock), la page `/success` appelle `/api/plan/set?plan=...` → met à jour le cookie `parlios.plan` (freemium gating Étape 14).
- **Webhook** `/api/stripe/webhook` (optionnel MVP) : journalise l’événement `checkout.session.completed` (mode test).

> **Sans clé Stripe**: le **mode mock** est utilisé automatiquement. Les redirections fonctionnent et `/success` active le plan côté client (cookie).
> **Avec Stripe**: ajoute `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` en variables d’env. Remplace les `price_id` par ceux de ton compte Stripe.

## Démarrer (mock)
```
cd demo-next
npm i
npm run dev  # http://localhost:3000/billing
```

## Démarrer (Stripe test)
```
# Terminal 1
cd demo-next
export STRIPE_SECRET_KEY=sk_test_xxx
export STRIPE_WEBHOOK_SECRET=whsec_xxx
npm i
npm run dev

# Terminal 2 (Stripe CLI - optionnel pour webhook)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
