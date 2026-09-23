import type { Meta, StoryObj } from '@storybook/react-vite';
import UserManagementTable from './UserManagementTable';

const meta: Meta<typeof UserManagementTable> = {
  title: 'Organizations/UserManagementTable',
  component: UserManagementTable,
};
export default meta;
type Story = StoryObj<typeof UserManagementTable>;

export const Default: Story = {};

/**
 * ## Motion brief
 * - **Trigger:** "+ Send invitation" click (row reveal), sort-column click
 *   (row reorder), row removal. Role is edited inline via the row's own
 *   "Edit" action, which reveals the real source's plain `<select>` — no
 *   motion there, matching production (a prior pass here had invented a
 *   Radix-`DropdownMenu`-based role picker with its own animation; the real
 *   source doesn't have a role dropdown at all, so that's been reverted).
 * - **Tokens:** a height/opacity reveal + `durations.standard` for the
 *   invite row; framer `layout` + `durations.standard` fade for row
 *   insertion/removal/reorder.
 * - **Before → after:** invite row drops in from -8px/opacity 0 above the
 *   table header; a new member row fades in at its sorted position after
 *   "Send invite"; removed rows fade out in place before the layout
 *   animation closes the gap.
 * - **Rationale:** the real UserManagement.jsx (~3000 lines) has no
 *   transitions at all — rows/inputs appear and disappear instantly across
 *   dozens of `useState` toggles. This port isolates the single highest-value
 *   interaction (invite → new member appears, role change, remove) and gives
 *   each state change a motion cue so admins can track what just happened in
 *   a list that can reorder under them mid-click.
 */
export const MotionBrief: Story = {};
