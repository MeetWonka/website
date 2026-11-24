"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavItemActive, isNavLinkActive } from "@/lib/nav-active";
import type { NavItem } from "@/lib/types";

interface DesktopNavProps {
  navItems: NavItem[];
  activeKey: string | null;
  onActivate: (key: string) => void;
}

export function DesktopNav({
  navItems,
  activeKey,
  onActivate,
}: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center">
      {navItems.map((item) => {
        const isOpen = activeKey === item._key;
        const isActive = isNavItemActive(pathname, item);

        if (item.itemType === "link") {
          const href = item.href ?? "/";
          const linkActive = isNavLinkActive(pathname, href);

          return (
            <li key={item._key}>
              <Link
                href={href}
                aria-current={linkActive ? "page" : undefined}
                className={cn(
                  "type-paragraph-m-bold inline-flex h-[1.875rem] items-center px-4 py-2.5 text-text transition-colors hover:text-text/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                  linkActive && "text-text/70",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        }

        return (
          <li key={item._key}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={isOpen}
              onMouseEnter={() => onActivate(item._key)}
              onFocus={() => onActivate(item._key)}
              className={cn(
                "type-paragraph-m-bold inline-flex h-[1.875rem] items-center px-4 py-2.5 text-text transition-colors",
                "hover:text-text/70",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                (isOpen || isActive) && "text-text/70",
              )}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
