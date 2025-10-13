# Parlios Build Prompt — MarketScope AI

You are a world-class front-end engineering squad specializing in **front-only** AI tools (no backend, no external APIs). Build a **Netlify Drop-ready** preview of **MarketScope AI**, branded Parlios, using insights from `/research/marketscope_ai_report.md` if available.

## 1) Goal
Deliver a fully functional, testable prototype:
- `index.html` (or React + Vite with `index.html` entry)
- `/assets/` (icons, `logo_parlios.svg`), `/scripts/` if needed
- `README.md` (how to run + features + limits)
- `manifest.webmanifest`
- respect design tokens in `/attachments/brand_tokens.json`

## 2) UX & UI Requirements
- Dark, premium UI (bg `#0B0B0F`, text `#F5F5F5`), accent `#9EE37D`
- Clear **Input Panel** and **Output Panel**
- Buttons: **Generate**, **Copy**, **Download** (TXT/MD/HTML/CSV/ICS depending on app)
- Optional toggle: **“Brand Parlios”** → footer “Made with Parlios”
- Gamification placeholder: show **+XX points** after successful generation
- FR/EN toggle for interface labels

## 3) Functional Spec (adapt for this app)
- Implement a guided **Wizard Flow** (2–4 steps) when relevant
- Provide a structured **Output** (headings, lists, tables)
- Add **Export** buttons to download outputs
- Ensure **no network calls**; everything runs client-side

## 4) Research Integration
- At build time, incorporate best practices from `/research/marketscope_ai_report.md` (if present)
- Apply patterns: **Live Preview**, **Wizard**, **Export Engine**, **AI Hints**

## 5) Packaging (deliverables in chat)
- Show code preview (key files)
- Provide a **ZIP** with correct structure
- Add `README.md` including QA summary and how to deploy with Netlify Drop

## 6) QA (must pass)
- Accessibility: roles ARIA, keyboard nav, contrast
- Lighthouse: >= 90 (mobile & desktop)
- i18n: FR/EN labels
- Responsiveness: mobile-first + desktop 1440px
- No backend/API usage

> _Build ready for Parlios Hub integration._
