# Wonka AI — Marketing site

**Stack:** Next.js · TypeScript · Tailwind CSS v4 · Sanity CMS · Bun

## Getting started

```bash
bun install
cp .env.example .env   # fill in your values
bun dev
```

## Commands

```bash
bun dev          # dev server (Turbopack)
bun run build    # production build
bun start        # serve production build
bun lint         # ESLint
```

## CMS

Content is managed via Sanity Studio, embedded at `/studio`. Changes reflect on the site live — no rebuild needed.

## Conventions

See [`CLAUDE.md`](./CLAUDE.md) for architecture rules, design system, and component patterns.
