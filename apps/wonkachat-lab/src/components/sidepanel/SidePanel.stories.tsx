import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ImperativePanelHandle } from 'react-resizable-panels';
import { ResizablePanelGroup, ResizablePanel } from './Resizable';
import SidePanel from './SidePanel';

const defaultMinSize = 20;

/**
 * `SidePanel` itself only renders a `ResizablePanel` (plus its toggle/handle)
 * — `react-resizable-panels` needs a `PanelGroup` with something else to
 * size against, which in production is `SidePanelGroup.tsx` (the messages
 * view + optional artifacts panel). This story reproduces just enough of
 * that group — one placeholder "messages view" panel — to give the real
 * resizable-panels library something to resize against, while `SidePanel`'s
 * own internals stay verbatim.
 */
function SidePanelDemo() {
  const panelRef = useRef<ImperativePanelHandle>(null);
  const [minSize, setMinSize] = useState(defaultMinSize);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fullCollapse, setFullCollapse] = useState(false);
  const [collapsedSize, setCollapsedSize] = useState(3);

  return (
    <div style={{ height: 420 }}>
      <ResizablePanelGroup direction="horizontal" className="relative h-full w-full flex-1 overflow-auto bg-surface-secondary">
        <ResizablePanel defaultSize={70} minSize={30} order={1} id="messages-view">
          <div className="flex h-full items-center justify-center text-sm text-text-tertiary">
            Messages view (placeholder)
          </div>
        </ResizablePanel>
        <SidePanel
          panelRef={panelRef}
          minSize={minSize}
          setMinSize={setMinSize}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          collapsedSize={collapsedSize}
          setCollapsedSize={setCollapsedSize}
          fullCollapse={fullCollapse}
          setFullCollapse={setFullCollapse}
          defaultSize={30}
          hasArtifacts={false}
        />
      </ResizablePanelGroup>
    </div>
  );
}

const meta: Meta<typeof SidePanelDemo> = {
  title: 'SidePanel/SidePanel',
  component: SidePanelDemo,
};
export default meta;
type Story = StoryObj<typeof SidePanelDemo>;

export const Default: Story = {};

/**
 * ## Motion brief
 * - **Trigger:** click the toggle button (`NavToggle`, hover-revealed on
 *   desktop).
 * - **Tokens:** none — the real source drives width via
 *   `react-resizable-panels`' own resize/collapse mechanics plus a plain CSS
 *   `transition: width 0.2s ease, visibility 0s linear 0.2s` inline style. A
 *   prior pass in this lab had swapped this for a framer-motion
 *   `springs.standard` width animation; that substitution has been reverted
 *   so the collapse/expand feel (and its speed) matches production exactly.
 * - **Before → after:** panel collapses to a `min-w-[50px]` rail (nav content
 *   hidden once fully collapsed) and expands back to `min-w-[340px]`
 *   (`sm:min-w-[352px]`) — `react-resizable-panels` animates the size prop
 *   change itself via that CSS transition, not a spring physics model.
 * - **Rationale:** n/a — this is the real WonkaChat behavior, not an added
 *   embellishment. (A spring might feel nicer, but faithfully reproducing
 *   what ships today was the point of this port.)
 */
export const MotionBrief: Story = {};
