import type { Meta, StoryObj } from '@storybook/react-vite';
import EmptyStateLanding from './EmptyStateLanding';

const meta: Meta<typeof EmptyStateLanding> = {
  title: 'Chat/EmptyStateLanding',
  component: EmptyStateLanding,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof EmptyStateLanding>;

export const Default: Story = {};

export const MorningGreeting: Story = {
  args: { headline: 'Good morning, Gabriel' },
};

export const NoSuggestions: Story = {
  args: { suggestions: [] },
};

/**
 * ## Motion brief
 * - **Trigger:** mount (no dedicated entrance animation in the real source —
 *   `Landing.tsx`'s heading and `TabbedSuggestions.tsx`'s rows are static on
 *   arrival); hover on a suggestion row.
 * - **Tokens used:** none — `hover:bg-surface-tertiary` and the arrow's
 *   `group-hover:translate-x-0.5` are plain CSS transitions in the source.
 * - **Before → after:** hovering a suggestion row nudges its trailing arrow
 *   right by 2px and darkens the row background.
 * - **Rationale:** n/a — reproducing the source's real (CSS-only) hover
 *   treatment; a mount stagger across the three suggestion rows would be a
 *   reasonable ADDED motion-design proposal for a follow-up pass, since the
 *   source has none today.
 */
export const MotionBrief: Story = {};
