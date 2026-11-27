import { Loader2, PlugZap } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Ported verbatim from WonkaChat/client/src/components/Tools/ConnectorIconStack.tsx
 * — the decorative overlapping-avatar stack used by both `ConnectAppsMenu`'s
 * trigger pill and the empty-state suggested-action rows.
 */
export type ConnectorIconStackItem = {
  id: string;
  icon?: string;
  loading?: boolean;
};

interface ConnectorIconStackProps {
  items: ConnectorIconStackItem[];
  size?: 'sm' | 'md';
  className?: string;
}

function ConnectorIcon({ item }: { item: ConnectorIconStackItem }) {
  if (item.loading) {
    return <Loader2 className="size-full animate-spin text-text-secondary" />;
  }
  if (item.icon) {
    return <img src={item.icon} alt="" className="size-full object-contain" />;
  }
  return <PlugZap className="size-full text-text-secondary" />;
}

export default function ConnectorIconStack({ items, size = 'md', className }: ConnectorIconStackProps) {
  const compact = size === 'sm';

  return (
    <span
      className={cn(
        'pointer-events-none flex select-none items-center',
        compact ? '-space-x-1.5' : '-space-x-2',
        className,
      )}
      aria-hidden="true"
    >
      {items.map((item) => (
        <span
          key={item.id}
          className={cn(
            'flex items-center justify-center rounded-full border border-border-medium bg-surface-primary shadow-[var(--shadow-subtle)]',
            compact ? 'size-6 p-1' : 'size-7 p-1.5',
          )}
        >
          <ConnectorIcon item={item} />
        </span>
      ))}
    </span>
  );
}
