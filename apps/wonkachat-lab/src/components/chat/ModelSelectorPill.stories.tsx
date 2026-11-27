import type { Meta, StoryObj } from '@storybook/react-vite';
import ModelSelectorPill from './ModelSelectorPill';

const meta: Meta<typeof ModelSelectorPill> = {
  title: 'Chat/ModelSelectorPill',
  component: ModelSelectorPill,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ModelSelectorPill>;

export const Default: Story = {};

export const CustomOptions: Story = {
  args: {
    options: [
      { id: 'auto', label: 'Auto' },
      { id: 'sonnet', label: 'Sonnet' },
      { id: 'opus', label: 'Opus' },
    ],
  },
};

/**
 * ## Motion brief
 * - **Trigger:** clicking the pill toggles a plain dropdown open/closed.
 * - **Tokens used:** none — matching the real trigger's own plain CSS
 *   `transition-colors`; the source's actual open menu (`CustomMenu.tsx`,
 *   a full Ariakit combobox) has its own animation this lab's simplified
 *   dropdown doesn't reproduce (see the component's doc comment).
 * - **Before → after:** "Auto" pill → dropdown listing Auto/Pro/Fast → pill
 *   label updates to the selection.
 * - **Rationale:** n/a — this is the simplified mock version; a follow-up
 *   pass could port the real Ariakit combobox menu for full fidelity.
 */
export const MotionBrief: Story = {};
