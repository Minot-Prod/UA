# Parlios Toolbox — Intégration Web

## Deux options d'intégration

### 1) iFrame prêt à l'emploi (recommandé)
```html
<!-- Dans votre page -->
<iframe
  title="Parlios Widget"
  src="/apps/<APP_ID>/public/embed.html?ua=https://<n8n-domain>/webhook/ua/router"
  width="100%"
  height="420"
  style="border:0"
  loading="lazy">
</iframe>
```

### 2) Script loader (injection dans un conteneur)
```html
<div id="toolbox-slot"></div>
<script src="/apps/<APP_ID>/public/loader.js"></script>
<script>
  ParliosWidget.mount(
    document.getElementById('toolbox-slot'),
    { path: '/apps/<APP_ID>/public/embed.html', ua: 'https://<n8n-domain>/webhook/ua/router', height: '420px' }
  );
</script>
```

## Contrat JSON backend
Requête:
```json
{ "app_id": "<APP_ID>", "intent": "RUN|DEMO|PING", "payload": { } }
```
Réponse attendue:
```json
{ "ok": true, "app_id": "<APP_ID>", "intent": "RUN", "result": { } }
```

## Dossiers importants
- `/toolbox/index.json` — Inventaire des widgets.
- `/toolbox/widgets.html` — Galerie interne pour QA.
- `/apps/<APP_ID>/public/embed.html` — Widget iframe.
- `/apps/<APP_ID>/public/loader.js` — Loader JS.
- `/apps/<APP_ID>/public/manifest.json` — Métadonnées.

## Notes
- Aucun secret en clair. Configurez l’URL n8n côté infra.
- Fallback local actif si `ua` absent. Utile pour démos hors ligne.
- Accessibilité AA, color-scheme dark/light.
