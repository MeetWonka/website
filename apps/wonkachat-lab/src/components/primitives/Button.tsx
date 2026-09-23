/**
 * Re-exports the canonical @wonka/react Button instead of maintaining a
 * divergent local copy — this lab is meant to prove the product actually
 * consumes the brand design system, not approximate it. See
 * design-system/components.json ("component.button", channels include
 * "product") for the governance record this now honors.
 *
 * Variant names changed from the old local implementation:
 *   default/submit -> primary   (the brand's signal-shape CTA look)
 *   secondary       -> secondary (now the brand's white signal-shape, not a
 *                                 gray bordered button — that's "outline" now)
 *   destructive/outline/ghost/link -> unchanged
 */
export {
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonVariant,
} from '@wonka/react/button';
