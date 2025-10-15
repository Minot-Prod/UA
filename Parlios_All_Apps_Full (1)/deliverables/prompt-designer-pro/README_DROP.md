# README_DROP — Prompt Designer Pro

## Utilisation
1. Ouvrez `index.html` (Netlify Drop prêt).
2. Saisissez votre prompt puis **Générer**.
3. Téléchargez le résultat via **Télécharger**.

## Intégration IA (optionnel)
- Remplacez le mock par un appel API via une **Netlify Function** (`/netlify/functions/ai-proxy`).
- Exemple minimal (JS) :
```js
export async function handler(event) {
  const { prompt } = JSON.parse(event.body||"{}");
  if(!prompt) return { statusCode:400, body: JSON.stringify({ error:'Missing prompt' }) };
  return { statusCode:200, body: JSON.stringify({ text:'DEMO — '+prompt }) };
}
```
