/**
 * Motion tokens — the single source of truth for animation timing across every
 * ported component. Nothing in src/components/** should hand-write a duration,
 * easing curve, or spring config; import from here instead.
 *
 * Shapes follow Framer Motion's own API so a token can be spread directly into
 * a `transition` prop: `transition={durations.standard}` or
 * `transition={springs.snappy}`.
 */

/** Cubic-bezier easing curves, expressed as Framer Motion accepts them. */
export const easings = {
  /** Default UI easing — gentle acceleration in, gentle deceleration out. */
  standard: [0.4, 0, 0.2, 1] as const,
  /** For elements entering the screen (menus, popovers, dialogs appearing). */
  decelerate: [0, 0, 0.2, 1] as const,
  /** For elements leaving the screen. */
  accelerate: [0.4, 0, 1, 1] as const,
  /** Slight overshoot — for playful, attention-grabbing entrances (badges, pins). */
  emphasized: [0.2, 0, 0, 1] as const,
} as const;

/** Duration presets in seconds (Framer Motion's unit), matching WonkaChat's
 * existing Tailwind durations (150ms/200ms/300ms) plus a couple of finer ones
 * used for micro-interactions (button taps, icon swaps). */
export const durations = {
  instant: { duration: 0.1, ease: easings.standard },
  fast: { duration: 0.15, ease: easings.standard },
  standard: { duration: 0.2, ease: easings.standard },
  emphasized: { duration: 0.3, ease: easings.emphasized },
  slow: { duration: 0.4, ease: easings.decelerate },
} as const;

/** Spring presets — for anything that should feel physical rather than eased
 * (drag, toggle thumbs, cards settling into place). */
export const springs = {
  /** Crisp, low-travel — toggles, small icon state changes. */
  snappy: { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 } as const,
  /** Default "standard" spring — panel expand/collapse, card hover lift. */
  standard: { type: 'spring', stiffness: 300, damping: 30 } as const,
  /** Soft, slightly bouncy — modals, agent cards, celebratory moments. */
  gentle: { type: 'spring', stiffness: 220, damping: 24 } as const,
  /** Loose overshoot — badges/pins popping in. */
  bouncy: { type: 'spring', stiffness: 400, damping: 17 } as const,
} as const;

/** Common enter/exit variants for AnimatePresence-driven mount/unmount. */
export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeScaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },
  slideUpIn: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },
  slideDownIn: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
} as const;
