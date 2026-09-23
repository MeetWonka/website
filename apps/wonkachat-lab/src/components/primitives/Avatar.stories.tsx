import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackInitials: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.png" alt="Marc Aurele" />
      <AvatarFallback>MA</AvatarFallback>
    </Avatar>
  ),
};

/**
 * ## Motion brief
 * - **Trigger:** image load success/failure (Radix's internal image-loading
 *   status machine switches between `<AvatarImage>` and `<AvatarFallback>`).
 * - **Tokens:** none applied yet — this is a synthesized primitive (no direct
 *   WonkaChat source), so no ad-hoc transition to preserve. TODO: crossfade
 *   image → fallback with `durations.fast` instead of the current instant swap.
 * - **Rationale:** avatars appear in dense lists (UserRow, AgentCard); an
 *   instant swap avoids a distracting flicker per row while the real fix
 *   (fade) is scoped for later.
 */
export const MotionBrief: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.png" alt="Marc Aurele" />
      <AvatarFallback>MA</AvatarFallback>
    </Avatar>
  ),
};
