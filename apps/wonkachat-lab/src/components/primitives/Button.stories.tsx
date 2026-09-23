import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

/**
 * This is now the canonical @wonka/react Button (see Button.tsx) — variant
 * names match the brand design system's, not the old local implementation's.
 */
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'underline',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
  args: { children: 'Continue', variant: 'primary' },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = {
  args: { variant: 'secondary' },
  decorators: [(Story) => <div style={{ background: '#0e1a16', padding: 24 }}><Story /></div>],
};
export const Outline: Story = { args: { variant: 'outline', size: 'default' } };
export const Ghost: Story = { args: { variant: 'ghost', size: 'default' } };
export const Destructive: Story = {
  args: { variant: 'destructive', size: 'default', children: 'Delete agent' },
};
export const Link: Story = { args: { variant: 'link', size: 'default', children: 'Learn more' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { variant: 'outline', size: 'sm' } };
export const Large: Story = { args: { variant: 'outline', size: 'lg' } };

/**
 * ## Motion brief
 * - **Trigger:** hover, active (mousedown), disabled.
 * - **Tokens:** `--ds-motion-duration-normal` (200ms) drives the shape/arrow
 *   hover transition on `primary`/`secondary`/`underline`; utility variants
 *   (`destructive`/`outline`/`ghost`/`link`) use a plain opacity/background
 *   hover with no explicit duration token yet — flagged as a follow-up to
 *   route through the same token.
 * - **Before → after:** primary/secondary lift their highlight overlay
 *   opacity 0→80% and nudge the arrow glyph +2px on hover; utility variants
 *   swap background/opacity only, no motion.
 * - **Rationale:** the signal-shape CTA gets a physical highlight because
 *   it's the highest-stakes action on a screen; dense utility actions
 *   (cancel, dismiss, delete) stay static so toolbars don't feel busy.
 */
export const MotionBrief: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
