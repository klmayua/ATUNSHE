# Atunse Health — Interactive Demo

A clickable, read-only walkthrough of the **Atunse Health** clinical platform design,
pulled **verbatim** from Google Stitch (project `7855123187181213813`,
"White Primary Brand System").

Built with [Astro](https://astro.build) and deployed to Vercel.

## What this is

- **59 interactive screens** + the brand logo, copied literally from Stitch (HTML + CSS, Tailwind
  and Material Symbols via CDN — exactly as Stitch generated them).
- A **login screen** with username/password **and** one-click persona buttons.
  Clicking a persona auto-fills mock credentials and drops you into a relevant screen.
- All content is **hard-coded mock data** (e.g. Dr. Amina Okafor, Dr. Samuel Ojo,
  INV-2023-089) — no backend, no real auth. The session gate is a `localStorage` flag so it
  works on a static Vercel deploy.

## Demo personas

| Persona | Username | Password | Lands on |
|---|---|---|---|
| Dr. Amina Okafor (Clinician) | `amina.okafor` | `demo-clinician` | Clinical Encounter |
| Dr. Samuel Ojo (Attending) | `samuel.ojo` | `demo-attending` | Staff Profile |
| Facility Administrator | `admin.atunse` | `demo-admin` | Administration |
| Patient (Portal) | `patient.portal` | `demo-patient` | Patient Portal |
| Mobile Reviewer | `mobile.reviewer` | `demo-mobile` | Mobile Home |

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
```

To re-pull the screens from Stitch (requires API key):

```bash
STITCH_KEY=your_key npx astro build   # not needed; pull is a separate script
node scripts/pull.mjs   # needs STITCH_KEY in env
```

## Deploy to Vercel

```bash
npm run build
vercel --prod
```

Vercel auto-detects Astro. No framework preset config required; `astro.config.mjs`
emits a static site. Push to GitHub and import the repo in Vercel for CI deploys.

## Project layout

```
scripts/pull.mjs              # pulls screens verbatim from Stitch MCP (API-key auth)
public/stitch-screens/*.html  # the 59 verbatim screen files (served in iframes)
public/assets/                # brand logo + any assets
src/data/screens.mjs          # generated manifest (id, title, group, html path)
src/data/personas.mjs         # demo personas + mock credentials
src/lib/auth.mjs              # client-side demo gate (localStorage)
src/pages/index.astro         # login (username/password + persona buttons)
src/pages/app/[screen].astro  # app shell: sidebar nav + iframe of the verbatim screen
src/pages/app/index.astro     # redirect to persona landing screen
src/styles/global.css         # login + shell styling (navy/gold brand)
```

> Note: the Stitch-generated screens rely on CDN Tailwind / Material Symbols, so the
> deployed demo needs network access to render them faithfully. To make it fully offline,
> inline those CDN assets into each screen file.
