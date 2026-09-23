# Wonka

## Tech Stack

- **Framework**: Next.js 16 (App Router, server components by default)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` config in `src/styles/globals.css`)
- **CMS**: Sanity (embedded studio at `/studio`, page singletons)
- **Forms**: react-hook-form + zod (when needed)
- **Button variants**: class-variance-authority (cva)
- **Navigation**: Base UI headless NavigationMenu (`@base-ui/react`)
- **Cookie consent**: vanilla-cookieconsent with GTM integration
- **Package Manager**: bun

This project is English-only. The starter's next-intl/multi-locale wiring has been stripped.

## Commands

```
bun dev           # Start dev server (Turbopack)
bun run build     # Production build
bun start         # Start production server
bun lint          # Run ESLint
```

## Project Structure

```
sanity/
├── lib/                   # client, live (defineLive sanityFetch + SanityLive), image helper, GROQ queries
└── schemas/
    ├── objects/            # imageWithAlt, ctaButton, seo, iconPicker
    └── documents/          # siteSettings, homepageContent, legalPage (shared by /terms + /privacy)
sanity.config.ts           # Studio config with singleton structure
src/
├── app/
│   ├── (studio)/studio/[[...tool]]/ # Embedded Sanity Studio (own route group, no SanityLive)
│   ├── (main)/             # Hero-led pages — overlay-dark header floats over a dark hero
│   ├── (legal)/            # Plain white pages (terms, privacy) — inline-light header in flow
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/             # Header, footer, mobile nav, page layout (CMS-driven)
│   ├── ui/                 # Primitives (button, badge, section, eyebrow, icons/)
│   ├── cookie-consent.tsx  # Cookie banner
│   └── portable-text.tsx   # Sanity rich text renderer
├── lib/
│   ├── icon-map.tsx        # Icon registry + <Icon> component
│   ├── seo.ts              # buildMetadata() helper
│   ├── types/              # TypeScript interfaces for CMS data
│   ├── utils.ts            # cn() utility
│   └── fonts.ts            # Font configuration
└── styles/
    ├── globals.css         # Design tokens + typography + nav/button CSS
    └── cookie-consent.css  # Cookie banner styles
