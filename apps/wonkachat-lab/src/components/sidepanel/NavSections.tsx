import type { ReactNode, Ref } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/client/src/components/Nav/NavSections.tsx —
 * `preview-feature/agent-creation-ux` branch (NOT the `preview-feature/onboarding`
 * branch checked out in the main WonkaChat working directory; see Nav.tsx's own
 * doc comment for why that distinction matters). These are the three shared
 * primitives the real left nav builds its "Agents" / "Customize" /
 * "Conversations" sections out of:
 * - `NavCollapsibleSection` — a top-level accordion row (icon + label +
 *   chevron) that reveals a bordered-left indent of children when open, and
 *   collapses to a single centered icon button when the whole rail is
 *   panel-collapsed.
 * - `NavSubLink` — a single-row item inside a section (e.g. "All agents",
 *   "Connectors"), optionally with a trailing action button (e.g. the "+"
 *   create-agent button).
 * - `NavNestedDisclosure` — a smaller, second-level disclosure used *inside*
 *   a `NavCollapsibleSection` (e.g. "Pinned agents", "History", "Projects",
 *   "Bookmarks"), with an optional count badge.
 *
 * Stripped/mocked:
 * - The real `NavCollapsibleSection`'s `collapsedTo` renders a react-router
 *   `<Link>` so the icon-only rail state still navigates. This lab has no
 *   router, so `collapsedTo` is dropped and collapsed clicks always go
 *   through `onCollapsedClick` instead — same visual result (icon-only
 *   button), no real navigation.
 * - Classnames, spacing, the chevron rotate transition, and the count-badge
 *   styling are kept verbatim.
 */

/** 36×36 slot — same left edge open or collapsed (nav uses px-3.5). */
export const NAV_ICON_SLOT_CLASS = 'flex h-9 w-9 shrink-0 items-center justify-center';
export const SECTION_ROW_CLASS =
  'wonka-sidebar-nav-item flex h-9 w-full cursor-pointer items-center rounded-[var(--radius-sm)] border border-transparent no-underline transition-colors duration-100 ease-out';
const SECTION_HOVER_CLASS =
  'text-text-secondary hover:!bg-[var(--ds-layout-sidebar-hover)] hover:!text-text-primary';
const SECTION_ACTIVE_CLASS =
  'border-border-medium bg-[var(--ds-layout-sidebar-hover)] text-text-primary';
export const COLLAPSED_NAV_ICON_CLASS =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-transparent no-underline transition-colors duration-100 ease-out';
/** Right-aligned icon slot shared by section chevrons and sub-link actions (+). */
export const NAV_TRAILING_SLOT_CLASS = 'mr-0.5 flex h-6 w-6 shrink-0 items-center justify-center';

type NavCollapsibleSectionProps = {
  id: string;
  label: string;
  icon: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collapsed?: boolean;
  onCollapsedClick?: () => void;
  isActive?: boolean;
  trailing?: ReactNode;
  children?: ReactNode;
  buttonRef?: Ref<HTMLButtonElement>;
  grow?: boolean;
  className?: string;
};

export function NavCollapsibleSection({
  id,
  label,
  icon,
  open,
  onOpenChange,
  collapsed = false,
  onCollapsedClick,
  isActive = false,
  trailing,
  children,
  buttonRef,
  grow = false,
  className,
}: NavCollapsibleSectionProps) {
  if (collapsed) {
    const collapsedClassName = cn(
      COLLAPSED_NAV_ICON_CLASS,
      isActive ? SECTION_ACTIVE_CLASS : SECTION_HOVER_CLASS,
    );
    return (
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        onClick={onCollapsedClick}
        className={collapsedClassName}
      >
        <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      </button>
    );
  }

  return (
    <div className={cn(grow && 'flex min-h-0 flex-1 flex-col', className)}>
      <div className="flex shrink-0 items-center">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => onOpenChange(!open)}
          className={cn(
            SECTION_ROW_CLASS,
            'flex-1',
            isActive ? SECTION_ACTIVE_CLASS : SECTION_HOVER_CLASS,
          )}
        >
          <span className={NAV_ICON_SLOT_CLASS}>
            <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
          </span>
          <span className="min-w-0 flex-1 truncate pr-2 text-left">{label}</span>
          <span className={NAV_TRAILING_SLOT_CLASS} aria-hidden="true">
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 text-text-tertiary transition-transform duration-150',
                !open && '-rotate-90',
              )}
            />
          </span>
        </button>
        {trailing}
      </div>
      {open && children != null && (
        <div
          id={id}
          className={cn(
            'mb-1 mt-1.5 flex flex-col gap-0.5 border-l border-border-light pl-3.5',
            grow && 'min-h-0 flex-1 overflow-hidden',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

type NavSubLinkProps = {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  trailing?: ReactNode;
};

export function NavSubLink({ label, icon, isActive = false, onClick, trailing }: NavSubLinkProps) {
  const className = cn(
    'wonka-sidebar-nav-item flex h-8 items-center gap-2 px-1.5 text-left no-underline transition-colors',
    trailing ? 'min-w-0 flex-1 rounded-l-md' : 'w-full rounded-md',
    !trailing &&
      (isActive
        ? 'bg-[var(--ds-layout-sidebar-hover)] text-text-primary'
        : 'text-text-secondary hover:bg-[var(--ds-layout-sidebar-hover)] hover:text-text-primary'),
    trailing && (isActive ? 'text-text-primary' : 'text-text-secondary'),
  );
  const content = (
    <>
      <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </>
  );

  const button = (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );

  if (!trailing) {
    return button;
  }

  return (
    <div
      className={cn(
        'flex h-8 items-center rounded-md',
        isActive
          ? 'bg-[var(--ds-layout-sidebar-hover)] text-text-primary'
          : 'text-text-secondary hover:bg-[var(--ds-layout-sidebar-hover)] hover:text-text-primary',
      )}
    >
      {button}
      {trailing}
    </div>
  );
}

type NavNestedDisclosureProps = {
  id: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count?: number;
  trailing?: ReactNode;
  fill?: boolean;
  limitHeight?: boolean;
  children: ReactNode;
};

export function NavNestedDisclosure({
  id,
  title,
  open,
  onOpenChange,
  count,
  trailing,
  fill = false,
  limitHeight = true,
  children,
}: NavNestedDisclosureProps) {
  return (
    <div className={cn('mt-0.5', fill && 'flex min-h-0 flex-1 flex-col')}>
      <div className="flex items-center">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => onOpenChange(!open)}
          className="wonka-sidebar-nav-item flex h-7 min-w-0 flex-1 items-center gap-1 rounded-md px-1.5 text-text-secondary transition-colors hover:bg-[var(--ds-layout-sidebar-hover)] hover:text-text-primary"
        >
          <ChevronDown
            className={cn(
              'h-3 w-3 shrink-0 transition-transform duration-150',
              !open && '-rotate-90',
            )}
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1 truncate text-left">{title}</span>
          {count != null && count > 0 && (
            <span className="text-[10px] tabular-nums text-text-tertiary">{count}</span>
          )}
        </button>
        {trailing}
      </div>
      {open && (
        <div
          id={id}
          className={cn(
            'mt-1',
            fill && 'flex min-h-0 flex-1 flex-col overflow-hidden',
            !fill && limitHeight && 'hide-scrollbar max-h-44 overflow-y-auto overscroll-contain',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
