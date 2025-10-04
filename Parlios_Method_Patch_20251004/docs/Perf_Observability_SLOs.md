# Performance & Observability — SLOs (v2025-10-04)

## Core Web Vitals — Targets (p75, mobile & desktop)
- **LCP ≤ 2.5 s**
- **INP ≤ 200 ms**  ← remplace FID depuis 2024‑03‑12
- **CLS < 0.10**

### Page-level budgets (soft → hard fail)
| Page type | LCP | INP | CLS | JS (transfer) | Images (transfer) |
|---|---:|---:|---:|---:|---:|
| Landing (marketing) | 1.8 s | 150 ms | 0.05 | ≤ 200 KB | ≤ 400 KB |
| App/Dashboard | 2.5 s | 200 ms | 0.10 | ≤ 300 KB | ≤ 500 KB |

## Build-time performance budgets
- JS total (post‑tree‑shaking) ≤ 300 KB (gzip)
- 3rd‑party scripts ≤ 1
- Critical CSS ≤ 20 KB
- Font files ≤ 2 (swap + preconnect)
- Images: AVIF/WebP par défaut, responsive `srcset`, lazy

## Observability
- Traces **OpenTelemetry** (frontend + backend) : page load, API calls, key user flows.
- Error budgets reliés aux SLOs (alertes Slack/Discord si > 1% sessions en rouge).

## CI enforcement
- **Lighthouse CI**: bloque PR si p75 dépasse les seuils.
- **WebPageTest (optionnel)**: smoke test 1 run mobile + 1 run desktop.
- Export JSON LHCI en artefacts CI + badge README.
