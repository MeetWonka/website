# @wonka/wonkachat-lab

Motion-design companion for WonkaChat, living as a workspace app inside the
`website` monorepo (`apps/wonkachat-lab`) so the product's component library
sits next to the brand design system (`apps/design-system-docs`) under one
GitHub history and one Vercel org. It has its own `package.json`, its own
Storybook (`@storybook/react-vite`, Tailwind v3) — kept independent from the
site's Next.js Storybook build to avoid framework conflicts — while both are
cross-linked so the two read as one design system.

Deployed at `wonkachat.wonka-ai.com`.

The goal: give a designer real, interactive React components that faithfully
recreate WonkaChat's actual markup and Tailwind classes, so motion design
(animations, transitions, micro-interactions) can be iterated on by
clicking/hovering the real thing in Storybook — not a static mockup — with a
**motion brief** documented next to every component.

WonkaChat's own repo was only ever *read* to research this project. Nothing
was written, staged, or committed there.

## Stack & why

| Choice | Reasoning |
|---|---|
| Vite + React + TypeScript | Matches WonkaChat's own client build (Vite + React), fastest path to a faithful port. |
| **npm** (not bun) | WonkaChat's root has *both* `bun.lock` (newer, Aug 24) and `package-lock.json` (Aug 18), so the repo itself is mid-migration/ambiguous. npm was chosen for this standalone project because it needs zero extra tooling assumptions and Storybook's own installer/tooling is most exercised against npm — the safest default for a project other people (designers, not necessarily WonkaChat backend engineers) will run. |
| Tailwind CSS v3 + `tailwindcss-animate` + `tailwindcss-radix` | Same plugins WonkaChat's `client/tailwind.config.cjs` uses. |
| framer-motion `^12.23.6` | Pinned to match `packages/client/package.json` (WonkaChat's shared component library), which is ahead of `client/package.json`'s `^11.18.2` — see reconciliation notes below. npm's resolver bumped the installed version to `12.43.0` within that range; still API-compatible. |
| `@ariakit/react` `^0.4.39` | Matches what `packages/client/src/components/Tooltip.tsx` actually uses (`^0.4.16`, `client/package.json` pins `^0.4.23`) — installed after an earlier pass in this lab had substituted `@radix-ui/react-tooltip` instead; that substitution has been fully reverted (see reconciliation notes). |
| `dompurify` `^3.4.15` | The real Tooltip's `enableHTML` sanitization path (`packages/client` pins `^3.2.6`, `client` pins `^3.3.3`) — needed once Tooltip.tsx was ported verbatim. |
| `react-resizable-panels` `^3.0.6` | Matches `client/package.json`'s pin (`^3.0.2`) — installed after an earlier pass had substituted a framer-motion width animation for `SidePanel.tsx`; that substitution has been fully reverted (see reconciliation notes). |
| Radix UI primitives | Only the ones ported components actually use: `react-dialog`, `react-switch`, `react-avatar`, `react-slot`, `react-popover` (added for `ConnectAppsMenu.tsx`, matching `client/package.json`'s `^1.0.7` pin — npm resolved `1.1.23`). (`react-dropdown-menu`, `react-tabs`, and `react-tooltip` were removed once the components that had substituted them onto Radix — AgentCard's menu, UserManagementTable's role picker, and Tooltip itself — were corrected to match their real, non-Radix implementations.) |
| Storybook 10 (`@storybook/react-vite`) | Interactive stories + MDX-capable docs (`@storybook/addon-docs`) via the official Vite framework, matching the app's own bundler. |

## Tailwind reconciliation notes

WonkaChat has **two** Tailwind configs that diverge:

- `WonkaChat/client/tailwind.config.cjs` — the product app. Defines the real
  font stack (Inter Display / GT Sectra / Cascadia Mono), keyframes
  (accordion, slide-in/out), and every semantic color as a CSS custom
  property (`--surface-primary`, `--text-secondary`, `--border-light`, …)
  plus a legacy `shadcn`-style HSL palette (`--background`, `--primary`, …).
- `WonkaChat/packages/client/tailwind.config.js` — the shared component
  library. Colors are generated programmatically via
  `createTailwindColors()` (a themeable token generator we don't have a build
  step for standalone) and it defines **no** fontFamily/keyframes of its own
  — it inherits those from whatever app consumes it.

This project's `tailwind.config.js` merges them by keeping the *concrete* CSS
variable names and values from `client/tailwind.config.cjs` (since those are
what's literally referenced in every component's `className`), sourced from
the actual variable definitions in `client/src/style.css` and
`client/src/wonka-design-system.css`. `src/index.css` ports those variables
(light + dark) verbatim.

Other discrepancies found, and their current status:

- **Tooltip is Ariakit, not Radix — FIXED.** WonkaChat's real `Tooltip.tsx`
  (`packages/client/src/components/Tooltip.tsx`) is built on `@ariakit/react`.
  An earlier pass in this lab had substituted `@radix-ui/react-tooltip`
  instead; `src/components/primitives/Tooltip.tsx` is now a verbatim port on
  `@ariakit/react` (`TooltipProvider`/`TooltipAnchor`/`Tooltip`/
  `TooltipArrow`, `DOMPurify` sanitization for `enableHTML`, the same
  `x`/`y` offset-by-placement math). One faithful note: the source's
  `motion.div` has no explicit `transition` prop, so it rides framer-motion's
  default spring rather than a `motion-tokens.ts` value — kept as-is. Since
  Ariakit's tooltip store lives per-anchor (not app-wide like Radix's
  provider), the `<TooltipProvider>` wrapper stories used has been dropped.
- **`react-resizable-panels` (SidePanel) — FIXED.** The real `SidePanel.tsx`
  resizes against sibling panels via `react-resizable-panels`; an earlier
  pass here had substituted a framer-motion-animated fixed `width` instead.
  `src/components/sidepanel/SidePanel.tsx` is now a verbatim port on the real
  library (`ResizablePanel`, `collapsedSize`/`minSize`/`maxSize`/
  `collapsible`, the same `onExpand`/`onCollapse` callbacks and the same
  plain-CSS `transition: width 0.2s ease, visibility 0s linear 0.2s` — no
  spring), plus a faithful `NavToggle.tsx` port. Since this lab has nothing
  else to resize against, `src/components/sidepanel/Resizable.tsx` (a
  verbatim port of `packages/client/src/components/Resizable.tsx`) is paired
  with a minimal `ResizablePanelGroup` + placeholder "messages view" `Panel`
  in `SidePanel.stories.tsx` — `SidePanel.tsx`'s own internals are otherwise
  untouched. Its own placeholder link list is intentionally left as-is (see
  "SidePanel.tsx / Nav.tsx naming" below for why the *actual* left nav is a
  separate, new file rather than a change to this one).
- **SidePanel.tsx / Nav.tsx naming — clarified.** `src/components/sidepanel/
  SidePanel.tsx` (above) is a faithful port of WonkaChat's real
  `client/src/components/SidePanel/SidePanel.tsx` — the *right-hand*
  artifacts/controls rail — which itself renders a placeholder instead of
  the real `Nav.tsx` it composes (see previous bullet). That's a genuinely
  different component from the *left* chat-history nav, which the real app
  also happens to name `Nav.tsx` (`client/src/components/Nav/Nav.tsx`).
  `src/components/sidepanel/Nav.tsx` is that left nav, a separate file
  (`SidePanel.tsx` is untouched).
- **`Nav.tsx`'s nested-accordion structure — WAS ON A DIFFERENT BRANCH, now
  ported.** A prior pass here read `Nav/Nav.tsx` off whichever branch was
  checked out in the main WonkaChat working directory at the time
  (`preview-feature/onboarding`) and, correctly for *that* branch, found a
  flatter nav with no nested "Agents"/"Customize" accordion — its doc
  comment said as much. The nested structure Gabriel actually wants (Agents
  → All agents / Pinned agents (count badge) / Recent Agents (count badge);
  Customize → Connectors / Skills / Prompts; Conversations → History /
  Projects / Bookmarks, each an independently-toggled `NavCollapsibleSection`
  / `NavNestedDisclosure`) does exist — on `preview-feature/agent-creation-ux`,
  a *different* branch, checked out in another git worktree the whole time.
  That branch was read exclusively via
  `git show preview-feature/agent-creation-ux:<path>` from inside the main
  WonkaChat directory (never `git checkout`'d there — see "Confirming
  WonkaChat was untouched" below), covering `Nav/Nav.tsx`, the new
  `Nav/NavSections.tsx` (the three shared accordion primitives —
  `NavCollapsibleSection`/`NavSubLink`/`NavNestedDisclosure`, now ported to
  `src/components/sidepanel/NavSections.tsx`), `Nav/AccountSettings.tsx`,
  and `Nav/SidebarSearchInput.tsx` (now
  `src/components/sidepanel/SidebarSearchInput.tsx` — a full-width bordered
  search box, not the icon-that-widens-into-an-input the `onboarding`
  branch's `SearchBar.tsx` behavior had led the prior pass to build).
  **If this nav's design changes again, re-sync from
  `preview-feature/agent-creation-ux` specifically** — not whatever branch
  happens to be checked out in the main `WonkaChat/` directory at the time;
  confirm which branch actually has the change first (`git branch -a` shows
  the currently-checked-out one with a `+`; read others via `git show
  <branch>:<path>` without touching the working tree). See `Nav.tsx`'s own
  doc comment for the full per-section provenance and what's mocked
  (`ProjectsSection`'s pin/rename/delete dialogs and paginated queries,
  `BookmarkSection`'s real tag source, `ArchivedChatsTable`'s real pagination
  — all flattened to local mock arrays, same simplification pattern as the
  rest of this lab).
- **`UserManagement.jsx` is ~3000 lines** (org billing, per-user spend
  limits, share links, Stripe subscription state, all wired to `fetch()`
  calls). Only the piece with real interaction/motion potential — the
  unified members+invitations table with sortable columns (including the
  real multi-column sort index badge) and the send-invitation flow — was
  ported, with an in-memory mock roster replacing every network call. The
  role control was corrected from an earlier pass's Radix `DropdownMenu` to
  the real source's plain `<select>` (role/status render as static pill
  `<span>`s outside of row-level edit mode). See
  `src/components/org/UserManagementTable.tsx` for the full provenance note.
- **`MessageBubble.tsx` was a chat "bubble" — FIXED.** WonkaChat doesn't
  render messages as bubbles at all: production is a LibreChat-style
  full-width row per turn (avatar + name label + content, no colored
  background), and the streaming cursor is a CSS `content: '⬤'`
  pseudo-element (`.result-streaming`/`.submitting`, ported verbatim from
  `client/src/style.css` into `src/index.css`), not a framer-motion element.
  `src/components/chat/MessageBubble.tsx` now follows
  `Chat/Messages/ui/MessageRender.tsx` + `Content/Container.tsx` +
  `Content/MessageContent.tsx`'s structure and CSS classes; the real SSE
  token stream, `Markdown` rendering pipeline, and `HoverButtons`/`SubRow`
  (copy/regenerate/edit) remain out of scope (mocked with a local
  `setInterval` / plain text).
- **`MessageBubble.tsx`'s empty/loading-state alignment — FIXED.** Diffing
  the "bubble" fix above against the real source again turned up a second,
  narrower gap: the row was missing `MessageRender.tsx`'s
  `md:max-w-[47rem] xl:max-w-[55rem]` width clamp entirely, `Container.tsx`'s
  `[.text-message+&]:mt-5` stacked-parts gap was dropped, and — the actual
  visible misalignment — the pre-first-token loading state didn't match
  `MessageContent.tsx`'s dedicated `LoadingFallback` (`mb-[0.625rem]` instead
  of `Container`'s `gap-3`, and the pulsing dot wrapped in a plain
  `<div className="absolute">` so it can't grow the row's height). All
  three restored; `TypingIndicator` updated to match.
- **Composer entirely missing — ADDED.** This lab had no chat input at all.
  `src/components/chat/Composer.tsx` ports `Chat/Input/ChatForm.tsx`'s
  rounded composer bar (`border-brand-400/30 bg-surface-chat shadow-brand`)
  + `ChatInputActions.tsx`'s "+" menu + `AudioRecorder.tsx`'s mic button +
  `SendButton.tsx`, verbatim on structure/classNames. Three supporting
  real components came with it: `Tools/ConnectAppsMenu.tsx` (→
  `ConnectAppsMenu.tsx`, the "N integrations connected" pill — newly needs
  `@radix-ui/react-popover`, see Stack table) + `Tools/ConnectorIconStack.tsx`
  (→ `ConnectorIconStack.tsx`, verbatim), and `Chat/Landing.tsx` +
  `Chat/Landing/TabbedSuggestions.tsx` (→ `EmptyStateLanding.tsx`, the
  empty-chat headline + suggested-action rows). `Chat/Menus/Endpoints/
  ModelSelector.tsx`'s `variant="chat"` trigger pill is ported as
  `ModelSelectorPill.tsx`, but simplified to a plain dropdown — the real
  trigger markup is verbatim, the real open-menu (`CustomMenu.tsx`, a full
  Ariakit combobox with model specs/search) is not, since this lab has no
  endpoint/model catalog to back it. See each component's own doc comment
  for the full stripped/mocked list (real MCP server discovery, speech-to-
  text, react-hook-form, and the mobile-keyboard viewport handling are the
  biggest cuts).
- **`AgentCard.tsx` / `MCPServerStatusIcon.tsx` loading spinners — FIXED.**
  Both had been reimplemented as framer-motion `animate={{ rotate: 360 }}`
  loops; the real component is `packages/client/src/svgs/Spinner.tsx`, an SVG
  ring driven by a plain CSS `@keyframes spinner-rotate`. Both now use a
  verbatim port of that component (`src/components/primitives/Spinner.tsx`).
  `AgentCard.tsx` also had drifted class names (missing the responsive
  `sm:h-11 sm:w-11` avatar sizing, the `wonka-agent-card__actions`/
  `wonka-agent-card__primary-action` marker classes the real CSS hooks
  layout into, and `hover:bg-surface-secondary/30`) — all restored, along
  with the matching `wonka-agent-card*` CSS in `src/index.css` (translated
  onto this lab's concrete tokens instead of the generated `--ds-component-*`
  design-system variables, same simplification as `wonka-signal-button`).
- **`Badge.tsx` had dropped responsive/disabled states — FIXED.** The
  `md:` label-hiding/icon-sizing classes and the `id === '1' && isInChat`
  disabled state (WonkaChat disables removing the primary built-in tool
  while it's active in a running chat) had been dropped in an earlier
  pass; both restored.
- **`Button.tsx` / `Dialog.tsx` had minor class drift — FIXED.** `Button`'s
  `destructive`/`ghost`/`link` variants were using ad-hoc colors instead of
  the shared `destructive-foreground`/`accent-foreground` tokens and the
  dark-mode link color. `Dialog`'s overlay used a flat `bg-black/60` instead
  of the source's `color-mix(...)` expression, and its content had gained an
  unsourced `max-w-md`; `DialogClose`/`DialogButton` (exported by the real
  file but previously dropped) were added back.
- **Nothing left depends on app-wide context that can't be mocked simply.**
  Every remaining gap between this lab and production (Nav.tsx's accordion
  tree, MessageIcon's per-endpoint avatar resolution, HoverButtons/SubRow,
  UserManagement's billing/usage/limits) is a deliberate scope cut, called
  out inline in the relevant component's doc comment — not something that
  *couldn't* be ported, just lower motion value for the size of this lab.

## Motion tokens

`src/motion-tokens.ts` is the single source of truth for animation timing.
Every ported component imports from it rather than hand-writing a duration or
easing curve:

- `easings` — cubic-bezier arrays (`standard`, `decelerate`, `accelerate`, `emphasized`).
- `durations` — Framer Motion transition objects (`instant`/`fast`/`standard`/`emphasized`/`slow`), ready to spread into a `transition` prop.
- `springs` — Framer Motion spring configs (`snappy`/`standard`/`gentle`/`bouncy`).
- `variants` — common `initial`/`animate`/`exit` shapes for `AnimatePresence` (`fadeIn`, `fadeScaleIn`, `slideUpIn`, `slideDownIn`).

Deliberate exceptions (documented inline in each component, not silently
ad-hoc): indefinite `repeat: Infinity` loops (typing indicator dots, loading
spinners, blinking stream caret) are a different animation family from
one-shot UI transitions and aren't tokenized here.

## Running Storybook

```bash
cd "/Users/gabriel/Desktop/Wonka/Code Wonka/wonkachat-motion-lab"
npm install        # already run once during setup; re-run after pulling changes
npm run storybook  # http://localhost:6006
```

To confirm there are no build errors (e.g. before sharing a link):

```bash
npm run build-storybook   # outputs static/, gitignored
```

Both `npm run storybook` and `npm run build-storybook` were verified to run
clean during setup (only a harmless "large chunk" bundling notice from
`build-storybook`, no errors).

## Adding a new ported component

Follow this pattern (see any existing component for a full example):

1. **Pick the source file(s) in WonkaChat** (read-only!) and note the exact
   classNames/DOM structure you're preserving.
2. **Create the component** under `src/components/<domain>/ComponentName.tsx`
   (domains so far: `primitives`, `chat`, `mcp`, `agents`, `sidepanel`, `org`).
   - Start the file with a doc comment: what it's ported from, and what was
     stripped/replaced (backend calls → local mock state, missing deps →
     substitutions) and why.
   - Import timing from `../../motion-tokens` — never hand-write a duration,
     ease curve, or spring.
   - Replace any WonkaChat-only hook/context (`useLocalize`, `useToastContext`,
     `data-provider` queries, router hooks) with local `useState`/mock data.
3. **Create `ComponentName.stories.tsx` next to it** — one story per
   meaningful state (default, hover-driven via Storybook's own hover, loading,
   error, empty, expanded/collapsed, etc.), plus one story literally named
   `MotionBrief` whose `render` (or reused `args`) shows off the component in
   the state that best demonstrates its motion.
4. **On the `MotionBrief` story, add a JSDoc-style comment block** directly
   above it titled `## Motion brief` covering:
   - **Trigger** — mount / hover / click / state-change that fires the motion.
   - **Tokens used** — which `motion-tokens.ts` export(s), or an explicit note
     if none apply yet (with a TODO).
   - **Before → after** — the concrete visual state change.
   - **Rationale** — why that motion treatment, especially if it changes
     behavior versus the WonkaChat source (most ports add motion the source
     didn't have — say so).
5. Run `npm run build-storybook` to confirm no build errors before considering
   the component done.

## Components ported so far

**Primitives** (`src/components/primitives/`)
- [x] `Button.tsx` — faithful port, `wonka-signal-button` gradient variant kept; variant class drift (destructive/ghost/link tokens) fixed.
- [x] `Badge.tsx` — pinned-tool chip, already framer-motion native in source; restored the responsive `md:` classes and the `isInChat` disabled state a prior pass had dropped.
- [x] `Switch.tsx` — faithful Radix-based port.
- [x] `Dialog.tsx` — faithful Radix-based port (responsive breakpoint reimplemented locally); overlay color and an unsourced `max-w-md` fixed, `DialogClose`/`DialogButton` added back.
- [x] `Tooltip.tsx` — verbatim port on `@ariakit/react`, matching the real source (a prior pass had substituted `@radix-ui/react-tooltip` — reverted).
- [x] `Spinner.tsx` — verbatim port of `packages/client/src/svgs/Spinner.tsx` (an SVG ring, CSS `@keyframes spinner-rotate`), used by AgentCard and MCPServerStatusIcon's loading states.
- [x] `Avatar.tsx` — synthesized from the inline avatar pattern in `AgentCard.tsx` (no dedicated source component existed).

**Chat** (`src/components/chat/`)
- [x] `MessageBubble.tsx` — ported from `Chat/Messages/ui/MessageRender.tsx` + `Content/Container.tsx` + `Content/MessageContent.tsx`: avatar + name-label row (not a bubble), CSS `result-streaming`/`submitting` pseudo-element cursor, plus a `TypingIndicator`. A prior pass had built this as a colored chat bubble with a framer-motion caret — reverted, since WonkaChat doesn't render messages as bubbles at all. This pass additionally fixed the empty/loading-state's alignment against the real `LoadingFallback` markup (see reconciliation notes).
- [x] `Composer.tsx` — the chat input bar, ported from `Chat/Input/ChatForm.tsx` + `ChatInputActions.tsx` + `AudioRecorder.tsx` + `SendButton.tsx`. Was entirely missing before this pass. See reconciliation notes for the full breakdown and what's simplified.
- [x] `ConnectAppsMenu.tsx` — the composer's "N integrations connected" pill, ported from `Tools/ConnectAppsMenu.tsx`; real MCP discovery replaced with a static mock catalog + fake connect delay.
- [x] `ConnectorIconStack.tsx` — verbatim port of `Tools/ConnectorIconStack.tsx`, the overlapping-avatar stack shared by `ConnectAppsMenu` and `EmptyStateLanding`.
- [x] `ModelSelectorPill.tsx` — the composer's model/agent picker pill, ported from `Chat/Menus/Endpoints/ModelSelector.tsx`'s `variant="chat"` trigger (verbatim classNames); the real Ariakit combobox menu behind it is simplified to a plain dropdown (no endpoint/model catalog in this lab).
- [x] `EmptyStateLanding.tsx` — the empty-chat headline + suggested-action rows, ported from `Chat/Landing.tsx` + `Chat/Landing/TabbedSuggestions.tsx`; the real time-of-day greeting and MCP-driven suggestion selection are replaced with static props.

**MCP** (`src/components/mcp/`)
- [x] `MCPServerStatusIcon.tsx` — all five connection states (initializing/connecting/disconnected/oauth/error/connected), animated cross-fade between them, using the real `<Spinner />` for loading states (a prior pass had substituted `lucide-react`'s `Loader2` — reverted).

**Agents** (`src/components/agents/`)
- [x] `AgentCard.tsx` — hover lift, start-chat loading state (real `<Spinner />`), overflow menu open/close; restored dropped responsive avatar sizing and the `wonka-agent-card__actions`/`wonka-agent-card__primary-action` marker classes.

**SidePanel** (`src/components/sidepanel/`)
- [x] `SidePanel.tsx` — verbatim port on `react-resizable-panels` (a prior pass had substituted a framer-motion width animation — reverted), plus `Resizable.tsx`/`NavToggle.tsx` ports and a minimal `ResizablePanelGroup` demo harness in the story. This is the *right-hand* artifacts/controls rail, not the left chat-history nav — see "SidePanel.tsx / Nav.tsx naming" in the reconciliation notes.
- [x] `Nav.tsx` — the *left* chat-history nav (separate file from `SidePanel.tsx` above), rebuilt from `Nav/Nav.tsx` read off `preview-feature/agent-creation-ux` (NOT `preview-feature/onboarding` — see reconciliation notes for why that branch distinction matters): panel-collapse header, New chat row, three `NavCollapsibleSection`s — Agents (All agents + Pinned/Recent agent `NavNestedDisclosure`s with count badges), Customize (Connectors/Skills/Prompts), Conversations (search input, History with show-more + Archived chats, Projects with expandable per-project chat lists, Bookmarks) — plus the collapsed-rail floating history popout and the bottom Help/Settings/Account row. See its doc comment for the full per-section provenance and what's mocked.
- [x] `NavSections.tsx` — the three shared accordion primitives `Nav.tsx` is built from (`NavCollapsibleSection`/`NavSubLink`/`NavNestedDisclosure`), ported verbatim from `Nav/NavSections.tsx`; `to`/`collapsedTo` react-router `Link` props dropped in favor of plain `onClick` handlers (this lab has no router).
- [x] `SidebarSearchInput.tsx` — the full-width bordered search box used inside Conversations and Projects, ported from `Nav/SidebarSearchInput.tsx`.
- [x] `AccountSettings.tsx` — the bottom user row + Ariakit `Select` logout popover, re-ported from `Nav/AccountSettings.tsx` on `preview-feature/agent-creation-ux` (compact/expanded sizing corrected to match); `OrgAdminDropdown`'s org-admin-only menu items are out of scope (dropped, not faked).

**Organizations** (`src/components/org/`)
- [x] `UserManagementTable.tsx` — member list, sortable columns (with the real multi-sort index badge), inline role edit via the source's plain `<select>` (a prior pass had invented a Radix `DropdownMenu` role picker — reverted), send-invitation flow (reduced from the ~3000-line source — billing/usage/limits intentionally dropped).

**TODO / not ported** (judgment call — lower motion value or too much backend surface to mock usefully):
- [ ] `Chat/ChatView.tsx`, `Chat/Header.tsx`, `Chat/Footer.tsx` — page-level layout, low standalone motion interest once `MessageBubble`/`Composer` exist.
- [ ] `Agents/AgentGrid.tsx` / `VirtualizedAgentGrid.tsx` — virtualization is a performance concern more than a motion one; `AgentCard` covers the interesting interaction.
- [ ] `Nav/MobileNav.tsx` — the mobile variant of the now-ported `Nav.tsx`; `Nav.tsx`'s own `isSmallScreen` handling covers the same slide-in/mask motion without a second file.
- [ ] `Nav/Bookmarks/BookmarkNav.tsx` (the header-row bookmark filter button — currently dead code even in production, gated behind a `showBookmarks = false && ...` "temporary product choice"), the full `Conversations`/`ProjectsSection`/`BookmarkSection` components (not `Nav.tsx`'s flattened mock lists) — each a substantial component with its own search/DnD/context-menu surface (rename/delete dialogs, paginated queries, per-project inline chat lists); flattened the same way `SidePanel.tsx`'s placeholder and `UserManagementTable.tsx`'s billing panels already were.
- [ ] `Nav/SettingsTabs/*` — the full Settings dialog (Account/Chat/Connectors/Speech/Data/ModelCosts/UserManagement/etc. tabs); `Nav.tsx`'s "Settings" row is a static link, the dialog itself is out of scope for this lab.
- [ ] `Chat/Menus/Endpoints/CustomMenu.tsx` — the real Ariakit combobox behind `ModelSelectorPill.tsx`; a reasonable follow-up once this lab wants a mock model/endpoint catalog to back it.
- [ ] `Auth/*` (Login, Registration, TwoFactorScreen, OtpCodeInput, MagicLinkFlow) — a large, mostly-form domain; worth a dedicated follow-up pass since forms have real transition potential (step transitions, OTP digit focus).
- [ ] `Organizations/OnboardingShell.tsx` + the onboarding step components — multi-step wizard, good motion candidate for a follow-up (step transitions).
- [ ] Remaining `packages/client/src/components/*` primitives not yet needed by a ported domain component (`Accordion`, `Select`, `Tabs`, `HoverCard`, `Progress`, `Slider`, `Toast`, `DataTable`, etc.) — add on demand as new domain components need them, following the pattern above.

## Confirming WonkaChat was untouched

Every read of WonkaChat during this project's research used the `Read`/`Bash`
tools with read-only commands only: `ls`, `cat`, `grep`, `git status`,
`git branch -a`, `git ls-tree`, and — notably, for the `Nav.tsx` rebuild
sourced from `preview-feature/agent-creation-ux` while a *different* branch
(`preview-feature/onboarding`) was checked out in that worktree —
`git show <branch>:<path>`, which reads a file's contents from a given
commit/branch without touching the working tree or the index. No
`Write`/`Edit`/`git checkout`/`git switch`/`git worktree add`/`git commit`
command ever targeted `WonkaChat/`. You can independently verify this any
time with:

```bash
cd "/Users/gabriel/Desktop/Wonka/Code Wonka/WonkaChat" && git status
```

If that repo was clean before this project started, it is still clean now.
