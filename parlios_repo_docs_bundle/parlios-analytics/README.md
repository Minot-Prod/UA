# parlios-analytics

> Analytics léger sans cookies pour suivre l’usage de la boîte à outils.

## 🚀 Démarrer
1. Exposez un endpoint n8n (ex: `/webhook/log-tool-usage`).
2. Avant `analytics.js`, définissez `window.PARLIOS_N8N_ENDPOINT = '...'`.
3. Chargez `/assets/js/analytics.js` en `defer`.

## 🛠 Notes build
- Événements envoyés : `tool-open`, `tool-newtab`, `modal-close`.

## 🤝 Contribution
Créez une branche, ouvrez une PR. Respectez la checklist QA avant merge.

## 📄 Licence
© Parlios. Usage interne et projets affiliés.
