"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { CookieSettingsLink } from "@/components/cookie-consent/cookie-settings-link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { commercialPath, localizeHref } from "@/i18n/routes";
import { getT } from "@/i18n/ui";
import {
  getFooterLegalLinks,
  getFooterLinkGroups,
} from "@/lib/footer-nav";
import { FooterLink } from "./footer-link";
import type { FooterLinkGroup, NavItem } from "@/lib/types";

interface FooterProps {
  navItems: NavItem[];
  linkGroups: FooterLinkGroup[] | null;
  locale?: Locale;
}

function FooterColumn({ group }: { group: ReturnType<typeof getFooterLinkGroups>[number] }) {
  const siblingHrefs =
    group.links
      ?.filter((link) => !link.disabled && link.href)
      .map((link) => link.href!)
      .filter(Boolean) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <p className="type-eyebrow text-text/60">{group.title}</p>
      <ul className="flex flex-col gap-2">
        {group.links?.map((link) => (
          <li
            key={link._key}
            className="border-b border-dashed border-border pb-2"
          >
            <FooterLink link={link} siblingHrefs={siblingHrefs} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ navItems, linkGroups, locale = "en" }: FooterProps) {
  const t = getT(locale);
  const year = new Date().getFullYear();
  void linkGroups;
  // Link-in-bio page: footer only (not in the header's Company menu).
  const groups = getFooterLinkGroups(navItems).map((group) =>
    group._key === "company"
      ? {
          ...group,
          links: [
            ...group.links,
            { _key: "links", label: t("shell.footer.linksPage"), href: localizeHref("/links", locale) },
          ],
        }
      : group,
  );
  const groupCount = groups.length;

  return (
    <Section
      as="footer"
      className="border-t border-dashed border-border bg-background"
      containerClassName="flex flex-col gap-12 py-10 md:py-12 lg:gap-16"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-5">
        <div className="flex flex-1 flex-col gap-4">
          <Link
            href={commercialPath("home", locale)}
            aria-label={t("shell.logoLabel")}
            className="inline-block w-fit"
          >
            <Logo />
          </Link>
          <p className="type-paragraph-m text-text/80">
            {t("shell.footer.taglineLine1")}
            <br />
            {t("shell.footer.taglineLine2")}
          </p>
        </div>

        <div
          className={cn(
            "grid gap-x-5 gap-y-10 sm:gap-y-12 lg:flex lg:flex-1 lg:gap-5",
            groupCount === 1 && "grid-cols-1",
            groupCount === 2 && "grid-cols-2",
            groupCount >= 3 && "grid-cols-2 sm:grid-cols-4",
          )}
        >
          {groups.map((group) => (
            <div key={group._key} className="lg:flex-1">
              <FooterColumn group={group} />
            </div>
          ))}
        </div>
      </div>

      <div className="type-eyebrow flex flex-col gap-4 border-t border-dashed border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-text/60">
          {t("shell.footer.copyright", { year: String(year) })}
        </p>
        <ul className="flex flex-wrap gap-x-10 gap-y-2">
          {getFooterLegalLinks(locale).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text/60 transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsLink className="text-text/60 transition-colors hover:text-text" />
          </li>
        </ul>
      </div>
    </Section>
  );
}
