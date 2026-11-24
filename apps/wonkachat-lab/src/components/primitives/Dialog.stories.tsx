import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './Dialog';
import { Button } from './Button';

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove MCP server</DialogTitle>
          <DialogDescription>
            This will disconnect &ldquo;linear&rdquo; for every member of this workspace.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * ## Motion brief
 * - **Trigger:** Radix open/close state change (`data-state`).
 * - **Tokens:** currently Tailwind's `animate-in`/`fade-in-90`/`slide-in-from-bottom-10`
 *   utility classes (from `tailwindcss-animate`), ~150ms default — not yet
 *   wired to `motion-tokens.ts` since the source component is CSS-animated,
 *   not framer-motion. TODO candidate: migrate to `AnimatePresence` +
 *   `variants.slideUpIn` + `durations.standard` for a consistent curve with
 *   the framer-motion-driven components (Badge, MessageBubble).
 * - **Before → after:** overlay fades in behind a blurred backdrop; content
 *   slides up ~10% from below while fading in.
 * - **Rationale:** dialogs interrupt the task at hand, so entrance motion
 *   should orient the eye (rising from where attention likely was) without
 *   overshoot or bounce — a serious, modal moment.
 */
export const MotionBrief: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite teammate</DialogTitle>
          <DialogDescription>Send an invite link for this workspace.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
