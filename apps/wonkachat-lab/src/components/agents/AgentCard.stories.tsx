import type { Meta, StoryObj } from '@storybook/react-vite';
import AgentCard, { type MockAgent } from './AgentCard';

/**
 * The real card sets no width of its own — it's sized by the CSS grid parent
 * (`wonka-agent-card` uses container queries via `.wonka-agent-grid`,
 * `AgentGrid.tsx`, out of scope for this lab). This decorator stands in for
 * that grid cell so the card renders at a realistic width in isolation.
 */
const meta: Meta<typeof AgentCard> = {
  title: 'Agents/AgentCard',
  component: AgentCard,
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AgentCard>;

const sample: MockAgent = {
  id: 'agent-1',
  name: 'Support Triage',
  description: 'Reads incoming tickets, tags priority, and drafts a first response for review.',
  creatorName: 'Gabriel',
  createdLabel: 'Sep 3, 2026',
};

export const Default: Story = { args: { agent: sample } };
export const NoDescription: Story = {
  args: { agent: { ...sample, description: undefined } },
};
export const ReadOnly: Story = { args: { agent: sample, canEdit: false } };

/**
 * ## Motion brief
 * - **Trigger:** hover (card lift), click "Start chat" (loading spinner),
 *   click the overflow button (menu open/close).
 * - **Tokens:** `springs.standard` for the card's `whileHover={{ y: -2 }}`
 *   lift; `durations.fast` for the dropdown menu's fade+scale+slide-down
 *   mount; the loading indicator is the real `<Spinner />` (a CSS
 *   `@keyframes spinner-rotate`, 0.75s linear infinite) — not tokenized,
 *   same deliberate exception as every other indefinite loading spinner in
 *   this lab.
 * - **Before → after:** resting card → lifted 2px with a shadow (hover);
 *   arrow icon → spinner (click); closed → open menu sliding down 4px while
 *   scaling from 0.97 to 1.
 * - **Rationale:** the source card had a hover shadow but no actual lift —
 *   adding `y: -2` with a spring (rather than the pure CSS `hover:shadow`)
 *   makes the card feel picked up, reinforcing it's a clickable "start chat"
 *   entry point rather than a static tile.
 */
export const MotionBrief: Story = { args: { agent: sample } };
