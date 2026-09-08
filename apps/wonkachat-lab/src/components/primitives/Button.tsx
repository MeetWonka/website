import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/packages/client/src/components/Button.tsx — markup,
 * class names and variant/size scale kept identical (including the
 * `wonka-signal-button` gradient class for the default/submit variants).
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium ring-offset-background transition-[background-color,color,transform,filter] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'wonka-signal-button',
        destructive:
          'bg-surface-destructive text-destructive-foreground hover:bg-surface-destructive-hover',
        outline:
          'border border-border-light bg-surface-primary text-text-primary shadow-[var(--shadow-subtle)] hover:bg-surface-secondary',
        secondary:
          'border border-border-light bg-surface-secondary text-text-primary hover:bg-surface-secondary-alt',
        ghost: 'hover:bg-surface-hover hover:text-accent-foreground',
        link: 'text-[var(--color-blue-700)] underline-offset-4 hover:underline dark:text-[var(--color-blue-300)]',
        submit: 'wonka-signal-button',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';
