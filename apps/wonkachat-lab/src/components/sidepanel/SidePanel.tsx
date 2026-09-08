import { useState, useCallback, useMemo, useEffect, memo } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';
import { ResizableHandleAlt, ResizablePanel } from './Resizable';
import NavToggle from './NavToggle';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/client/src/components/SidePanel/SidePanel.tsx. A
 * prior pass in this lab had replaced `react-resizable-panels` with a
 * controlled `width` animated by framer-motion, since there was nothing else
 * on the page to resize against — that substitution has been reverted. This
 * now uses the real `ResizablePanel` (`react-resizable-panels`) with the same
 * `collapsedSize`/`minSize`/`maxSize`/`collapsible` props, the same
 * `onExpand`/`onCollapse` callbacks, and the same
 * `transition: 'width 0.2s ease, visibility 0s linear 0.2s'` inline style the
 * source uses (a plain CSS transition, not a spring — kept verbatim rather
 * than upgraded to a `motion-tokens.ts` spring, since that's what the actual
 * production panel does).
 *
 * Stripped/mocked, since this lab has no backend or router:
 * - `useLocalize` → static English strings.
 * - `useSidePanelContext` (current endpoint) → dropped; `endpointType`/
 *   `keyProvided` are hardcoded to the "no API key required" case.
 * - `useGetEndpointsQuery` / `useUserKeyQuery` (data-provider) → dropped
 *   entirely, since they only fed the `keyProvided` calculation above.
 * - `useSideNavLinks` + the real `<Nav>` tree (agent builder, files,
 *   parameters accordions, `@radix-ui/react-accordion`) → replaced with a
 *   flat placeholder link list. `Nav.tsx` itself is out of scope for this
 *   port (see README "TODO / not ported").
 * - `useMediaQuery('(max-width: 767px)')` → reimplemented locally with
 *   `window.matchMedia`, same query string.
 * - `useLocalStorage('newUser', true)` → the source's own hook, backed by
 *   real `localStorage`, so it needed no mocking — kept as-is.
 */
const defaultMinSize = 20;

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const listener = () => setIsSmall(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);
  return isSmall;
}

const placeholderLinks = ['Files', 'Bookmarks', 'Agents', 'MCP servers', 'Parameters'];

interface SidePanelProps {
  defaultSize?: number;
  hasArtifacts: boolean;
  navCollapsedSize?: number;
  minSize: number;
  setMinSize: React.Dispatch<React.SetStateAction<number>>;
  collapsedSize: number;
  setCollapsedSize: React.Dispatch<React.SetStateAction<number>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  fullCollapse: boolean;
  setFullCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  panelRef: React.RefObject<ImperativePanelHandle>;
}

