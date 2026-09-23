import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "block aspect-[300/69] h-[1.1875rem] w-auto shrink-0 bg-current [mask:url('/images/brand/wonka-logo-mask.png')_center/contain_no-repeat] [-webkit-mask:url('/images/brand/wonka-logo-mask.png')_center/contain_no-repeat]",
        className,
      )}
      aria-hidden
    />
  );
}
