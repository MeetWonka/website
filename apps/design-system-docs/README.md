# Wonka Design System Docs

This workspace is the isolated Vercel entry point for the human-facing Storybook.
The Storybook source remains canonical at the repository root.

## Vercel

- Project root: `apps/design-system-docs`
- Build command: `bun run build`
- Output directory: `dist`
- Production domain: `design-system.wonka-ai.com`

Keeping the deployment wrapper in its own workspace prevents its static-output
settings from changing the main Next.js project at `www.wonka-ai.com`.
