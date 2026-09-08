import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

/**
 * Ported from WonkaChat/packages/client/src/components/Dialog.tsx. The source
 * branches its layout with `useMediaQuery('(max-width: 768px)')`; reproduced
 * here with a lightweight local hook so this file has no dependency on
 * WonkaChat's `~/hooks` package. `DialogClose`/`DialogButton` (real source
 * exports both — the latter a `Button`-based close affordance) are included
 * too, even though no story currently uses them, to keep the exported API
 * surface identical to the source file.
 */
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  );
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const listener = () => setIsSmall(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);
  return isSmall;
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ children }: { children: React.ReactNode }) => (
  <DialogPrimitive.Portal>
    <div className="fixed inset-0 z-[999] flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-[999] bg-[color-mix(in_srgb,var(--color-black)_66%,transparent)] backdrop-blur-[2px] transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      className,
    )}
    {...props}
    ref={ref}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  disableScroll?: boolean;
};

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children = true, showCloseButton = true, disableScroll = false, ...props }, ref) => {
  const isSmallScreen = useIsSmallScreen();
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-[999] grid w-full gap-4 rounded-b-[var(--radius-sm)] border border-border-light bg-surface-dialog pb-6 text-text-primary shadow-[var(--shadow-subtle-hover)] animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:rounded-[var(--radius-sm)]',
          isSmallScreen
            ? 'fixed left-1/2 top-1/2 z-[999] m-auto grid w-11/12 -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--radius-sm)] bg-surface-dialog pb-6'
            : '',
          disableScroll ? 'overflow-hidden' : '',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-6 top-[1.6rem] rounded-[var(--radius-xs)] p-1 text-text-secondary opacity-70 transition-opacity hover:bg-surface-hover hover:text-text-primary hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-2 border-b border-border-light p-6 pb-4 text-left', className)}
    {...props}
  />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-row justify-between space-x-2 px-6 py-4', className)} {...props} />
);

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-medium text-text-primary', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      'mt-2 inline-flex h-10 items-center justify-center rounded-[var(--radius-sm)] border border-border-light bg-surface-primary px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      className,
    )}
    {...props}
  />
));
DialogClose.displayName = 'DialogClose';

export const DialogButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className={cn(
      'mt-2 inline-flex h-10 items-center justify-center rounded-[var(--radius-sm)] border border-border-light bg-surface-primary px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      className,
    )}
    {...props}
  />
));
DialogButton.displayName = 'DialogButton';
