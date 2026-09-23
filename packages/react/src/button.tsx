import { cva, type VariantProps } from "class-variance-authority";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ReactNode,
  Ref,
} from "react";
import { cn } from "./lib/cn";

export const buttonVariants = cva(
  "group/btn relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-component-focus-ring-color)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "type-paragraph-m-bold isolate h-[2.6875rem] px-[1.125rem] text-[var(--ds-component-button-primary-foreground)]",
        secondary:
          "type-paragraph-s isolate h-[2rem] px-[0.75rem] text-[var(--ds-component-button-secondary-foreground)]",
        underline: "type-paragraph-m-bold rounded-none text-text",
        // Utility variants: dense-UI actions (product surfaces like WonkaChat).
        // Flat rounded-rect, no signal-shape silhouette, no arrow icon.
        destructive:
          "type-paragraph-s rounded-[var(--radius-sm)] bg-[var(--ds-component-button-destructive-background)] text-[var(--ds-component-button-destructive-foreground)] hover:opacity-90",
        outline:
          "type-paragraph-s rounded-[var(--radius-sm)] border border-[var(--ds-component-button-outline-border)] bg-[var(--ds-component-button-outline-background)] text-[var(--ds-component-button-outline-foreground)] hover:bg-[var(--ds-semantic-color-surface-muted)]",
        ghost:
          "type-paragraph-s rounded-[var(--radius-sm)] text-[var(--ds-component-button-ghost-foreground)] hover:bg-[var(--ds-component-button-ghost-background-hover)]",
        link: "type-paragraph-s text-[var(--ds-component-button-outline-foreground)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5",
        lg: "h-11 px-8",
        icon: "size-9 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const VARIANTS_WITH_ARROW = new Set([
  "primary",
  "secondary",
  "underline",
]);

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

function ButtonShape({
  viewBox,
  d,
  fill,
  children,
}: {
  viewBox: string;
  d: string;
  fill: string;
  children?: ReactNode;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [filter:drop-shadow(var(--ds-component-button-effect-drop-shadow))] transition-opacity duration-[var(--ds-motion-duration-normal)] group-hover/btn:opacity-80"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path d={d} fill={fill} />
      {children}
    </svg>
  );
}

const PRIMARY_PATH =
  "M1.00124 4.09872C0.945767 1.85161 2.75223 0 5.00002 0H162.707C164.99 0 166.81 1.90764 166.703 4.18811L165.057 39.141C164.956 41.2936 163.168 42.979 161.013 42.9526L5.76681 41.0473C3.61534 41.0209 1.87021 39.2973 1.81711 37.1463L1.00124 4.09872Z";

const SECONDARY_PATH =
  "M1.00117 27.8555C0.947308 30.1016 2.75334 31.9514 5.00002 31.9514H116.716C118.997 31.9514 120.816 30.0472 120.712 27.7687L119.616 3.81727C119.518 1.66186 117.727 -0.0269337 115.57 0.000324249L5.49052 1.39109C3.33853 1.41828 1.5938 3.14333 1.5422 5.29487L1.00117 27.8555Z";

const PRIMARY_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167 43" preserveAspectRatio="none"><path d="${PRIMARY_PATH}" fill="black"/></svg>`,
)}")`;

function ButtonBackgroundShape({
  variant,
}: {
  variant: ButtonVariant | null | undefined;
}) {
  if (variant === "primary") {
    return (
      <>
        <ButtonShape
          viewBox="0 0 167 43"
          d={PRIMARY_PATH}
          fill="var(--ds-component-button-primary-background)"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[var(--ds-motion-duration-normal)] group-hover/btn:opacity-80"
          style={{
            background: "var(--ds-component-button-effect-highlight)",
            WebkitMaskImage: PRIMARY_MASK_URL,
            maskImage: PRIMARY_MASK_URL,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </>
    );
  }

  if (variant === "secondary") {
    return (
      <ButtonShape
        viewBox="0 0 122 32"
        d={SECONDARY_PATH}
        fill="var(--ds-component-button-secondary-background)"
      />
    );
  }

  return null;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-[0.625rem] shrink-0", className)}
      aria-hidden
    >
      <g clipPath="url(#btn-arrow-clip)">
        <path
          d="M4.07364 0.00577368C5.37854 -0.0167442 6.6557 0.383625 7.71423 1.14704C8.77276 1.91046 9.55581 2.99593 9.94636 4.24123C10.0173 4.44941 10.0191 4.67668 9.94364 4.88305C9.36545 6.46032 7.56182 9.09214 4.07273 9.09214V7.6285C4.92818 7.74396 6.72909 7.39487 8.11091 5.26214H0V3.82668H8.12545C7.43818 2.70941 6.11091 1.29941 4.07364 1.29941V0.00668277V0.00577368Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="btn-arrow-clip">
          <rect width="10" height="9.09091" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant = "primary",
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <ButtonBackgroundShape variant={variant} />
      {variant === "underline" ? (
        <span className="underline underline-offset-2">{children}</span>
      ) : (
        children
      )}
      {VARIANTS_WITH_ARROW.has(variant ?? "primary") ? (
        <ArrowIcon className="transition-transform duration-[var(--ds-motion-duration-normal)] group-hover/btn:translate-x-[0.125rem]" />
      ) : null}
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof buttonVariants> {
  href: string;
  className?: string;
  children: ReactNode;
  linkComponent?: ElementType;
}

export function ButtonLink({
  href,
  variant = "primary",
  size,
  className,
  children,
  target,
  rel,
  linkComponent: LinkComponent = "a",
  ...props
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const opensInNewTab =
    target === "_blank" || (isExternal && target !== "_self");

  return (
    <LinkComponent
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      {...(opensInNewTab
        ? { target: "_blank", rel: rel ?? "noopener noreferrer" }
        : {})}
    >
      <ButtonBackgroundShape variant={variant} />
      {variant === "underline" ? (
        <span className="underline underline-offset-2">{children}</span>
      ) : (
        children
      )}
      {VARIANTS_WITH_ARROW.has(variant ?? "primary") ? (
        <ArrowIcon className="transition-transform duration-[var(--ds-motion-duration-normal)] group-hover/btn:translate-x-[0.125rem]" />
      ) : null}
    </LinkComponent>
  );
}
