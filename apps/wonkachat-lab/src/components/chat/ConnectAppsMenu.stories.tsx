import type { Meta, StoryObj } from '@storybook/react-vite';
import ConnectAppsMenu from './ConnectAppsMenu';

const meta: Meta<typeof ConnectAppsMenu> = {
  title: 'Chat/ConnectAppsMenu',
  component: ConnectAppsMenu,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ConnectAppsMenu>;

export const Default: Story = {};

export const NoneConnected: Story = {
  args: {
    catalog: [
      { id: 'slack', name: 'Slack', connected: false },
      { id: 'github', name: 'GitHub', connected: false },
    ],
  },
};

export const ManyConnected: Story = {
  args: {
    catalog: [
      { id: 'gmail', name: 'Gmail', connected: true },
      { id: 'gcal', name: 'Google Calendar', connected: true },
      { id: 'slack', name: 'Slack', connected: true },
      { id: 'github', name: 'GitHub', connected: true },
    ],
  },
};

/**
 * ## Motion brief
 * - **Trigger:** clicking the trigger pill.
 * - **Tokens used:** none — Radix Popover's own `data-[state=open]:animate-in`/
 *   `zoom-in-95`/`fade-in-0` utility classes (`tailwindcss-animate`), matching
 *   the real `Content` className verbatim rather than a framer-motion
 *   `AnimatePresence`.
 * - **Before → after:** closed pill ("Connect apps" or "N integrations
 *   connected" + stacked icons) → an anchored dialog fading/zooming in from
 *   95% scale, listing every app with a Connect/Connected state.
 * - **Rationale:** n/a — reproducing the real Radix-driven open/close
 *   animation as-is.
 */
export const MotionBrief: Story = {};
