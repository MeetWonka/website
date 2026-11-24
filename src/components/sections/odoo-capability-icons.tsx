import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BankIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 10h18M5 10V19M9 10V19M15 10V19M19 10V19M2 10l10-6 10 6M7 14h2M15 14h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M8 7H6a2 2 0 00-2 2v8h4v-6H8a2 2 0 012-2V7zM18 7h-2a2 2 0 00-2 2v8h4v-6h-2a2 2 0 01-2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M8 10h8M8 14h5M7 19l-3 2V6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TicketIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 8h16v3a2 2 0 010 4v3H4v-3a2 2 0 010-4V8zM9 12h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M8 4h8l4 4v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2zM14 4v4h4M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3-3M8 11h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserPlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 20a7 7 0 0114 0M19 8v4M21 10h-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoxesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 8l8-4 8 4-8 4-8-4zM4 16l8 4 8-4M4 12l8 4 8-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitBranchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 8v4a4 4 0 004 4h4M18 8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScaleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 4v16M6 8h12M8 8l-3 6h6l-3-6zM16 8l-3 6h6l-3-6z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const ODOO_CAPABILITY_ICONS: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  bank: BankIcon,
  quote: QuoteIcon,
  chat: ChatIcon,
  ticket: TicketIcon,
  document: DocumentIcon,
  search: SearchIcon,
  userPlus: UserPlusIcon,
  boxes: BoxesIcon,
  database: DatabaseIcon,
  gitBranch: GitBranchIcon,
  scale: ScaleIcon,
};

export function OdooCapabilityIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = ODOO_CAPABILITY_ICONS[name];
  if (!Component) return null;
  return <Component className={className} />;
}
