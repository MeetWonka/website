# Repository agent guidance

Before changing UI, read:

1. `design-system/manifest.json`
2. `design-system/llms.txt`
3. `design-system/components.json`
4. `design-system/assets.json`
5. `design-system/rules/catalog.json`
6. `design-system/patterns.json`
7. The relevant file under `design-system/channels/`
8. The relevant token or Storybook entry

Use `bun run ds:query -- search <term>` to discover catalogued tokens, components, assets, rules, patterns, and channels; lifecycle and policy status determine whether they are effective.
Before generating a product, website, campaign, or presentation artifact, run `bun run ds:query -- policy --channel <channel>`.

Never hard-code a visual value when a semantic or component token exists. Preserve existing visual output while tokens are extracted. Do not move the Next.js application or publish packages without an explicit migration plan.

Run `bun run ds:check`, `bun run typecheck`, `bun run test:storybook`, and `bun run storybook:build` after design-system changes.
