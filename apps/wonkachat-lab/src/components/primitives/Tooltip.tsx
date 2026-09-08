import DOMPurify from 'dompurify';
import * as Ariakit from '@ariakit/react';
import { forwardRef, useEffect, useId, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import './Tooltip.css';

/**
 * Ported verbatim from WonkaChat/packages/client/src/components/Tooltip.tsx —
 * on `@ariakit/react`, matching the real library choice (a prior pass in this
 * lab had substituted `@radix-ui/react-tooltip` here; that substitution has
 * been reverted). Structure, className, DOMPurify sanitization and the
 * gutter/offset math are all kept as-is. One faithful omission: the real
 * `motion.div` passed via Ariakit's `render` prop has no explicit `transition`
 * prop, so it rides framer-motion's default spring rather than a
 * `motion-tokens.ts` duration — reproduced identically here rather than
 * "fixing" it onto a token that the source itself doesn't use.
 *
 * Unlike Radix, Ariakit's tooltip store is created per-anchor (via
 * `Ariakit.useTooltipStore`), so there is no app-wide `<TooltipProvider>` to
 * wrap consumers in — `Ariakit.TooltipProvider` is only ever instantiated
 * internally, scoped to a single anchor/tooltip pair.
 */
interface TooltipAnchorProps extends Ariakit.TooltipAnchorProps {
  description: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  role?: string;
  enableHTML?: boolean;
}

export const TooltipAnchor = forwardRef<HTMLDivElement, TooltipAnchorProps>(function TooltipAnchor(
  { description, side = 'top', className, role, enableHTML = false, ...props },
  ref,
) {
  const tooltip = Ariakit.useTooltipStore({ placement: side });
  const mounted = Ariakit.useStoreState(tooltip, (state) => state.mounted);
  const placement = Ariakit.useStoreState(tooltip, (state) => state.placement);

  // Wheel/trackpad scroll does not fire mouseleave, so the tooltip can stay open
  // (and flip placement) after its anchor has scrolled out of view.
  useEffect(() => {
    if (!mounted) {
      return;
    }
    const hide = () => {
      tooltip.hide();
    };
    window.addEventListener('scroll', hide, true);
    return () => {
      window.removeEventListener('scroll', hide, true);
    };
  }, [mounted, tooltip]);

  const id = useId();
  const sanitizer = useMemo(() => {
    const instance = DOMPurify();
    instance.addHook('afterSanitizeAttributes', (node) => {
      if (node.tagName && node.tagName === 'A') {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      }
    });
    return instance;
  }, []);

  const sanitizedHTML = useMemo(() => {
    if (!enableHTML) {
      return '';
    }
    try {
      return sanitizer.sanitize(description, {
        ALLOWED_TAGS: ['a', 'strong', 'b', 'em', 'i', 'br', 'code'],
        ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
        ALLOW_DATA_ATTR: false,
        ALLOW_ARIA_ATTR: false,
      });
    } catch (error) {
      console.error('Sanitization failed', error);
      return description;
    }
  }, [enableHTML, description, sanitizer]);

  const { x, y } = useMemo(() => {
    const dir = placement.split('-')[0];
    switch (dir) {
      case 'top':
        return { x: 0, y: -8 };
      case 'bottom':
        return { x: 0, y: 8 };
      case 'left':
        return { x: -8, y: 0 };
      case 'right':
        return { x: 8, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  }, [placement]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (role === 'button' && event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLDivElement).click();
    }
  };

  return (
    <Ariakit.TooltipProvider store={tooltip} hideTimeout={0}>
      <Ariakit.TooltipAnchor
        {...props}
        ref={ref}
        role={role}
        aria-describedby={id}
        onKeyDown={handleKeyDown}
        className={cn('cursor-pointer', className)}
      />
      <AnimatePresence>
        {mounted === true && (
          <Ariakit.Tooltip
            gutter={4}
            alwaysVisible
            className="tooltip"
            id={id}
            render={
              <motion.div
                initial={{ opacity: 0, x, y }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x, y }}
              />
            }
          >
            <Ariakit.TooltipArrow />
            {enableHTML ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedHTML,
                }}
              />
            ) : (
              description
            )}
          </Ariakit.Tooltip>
        )}
      </AnimatePresence>
    </Ariakit.TooltipProvider>
  );
});
