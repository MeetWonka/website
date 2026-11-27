import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MCPServerStatusIcon, { type MCPConnectionState } from './MCPServerStatusIcon';

const meta: Meta<typeof MCPServerStatusIcon> = {
  title: 'MCP/MCPServerStatusIcon',
  component: MCPServerStatusIcon,
  args: { serverName: 'linear' },
};
export default meta;
type Story = StoryObj<typeof MCPServerStatusIcon>;

export const Initializing: Story = { args: { isInitializing: true } };
export const InitializingCancelable: Story = { args: { isInitializing: true, canCancel: true } };
export const Connecting: Story = { args: { serverStatus: { connectionState: 'connecting' } } };
export const Disconnected: Story = { args: { serverStatus: { connectionState: 'disconnected' } } };
export const DisconnectedOAuth: Story = {
  args: { serverStatus: { connectionState: 'disconnected', requiresOAuth: true } },
};
export const ErrorState: Story = { args: { serverStatus: { connectionState: 'error' } } };
export const ConnectedNeedsConfig: Story = {
  args: {
    serverStatus: { connectionState: 'connected' },
    hasCustomUserVars: true,
    isAuthenticated: false,
  },
};
export const ConnectedAuthenticated: Story = {
  args: {
    serverStatus: { connectionState: 'connected' },
    hasCustomUserVars: true,
    isAuthenticated: true,
  },
};

/**
 * ## Motion brief
 * - **Trigger:** `connectionState` change (mount/unmount of one of five icon
 *   variants — connecting/disconnected/oauth/error/connected).
 * - **Tokens:** `durations.fast` (150ms) cross-fade + scale-from-0.7 for most
 *   transitions; `springs.snappy` for the error icon specifically, which
 *   slightly overshoots (`scale: [1.15, 1]`) to draw the eye to a failure.
 * - **Before → after:** outgoing icon shrinks+fades out, incoming icon
 *   grows+fades in — `AnimatePresence mode="wait"` so they never overlap.
 * - **Rationale:** the source component had *zero* transition between states
 *   (icons just swap on re-render) despite representing a live, asynchronous
 *   connection lifecycle a user is actively watching (e.g. right after
 *   clicking "Connect"). The cross-fade/scale makes that lifecycle legible
 *   instead of jumpy; the error state's overshoot is a deliberate escalation
 *   versus the neutral connect/disconnect swaps.
 */
export const MotionBrief: Story = {
  render: function Render() {
    const sequence: MCPConnectionState[] = ['connecting', 'connected', 'error', 'disconnected'];
    const [i, setI] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setI((v) => (v + 1) % sequence.length), 1400);
      return () => clearInterval(id);
    }, []);
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-text-secondary">Cycles every 1.4s —</span>
        <MCPServerStatusIcon
          serverName="linear"
          serverStatus={{ connectionState: sequence[i] }}
          hasCustomUserVars
          isAuthenticated={sequence[i] === 'connected'}
        />
      </div>
    );
  },
};
