# Parlios Starter Monorepo

This monorepo contains:
- `apps/web`   → Next.js app (MVP Parlios)
- `apps/site`  → Astro marketing site (Netlify/static)
- `apps/docs`  → Nextra docs site (Next.js + MDX)
- `packages/ui`→ Shared UI library (React + Tailwind-friendly)

## Quick start

```bash
corepack enable
pnpm i
pnpm dev # runs all apps in parallel
```

## Deploy
- `apps/site` → Netlify (static export)
- `apps/web`  → Vercel/Node host
- `apps/docs` → Any static host (Next export or Vercel)
