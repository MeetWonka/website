"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavLinkActive, isNavItemActive } from "@/lib/nav-active";
import { SHOW_LANGUAGE_SWITCHER } from "@/lib/nav-defaults";
import { LanguageSwitcher } from "./language-switcher";
import { NavStatusTooltip } from "./nav-status-tooltip";
import type { NavDropdownChild, NavItem } from "@/lib/types";

function MobileNavChildLink({
  child,
  siblingHrefs,
  onNavigate,
}: {
  child: NavDropdownChild;
  siblingHrefs: string[];
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    !child.disabled &&
    isNavLinkActive(pathname, child.href, siblingHrefs);

  if (child.disabled) {
    const tooltipId = `mobile-nav-${child._key}-status`;

    return (
      <span
        role="link"
        aria-disabled="true"
        aria-describedby={tooltipId}
        tabIndex={0}
        className="group relative flex cursor-default flex-col gap-1 rounded-xs px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      >
        <span className="type-paragraph-m-bold text-black/35">
          {child.label}
        </span>
        {child.description && (
          <span className="type-paragraph-s text-light-brown/60">
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
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex flex-col gap-1 rounded-xs px-3 py-3 transition-[background-color,box-shadow] duration-200 hover:bg-light-gray hover:shadow-subtle-hover",
        isActive && "bg-mid-gray shadow-subtle",
      )}
    >
      <span className="type-paragraph-m-bold text-black">{child.label}</span>
      {child.description && (
        <span className="type-paragraph-s text-light-brown">
          {child.description}
        </span>
      )}
    </Link>
  );
}

function MobileNavAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const siblingHrefs = item.children?.map((child) => child.href) ?? [];
  const isSectionActive = isNavItemActive(pathname, item);

  return (
    <div>
      <div className="flex w-full items-center justify-between py-2">
        {item.href ? (
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={
              isNavLinkActive(pathname, item.href, siblingHrefs)
                ? "page"
                : undefined
            }
            className={cn(
              "type-paragraph-m text-black transition-colors",
              (isNavLinkActive(pathname, item.href, siblingHrefs) ||
                isSectionActive) &&
                "text-black/60",
            )}
          >
            {item.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className={cn(
              "type-paragraph-m text-black transition-colors",
              isSectionActive && "text-black/60",
            )}
          >
            {item.label}
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="-mr-2 p-2"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
        >
          <svg
            className={cn(
              "size-5 shrink-0 text-black transition-transform duration-200",
              isOpen && "rotate-180",
            )}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pb-1 pl-4 pt-2">
            {item.children?.map((child) => (
              <MobileNavChildLink
                key={child._key}
                child={child}
                siblingHrefs={siblingHrefs}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileNavToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-white text-black shadow-subtle transition-all active:scale-[0.97]"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        )}
      </svg>
    </button>
  );
}

export function MobileNavOverlay({
  isOpen,
  onClose,
  navItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[3.5rem] bottom-0 z-30 overflow-y-auto bg-white transition-opacity duration-200 lg:hidden",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <nav className="flex flex-col gap-2 px-6 pb-8 pt-4">
        {navItems.map((item) =>
          item.itemType === "link" ? (
            <Link
              key={item._key}
              href={item.href || "/"}
              onClick={onClose}
              className="type-paragraph-m py-2 text-black transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <MobileNavAccordion
              key={`${item._key}-${isOpen ? "o" : "c"}`}
              item={item}
              onNavigate={onClose}
            />
          ),
        )}

        {SHOW_LANGUAGE_SWITCHER ? (
          <>
            <div className="h-px w-full bg-black/10" />
            <div className="py-2">
              <LanguageSwitcher />
            </div>
          </>
        ) : null}
      </nav>
    </div>
  );
}
