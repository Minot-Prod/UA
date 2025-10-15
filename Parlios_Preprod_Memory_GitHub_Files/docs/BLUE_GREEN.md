# Blue‑Green — Stratégie Parlios

- **blue** = prod stable (`main`)
- **green** = pré‑prod active (`preprod`)

## Flux standard
1. PR → merge vers `preprod` → Netlify deploy preview.
2. QA gates (Lighthouse ≥ 90, A11y 0, Liens 0) → si OK : tag `release‑candidate`.
3. Switch : merge fast‑forward `preprod` → `main` (blue).
4. Rollback : revert sur `main` si incident.

## Règles
- Jamais de commit direct sur `main`.
- `preprod` purgeable à tout moment.
