import type { Meta, StoryObj } from '@storybook/react-vite';
import Composer from './Composer';

const meta: Meta<typeof Composer> = {
  title: 'Chat/Composer',
  component: Composer,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Composer>;

export const Default: Story = {
  args: { showEmptyState: false },
};

export const WithEmptyStateSuggestions: Story = {
  args: { showEmptyState: true },
};

export const CustomPlaceholder: Story = {
  args: { showEmptyState: false, placeholder: 'Ask Wonka anything…' },
};

/**
 * ## Motion brief
 * - **Trigger:** typing text toggles the send button's disabled state
 *   (`disabled:opacity-10`, a CSS transition, not framer-motion); clicking
 *   the "+" button or the connectors pill opens their respective popovers.
 * - **Tokens used:** none yet — the real `ChatForm.tsx`/`ChatInputActions.tsx`
 *   drive all of this with plain Tailwind `transition-colors`/
 *   `transition-all duration-200`, matched verbatim here rather than
 *   upgraded onto `motion-tokens.ts` (which the source itself doesn't use
 *   for this surface).
 * - **Before → after:** empty composer (send button ~10% opacity, disabled)
 *   → typed text (send button full-opacity, `bg-text-primary`, clickable);
 *   connectors pill shows a stacked-icon preview of connected apps
 *   (`ConnectorIconStack`) that grows/shrinks as more apps connect.
 * - **Rationale:** reproducing the real composer's actual (currently
 *   CSS-only) motion budget rather than adding framer-motion flourishes it
 *   doesn't have — a good candidate for a follow-up pass that deliberately
 *   proposes new motion (e.g. a spring on the send button's enable state).
 */
export const MotionBrief: Story = {
  args: { showEmptyState: true },
};
