"use client";

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { SHOW_LANGUAGE_SWITCHER } from "@/lib/nav-defaults";
import type { Locale } from "@/i18n/config";
import { commercialPath, isFranceMarketPath, localizeHref } from "@/i18n/routes";
import { isBookingUrl } from "@/lib/resolve-meeting-url";
import { getT } from "@/i18n/ui";
import { DesktopNav } from "./desktop-nav";
import { LanguageSwitcher } from "./language-switcher";
import { MegaMenuPanel } from "./mega-menu-panel";
import { MobileNavToggle, MobileNavOverlay } from "./mobile-nav";
import type { NavItem, CtaButtonData } from "@/lib/types";

export type HeaderVariant = "overlay-dark" | "inline-light";

interface HeaderProps {
  navItems: NavItem[];
  headerCta?: CtaButtonData | null;
  franceMeetingUrl?: string | null;
  variant?: HeaderVariant;
  locale?: Locale;
}

const MEGA_CLOSE_DELAY_MS = 120;

export function Header({
  navItems,
  headerCta,
  franceMeetingUrl,
  variant = "overlay-dark",
  locale = "en",
}: HeaderProps) {
  const pathname = usePathname();
  const isBtpLanding = pathname === "/france/btp";
  const isFranceMarket = isFranceMarketPath(pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string | null>(null);
  const [headerBarHeight, setHeaderBarHeight] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  const t = getT(locale);
  const homeHref = commercialPath("home", locale);
  const ctaLabel = t("shell.headerCta");
  const headerBookingHref =
    headerCta &&
    isFranceMarket &&
    !isBtpLanding &&
    franceMeetingUrl &&
    isBookingUrl(headerCta.href)
      ? franceMeetingUrl
      : headerCta?.href;
  const ctaHref = headerBookingHref
    ? localizeHref(headerBookingHref, locale)
    : null;
  const isOverlayDark = variant === "overlay-dark" && !isBtpLanding;
  const isMegaOpen = activeNavKey !== null;
  const activeNavItem =
    navItems.find((item) => item._key === activeNavKey) ?? null;
  const useHeaderSpacer = !isOverlayDark;

  const cancelMegaClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleMegaClose = useCallback(() => {
    cancelMegaClose();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveNavKey(null);
      closeTimerRef.current = null;
    }, MEGA_CLOSE_DELAY_MS);
  }, [cancelMegaClose]);

  const activateMega = useCallback(
    (key: string) => {
      cancelMegaClose();
      setActiveNavKey(key);
    },
    [cancelMegaClose],
  );

  useLayoutEffect(() => {
    const node = headerBarRef.current;
    if (!node) return;

    const update = () => {
      setHeaderBarHeight(node.getBoundingClientRect().height);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [isOverlayDark]);

  useEffect(() => {
    if (!isMegaOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveNavKey(null);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMegaOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {useHeaderSpacer && headerBarHeight > 0 ? (
        <div
          className="hidden lg:block"
          style={{ height: headerBarHeight }}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "z-20 hidden lg:block",
          isOverlayDark && !isMegaOpen && "absolute inset-x-0 top-0",
          (isMegaOpen || useHeaderSpacer) && "fixed inset-x-0 top-0",
          isMegaOpen && "bg-background text-text shadow-subtle",
          isMegaOpen && "border-b border-dashed border-border",
        )}
        onMouseLeave={scheduleMegaClose}
        onMouseEnter={cancelMegaClose}
      >
        <div ref={headerBarRef}>
          <Section
            as="header"
            {...(isOverlayDark && !isMegaOpen ? { "data-theme": "dark" } : {})}
            fluid
            className={cn(
              "border-b border-dashed border-border !px-5 py-3 text-text transition-colors duration-300",
              isMegaOpen
                ? "border-transparent bg-background"
                : isOverlayDark
                  ? "bg-text/[0.04]"
                  : "bg-background",
            )}
            containerClassName="flex items-center justify-between gap-6"
          >
            <div className="flex min-w-0 flex-1 items-center">
              <Link
                href={homeHref}
                aria-label={t("shell.logoLabel")}
                className="inline-flex items-center text-text"
              >
                <Logo />
              </Link>
            </div>

            {!isBtpLanding ? (
              <nav aria-label={t("shell.mainNavLabel")}>
                <DesktopNav
                  navItems={navItems}
                  activeKey={activeNavKey}
                  onActivate={activateMega}
                />
              </nav>
            ) : null}

            <div className="flex flex-1 items-center justify-end gap-4">
              {SHOW_LANGUAGE_SWITCHER && !isBtpLanding ? (
                <LanguageSwitcher />
              ) : null}
              {ctaHref && (
                <ButtonLink
                  href={
                    isBtpLanding
                      ? "/france/diagnostic?secteur=btp&utm_source=btp&utm_campaign=construction"
                      : ctaHref
                  }
                  variant="primary"
                >
                  {isBtpLanding ? "Évaluer mes besoins IA" : ctaLabel}
                </ButtonLink>
              )}
            </div>
          </Section>
        </div>

        <MegaMenuPanel item={activeNavItem} open={isMegaOpen} />
      </div>

      <Section
        as="header"
        {...(isOverlayDark ? { "data-theme": "dark" } : {})}
        fluid
        className={cn(
          "z-20 border-b border-dashed border-border !px-5 py-3 text-text lg:hidden",
          isOverlayDark
            ? "absolute inset-x-0 top-0 bg-text/[0.04]"
            : "relative bg-background",
        )}
        containerClassName="flex items-center justify-between gap-4"
      >
        <div className="flex min-w-0 flex-1 items-center">
          <Link
            href={homeHref}
            aria-label={t("shell.logoLabel")}
            className="inline-flex items-center text-text"
          >
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {ctaHref && (
            <ButtonLink
              href={
                isBtpLanding
                  ? "/france/diagnostic?secteur=btp&utm_source=btp&utm_campaign=construction"
                  : ctaHref
              }
              variant="primary"
            >
              {isBtpLanding ? "Évaluer" : ctaLabel}
            </ButtonLink>
          )}
          {!isBtpLanding ? (
            <MobileNavToggle
              isOpen={mobileNavOpen}
              onToggle={() => setMobileNavOpen((open) => !open)}
            />
          ) : null}
        </div>
      </Section>

      {!isBtpLanding ? (
        <MobileNavOverlay
          isOpen={mobileNavOpen}
          onClose={closeMobileNav}
          navItems={navItems}
        />
      ) : null}
    </>
  );
}
