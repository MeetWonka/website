import { TooltipAnchor } from '../primitives/Tooltip';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/client/src/components/Nav/NavToggle.tsx — the
 * hover-revealed "hamburger → arrow" toggle button used by both the left
 * (chat history) and right (`SidePanel`) navs. `useLocalize` is replaced with
 * static English strings; everything else (the two independently rotating
 * bars, the `translateX(260px)` slide when the left nav is open, the
 * opacity/transform transition timing) is kept verbatim.
 */
export default function NavToggle({
  onToggle,
  navVisible,
  isHovering,
  setIsHovering,
  side = 'left',
  className = '',
  translateX = true,
}: {
  onToggle: () => void;
  navVisible: boolean;
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
  side?: 'left' | 'right';
  className?: string;
  translateX?: boolean;
}) {
  const transition = {
    transition: 'transform 0.3s ease, opacity 0.2s ease',
  };

  const rotationDegree = 15;
  const rotation = isHovering || !navVisible ? `${rotationDegree}deg` : '0deg';
  const topBarRotation = side === 'right' ? `-${rotation}` : rotation;
  const bottomBarRotation = side === 'right' ? rotation : `-${rotation}`;

  return (
    <div
      className={cn(
        className,
        '-translate-y-1/2 transition-transform',
        navVisible ? 'rotate-0' : 'rotate-180',
        navVisible && translateX ? 'translate-x-[260px]' : 'translate-x-0',
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <TooltipAnchor
        side={side === 'right' ? 'left' : 'right'}
        aria-label={side === 'left' ? 'Chat history' : 'Controls'}
        aria-expanded={navVisible}
        aria-controls={side === 'left' ? 'chat-history-nav' : 'controls-nav'}
        id={`toggle-${side}-nav`}
        onClick={onToggle}
        role="button"
        description={navVisible ? 'Close sidebar' : 'Open sidebar'}
        className="flex items-center justify-center"
        tabIndex={0}
      >
        <span className="" data-state="closed">
          <div
            className="flex h-[72px] w-8 items-center justify-center"
            style={{ ...transition, opacity: isHovering ? 1 : 0.25 }}
          >
            <div className="flex h-6 w-6 flex-col items-center">
              {/* Top bar */}
              <div
                className="h-3 w-1 rounded-full bg-black dark:bg-white"
                style={{
                  ...transition,
                  transform: `translateY(0.15rem) rotate(${topBarRotation}) translateZ(0px)`,
                }}
              />
              {/* Bottom bar */}
              <div
                className="h-3 w-1 rounded-full bg-black dark:bg-white"
                style={{
                  ...transition,
                  transform: `translateY(-0.15rem) rotate(${bottomBarRotation}) translateZ(0px)`,
                }}
              />
            </div>
          </div>
        </span>
      </TooltipAnchor>
    </div>
  );
}
