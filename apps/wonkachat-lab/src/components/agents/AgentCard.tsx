import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Link, Clock, BarChart3, MoreHorizontal, Copy, Pin, PinOff, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/Button';
import Spinner from '../primitives/Spinner';
import { springs, durations } from '../../motion-tokens';

/**
 * Ported from WonkaChat/client/src/components/Agents/AgentCard.tsx. Stripped:
 * `useNavigate`, `useSelectAgent`, `useAgentMCPConnectionGate`,
 * `useFavoriteAgents`, `useToastContext`, `useLocalize`,
 * `useAgentMCPConnectionGate`'s dialogs, and the workflow-runs modal —
 * replaced with local mock state (`isPinned`, `pendingLaunch`, `menuOpen`).
 * `TruncatedText` (an app-only utility) is replaced with a plain `<h3
 * className="truncate">`. Class names and DOM structure — including the
 * `wonka-agent-card`/`wonka-agent-card__actions`/
 * `wonka-agent-card__primary-action` marker classes the real CSS
 * (`wonka-design-system.css`) hooks into for layout — are kept verbatim.
 * `whileHover={{ y: -2 }}` is an ADDED hover-lift the source doesn't have
 * (the source relies purely on the CSS `hover:border-medium`/
 * `hover:shadow-[var(--shadow-subtle)]` transition) — kept as a deliberate
 * motion-design embellishment, not a fidelity bug.
 */
export interface MockAgent {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  creatorName?: string;
  createdLabel?: string;
}

interface AgentCardProps {
  agent: MockAgent;
  canEdit?: boolean;
  showWorkflows?: boolean;
}

export default function AgentCard({ agent, canEdit = true, showWorkflows = false }: AgentCardProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStartChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPendingLaunch(true);
    setTimeout(() => setPendingLaunch(false), 1200);
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <motion.div
      onClick={() => setMenuOpen(false)}
      role="button"
      tabIndex={0}
      whileHover={{ y: -2 }}
      transition={springs.standard}
      className={cn(
        'wonka-agent-card hover:bg-surface-secondary/30 group relative flex h-full cursor-pointer select-none flex-col gap-3 rounded-[var(--radius-md)] border border-border-light bg-surface-primary p-4 transition-[border-color,background-color,box-shadow] hover:border-border-medium hover:shadow-[var(--shadow-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-500)] focus-visible:ring-offset-2',
        isPinned && 'wonka-agent-card--pinned',
      )}
    >
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 sm:gap-3">
        <div className="h-10 w-10 shrink-0 sm:h-11 sm:w-11">
          {agent.avatarUrl ? (
            <div className="flex h-full w-full items-center justify-center rounded-lg border border-border-medium bg-white p-1">
              <img
                src={agent.avatarUrl}
                alt={agent.name}
                className="h-full w-full rounded object-contain"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg border border-border-medium bg-surface-secondary">
              {/* Real source falls back to the Wonka brand mark (`getWonkaMark()`); no
                  such asset exists in this standalone lab, so a plain initial substitutes. */}
              <span className="text-sm font-semibold text-text-secondary">
                {agent.name.slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="truncate text-[15px] font-semibold leading-tight text-text-primary sm:text-base"
          >
            {agent.name}
          </h3>
          {(agent.creatorName || agent.createdLabel) && (
            <div className="mt-1 truncate text-[11px] text-text-tertiary">
              {agent.creatorName && `Created by ${agent.creatorName}`}
              {agent.creatorName && agent.createdLabel && <span aria-hidden="true"> · </span>}
              {agent.createdLabel}
            </div>
          )}
        </div>
      </div>

      {agent.description && (
        <p className="line-clamp-2 text-sm leading-5 text-text-secondary">{agent.description}</p>
      )}

      <div className="wonka-agent-card__actions">
        <Button
          onClick={handleStartChat}
          disabled={pendingLaunch}
          aria-busy={pendingLaunch}
          className="wonka-agent-card__primary-action flex h-10 items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-border-medium bg-surface-primary px-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover focus:outline-none disabled:cursor-wait disabled:opacity-60"
          type="button"
        >
          {pendingLaunch ? (
            <Spinner className="h-3.5 w-3.5" />
          ) : (
            <ArrowUpRight className="order-2 h-3.5 w-3.5 text-text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
          Start chat
        </Button>
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              setMenuOpen((v) => !v);
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border-medium text-text-secondary transition-colors hover:border-border-heavy hover:bg-surface-hover hover:text-text-primary"
            aria-label={`Actions for ${agent.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={durations.fast}
              onClick={stop}
              className="absolute right-0 top-11 z-[1001] min-w-44 rounded-[var(--radius-sm)] border border-border-light bg-surface-dialog p-1 shadow-[var(--shadow-subtle-hover)]"
            >
              <button
                className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-surface-hover"
                onClick={() => setIsPinned((v) => !v)}
              >
                {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                {isPinned ? 'Unpin agent' : 'Pin agent'}
              </button>
              {showWorkflows && (
                <button className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-surface-hover">
                  <Clock className="h-4 w-4" /> Scheduled workflows · History
                </button>
              )}
              <button className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-surface-hover">
                <Link className="h-4 w-4" /> Copy link
              </button>
              <button className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-surface-hover">
                <Copy className="h-4 w-4" /> Duplicate agent
              </button>
              <button className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-surface-hover">
                <BarChart3 className="h-4 w-4" /> Audit agent
              </button>
              {canEdit && (
                <button className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-surface-hover">
                  <Settings className="h-4 w-4" /> Edit agent
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
