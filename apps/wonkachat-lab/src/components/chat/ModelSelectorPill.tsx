import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/client/src/components/Chat/Menus/Endpoints/ModelSelector.tsx
 * — specifically its `variant="chat"` trigger pill (the composer's
 * model/agent picker, e.g. "Auto"). Trigger className kept verbatim.
 *
 * Stripped/mocked:
 * - `ModelSelectorProvider`/`useModelSelectorContext` (endpoint config, model
 *   specs, agents/assistants maps, all from data-provider queries) → a
 *   static mock option list.
 * - The real `Menu` (`CustomMenu.tsx`, an Ariakit combobox menu with search,
 *   grouped endpoints, featured-model sections, and a key-required dialog
 *   manager) → simplified to a plain dropdown list; this lab has no
 *   endpoint/key concepts to gate.
 * - The selected-model icon: real icons come from per-model server config
 *   (`resolveModelMetadata`) this lab has no source for — substituted with a
 *   generic `Sparkles` icon for the "Auto" option specifically (the real
 *   "Auto"/router spec's actual icon is server-configured and wasn't found
 *   in the client repo to copy).
 */
export interface MockModelOption {
  id: string;
  label: string;
}

const defaultOptions: MockModelOption[] = [
  { id: 'auto', label: 'Auto' },
  { id: 'pro', label: 'Pro' },
  { id: 'fast', label: 'Fast' },
];

export default function ModelSelectorPill({
  options = defaultOptions,
}: {
  options?: MockModelOption[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]?.id ?? '');
  const selectedOption = options.find((option) => option.id === selected) ?? options[0];

  return (
    <div className="relative flex flex-none items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select model"
        className="flex h-9 w-full min-w-0 max-w-full cursor-pointer items-center justify-center gap-1 rounded-[var(--radius-sm)] border border-border-light bg-surface-secondary px-2 py-1.5 text-xs font-medium text-text-primary shadow-sm transition-colors hover:border-border-medium hover:bg-surface-tertiary sm:max-w-[10rem] sm:gap-1.5 sm:px-2.5 sm:text-sm"
      >
        <div className="flex flex-shrink-0 items-center justify-center overflow-hidden">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
        <span className="flex-grow truncate text-left">{selectedOption?.label}</span>
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 text-text-secondary" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute bottom-full right-0 z-50 mb-2 min-w-32 rounded-[var(--radius-md)] border border-border-light bg-surface-primary p-1 shadow-lg"
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              onClick={() => {
                setSelected(option.id);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-text-primary hover:bg-surface-hover',
                option.id === selected && 'bg-surface-hover',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
