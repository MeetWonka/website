import type { Meta, StoryObj } from '@storybook/react-vite';
import MessageBubble, { TypingIndicator } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Chat/MessageBubble',
  component: MessageBubble,
};
export default meta;
type Story = StoryObj<typeof MessageBubble>;

export const UserMessage: Story = {
  args: { role: 'user', fullText: 'Can you summarize the Q3 churn report?' },
};

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    fullText:
      'Q3 churn was 4.2%, down from 5.1% in Q2 — mostly driven by the new onboarding flow.',
  },
};

export const Streaming: Story = {
  args: {
    role: 'assistant',
    streaming: true,
    fullText:
      'Give me a second — pulling the latest numbers from the usage warehouse and cross-checking against last quarter…',
  },
};

export const Empty: Story = {
  render: () => <TypingIndicator />,
};

/**
 * ## Motion brief
 * - **Trigger:** streaming reveal (per character batch) and the CSS
 *   `result-streaming`/`submitting` classes toggling as the mock stream
 *   starts and finishes.
 * - **Tokens:** none — this is the real WonkaChat mechanism verbatim: a
 *   `content: '⬤'` pseudo-element cursor (`.result-streaming`) and a pulsing
 *   placeholder dot for the pre-first-token gap (`.submitting
 *   .result-thinking:empty:last-child:after`, `@keyframes pulseSize`, both
 *   ported into `src/index.css` from `client/src/style.css`). A prior pass
 *   here had reimplemented the cursor as a framer-motion `motion.span`
 *   opacity loop and wrapped the message in a colored chat "bubble" that
 *   doesn't exist in the real app; both have been reverted.
 * - **Before → after:** empty content → pulsing dot (`submitting`, no text
 *   yet) → revealed text with a small circular cursor glued to its end
 *   (`result-streaming`) → cursor disappears the instant the stream
 *   completes.
 * - **Rationale:** n/a — reproducing the actual production mechanism, not
 *   an added embellishment.
 */
export const MotionBrief: Story = {
  args: {
    role: 'assistant',
    streaming: true,
    fullText: 'Here is the motion brief for this exact story, streaming in like a real response.',
  },
};