```

## Sanity CMS

### Architecture

- **Studio**: Embedded at `/studio` (`force-static`).
- **Rendering**: Marketing pages are SSG via `export const dynamic = "force-static"` per page. Add this to every new page route. Build-time fetches require real Sanity creds in `.env`; without them the build fails — that's expected.
- **Data fetching**: `defineLive` from `next-sanity/live` exposes `sanityFetch` (used in server components) and `<SanityLive />` (mounted inside `PageLayout` — only on content routes, never on `/studio`). Standard Next.js ISR — sanityFetch handles tag-based cache automatically.
- **Live updates**: `<SanityLive />` listens to Sanity's Live Content API and triggers revalidation when documents change. **No webhook needed** — SanityLive replaces the legacy `revalidateTag` webhook flow.
- **Client config**: `useCdn: true`, `apiVersion: '2026-03-01'` in `sanity/lib/client.ts` (Sanity's recommended defaults).
- **Images**: Via `cdn.sanity.io`, optimized through `next/image` + `urlFor()` helper.
- **Visual Editing / Presentation Tool / draft mode**: intentionally NOT included. Add when needed — see https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router.

### Navigation & Footer (CMS-driven)

The `siteSettings` singleton drives the entire site shell:

- **Navigation**: Array of nav items (link or dropdown), with labels and optional children. Optional `headerCta` for a CTA button in the header.
- **Footer**: Dynamic link groups, social links, contact info, copyright name — all editable in Studio.
- **Shared Links** (`siteSettings.sharedLinks`): centralized URLs reused across CTAs site-wide so the client can update once and every button updates. Currently: `meetingUrl`, `meetingLabel`, `startAiUrl`, `wonkaBuildUrl`, `wonkaChatUrl`. To add another shared URL, extend the `sharedLinks` object in the schema, the GROQ query, and the `SharedLinks` type — then thread it through the page route.
- **PageLayout** (`src/components/layout/page-layout.tsx`) is an async server component that fetches siteSettings and passes data as props to Header and Footer. Accepts `headerVariant`: `"overlay-dark"` (default — absolute, light text/logo, sits over a dark hero) or `"inline-light"` (in-flow, dark text/logo, used by the `(legal)` route group for white pages).
- **Using siteSettings inside page sections**: PageLayout only forwards settings to Header/Footer. If a section needs a value (e.g. a shared link), the page route fetches `siteSettings` itself (in parallel with its own content via `Promise.all`) and passes the field down as a prop — see `src/app/(main)/page.tsx` for the `meetingUrl` pattern. `sanityFetch` dedupes the second fetch.

### Reusable object types

| Type           | Purpose                                |
| -------------- | -------------------------------------- |
| `imageWithAlt` | Image with hotspot + alt text          |
| `ctaButton`    | Button label + href                    |
| `seo`          | Meta title, meta description, OG image |

### Adding a new page — touch points

Each page is a **Sanity singleton** with a fixed `_id`. When adding one, these are the places that need updating:

- **Sanity schema** → `sanity/schemas/documents/` — define the document with fields grouped by section
- **Schema registry** → `sanity/schemas/index.ts` — import and register it
- **Studio structure** → `sanity.config.ts` — add as singleton under Pages with a fixed `documentId`
- **GROQ query** → `sanity/lib/queries.ts`
- **TypeScript types** → `src/lib/types/` — match the query's return shape
- **Page route** → `src/app/(main)/` for hero-led marketing pages, or `src/app/(legal)/` for plain white pages that need the inline-light header. Server component that fetches + renders. Use `sanityFetch` from `@sanity/lib/live`. Pattern: `const { data } = await sanityFetch({ query })`. Add `export const dynamic = "force-static"` for SSG. For singletons that share a schema (e.g. `legalPage` powers both `termsPage` and `privacyPage`), pass the document `_id` as a query param.
- **Metadata** → use `buildMetadata()` in `generateMetadata` (see below)
- **Sitemap** → `src/app/sitemap.ts`

### Adding sections to a page — touch points

Sections are UI components that accept CMS data as props. Each page defines its own content for every section it uses (so the client can change copy on one page without affecting others).

- **Sanity schema** — add fields/groups to the page singleton for the section's data (headings, images, CTA, etc.). Use existing object types (`imageWithAlt`, `ctaButton`, etc.)
- **GROQ query** — extend the page query to include the new fields
- **Types** — update the page's TypeScript interface to match
- **Section component** → `src/components/sections/` — create a component that accepts a `data` prop. Keep it a server component unless it needs interactivity.
- **Page route** — import the section component, pass the data from the fetched content

Key things to keep in mind:

- Section components are **UI shells** — they receive data, they don't fetch it
- Array items in Sanity schemas need `_key`. Items with named types need `_type`. Use `crypto.randomUUID().slice(0, 8)` for keys in seed scripts.
- If a section uses data from a **collection** (e.g. testimonials, team members), the page singleton defines headings/config, and the collection provides the list data. Fetch them separately.

### SEO metadata

Each page singleton should have an `seo` field. Use `buildMetadata()` from `src/lib/seo.ts`.

```tsx
export async function generateMetadata() {
  const content = await getPageContent();
  return buildMetadata(content?.seo ?? null, { path: "/your-path" });
}
```

When `seo.ogImage` is unset, no `images` are emitted from `buildMetadata()` and Next.js falls back to the file-convention OG image at `src/app/opengraph-image.jpg` (1200×630). Replace that file to change the site-wide default.

### Site URL

`src/lib/site-url.ts` exposes `getSiteUrl()`, used by `layout.tsx`, `robots.ts`, `sitemap.ts`, and `seo.ts` for canonical URLs. Resolution order: `NEXT_PUBLIC_SITE_URL` → `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` → `NEXT_PUBLIC_VERCEL_URL` → `http://localhost:3000`. The Vercel fallbacks mean the site still serves correct absolute URLs in production even if `NEXT_PUBLIC_SITE_URL` is forgotten in Vercel project settings.

### Icon system

Icons are mapped in `src/lib/icon-map.tsx`. When adding a new icon: create the component in `src/components/ui/icons/`, add to `ICON_MAP` in `icon-map.tsx`, and add to `iconOptions` in `sanity/schemas/objects/iconPicker.ts`.

## Design System

### Color tokens

The canonical source is `packages/tokens/src/wonka.tokens.json`. `bun run ds:build` generates the private `@wonka/tokens` CSS/TypeScript data, compatibility mirrors, and the public agent catalog. `src/styles/globals.css` imports `@wonka/tokens/tailwind.css`. Always use tokens, never raw hex or `bg-[#...]`.

**Raw palette** (the "default" variables — fixed colors, do not change between themes):

