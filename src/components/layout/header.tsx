"use client";

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { HEADER_CTA_LABEL, SHOW_LANGUAGE_SWITCHER } from "@/lib/nav-defaults";
import { DesktopNav } from "./desktop-nav";
import { LanguageSwitcher } from "./language-switcher";
import { MegaMenuPanel } from "./mega-menu-panel";
import { MobileNavToggle, MobileNavOverlay } from "./mobile-nav";
import type { NavItem, CtaButtonData } from "@/lib/types";

export type HeaderVariant = "overlay-dark" | "inline-light";

interface HeaderProps {
  navItems: NavItem[];
  headerCta?: CtaButtonData | null;
  variant?: HeaderVariant;
}

const MEGA_CLOSE_DELAY_MS = 120;

export function Header({
  navItems,
  headerCta,
  variant = "overlay-dark",
}: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string | null>(null);
  const [headerBarHeight, setHeaderBarHeight] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  const isOverlayDark = variant === "overlay-dark";
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
                href="/"
                aria-label="Wonka"
                className="inline-flex items-center text-text"
              >
                <Logo />
              </Link>
            </div>

            <nav aria-label="Main">
              <DesktopNav
                navItems={navItems}
                activeKey={activeNavKey}
                onActivate={activateMega}
              />
            </nav>

            <div className="flex flex-1 items-center justify-end gap-4">
              {SHOW_LANGUAGE_SWITCHER ? <LanguageSwitcher /> : null}
              {headerCta && (
                <ButtonLink href={headerCta.href} variant="primary">
                  {HEADER_CTA_LABEL}
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
            href="/"
            aria-label="Wonka"
            className="inline-flex items-center text-text"
          >
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {headerCta && (
            <ButtonLink href={headerCta.href} variant="primary">
              {HEADER_CTA_LABEL}
            </ButtonLink>
          )}
          <MobileNavToggle
            isOpen={mobileNavOpen}
            onToggle={() => setMobileNavOpen((open) => !open)}
          />
        </div>
      </Section>

      <MobileNavOverlay
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        navItems={navItems}
      />
    </>
  );
}
