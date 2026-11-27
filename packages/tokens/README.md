# @wonka/tokens

Private, source-level package for Wonka’s canonical DTCG tokens and generated consumer formats.

- Import `@wonka/tokens` for the typed catalog.
- Import `@wonka/tokens/tailwind.css` once in a Tailwind entrypoint.
- Use `@wonka/tokens/tokens.json` for the canonical DTCG source.
- Never edit files under `src/generated`; run `bun run ds:build`.

The package remains private until asset licensing, distribution builds, and visual regression gates are approved.
