import type { Meta, StoryObj } from '@storybook/react-vite';
import Nav from './Nav';

const meta: Meta<typeof Nav> = {
  title: 'SidePanel/Nav',
  component: Nav,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '720px', background: 'var(--surface-secondary)' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Nav>;

/**
 * Default state: rail expanded, "Agents" and "Conversations" sections open
 * (their `NavCollapsibleSection`s default to open in this lab so the nested
 * accordion structure is visible without clicking), "Customize" collapsed —
 * matches the real `Nav.tsx`'s own `useLocalStorage` defaults
 * (`navAgentsOpen`/`navConversationsOpen` default open in this lab for
 * demo purposes; `navCustomizeOpen` defaults closed in both).
 */
export const Expanded: Story = {
  args: { defaultNavVisible: true },
};

/**
 * Panel-collapsed to the 64px icon rail. "Agents" / "Customize" /
 * "Conversations" each become a single centered icon button; clicking the
 * Conversations icon pops the history-only floating panel (see
 * `HistoryPopout` below) instead of expanding inline.
 */
export const Collapsed: Story = {
  args: { defaultNavVisible: false },
};

export const NoOrganization: Story = {
  args: { defaultNavVisible: true, organizationName: '' },
};

/**
 * ## Motion brief
 * - **Trigger:** clicking any of the three `NavCollapsibleSection` header
 *   rows ("Agents" / "Customize" / "Conversations"), or a `NavNestedDisclosure`
 *   row nested inside one ("Pinned agents" / "Recent Agents" / "History" /
 *   "Projects" / "Bookmarks").
 * - **Tokens used:** none — both accordion levels are driven by plain
 *   conditional rendering (`{open && children}`) plus a CSS
 *   `transition-transform duration-150` on the chevron's rotate, not a
 *   framer-motion height/opacity spring. Kept verbatim rather than upgraded
 *   onto a `motion-tokens.ts` value, since that's what the real
 *   `NavSections.tsx` primitives actually do — there's no expand/collapse
 *   height animation on the content itself, only the chevron rotates.
 * - **Before → after:** closed row (chevron pointing left, `-rotate-90`) →
 *   open row (chevron pointing down) with an indented, left-bordered list of
 *   children appearing directly below (`border-l border-border-light`,
 *   `pl-3.5`) — no slide/fade, an instant reveal.
 * - **Separately:** the whole-rail panel-collapse (272px ↔ 64px, the
 *   `SidebarIcon` button, top-left) *does* have real motion — a plain CSS
 *   `transition-[width,transform] duration-200 ease-in-out` on the rail's
 *   own `width`/`transform` inline styles — reproduced as-is, same as the
 *   previous (now superseded) `preview-feature/onboarding`-based version of
 *   this file used for its own rail-collapse.
 * - **Rationale:** this story exists to make clear which of the two levels
 *   of "accordion" in this nav actually animates (none — it's an instant
 *   reveal) versus which literally changes layout width with a tween (the
 *   whole-rail collapse) — useful context before reaching for
 *   framer-motion on either.
 */
export const MotionBrief: Story = {
  args: { defaultNavVisible: true },
};
