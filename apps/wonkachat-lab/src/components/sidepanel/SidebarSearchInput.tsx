import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/client/src/components/Nav/SidebarSearchInput.tsx —
 * `preview-feature/agent-creation-ux` branch. A full-width bordered search
 * box (not an icon-that-widens-into-an-input like the prior lab pass had
 * imagined) used both as the "search discussions" row inside the
 * Conversations section and inside the Projects nested disclosure.
 * Markup/classNames kept verbatim; only the recoil-backed debounced
 * query state (`SearchBar.tsx`) is replaced with a plain `useState` in the
 * caller.
 */
export default function SidebarSearchInput({
  value,
  onValueChange,
  onClear,
  placeholder,
  ariaLabel,
  clearAriaLabel,
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  ariaLabel: string;
  clearAriaLabel: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value.length > 0;

  const clear = () => {
    onClear();
    inputRef.current?.focus();
  };

  const focusField = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button') || target === inputRef.current) {
      return;
    }
    event.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'group relative mb-1 flex h-10 cursor-text select-none items-center rounded-[var(--radius-sm)] border border-border-medium bg-surface-primary px-3 py-2 text-text-primary transition-colors duration-200 focus-within:border-[var(--color-blue-600)] hover:bg-surface-hover',
        className,
      )}
      onMouseDown={focusField}
    >
      <Search
        className="pointer-events-none absolute left-3 h-4 w-4 text-text-secondary group-focus-within:text-text-primary"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        className="m-0 w-full select-text border-none bg-transparent p-0 pl-7 text-sm leading-tight text-text-primary outline-none placeholder:text-text-tertiary focus:outline-none focus-visible:outline-none"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Backspace' && event.currentTarget.value === '') {
            clear();
          }
        }}
        aria-label={ariaLabel}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        dir="auto"
      />
      <button
        type="button"
        aria-label={clearAriaLabel}
        className={cn(
          'absolute right-[7px] flex h-5 w-5 items-center justify-center rounded-full border-none bg-transparent p-0 text-text-secondary transition-opacity duration-200 hover:text-text-primary',
          hasValue ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={clear}
        tabIndex={hasValue ? 0 : -1}
        disabled={!hasValue}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
