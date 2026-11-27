"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavLinkActive } from "@/lib/nav-active";
import { NavStatusTooltip } from "./nav-status-tooltip";
import type { NavDropdownChild, NavItem } from "@/lib/types";

interface MegaMenuPanelProps {
  item: NavItem | null;
  open: boolean;
}

function findChild(children: NavDropdownChild[], key: string) {
  return children.find((child) => child._key === key);
}

function MegaMenuLink({
  child,
  siblingHrefs,
  compact = false,
}: {
  child: NavDropdownChild;
  siblingHrefs: string[];
  compact?: boolean;
}) {
  const pathname = usePathname();
  const isActive =
    !child.disabled &&
    isNavLinkActive(pathname, child.href, siblingHrefs);

  const labelClass = cn(
    "text-text",
    compact ? "type-paragraph-s" : "type-paragraph-m-bold",
    child.disabled && "text-text/35",
  );

  if (child.disabled) {
    const tooltipId = `desktop-nav-${child._key}-status`;

    return (
      <span
        role="link"
        aria-disabled="true"
        aria-describedby={tooltipId}
        tabIndex={0}
        className={cn(
          "group relative flex cursor-default flex-col gap-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          compact && "inline-flex py-0",
        )}
      >
        <span className={labelClass}>{child.label}</span>
        {!compact && child.description && (
          <span className="type-paragraph-s text-text/30">
            {child.description}
          </span>
        )}
        <NavStatusTooltip id={tooltipId} />
      </span>
    );
  }

  return (
    <Link
      href={child.href}
      target={child.external ? "_blank" : undefined}
      rel={child.external ? "noopener noreferrer" : undefined}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex flex-col gap-1 py-1 transition-opacity hover:opacity-60",
        compact && "inline-flex py-0",
        isActive && "opacity-60",
      )}
    >
      <span className={labelClass}>{child.label}</span>
      {!compact && child.description && (
        <span className="type-paragraph-s text-light-brown">
          {child.description}
        </span>
      )}
    </Link>
  );
}

function WorkspaceMegaMenu({
  item,
  siblingHrefs,
}: {
  item: NavItem;
  siblingHrefs: string[];
}) {
  const children = item.children ?? [];
  const overview = findChild(children, "overview");
  const primaryKeys = ["ai-chat", "ai-agents", "ai-apps", "ai-automations"] as const;
  const secondaryKeys = ["integrations", "governance"] as const;

  const primaryItems = primaryKeys
    .map((key) => findChild(children, key))
    .filter((child): child is NavDropdownChild => Boolean(child));

  const secondaryItems = secondaryKeys
    .map((key) => findChild(children, key))
    .filter((child): child is NavDropdownChild => Boolean(child));

  return (
    <div className="mx-auto w-full max-w-[84rem]">
      <p className="type-eyebrow mb-8 text-text/60">{item.label}</p>

      {overview && (
        <div className="mb-8 lg:max-w-[42rem]">
          <MegaMenuLink child={overview} siblingHrefs={siblingHrefs} />
        </div>
      )}

      <ul className="mb-8 grid gap-x-16 gap-y-8 sm:grid-cols-2 lg:max-w-[42rem]">
        {primaryItems.map((child) => (
          <li key={child._key}>
            <MegaMenuLink child={child} siblingHrefs={siblingHrefs} />
          </li>
        ))}
      </ul>

      {secondaryItems.length > 0 && (
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {secondaryItems.map((child) => (
            <li key={child._key}>
              <MegaMenuLink
                child={child}
                siblingHrefs={siblingHrefs}
                compact
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DefaultMegaMenu({
  item,
  siblingHrefs,
}: {
  item: NavItem;
  siblingHrefs: string[];
}) {
  return (
    <div className="mx-auto w-full max-w-[84rem]">
      <p className="type-eyebrow mb-8 text-text/60">{item.label}</p>
      <ul className="grid gap-x-16 gap-y-8 sm:grid-cols-2 lg:max-w-[42rem]">
        {item.children?.map((child) => (
          <li key={child._key}>
            <MegaMenuLink child={child} siblingHrefs={siblingHrefs} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenuPanel({ item, open }: MegaMenuPanelProps) {
  if (!item?.children?.length) return null;

  const siblingHrefs = item.children.map((child) => child.href);

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">
        <div className="border-t border-dashed border-border px-6 pb-10 pt-8 md:px-8 lg:px-12">
          {item._key === "ai-workspace" ? (
            <WorkspaceMegaMenu item={item} siblingHrefs={siblingHrefs} />
          ) : (
            <DefaultMegaMenu item={item} siblingHrefs={siblingHrefs} />
          )}
        </div>
      </div>
    </div>
  );
}
