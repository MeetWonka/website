import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import { TooltipAnchor } from './Tooltip';
import { Button } from './Button';

/**
 * Ariakit's tooltip store lives per-anchor (see Tooltip.tsx), so there's no
 * app-wide provider to wrap these stories in anymore — each `TooltipAnchor`
 * is self-contained, matching the real WonkaChat usage.
 */
const meta: Meta<typeof TooltipAnchor> = {
  title: 'Primitives/Tooltip',
  component: TooltipAnchor,
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 40 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof TooltipAnchor>;

export const OnIcon: Story = {
  render: () => (
    <TooltipAnchor description="Model temperature: higher is more creative" className="rounded p-1 hover:bg-surface-hover">
      <Info className="h-4 w-4 text-text-secondary" />
    </TooltipAnchor>
  ),
};

export const OnButton: Story = {
  render: () => (
    <TooltipAnchor description="Export this conversation as Markdown">
      <Button variant="outline">Export</Button>
    </TooltipAnchor>
  ),
};

/**
 * ## Motion brief
 * - **Trigger:** hover / focus (Ariakit's default show/hide timing —
 *   `hideTimeout={0}` on the provider only removes the *hide* delay), mount/
 *   unmount of the tooltip content.
 * - **Tokens:** none — the real source's `motion.div` has no explicit
 *   `transition`, so it rides framer-motion's default spring rather than a
 *   `motion-tokens.ts` value. Kept as-is rather than "fixing" it onto a
 *   token the source itself doesn't use.
 * - **Before → after:** fades in while sliding 8px in from the side it
 *   anchors away from (top tooltip slides down into place, etc.) — reverses
 *   on close, matching the source Ariakit implementation's `x`/`y` offset math.
 * - **Rationale:** the directional slide reinforces *which* element the
 *   tooltip belongs to, which matters in dense toolbars where several icon
 *   buttons sit close together. This is the real WonkaChat behavior, not an
 *   added embellishment.
 */
export const MotionBrief: Story = {
  render: () => (
    <TooltipAnchor description="Pin this agent to the top of your list" side="right" className="rounded p-1 hover:bg-surface-hover">
      <Info className="h-4 w-4 text-text-secondary" />
    </TooltipAnchor>
  ),
};
