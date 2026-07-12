# Mubeen's Portfolio — "The System Trace"

A portfolio site designed as a distributed systems trace: Mubeen is the root span, his projects are child spans. The visual language borrows from production observability tooling (Jaeger/Datadog-style); the navigation and copy stay in plain English throughout, so both engineers and non-technical visitors can follow it. See `plan.md` for the full product spec and `claude.md` for implementation conventions.

Live: https://portfolio-five-vert-40.vercel.app

## Stack

- **Framework:** Next.js 14 (App Router), static export (`output: 'export'`)
- **Language:** TypeScript (`strict`)
- **Styling:** Tailwind CSS + CSS custom properties for design tokens
- **Animation:** Framer Motion (`LazyMotion`, hero + panels only)
- **Fonts:** JetBrains Mono + Inter, self-hosted via `next/font`
- **Analytics:** Vercel Web Analytics (deferred-load, no cookie banner)
- **Hosting:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build   # static export written to /out
npm run lint
```

## Connecting the Contact Form

Create a form at [formspree.io](https://formspree.io) and paste its URL into `form.endpoint` in `src/content/site.ts`. Until then, submitting shows the direct-email fallback.

## Adding a Project

Content lives in `src/content/`, never in components. To add a project:

1. Open `src/content/projects.ts`.
2. Append a `Project` object (slug, name, tagline, plain-English summary, problem, decisions, stack, status, links, order).
3. Done — no component changes needed. If a component needs to change to support a new project, the component is wrong; fix the component instead.

See `claude.md` §10 for the full shape and an example entry.

## Deploying

Pushes to `main` deploy automatically via Vercel. Before pushing:

- `npm run lint` and `npm run build` must pass.
- Web Analytics must be enabled once in the Vercel dashboard (Project → Analytics → Enable) — a one-time, per-project toggle, not something committed to the repo.

## Launch Checklist (Milestone 3)

- SEO: title, description, OG/Twitter image (`public/og-image.png`), JSON-LD `Person` — all in `src/app/layout.tsx`.
- `public/sitemap.xml`, `public/robots.txt`.
- Lighthouse: run against the production URL after each deploy; target Performance ≥95, Accessibility 100, Best Practices 100, SEO 100.
- A real screen-reader walkthrough (VoiceOver/NVDA) and cross-browser check (Safari desktop + iOS) are manual steps — do these before sharing the link.
