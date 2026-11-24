import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";
import {
  FOLLOW_LINKEDIN_URL,
  LINKS_COPY,
  LINKS_JOBS_URL,
  LINKS_PARTNERS,
  LINKS_ROLES,
  LINKS_SOCIALS,
} from "@/views/copy/links";
import { AutoVideo, AwardTicker, BackgroundRotator, EventList, ModelPicker, ShareButton, SocialHere, SwipeRow } from "./links-client";
import { WonkaAiLockup } from "./wonka-ai-lockup";
import styles from "./links.module.css";

/**
 * Link-in-bio page for the Instagram / TikTok / YouTube / LinkedIn bios.
 * Linked only from the footer (Company → Links), noindex, not in the sitemap.
 * Per-platform bio links: /links?utm_source=instagram&utm_medium=social&utm_campaign=bio
 */

const LOCALE_PATH: Record<Locale, string> = { en: "/links", nl: "/nl/links", fr: "/fr/links" };

export function linksMetadata(locale: Locale): Metadata {
  const copy = LINKS_COPY[locale];
  const siteUrl = getSiteUrl();
  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: `${siteUrl}${LOCALE_PATH[locale]}` },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${siteUrl}${LOCALE_PATH[locale]}`,
      images: [{ url: `${siteUrl}/links/og-image.jpg`, width: 1200, height: 630, alt: "Wonka AI" }],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

function Arrow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

const ICONS: Record<string, ReactSvg> = {
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3Z" /></>,
  chat: <><path d="M20 12.5c0 3.9-3.6 7-8 7-1.2 0-2.3-.2-3.3-.6L4 20l1.3-3.6C4.5 15.3 4 13.9 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" /><path d="M12 9.5v6M9 12.5h6" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="3" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6V16" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.3 6.7v.1" /></>,
  tiktok: <><path d="M13.5 3.5v11.2a3.7 3.7 0 1 1-3.7-3.7" /><path d="M13.5 3.5c.4 2.6 2.4 4.6 5 4.8" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.3 9.3 4.6 2.7-4.6 2.7Z" /></>,
  crown: <><path d="M4 17.5 3 7.5l5 4 4-6.5 4 6.5 5-4-1 10H4Z" /><path d="M4.5 20.5h15" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6M10 17h4" /></>,
};
type ReactSvg = ReactNode;

function Icon({ name, className, strokeWidth = 1.7 }: { name: keyof typeof ICONS; className: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

/** `**x**` → <strong>x</strong> for the short quote stats. */
function Stat({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

export async function LinksPage({ locale }: { locale: Locale }) {
  const copy = LINKS_COPY[locale];
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;
  const meetingUrl = resolveMeetingUrl(settings?.sharedLinks, "default", locale);
  const homeHref = commercialPath("home", locale);
  const pricingHref = commercialPath("pricing", locale);
  const pageUrl = `${getSiteUrl()}${LOCALE_PATH[locale]}`;
  const socials = LINKS_SOCIALS.filter((s) => s.href);

  return (
    <div className={styles.root} data-landing="links">
      <BackgroundRotator />
      <main className={styles.page}>
        <div className={styles.col}>
          <nav className={styles.topbar} aria-label={copy.languageLabel}>
            <div className={styles.lang}>
              {(["en", "nl", "fr"] as const).map((l) => (
                <Link key={l} href={LOCALE_PATH[l]} hrefLang={l} aria-current={l === locale ? "page" : undefined}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>

          <div className={styles.left}>
            <header className={styles.head}>
              <Link href={homeHref} aria-label="Wonka AI" data-track="links-logo">
                <WonkaAiLockup className={styles.logo} />
              </Link>
              <h1 className={styles.line}>{copy.line}</h1>
              <AwardTicker awards={copy.awards} closeLabel={copy.closeLabel} />
            </header>

            <ul className={styles.links}>
              <li>
                <Link className={styles.link} href={homeHref} data-track="links-website">
                  <Icon name="globe" className={styles.ico} />
                  <span className={styles.label}>{copy.website}</span>
                  <Arrow className={styles.arrow} />
                </Link>
              </li>
              <li>
                <a className={styles.link} href="https://wonka.chat/register" data-track="trial">
                  <Icon name="chat" className={styles.ico} />
                  <span className={styles.label}>{copy.trial}</span>
                  <Arrow className={styles.arrow} />
                </a>
              </li>
              <li>
                <a className={styles.link} href={meetingUrl} data-track="meeting" data-meeting-type="links">
                  <Icon name="calendar" className={styles.ico} />
                  <span className={styles.label}>{copy.consultant}</span>
                  <Arrow className={styles.arrow} />
                </a>
              </li>
            </ul>
            <section className={`${styles.section} ${styles.socialsBlock}`} aria-labelledby="links-follow">
              <h2 className={styles.kicker} id="links-follow">{copy.followKicker}</h2>
              <ul className={styles.socials}>
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a className={styles.social} href={s.href!} data-platform={s.platform} data-track={`links-social-${s.platform}`}>
                      <Icon name={s.platform} className={styles.ico} />
                      {s.label}
                      <SocialHere platform={s.platform} label={copy.youAreHere} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className={styles.right}>
            <section className={`${styles.section} ${styles.partnersBlock}`} aria-labelledby="links-partners">
              <h2 className={styles.kicker} id="links-partners">{copy.partnersKicker}</h2>
              <div className={styles.marquee}>
                <ul className={styles.marqueeTrack}>
                  {[0, 1].flatMap((copyIndex) =>
                    LINKS_PARTNERS.map((p) => (
                      <li
                        key={`${copyIndex}-${p.slug}`}
                        className={`${styles.partner} ${p.shape === "tall" ? styles.partnerTall : p.shape === "wide" ? styles.partnerWide : ""}`}
                        aria-hidden={copyIndex === 1 ? true : undefined}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/links/partners/${p.slug}.png`} alt={copyIndex === 1 ? "" : p.name} height={30} loading="lazy" />
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </section>

            <section className={`${styles.section} ${styles.clientsBlock}`} aria-labelledby="links-clients">
              <h2 className={styles.kicker} id="links-clients">{copy.clientsKicker}</h2>
              <SwipeRow className={styles.quotes} label={copy.quotesLabel} autoAdvanceMs={6000}>
                {copy.quotes.map((q) => (
                  <li key={q.key} className={styles.quote}>
                    <blockquote>{q.quote}</blockquote>
                    <div className={styles.quoteBy}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={q.logo} alt={q.logoAlt} height={18} />
                      <span>
                        <b>{q.name}</b>
                        <span>{q.role}</span>
                      </span>
                    </div>
                    {q.stat ? (
                      <p className={styles.quoteStat}>
                        <Stat text={q.stat} />
                      </p>
                    ) : null}
                  </li>
                ))}
              </SwipeRow>
            </section>


            <section className={styles.section} aria-labelledby="links-see">
              <h2 className={styles.kicker} id="links-see">{copy.seeKicker}</h2>
              <SwipeRow className={styles.reel} label={copy.clipsLabel}>
                {[
                  ...copy.clips.map((clip) => (
                    <li key={clip.key} className={styles.clip}>
                      <a className={styles.clipCard} href={clip.href} data-track={`links-video-${clip.key}`}>
                        <AutoVideo src={`/links/${clip.key}.mp4`} poster={`/links/${clip.key}-poster.jpg`} label={clip.aria} />
                        <span className={styles.clipText}>
                          <span className={styles.clipTitle}>{clip.title}</span>
                          <span className={styles.clipMeta}>{copy.watchOnLinkedIn}</span>
                        </span>
                      </a>
                    </li>
                  )),
                  <li key="models" className={styles.clip}>
                    <ModelPicker copy={copy} pricingHref={pricingHref} />
                  </li>,
                ]}
              </SwipeRow>
            </section>

            <section className={styles.section} aria-labelledby="links-meet">
              <h2 className={styles.kicker} id="links-meet">{copy.meetKicker}</h2>
              <EventList events={copy.events} copy={copy} linkedinUrl={FOLLOW_LINKEDIN_URL} />
            </section>

            <section className={styles.jobs} aria-labelledby="links-hiring">
              <h2 className={styles.jobsTitle} id="links-hiring">{copy.jobsTitle}</h2>
              <p className={styles.jobsSub}>{copy.jobsSub}</p>
              <ul className={styles.roles}>
                {LINKS_ROLES.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              <a className={styles.link} href={LINKS_JOBS_URL} data-track="links-jobs">
                <Icon name="briefcase" className={styles.ico} />
                <span className={styles.label}>{copy.jobsAll}</span>
                <Arrow className={styles.arrow} />
              </a>
            </section>

            <footer className={styles.foot}>
              <ShareButton label={copy.share} copied={copy.copied} url={pageUrl} />
              <span>
                © {new Date().getFullYear()} Wonka AI · <Link href="/privacy">{copy.privacy}</Link>
              </span>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
