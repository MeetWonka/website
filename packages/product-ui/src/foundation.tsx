"use client";
import {
  cloneElement,
  isValidElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
} from "react";
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import { Button } from "../../react/src/button";
import type { ViewState } from "./types";

const ProductThemeContext = createContext<"light" | "dark">("light");
export function ProductTheme({
  children,
  theme = "light",
  capture = false,
}: {
  children: ReactNode;
  theme?: "light" | "dark";
  capture?: boolean;
}) {
  return (
    <ProductThemeContext.Provider value={theme}>
      <div
        className="wp"
        data-theme={theme}
        data-capture={capture || undefined}
      >
        {children}
      </div>
    </ProductThemeContext.Provider>
  );
}
export function ActionButton({
  children,
  tone = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "default" | "primary" | "danger" | "quiet";
  showArrow?: boolean;
}) {
  return (
    <Button
      {...props}
      data-tone={tone}
      type={props.type ?? "button"}
      variant={
        tone === "primary"
          ? "primary"
          : tone === "danger"
            ? "destructive"
            : tone === "quiet"
              ? "ghost"
              : "outline"
      }
      className={`wp-button ${props.className ?? ""}`}
    >
      {children}
    </Button>
  );
}
export function Icon({
  name = "grid",
  size = 18,
}: {
  name?: string;
  size?: number;
}) {
  const paths: Record<string, string> = {
    plus: "M12 5v14M5 12h14",
    close: "m6 6 12 12M18 6 6 18",
    check: "m5 12 4 4L19 6",
    search: "M21 21l-6-6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
    chevron: "m9 5 7 7-7 7",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    send: "M12 19V5m-6 6 6-6 6 6",
    star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    chat: "M4 4h16v12H9l-5 4Z",
    plug: "M8 3v5m8-5v5M6 8h12v4a6 6 0 0 1-12 0Zm6 10v3",
    settings: "M5 6h14M5 12h14M5 18h14M9 3v6m6 0v6M9 15v6",
    file: "M5 3h9l5 5v13H5Zm9 0v6h5M8 13h8m-8 4h6",
    clock: "M12 7v5l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
    lock: "M5 10h14v11H5Zm3 0V7a4 4 0 0 1 8 0v3",
    user: "M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    more: "M5 12h.01M12 12h.01M19 12h.01",
    book: "M3 4h7l2 2 2-2h7v16h-7l-2 1-2-1H3Zm9 2v15",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.grid} />
    </svg>
  );
}
export function IdentityAvatar({
  name,
  src,
  large = false,
}: {
  name: string;
  src?: string;
  large?: boolean;
}) {
  return (
    <span className={`wp-avatar ${large ? "wp-avatar-large" : ""}`}>
      {src ? (
        <img src={src} alt="" />
      ) : (
        name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((v) => v[0])
          .join("")
          .toUpperCase()
      )}
    </span>
  );
}
export function Panel({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="wp-panel">
      <header className="wp-panel-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
export function Field({
  label,
  hint,
  error,
  children,
  required,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  const id = useId();
  const control =
    isValidElement(children) && typeof children.type === "string"
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-labelledby": `${id}-label`,
          "aria-describedby":
            [hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined]
              .filter(Boolean)
              .join(" ") || undefined,
          "aria-invalid": error ? true : undefined,
          required: required || undefined,
        })
      : children;
  return (
    <label className="wp-field">
      <span id={`${id}-label`}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {control}
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && (
        <small id={`${id}-error`} role="alert" className="wp-error-text">
          {error}
        </small>
      )}
    </label>
  );
}
export function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="wp-toggle-row">
      <label htmlFor={id}>
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className="wp-switch"
        onClick={() => onChange?.(!checked)}
      >
        <span />
      </button>
    </div>
  );
}
export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "error" | "info";
}) {
  return (
    <span className="wp-tag" data-tone={tone}>
      {children}
    </span>
  );
}
export function SearchInput({
  value,
  onChange,
  label = "Rechercher",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <label className="wp-search">
      <Icon name="search" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        aria-label={label}
      />
    </label>
  );
}
export function StateNotice({
  state,
  children,
  onRetry,
}: {
  state: Exclude<ViewState, "ready">;
  children?: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <div
      className="wp-notice"
      role={state === "error" ? "alert" : "status"}
      aria-busy={state === "loading"}
    >
      {state === "loading" && <span className="wp-spinner" />}
      <p>
        {children ??
          {
            loading: "Chargement…",
            empty: "Aucun résultat.",
            error: "Impossible de charger les données.",
            disabled: "Vous n’avez pas accès à cette action.",
          }[state]}
      </p>
      {state === "error" && onRetry && (
        <ActionButton onClick={onRetry}>Réessayer</ActionButton>
      )}
    </div>
  );
}
export function ProductDialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const theme = useContext(ProductThemeContext);
  const ref = useRef<HTMLDialogElement>(null),
    id = useId();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
    return () => {
      if (el.open) el.close();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="wp wp-dialog"
      data-theme={theme}
      aria-labelledby={id}
      aria-describedby={description ? `${id}-desc` : undefined}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <header>
        <div>
          <h2 id={id}>{title}</h2>
          {description && <p id={`${id}-desc`}>{description}</p>}
        </div>
        <ActionButton tone="quiet" aria-label="Fermer" onClick={onClose}>
          <Icon name="close" />
        </ActionButton>
      </header>
      <div className="wp-dialog-body">{children}</div>
      {footer && <footer>{footer}</footer>}
    </dialog>
  );
}
export function MotionStage({
  children,
  frame = 0,
  fps = 25,
  reducedMotion = false,
}: {
  children: ReactNode;
  frame?: number;
  fps?: number;
  reducedMotion?: boolean;
}) {
  return (
    <div
      className="wp-motion-stage"
      data-frame={frame}
      data-fps={fps}
      data-reduced-motion={reducedMotion}
      style={{ "--wp-frame": frame } as CSSProperties}
    >
      {children}
    </div>
  );
}
