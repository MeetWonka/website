"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavLinkActive } from "@/lib/nav-active";
import type { FooterDisplayLink } from "@/lib/footer-nav";

export function FooterLink({
  link,
  siblingHrefs = [],
}: {
  link: FooterDisplayLink;
  siblingHrefs?: string[];
}) {
  const pathname = usePathname();
  const className =
    "type-paragraph-s block w-full transition-opacity hover:opacity-60";

  if (link.disabled) {
    return (
      <span
        aria-disabled="true"
        className="type-paragraph-s block w-full cursor-not-allowed text-text/35"
      >
        {link.label}
      </span>
    );
  }

  if (!link.href) {
    return (
      <span className="type-paragraph-s block w-full text-text/45">
        {link.label}
      </span>
    );
  }

  const isActive =
    !link.external &&
    isNavLinkActive(pathname, link.href, siblingHrefs);

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && "opacity-60")}
    >
      {link.label}
    </Link>
  );
}
