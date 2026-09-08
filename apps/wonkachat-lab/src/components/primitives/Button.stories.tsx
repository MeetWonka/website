import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'submit'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
  args: { children: 'Continue', variant: 'default', size: 'default' },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete agent' } };
export const Link: Story = { args: { variant: 'link', children: 'Learn more' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

/**
 * ## Motion brief
 * - **Trigger:** hover, active (mousedown), disabled.
 * - **Tokens:** none from `motion-tokens.ts` yet — the source `Button` uses a
 *   plain CSS `transition` on `background-color,color,transform,filter`
 *   (~150ms, browser-default easing). Flagged as a TODO: migrate this to an
 *   explicit `durations.fast` CSS transition-duration for consistency.
 * - **Before → after:** resting surface color → hover surface color (bg
 *   brightens via `filter: brightness(1.08)` on the signal-button gradient);
 *   on press, no scale change today (a gap versus Badge's tactile `whileTap`).
 * - **Rationale:** buttons are the highest-frequency interactive element in
 *   the product; keeping their feedback purely color-based (no scale/shadow
 *   jump) keeps dense toolbars calm. A designer note lives here rather than a
 *   top-level doc precisely so this trade-off travels with the component.
 */
export const MotionBrief: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
