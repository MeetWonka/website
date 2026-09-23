# locale-path migration

## Files modified

### `src/app/[locale]/blog/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced manual ternary with `hubPath('blog', locale)`
- JSX: replaced manual `href` ternary with `itemPath('blog', locale, post.slug.current)`

### `src/app/[locale]/blog/[slug]/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced manual path ternary with `itemPath('blog', locale, slug)`
- Component: replaced manual `postUrl` and `hubUrl` ternaries with `itemPath` / `hubPath`

### `src/app/[locale]/glossary/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced hardcoded `/glossaire` path with `hubPath('glossary', locale)`
- JSX: replaced manual `href` ternary with `itemPath('glossary', locale, t.slug.current)`

### `src/app/[locale]/glossary/[slug]/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced manual path with `itemPath('glossary', locale, slug)`
- Component: replaced manual `pageUrl` ternary with `itemPath`; added `parentUrl` via `hubPath`
- `BreadcrumbSchema`: hub item now uses `parentUrl` instead of inline ternary

### `src/app/[locale]/comparisons/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced hardcoded `/comparaisons` path with `hubPath('comparisons', locale)`
- JSX: replaced manual `href` ternary with `itemPath('comparisons', locale, c.slug.current)`

### `src/app/[locale]/comparisons/[slug]/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced manual path with `itemPath('comparisons', locale, slug)`
- Component: replaced manual `pageUrl` ternary with `itemPath`; added `parentUrl` via `hubPath`
- `BreadcrumbSchema`: hub item now uses `parentUrl` instead of inline ternary

### `src/app/[locale]/case-studies/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced hardcoded `/cas-clients` path with `hubPath('case-studies', locale)`
- JSX: replaced manual `href` ternary with `itemPath('case-studies', locale, c.slug.current)`

### `src/app/[locale]/case-studies/[slug]/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced manual path with `itemPath('case-studies', locale, slug)`
- Component: replaced manual `pageUrl` ternary with `itemPath`; added `parentUrl` via `hubPath`
- `BreadcrumbSchema`: hub item now uses `parentUrl` instead of inline ternary

### `src/app/[locale]/connectors/[slug]/page.tsx`
- Added import: `hubPath, itemPath` from `@/lib/locale-path`
- `generateMetadata`: replaced manual `/connecteurs/...` path with `itemPath('connectors', locale, slug)`
- Component: replaced manual `pageUrl` and `hubUrl` ternaries with `itemPath` / `hubPath`

## Tester focus areas

- Canonical URLs in metadata for all locales (en / fr / nl): verify `hubPath` and `itemPath` return correct localized segments
  - `glossary`: en `/glossary`, fr `/fr/glossaire`, nl `/nl/woordenlijst`
  - `comparisons`: en `/comparisons`, fr `/fr/comparaisons`, nl `/nl/vergelijkingen`
  - `case-studies`: en `/case-studies`, fr `/fr/cas-clients`, nl `/nl/klantcases`
  - `connectors`: en `/connectors`, fr `/fr/connecteurs`, nl `/nl/connectoren`
  - `blog`: segment is `blog` in all three locales
- BreadcrumbSchema JSON-LD on detail pages: hub URL in the second breadcrumb item must match the localized path
- No regressions on fetch logic, JSX structure, or title labels

---

# PR B — Content Hub Sanity Schemas

Branch: `content/sanity-schemas`
PR: https://github.com/Caezarr/website/pull/8

## Files changed

### New files

- `sanity/schemas/objects/faqItem.ts` — reusable FAQ object with `question` (string, max 200) and `answer` (text). Used by all 5 content types.
- `sanity/schemas/documents/blogPost.ts` — Blog Post document with title, slug, publishedAt, excerpt, coverImage, category (enum), tags, portable-text body (with callout inline object), faq, seo. i18n-ready via `language` field.
- `sanity/schemas/documents/glossaryTerm.ts` — Glossary Term document with term, slug, shortDefinition, body, tags, faq, seo.
- `sanity/schemas/documents/comparisonPage.ts` — Comparison Page document with title, slug, competitor, excerpt, body, tags, faq, seo.
- `sanity/schemas/documents/connectorPage.ts` — Connector Page document with toolName, slug, tagline, description, useCases array (title/description/prompt, 1–6 items), toolLogo, tags, faq, seo.
- `sanity/schemas/documents/caseStudy.ts` — Case Study document with clientName, slug, sector (enum), headline, excerpt, results array (1–5 strings), body, clientLogo, publishedAt, tags, faq, seo.

### Modified files

- `sanity/schemas/index.ts` — imports and registers `faqItem` + all 5 new document schemas alongside existing types.
- `sanity.config.ts` — adds `@sanity/document-internationalization` plugin (EN/FR/NL, applied to all 5 content types); adds Blog, Glossary, Comparisons, Connectors, Case Studies sections to Studio sidebar; imports new icons (BookIcon, ComposeIcon, LinkIcon, UsersIcon).
- `src/lib/types/index.ts` — adds `FaqItem`, `BlogPost`, `GlossaryTerm`, `ComparisonPage`, `UseCase`, `ConnectorPage`, `CaseStudy` TypeScript interfaces.
- `sanity/lib/queries.ts` — adds 15 new GROQ exports: list queries, single-item queries, slug queries per type, plus `ALL_CONTENT_SLUGS_QUERY` for sitemap generation. All queries use shared `CONTENT_FIELDS`, `FAQ_FIELDS`, `IMAGE_FIELDS` fragments and filter by `$language`.
- `package.json` / `bun.lock` — `@sanity/document-internationalization@6.2.1` added.

