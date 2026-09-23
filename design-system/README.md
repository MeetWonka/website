# Wonka Design System

This directory is the source of truth for Wonka’s visual language across products, websites, campaigns, presentations, and agent-generated artifacts.

The system is developed as private workspace packages inside the website repository. This keeps production consumers live while package, licensing, and release contracts mature.

## Source and generated files

| Role                 | Canonical source                           | Generated consumer                            |
| -------------------- | ------------------------------------------ | --------------------------------------------- |
| Tokens               | `../packages/tokens/src/wonka.tokens.json` | `../packages/tokens/src/generated/tokens.css` |
| Token API            | `../packages/tokens/src/wonka.tokens.json` | `../packages/tokens/src/generated/tokens.ts`  |
| Agent token catalog  | `../packages/tokens/src/wonka.tokens.json` | `public/design-system/tokens.json`            |
| Component catalog    | `components.json`                          | `public/design-system/components.json`        |
| Asset catalog        | `assets.json`                              | `public/design-system/assets.json`            |
| Rule catalog         | `rules/catalog.json`                       | `public/design-system/rules.json`             |
| Exceptions           | `rules/exceptions.json`                    | `public/design-system/exceptions.json`        |
| Composition patterns | `patterns.json`                            | `public/design-system/patterns.json`          |
| Channel contracts    | `channels/*.json`                          | `public/design-system/channels.json`          |
| System manifest      | `manifest.json`                            | `public/design-system/manifest.json`          |
| Agent guidance       | `llms.txt`                                 | `public/design-system/llms.txt`               |

Never edit generated files directly.

## Commands

```bash
bun run ds:build
bun run ds:check
bun run ds:query -- manifest
bun run ds:query -- tokens
bun run ds:query -- token semantic.color.background --theme dark
bun run ds:query -- component component.button
bun run ds:query -- asset asset.logo.wordmark
bun run ds:query -- rule rule.no-raw-color
bun run ds:query -- pattern pattern.presentation.decision-slide
bun run ds:query -- channel presentation
bun run ds:query -- policy --channel campaign
bun run ds:query -- search focus
bun run storybook
bun run storybook:build
bun run test:storybook
```

## Published interfaces

- `https://design-system.wonka-ai.com` is the human-facing Storybook.
- `https://www.wonka-ai.com/design-system` is the human and machine catalog hub.
- `https://www.wonka-ai.com/.well-known/design-system.json` is the agent discovery document.

The Storybook deploys as the isolated `apps/design-system-docs` Vercel project.
Its static build settings must not be applied to the main Next.js project.

## Token model

Tokens use four layers:

1. **Primitive:** fixed colors, dimensions, shadows, typography, and motion.
2. **Semantic:** intent that can change by theme, such as `semantic.color.background`.
3. **Component:** approved decisions for a component, such as `component.button.primary.background`.
4. **Channel:** product, website, campaign, and presentation contracts that preserve semantic intent.

Patterns sit above those layers. Each pattern declares composition slots, compatible
channels, required dependencies, human-review triggers, and the trace fields an agent
must return. Pattern IDs are stable contracts; Storybook is their visual projection.

Consumers use semantic or component tokens. Raw primitive values are reserved for illustrations, data visualisation, and explicitly approved fixed-color assets.

Channel distribution is resolved fail-closed. `external` is the default exposure for any mixed or client-facing surface; `verified_internal` assets are eligible only in a dedicated `internal` channel. Product remains external until internal product tooling has its own channel contract.

## Change lifecycle

Brand entities use `draft → beta → stable → deprecated → retired`. Rules and channels remain `review_required` until a human approver and timestamp are recorded.

Every candidate release has a semantic version and an immutable `brandVersionId`. Breaking token, component, pattern-slot, trace-field, or story-contract changes require a major version; additive patterns require a minor version. A release is only effective when the manifest and its channel are human-approved.

Rule exceptions suppress one fingerprinted finding in one exact file. They carry an owner, approval provenance, and expiry, and can only target an active rule that explicitly permits exceptions. File-wide and directory-wide exemptions are rejected.

## Workspace packages

- `@wonka/tokens` owns the DTCG source and generated CSS/TypeScript/catalog outputs.
- `@wonka/react` owns portable Button, Badge, Eyebrow, Section, and Surface primitives.
- Application files under `src/components/ui` remain compatibility adapters; the ButtonLink adapter injects Next.js navigation.
- Logo, LogoMark, fonts, and other rights-sensitive assets stay in the application until their licenses and distribution rules are approved.

Both packages are private source packages. Publication requires compiled distribution artifacts, visual regression baselines, and human approval.

## Next production gates

1. Run Storybook render and accessibility tests in light and dark themes on every design-system change.
2. Establish reviewed pixel baselines for components and channel templates.
3. Add a fingerprinted legacy-debt baseline before extending raw-value rules across the full application.
4. Build deterministic campaign and presentation exporters against the channel policy API.
5. Expose the stable query and validation contracts through MCP.
