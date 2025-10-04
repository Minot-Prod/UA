# Parlios — EXV Étape 17 · Générateurs IA prêts-prod (v17)

Objectif : livrer un **framework de génération IA** robuste (timeouts, retries, idempotency, gating, export) — zéro dépendance externe. Un **provider mock** est inclus (démo locale). Plug & play pour OpenAI ensuite.

## Capacités
- **Adapter provider** (`lib/ai.ts`): timeout, abort (AbortController), retry **exponentiel**, idempotency (`X-Idempotency-Key`).
- **Validation inputs** (schema léger) + **sanitization** (ban patterns).
- **Rate limit** par workflow (in-memory, MVP).
- **Streaming (optionnel)**: NDJSON (démo). 
- **Exports**: téléchargement .md prêt à partager.
- **Gating**: respecte `gating.feature_flags` (Étape 14).

## Démarrer
```bash
cd demo-next
npm i
npm run dev  # http://localhost:3000
```
- Page `/` : formulaire générateur (Plan d’affaires / Brief Finance).  
- Endpoint : `POST /api/ai/generate` (mock).  
- Bouton **Télécharger** pour récupérer le livrable `.md`.
