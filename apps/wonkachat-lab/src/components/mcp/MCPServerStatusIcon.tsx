import { AnimatePresence, motion } from 'framer-motion';
import { SettingsIcon, AlertTriangle, KeyRound, PlugZap, X } from 'lucide-react';
import Spinner from '../primitives/Spinner';
import { durations, springs } from '../../motion-tokens';

/**
 * Ported from WonkaChat/client/src/components/MCP/MCPServerStatusIcon.tsx.
 * The source dispatches on `isInitializing` / `MCPServerStatus.connectionState`
 * to one of five near-identical `<button>`s with a swapped icon; that
 * branching structure (and every className) is kept, including the real
 * `<Spinner />` (an SVG ring, CSS `@keyframes spinner-rotate` — a prior pass
 * here had substituted `lucide-react`'s `Loader2` with a framer-motion
 * `animate={{ rotate: 360 }}` loop; that substitution has been reverted).
 * The one deliberate addition: an `AnimatePresence` cross-fade + scale
 * between states (the source has no transition between states at all — an
 * icon just replaces another on re-render).
 */
export type MCPConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface MCPServerStatus {
  connectionState: MCPConnectionState;
  requiresOAuth?: boolean;
}

interface MCPServerStatusIconProps {
  serverName: string;
  serverStatus?: MCPServerStatus;
  isInitializing?: boolean;
  canCancel?: boolean;
  hasCustomUserVars?: boolean;
  isAuthenticated?: boolean;
  onConfigClick?: () => void;
  onCancel?: () => void;
}

const iconMotionProps = {
  initial: { opacity: 0, scale: 0.7 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 },
  transition: durations.fast,
};

export default function MCPServerStatusIcon({
  serverName,
  serverStatus,
  isInitializing = false,
  canCancel = false,
  hasCustomUserVars = false,
  isAuthenticated = false,
  onConfigClick,
  onCancel,
}: MCPServerStatusIconProps) {
  if (isInitializing) {
    if (canCancel) {
      return (
        <button
          type="button"
          onClick={onCancel}
          className="group flex h-6 w-6 items-center justify-center rounded p-1 hover:bg-red-100 dark:hover:bg-red-900/20"
          aria-label={`Cancel connecting to ${serverName}`}
          title="Cancel"
        >
          <div className="relative h-4 w-4">
            <Spinner className="h-4 w-4 group-hover:opacity-0" />
            <X className="absolute inset-0 h-4 w-4 text-red-500 opacity-0 group-hover:opacity-100" />
          </div>
        </button>
      );
    }

    return (
      <div className="flex h-6 w-6 items-center justify-center rounded p-1">
        <Spinner className="h-4 w-4" aria-label={`Connecting to ${serverName}`} />
      </div>
    );
  }

  if (!serverStatus) return null;
  const { connectionState, requiresOAuth } = serverStatus;

  if (connectionState === 'connecting') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded p-1">
        <Spinner className="h-4 w-4" aria-label={`Connecting to ${serverName}`} />
      </div>
    );
  }

  if (connectionState === 'disconnected') {
    return (
      <button
        type="button"
        onClick={onConfigClick}
        className="flex h-6 w-6 items-center justify-center rounded p-1 hover:bg-surface-secondary"
        aria-label={`Configure ${serverName}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {requiresOAuth ? (
            <motion.div key="oauth" {...iconMotionProps}>
              <KeyRound className="h-4 w-4 text-[var(--color-blue-600)]" />
            </motion.div>
          ) : (
            <motion.div key="plug" {...iconMotionProps}>
              <PlugZap className="h-4 w-4 text-[var(--color-blue-600)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  if (connectionState === 'error') {
    return (
      <button
        type="button"
        onClick={onConfigClick}
        className="flex h-6 w-6 items-center justify-center rounded p-1 hover:bg-surface-secondary"
        aria-label={`Configure ${serverName}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: [1.15, 1] }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={springs.snappy}
          >
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </motion.div>
        </AnimatePresence>
      </button>
    );
  }

  if (connectionState === 'connected') {
    if (!hasCustomUserVars) return null;
    return (
      <button
        type="button"
        onClick={onConfigClick}
        className="flex h-6 w-6 items-center justify-center rounded p-1 hover:bg-surface-secondary"
        aria-label={`Configure ${serverName}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key="settings" {...iconMotionProps}>
            <SettingsIcon className={`h-4 w-4 ${isAuthenticated ? 'text-green-500' : 'text-gray-400'}`} />
          </motion.div>
        </AnimatePresence>
      </button>
    );
  }

  return null;
}
