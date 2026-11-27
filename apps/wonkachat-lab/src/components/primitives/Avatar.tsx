import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../lib/utils';

/**
 * WonkaChat has no single dedicated `Avatar.tsx` primitive — user/agent
 * avatars are inlined per call site (see AgentCard.tsx: an `<img>` in a
 * bordered rounded box, falling back to the Wonka mark). This wraps that same
 * visual pattern in a reusable, Radix-based `@radix-ui/react-avatar` component
 * (image with graceful fallback) so it can be reused across ported components
 * (AgentCard, UserRow) with one motion treatment.
 */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border-medium bg-surface-secondary',
      className,
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('h-full w-full object-cover', className)} {...props} />
));
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center text-xs font-semibold text-text-secondary',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';