| Group             | Utilities                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Primary (Blue)    | `bg-blue-100` … `bg-blue-900`                                                                                        |
| Secondary (Green) | `bg-green-100` … `bg-green-900`                                                                                      |
| Neutral           | `bg-white`, `bg-light-gray`, `bg-gray`, `bg-mid-gray`, `bg-dark-gray`, `bg-light-brown`, `bg-dark-brown`, `bg-black` |

Tailwind's default color palette is wiped (`--color-*: initial`); only the tokens above + `transparent` / `current` / `inherit` exist. Standard prefixes work: `bg-`, `text-`, `border-`, `ring-`, `fill-`, etc.

**Semantic theme tokens** (resolve at use-time, switch with `[data-theme]`):

| Token            | Light (default) | Dark (`[data-theme="dark"]`) |
| ---------------- | --------------- | ---------------------------- |
| `bg-background`  | `white`         | `black`                      |
| `text-text`      | `black`         | `white`                      |
| `border-border`  | `dark-gray`     | `light-brown`                |
| `bg-accent`      | `blue-900`      | `blue-900`                   |
| `bg-accent-dark` | `blue-400`      | `blue-400`                   |

Default theme is light — no toggle needed. Switch by setting `data-theme="dark"` on `<html>` (or any ancestor; vars cascade).

### Design-system interfaces

- `bun run storybook` — human-facing foundations and component documentation.
- `bun run storybook:build` — static production Storybook.
- `bun run test:storybook` — render and accessibility tests in light and dark themes.
- `bun run ds:check` — schema, reference, asset, and generated-file validation.
- `bun run ds:query -- search <term>` — JSON search for agents and tooling.
- `bun run ds:query -- pattern <id>` — composition slots, dependencies, review triggers, and trace contract.
- `bun run ds:query -- policy --channel <channel>` — complete generation policy for product, website, campaign, or presentation.
- `public/.well-known/design-system.json` — public discovery document.
- `public/design-system/*.json` — deterministic machine-readable catalogs.

Read `design-system/README.md` before changing the token or catalog contracts.

**When to use which:**

- Use **semantic tokens** for anything theme-aware: page background, body text, default borders, brand accents.
- Use **raw palette** for explicit color choices that should not flip in dark mode (e.g. an illustration, a status pill, a chart).

### Typography

All typography utilities use the **`type-*`** prefix (not `text-*`) — `text-*` would clash with `text-{color}` utilities under tailwind-merge. With `type-*` they compose freely inside `cn()`.

| Utility                 | Mobile  | md (≥48rem) | lg (≥64rem) | Family / Weight                |
| ----------------------- | ------- | ----------- | ----------- | ------------------------------ |
| `type-h1`               | 72 / 72 | 88 / 68     | 88 / 68     | sans / 400                     |
| `type-h2`               | 40 / 44 | 52 / 52     | 64 / 64     | serif / 400                    |
| `type-h3`               | 56 / 56 | 60 / 57     | 80 / 72     | serif / 400                    |
| `type-h4`               | 40 / 45 | 42 / 47     | 52 / 58     | serif / 400                    |
| `type-h5`               | 28 / 34 | 32 / 38     | 36 / 44     | serif / 400                    |
| `type-h6`               | 22 / 28 | 24 / 30     | 28 / 32     | serif / 400                    |
| `type-body`             | 16 / 28 | —           | —           | sans / 400                     |
| `type-paragraph-m`      | 14 / 24 | —           | —           | sans / 400                     |
| `type-paragraph-m-bold` | 14 / 24 | —           | —           | sans / 500                     |
| `type-paragraph-s`      | 12 / 20 | —           | —           | sans / 500                     |
| `type-eyebrow`          | 10 / 16 | —           | —           | sans / 500, +0.07em, uppercase |

Headings use `var(--font-serif)` (except `h1`, which is sans). Faces are declared in `src/lib/fonts.ts` via `next/font/local` from `public/fonts/` and exposed as `--font-sans` (Inter Display 400/500) and `--font-serif` (GT Sectra 400).

Body inherits `type-body` from the base layer — no need to apply it on every page.

## Button System

Variants via cva (in `src/components/ui/button.tsx`): `primary`, `secondary`, `underline`.

- `<Button>` — for interactive buttons (forms, toggles)
- `<ButtonLink>` — for links styled as buttons (wraps `next/link`)

### Slanted shape pattern (`primary`, `secondary`)

Both filled variants use a custom slightly-skewed shape from Figma. The shape is **rendered as an inline `<svg>` element** absolutely positioned behind the content, not via `clip-path` — `clip-path: shape()` produced harsh edges on the curves; SVG path fills get full sub-pixel anti-aliasing.

