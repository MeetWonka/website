import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Unchecked: Story = { args: { defaultChecked: false } };
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

/**
 * ## Motion brief
 * - **Trigger:** click / keyboard toggle (state change).
 * - **Tokens:** currently plain CSS `transition-transform` / `transition-colors`
 *   (Tailwind's default 150ms ease) — no `motion-tokens.ts` entry yet. Flagged
 *   TODO: convert the thumb translate to `springs.snappy` for a bit of give.
 * - **Before → after:** thumb slides from `translate-x-0` to `translate-x-5`;
 *   track background crossfades from `--switch-unchecked` to `--primary`.
 * - **Rationale:** this is the highest-frequency binary control in Settings
 *   (per-tool toggles, feature flags) — motion should be fast and predictable,
 *   not showy.
 */
export const MotionBrief: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};