## Tester focus areas

1. Studio sidebar: verify the 5 new sections appear and are navigable.
2. i18n plugin: when creating any of the 5 content types, confirm the EN/FR/NL language switcher appears.
3. `blogPost` body: confirm the `callout` inline object (content + type) is selectable in the portable text toolbar.
4. `connectorPage` useCases: confirm the array enforces 1–6 items.
5. `caseStudy` results: confirm the array enforces 1–5 strings.
6. TypeScript: run `bun run build` or `tsc --noEmit` — no new type errors expected.
7. GROQ queries: test in Sanity Vision with `{"language": "en"}` once documents exist.

---

# PR C — Content Hub Routes + JSON-LD + i18n Sitemap

Branch: `content/hub-routes`
PR: https://github.com/Caezarr/website/pull/9

## Files changed

### New files

**src/components/json-ld/index.tsx**
Five reusable JSON-LD schema components rendered via Next.js `<Script>`:
- `ArticleSchema` — for blog, comparison, case-study detail pages
- `FaqSchema` — for any page with a `faq` array
- `BreadcrumbSchema` — breadcrumb list on all detail pages
- `DefinedTermSchema` — for glossary terms (includes `inDefinedTermSet` pointing to /glossaire)
- `SoftwareAppSchema` — for connector pages (includes `featureList` from use-case titles)

**src/app/[locale]/blog/page.tsx**
Listing page. Fetches `BLOG_POSTS_QUERY` filtered by locale. Grid of 3 columns with title, category, excerpt, date.

**src/app/[locale]/blog/[slug]/page.tsx**
Detail page. Fetches `BLOG_POST_QUERY`. Injects `ArticleSchema` + `BreadcrumbSchema` + `FaqSchema`. Renders body via `PortableText`. Shows FAQ section if present.

**src/app/[locale]/glossaire/page.tsx**
Listing page. Fetches `GLOSSARY_TERMS_QUERY`. Card grid with term + shortDefinition.

**src/app/[locale]/glossaire/[slug]/page.tsx**
Detail page. Fetches `GLOSSARY_TERM_QUERY`. Injects `DefinedTermSchema` + `BreadcrumbSchema` + `FaqSchema`.

**src/app/[locale]/comparaisons/page.tsx**
Listing page. Fetches `COMPARISON_PAGES_QUERY`. Shows competitor label, title, excerpt.

**src/app/[locale]/comparaisons/[slug]/page.tsx**
Detail page. Fetches `COMPARISON_PAGE_QUERY`. Injects `ArticleSchema` + `BreadcrumbSchema` + `FaqSchema`. Uses `new Date().toISOString()` for `publishedAt` (ComparisonPage type has no publishedAt field).

**src/app/[locale]/connecteurs/page.tsx**
Listing page. Fetches `CONNECTOR_PAGES_QUERY`. Card grid showing toolName + tagline.

**src/app/[locale]/connecteurs/[slug]/page.tsx**
Detail page. Fetches `CONNECTOR_PAGE_QUERY`. Injects `SoftwareAppSchema` + `BreadcrumbSchema` + `FaqSchema`. Renders each use-case with its title, description, and prompt in a monospace block.

**src/app/[locale]/cas-clients/page.tsx**
Listing page. Fetches `CASE_STUDIES_QUERY`. Cards show sector, headline, excerpt, first 3 results as pills, clientName.

**src/app/[locale]/cas-clients/[slug]/page.tsx**
Detail page. Fetches `CASE_STUDY_QUERY`. Injects `ArticleSchema` + `BreadcrumbSchema` + `FaqSchema`. Dedicated "Résultats" section with full results list before the body.

### Modified files

**src/app/sitemap.ts**
Replaced static-only sitemap. Now fetches `ALL_CONTENT_SLUGS_QUERY` from Sanity and generates entries for all 5 content types x 3 locales. Hub listing pages for all sections are included as static entries. Falls back to static-only if the fetch throws.

## Tester focus areas

1. **`/comparaisons/[slug]`**: `ArticleSchema.publishedAt` is set to `new Date().toISOString()` because `ComparisonPage` has no `publishedAt` field — verify this is acceptable.
2. **`generateStaticParams`**: If Sanity is empty, returns `[]` and pages are generated on-demand at runtime.
3. **Connector `body` field**: `CONNECTOR_PAGE_QUERY` does not project `body`, so `{connector.body && <PortableText>}` never renders — harmless.
4. **Locale routing**: English uses unprefixed URLs (e.g. `/blog/my-post`), FR/NL use `/${locale}/blog/my-post`. Verify next-intl middleware from PR #7 handles this.
5. **Sitemap**: Hit `/sitemap.xml` and confirm hub pages for all 5 sections x 3 locales appear.
