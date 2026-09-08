import { useMemo, useRef, useState } from 'react';
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { ArrowRight, Check, ChevronDown, PlugZap, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import ConnectorIconStack from './ConnectorIconStack';

/**
 * Ported from WonkaChat/client/src/components/Tools/ConnectAppsMenu.tsx — the
 * composer's "N integrations connected" pill (`FavoriteConnectors.tsx` wraps
 * this with a `conversationId` prop this lab has no equivalent for). Trigger
 * pill markup, the connected-tools list, and the search input/footer are all
 * kept verbatim (including `wonka-integration-icon`/`wonka-connect-apps-dialog`,
 * ported into `src/index.css`).
 *
 * Stripped/mocked:
 * - `useFavoriteConnectors`, `useMCPServerManager`, `buildConnectorCatalog`
 *   (real MCP server discovery + connection-state machine, each backed by
 *   data-provider queries) → a static mock catalog with a fake per-tool
 *   `connected` flag and a `setTimeout`-based fake "connect" action.
 * - `MCPConfigDialog` (per-server OAuth/config forms) → out of scope; the
 *   "Configure" vs "Connect" label swap is kept, but clicking it is a no-op.
 * - `v1`/`v2` server-name versioning and the "More integrations" pagination
 *   footer → dropped; this lab's catalog is small enough to show in full.
 */
export interface MockConnector {
  id: string;
  name: string;
  icon?: string;
  connected: boolean;
}

const defaultCatalog: MockConnector[] = [
  { id: 'gmail', name: 'Gmail', connected: true },
  { id: 'gcal', name: 'Google Calendar', connected: true },
  { id: 'slack', name: 'Slack', connected: false },
  { id: 'github', name: 'GitHub', connected: false },
  { id: 'notion', name: 'Notion', connected: false },
];

interface ConnectAppsMenuProps {
  catalog?: MockConnector[];
  onBrowseAll?: () => void;
}

export default function ConnectAppsMenu({
  catalog: catalogProp,
  onBrowseAll,
}: ConnectAppsMenuProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [connecting, setConnecting] = useState<string | null>(null);
  const [catalog, setCatalog] = useState(catalogProp ?? defaultCatalog);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const connectedTools = useMemo(() => catalog.filter((tool) => tool.connected), [catalog]);
  const matchingTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter((tool) => tool.name.toLowerCase().includes(q));
  }, [catalog, searchQuery]);

  const triggerLabel =
    connectedTools.length === 0
      ? 'Connect apps'
      : connectedTools.length === 1
        ? connectedTools[0].name
        : `${connectedTools.length} integrations connected`;

  const handleConnect = (tool: MockConnector) => {
    setConnecting(tool.id);
    window.setTimeout(() => {
      setCatalog((prev) => prev.map((t) => (t.id === tool.id ? { ...t, connected: true } : t)));
      setConnecting(null);
    }, 900);
  };

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button
          type="button"
          aria-label="Connect apps"
          title="Connect apps"
          className={cn(
            'group inline-flex h-9 max-w-[8.5rem] cursor-pointer items-center gap-1.5 rounded-[var(--radius-sm)] border border-border-light bg-surface-secondary px-2 py-1.5 text-text-primary shadow-sm transition-colors sm:max-w-full sm:gap-2 sm:px-2.5',
            'hover:border-border-medium hover:bg-surface-tertiary active:bg-surface-secondary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary',
          )}
        >
          <span className="max-w-[5.25rem] truncate text-xs font-medium sm:max-w-none sm:whitespace-nowrap sm:text-sm">
            {triggerLabel}
          </span>
          {connectedTools.length > 0 && (
            <ConnectorIconStack items={connectedTools.map((tool) => ({ id: tool.id }))} />
          )}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-3.5 w-3.5 flex-shrink-0 text-text-secondary transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>
      </Trigger>

      <Portal>
        <Content
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={12}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            searchInputRef.current?.focus();
          }}
          className="wonka-connect-apps-dialog z-50 flex h-[min(420px,var(--radix-popover-content-available-height))] w-[min(360px,calc(100vw-24px))] flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="border-b border-border-light p-2.5">
            <label className="relative block">
              <span className="sr-only">Search apps</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search apps"
                className="h-10 w-full rounded-[var(--radius-sm)] border border-border-medium bg-surface-secondary pl-9 pr-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-brand-500 focus:bg-surface-primary focus:ring-2 focus:ring-brand-500/15"
              />
            </label>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-1">
            {matchingTools.map((tool) => (
              <article
                key={tool.id}
                className="group/row flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2.5 transition-colors hover:bg-surface-hover"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border-medium text-transparent">
                  {tool.connected && <Check className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />}
                </div>
                <div className="wonka-integration-icon flex-shrink-0">
                  <PlugZap className="h-5 w-5 text-text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-text-primary">{tool.name}</h3>
                </div>
                {!tool.connected && (
                  <button
                    type="button"
                    onClick={() => handleConnect(tool)}
                    disabled={connecting === tool.id}
                    className="inline-flex h-8 flex-shrink-0 items-center justify-center gap-1.5 rounded-[var(--radius-xs)] border border-border-medium bg-surface-primary px-3 text-xs font-semibold text-text-primary transition-colors hover:border-brand-500 hover:text-brand-700 disabled:cursor-default"
                  >
                    {connecting === tool.id ? 'Connecting…' : 'Connect'}
                  </button>
                )}
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onBrowseAll?.();
            }}
            className="flex min-h-11 flex-shrink-0 items-center justify-between border-t border-border-light px-4 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
          >
            Browse all integrations
            <ArrowRight className="h-4 w-4" />
          </button>
        </Content>
      </Portal>
    </Root>
  );
}
