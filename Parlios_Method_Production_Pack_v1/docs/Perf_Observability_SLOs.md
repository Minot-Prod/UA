# Performance, Observabilité & SLO

## Budgets par défaut (Web)
- TTFB ≤ 800 ms
- LCP ≤ 2500 ms
- CLS ≤ 0.10
- JS total ≤ 300 KB

## Télémétrie (client + API)
- Pageviews, clics, erreurs JS
- Web Vitals (LCP/FID/CLS)
- Export NDJSON, santé `/api/.../health`

## Indicateurs & SLO
- Taux d’erreurs 5xx < 1%
- Latence p95 API < 1200 ms
- Disponibilité mensuelle ≥ 99.5%

## Alertes minimales
- 5xx burst, latence anormale, quota dépassé
