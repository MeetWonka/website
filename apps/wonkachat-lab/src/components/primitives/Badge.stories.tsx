import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wrench, Search, Calculator } from 'lucide-react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  args: { label: 'Web search', icon: Search, isAvailable: true },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Active: Story = { args: { isActive: true } };
export const Editing: Story = { args: { isEditing: true, icon: Wrench, label: 'Calculator' } };
export const Dragging: Story = { args: { isEditing: true, isDragging: true, icon: Calculator } };

/**
 * ## Motion brief
 * - **Trigger:** click (toggle active), drag start/end, edit-mode remove button mount.
 * - **Tokens:** `durations.instant` (100ms, standard ease) for tap/drag scale;
 *   plain CSS `active:scale-95` as a fallback for the un-instrumented click.
 * - **Before → after:** dragging scales the chip to 1.1x with a soft drop
 *   shadow; the remove (×) affordance pops in from `scale:0.8,opacity:0` on
 *   entering edit mode and reverses on exit.
 * - **Rationale:** badges represent live, reorderable tool selections, so the
 *   drag-scale gives physical "picked up" feedback, and the remove button's
 *   pop-in signals "this chip is now editable" without a layout jump.
 */
export const MotionBrief: Story = {
  render: function Render() {
    const [active, setActive] = useState(false);
    return (
      <Badge
        label="Web search"
        icon={Search}
        isActive={active}
        onToggle={() => setActive((v) => !v)}
      />
    );
  },
};