How it works:

- The button is a `relative isolate` flex container with explicit `h-[X]` matching the Figma shape height. Padding handles horizontal spacing.
- `ButtonShape` (helper component) renders the SVG with `inset-0`, `-z-10`, `preserveAspectRatio="none"` so the path stretches to any button width. Text and icon sit above it via natural stacking order.
- The path data and viewBox come **directly from the Figma SVG export** — paste the path `d` attribute into a `*_PATH` constant and use the original viewBox (the slight asymmetry in Figma's curves is preserved this way).
- Drop shadow is applied via `filter: drop-shadow(...)` on the SVG element, so the shadow follows the actual path (not the button's bounding box).
- Hover: the SVG fades to `opacity-80`. The arrow (when present) translates `2px` right via `group-hover/btn:`.

Tradeoff: because `preserveAspectRatio="none"`, corners stretch slightly horizontally on very wide buttons (a 4px round becomes ~7px wide at ~300px width). Acceptable for typical button widths. If a wider variant ever needs perfectly crisp corners, upgrade to a 3-slice approach (fixed-width SVG caps + stretchy middle).

### Inner glow (`primary`)

The bottom-right bloom on the primary button is **a separate `<span>` overlay** layered over the SVG, _not_ a `<radialGradient>` inside the SVG. Putting the gradient as a second `<path fill="url(#…)">` inside the same SVG didn't render reliably (likely an interaction between `preserveAspectRatio="none"` and gradient `userSpaceOnUse` coordinates).

Pattern:

- The overlay span is at `inset-0 -z-10`, same stacking as the SVG, after it in DOM (renders on top of the blue, below text).
- Background is a CSS `radial-gradient(...)` — fully tunable in DevTools without rebuilding.
- The span is clipped to the button shape via `mask-image: url("data:image/svg+xml,…")` where the data URI inlines the same path used by the SVG. `mask-size: 100% 100%` stretches the mask to match the button width.
- A `*_MASK_URL` module-level constant computes the data URI once via `encodeURIComponent`.
- The overlay shares the SVG's hover transition (`group-hover/btn:opacity-80`) so the bloom fades together with the fill.

To tune the bloom: edit the `radial-gradient(…)` CSS string. Position via `at X% Y%`, size via the ellipse dimensions, brightness via the white stop's alpha.

### Adding a new shaped variant

1. Export the shape from Figma as SVG.
2. Add a `*_PATH` constant with the `d` attribute, and a case in `ButtonBackgroundShape` with the matching `viewBox` and `fill`.
3. Add the variant to the `cva` config with `isolate`, an explicit `h-[X]` (matching the path's vertical extent), and the right horizontal padding + type utility.

## Page layout primitives

Homepage is the design source of truth. Reuse these on all marketing pages:

- **`src/lib/design-tokens.ts`** — `headingClass` (hero / section / subsection / card) and `radius` (xs / sm / full)
- **`SectionHeader`** — eyebrow + `type-h4` title + body; single-color titles only (no grey second lines)
- **`Surface`** — `card` (`rounded-sm`), `panel` (wide banners), `callout` (`rounded-xs`), `pill` (`rounded-full`)
- **`Section`** — standard content width (`max-w-[84rem]`); use `wide` for full-bleed panels

Do not use `rounded-lg`, `rounded-2xl`, or `rounded-3xl` on marketing pages.

## Architecture Rules

- Server components by default. Only add `"use client"` for interactivity.
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes.
- Use `<ButtonLink>` for link-buttons, `<Button>` for interactive buttons.
- Sanity content is fetched in server components only — never in client components.
- Use `@sanity/*` path alias for imports from the `sanity/` directory.
- Use `Link` from `next/link`.
- `<SanityLive />` mounts inside `PageLayout` so it runs on content routes only. The Studio lives in its own `(studio)` route group with no `SanityLive`, matching Sanity's documented route-separation pattern (otherwise the Studio soft-refreshes on tab focus when the EventSource reconnects).
- Cache Components (`cacheComponents: true`) is intentionally OFF. Sanity's docs don't cover the interaction; flipping it on requires empirical Suspense placement we don't want to bake into the starter. The current ISR + SanityLive pattern is what Sanity documents end-to-end.

## Code Style

- **No unnecessary comments.** Clean code speaks for itself.
- Use **rem** units, never hardcoded pixel values.
- Use native Tailwind utility classes over arbitrary values when possible.
- Typography utilities use the `type-*` prefix (e.g. `type-h2`, `type-body`) — see Design System → Typography.