const SidePanel = ({
  defaultSize,
  panelRef,
  navCollapsedSize = 3,
  hasArtifacts,
  minSize,
  setMinSize,
  collapsedSize,
  setCollapsedSize,
  isCollapsed,
  setIsCollapsed,
  fullCollapse,
  setFullCollapse,
}: SidePanelProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [newUser, setNewUser] = useState(() => {
    try {
      const stored = localStorage.getItem('newUser');
      return stored === null ? true : JSON.parse(stored);
    } catch {
      return true;
    }
  });

  const isSmallScreen = useIsSmallScreen();

  // No user-provided-key endpoint in this lab, so the real key-expiry gate
  // (useUserKeyQuery) always resolves to "key provided."
  const keyProvided = true;

  const hidePanel = useCallback(() => {
    setIsCollapsed(true);
    setCollapsedSize(0);
    setMinSize(defaultMinSize);
    setFullCollapse(true);
    localStorage.setItem('fullPanelCollapse', 'true');
    panelRef.current?.collapse();
  }, [panelRef, setMinSize, setIsCollapsed, setFullCollapse, setCollapsedSize]);

  const toggleNavVisible = useCallback(() => {
    if (newUser) {
      setNewUser(false);
      localStorage.setItem('newUser', 'false');
    }

    if (!isCollapsed) {
      setMinSize(defaultMinSize);
      setCollapsedSize(0);
      setFullCollapse(true);
      localStorage.setItem('fullPanelCollapse', 'true');
      setIsCollapsed(true);
      panelRef.current?.collapse();
    } else {
      setMinSize(defaultMinSize);
      setCollapsedSize(navCollapsedSize);
      setFullCollapse(false);
      localStorage.setItem('fullPanelCollapse', 'false');
      setIsCollapsed(false);
      panelRef.current?.expand();
    }
  }, [
    newUser,
    panelRef,
    setMinSize,
    isCollapsed,
    setFullCollapse,
    setCollapsedSize,
    navCollapsedSize,
    setIsCollapsed,
  ]);

  // Auto-hide panel on mobile/narrow screens
  useEffect(() => {
    const handleResize = () => {
      if (isSmallScreen) {
        if (!isCollapsed) {
          hidePanel();
        } else if (isCollapsed && !fullCollapse && (collapsedSize > 0 || minSize > 0)) {
          setIsCollapsed(true);
          setCollapsedSize(0);
          setMinSize(defaultMinSize);
          setFullCollapse(true);
          localStorage.setItem('fullPanelCollapse', 'true');
          panelRef.current?.collapse();
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    isSmallScreen,
    isCollapsed,
    hidePanel,
    fullCollapse,
    collapsedSize,
    minSize,
    setIsCollapsed,
    setCollapsedSize,
    setMinSize,
    setFullCollapse,
    panelRef,
  ]);

  const isPanelHidden = useMemo(() => {
    if (isSmallScreen && isCollapsed && (minSize === 0 || collapsedSize === 0 || fullCollapse)) {
      return true;
    }
    if ((isCollapsed && (minSize === 0 || collapsedSize === 0)) || fullCollapse) {
      return true;
    }
    return false;
  }, [isSmallScreen, isCollapsed, minSize, collapsedSize, fullCollapse]);

  return (
    <>
      {/* Always show toggle button on desktop, even when panel is hidden, so users can reopen it */}
      {!isSmallScreen && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative flex w-px items-center justify-center"
        >
          <NavToggle
            navVisible={!isCollapsed}
            isHovering={isHovering}
            onToggle={toggleNavVisible}
            setIsHovering={setIsHovering}
            className={cn(
              'fixed top-1/2 z-50',
              // When panel is fully hidden, position button at the right edge
              isPanelHidden
                ? 'right-0 mr-2'
                : (isCollapsed && (minSize === 0 || collapsedSize === 0)) || fullCollapse
                ? 'mr-9'
                : 'mr-16',
            )}
            translateX={false}
            side="right"
          />
        </div>
      )}
      {(!isCollapsed || minSize > 0) && !isSmallScreen && !fullCollapse && (
        <ResizableHandleAlt withHandle className="bg-transparent text-text-primary" />
      )}
      <ResizablePanel
        tagName="nav"
        id="controls-nav"
        order={hasArtifacts ? 3 : 2}
        aria-label="Controls"
        role="navigation"
        collapsedSize={collapsedSize}
        defaultSize={defaultSize}
        collapsible={true}
        minSize={minSize}
        maxSize={40}
        ref={panelRef}
        style={{
          overflowY: 'auto',
          transition: 'width 0.2s ease, visibility 0s linear 0.2s',
        }}
        onExpand={() => {
          setIsCollapsed(false);
          localStorage.setItem('react-resizable-panels:collapsed', 'false');
        }}
        onCollapse={() => {
          setIsCollapsed(true);
          localStorage.setItem('react-resizable-panels:collapsed', 'true');
        }}
        className={cn(
          'sidenav hide-scrollbar border-l border-border-light bg-background py-1 transition-opacity',
          isCollapsed ? 'min-w-[50px]' : 'min-w-[340px] sm:min-w-[352px]',
          isSmallScreen && isCollapsed && (minSize === 0 || collapsedSize === 0 || fullCollapse)
            ? 'hidden min-w-0'
            : (isCollapsed && (minSize === 0 || collapsedSize === 0)) || fullCollapse
            ? 'hidden min-w-0'
            : 'opacity-100',
        )}
      >
        <div
          data-collapsed={isCollapsed}
          className="hide-scrollbar group h-full flex-shrink-0 overflow-x-hidden bg-surface-primary"
        >
          <div className="flex h-full flex-col gap-1 px-3 py-2.5 group-[[data-collapsed=true]]:items-center group-[[data-collapsed=true]]:px-2">
            <div className="mb-1 px-1 text-xs font-medium uppercase tracking-wide text-text-tertiary group-[[data-collapsed=true]]:hidden">
              {keyProvided ? 'Conversation' : 'Add an API key to continue'}
            </div>
            {placeholderLinks.map((label) => (
              <button
                key={label}
                type="button"
                className={cn(
                  'w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-hover',
                  isCollapsed && 'flex h-9 w-9 items-center justify-center px-0 text-xs',
                )}
              >
                {isCollapsed ? label.slice(0, 1) : label}
              </button>
            ))}
          </div>
        </div>
      </ResizablePanel>
    </>
  );
};

export default memo(SidePanel);
