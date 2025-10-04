# Parlios — EXV Étape 15 · Observabilité (v15)

Objectif : instrumentation **front + API** minimaliste (sans dépendances) pour logs, traces, métriques Web Vitals.
- **Hook `useTelemetry()`** : buffer d’événements avec flush périodique → `/api/telemetry`.
- **Auto-collect** : pageviews, clicks, erreurs window, métriques LCP/FID/CLS.
- **Consent-aware** : n’envoie rien si le scope `analytics` n’est pas opt-in (Étape 10).
- **Export** : `/api/telemetry/export` → NDJSON (téléchargeable), `/api/telemetry/health` → ping.

Bonnes pratiques : IP masking (côté serveur), suppression query params, denylist de champs sensibles.

## Démarrer
```
cd demo-next
npm i
npm run dev  # http://localhost:3000
```

Ouvre la page, clique, navigue → consulte `/api/telemetry/export`.
