"use client";

import { Children, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import type { LinksCopy, LinksEvent } from "@/views/copy/links";
import styles from "./links.module.css";

const noopSubscribe = () => () => {};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Horizontal snap carousel with dots; optional auto-advance that stops once touched. */
export function SwipeRow({
  children,
  className,
  label,
  autoAdvanceMs,
}: {
  children: ReactNode;
  className: string;
  label: string;
  autoAdvanceMs?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const reduce = usePrefersReducedMotion();
  const count = Children.count(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const d = Math.abs((child as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
      // Edge fades: fade a side only while there is more content on that side.
      el.dataset.start = String(el.scrollLeft <= 2);
      el.dataset.end = String(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    onScroll();
    window.addEventListener("resize", onScroll);
    const markTouched = () => {
      touched.current = true;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    ["pointerdown", "touchstart", "focusin", "wheel"].forEach((ev) =>
      el.addEventListener(ev, markTouched, { passive: true }),
    );
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ["pointerdown", "touchstart", "focusin", "wheel"].forEach((ev) => el.removeEventListener(ev, markTouched));
    };
  }, []);

  useEffect(() => {
    if (!autoAdvanceMs || reduce) return;
    const id = window.setInterval(() => {
      const el = ref.current;
      if (!el || touched.current || document.hidden) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const next = (active + 1) % el.children.length;
      const target = el.children[next] as HTMLElement;
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }, autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [active, autoAdvanceMs, reduce]);

  return (
    <>
      <ul ref={ref} className={className} tabIndex={0} aria-label={label}>
        {children}
      </ul>
      <div className={styles.dots} aria-hidden>
        {Array.from({ length: count }, (_, i) => (
          <span key={i} data-on={i === active ? "true" : "false"} />
        ))}
      </div>
    </>
  );
}

/** Silent loop that only plays while at least half on screen (saves mobile data). */
export function AutoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduce}
      aria-label={label}
    />
  );
}

const MODELS = [
  { name: "Claude", maker: "Anthropic", icon: "claude", european: false },
  { name: "GPT", maker: "OpenAI", icon: "gpt", european: false },
  { name: "Gemini", maker: "Google", icon: "gemini", european: false },
  { name: "Mistral", maker: "Mistral AI", icon: "mistral", european: true },
] as const;

export function ModelPicker({ copy, pricingHref }: { copy: LinksCopy; pricingHref: string }) {
  const [model, setModel] = useState<string>(MODELS[0].name);

  return (
    <div className={styles.clipCard}>
      <div className={styles.picker}>
        <p className={styles.pickerTitle}>
          {copy.pickerTitle} <em>{copy.pickerTitleAccent}</em>
        </p>
        <ul className={styles.models} role="radiogroup" aria-label={copy.pickerLabel}>
          {MODELS.map((m) => (
            <li key={m.name}>
              <button
                type="button"
                className={styles.model}
                role="radio"
                aria-checked={model === m.name}
                onClick={() => setModel(m.name)}
              >
                <span className={styles.modelDot} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/links/models/${m.icon}.png`} alt="" width={16} height={16} />
                </span>
                <span className={styles.modelName}>
                  {m.name}
                  <small>{m.maker}</small>
                </span>
                <span className={styles.modelTag}>{m.european ? copy.tagEuropean : copy.tagEu}</span>
                <svg className={styles.modelCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <Link className={styles.ask} href={pricingHref} data-track="links-model-picker">
          <span className={styles.askText}>
            {copy.askBefore}
            <b>{model}</b>
            {copy.askAfter}
          </span>
          <span className={styles.askSend} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
        </Link>
      </div>
      <span className={styles.clipText}>
        <span className={styles.clipTitle}>{copy.modelsTitle}</span>
        <span className={styles.clipMeta}>
          {copy.pickThen}
          <Link href={pricingHref} data-track="links-model-picker-text">
            {copy.tryIt}
          </Link>
        </span>
      </span>
    </div>
  );
}

function SmallArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Events hide themselves once `ends` has passed; a "coming soon" note shows when none are left. */
export function EventList({
  events,
  copy,
  linkedinUrl,
}: {
  events: LinksEvent[];
  copy: LinksCopy;
  linkedinUrl: string;
}) {
  // Ids of events that haven't ended yet, read on the client (server: all of them).
  const upcomingIds = useSyncExternalStore(
    noopSubscribe,
    () => events.filter((e) => Date.parse(e.ends) > Date.now()).map((e) => e.id).join(","),
    () => events.map((e) => e.id).join(","),
  );
  const upcoming = events.filter((e) => upcomingIds.split(",").includes(e.id));

  if (upcoming.length === 0) {
    return (
      <p className={styles.eventEmpty}>
        {copy.noEvent}{" "}
        <a href={linkedinUrl} data-track="links-event-follow">
          {copy.followOnLinkedIn}
        </a>
      </p>
    );
  }

  return (
    <>
      {upcoming.map((ev) => (
        <div key={ev.id} className={styles.event}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev.image} alt={ev.imageAlt} width={84} height={105} />
          <span className={styles.eventText}>
            <span className={styles.eventDate}>{ev.dateLabel}</span>
            <span className={styles.eventName}>{ev.name}</span>
            <span className={styles.eventPlace}>{ev.place}</span>
            <span className={styles.eventActions}>
              <a href={ev.href} data-track="links-event-info">
                {copy.eventInfo} <SmallArrow />
              </a>
              <a href={ev.calendarHref} data-track="links-event-calendar">
                {copy.addToCalendar} <SmallArrow />
              </a>
            </span>
          </span>
        </div>
      ))}
    </>
  );
}

/** Marks the social platform the visitor came from (?utm_source=instagram). */
export function SocialHere({ platform, label }: { platform: string; label: string }) {
  const here = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() === platform,
    () => false,
  );
  useEffect(() => {
    if (!here) return;
    document.querySelector<HTMLElement>(`[data-platform="${platform}"]`)?.setAttribute("data-here", "true");
  }, [here, platform]);
  return here ? <span className={styles.here}>{label}</span> : null;
}

export function ShareButton({ label, copied, url }: { label: string; copied: string; url: string }) {
  const [status, setStatus] = useState("");

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Wonka AI", url });
      } catch {
        /* user closed the share sheet */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus(copied);
    } catch {
      setStatus(url);
    }
  };

  return (
    <>
      <button type="button" className={styles.share} onClick={onShare} data-track="links-share">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 15V4M8 8l4-4 4 4" />
          <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </svg>
        <span>{label}</span>
      </button>
      <span className={styles.status} role="status">
        {status}
      </span>
    </>
  );
}

function AwardIcon({ award, className }: { award: "bsa" | "vlaio"; className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {award === "bsa" ? (
        <>
          <path d="M4 17.5 3 7.5l5 4 4-6.5 4 6.5 5-4-1 10H4Z" />
          <path d="M4.5 20.5h15" />
        </>
      ) : (
        <>
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
          <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6M10 17h4" />
        </>
      )}
    </svg>
  );
}

function subscribeHoverCapable(onChange: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Award badges take turns. Opening one (tap on phone; hover or click on desktop)
 * stops the rotation and unfolds a callout: photo fading into the facts, with the
 * article links at the bottom so nobody leaves the page by accident.
 */
export function AwardTicker({ awards, closeLabel }: { awards: LinksCopy["awards"]; closeLabel: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduce = usePrefersReducedMotion();
  const canHover = useSyncExternalStore(
    subscribeHoverCapable,
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (open || reduce || awards.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % awards.length), 4500);
    return () => window.clearInterval(id);
  }, [open, reduce, awards.length]);

  const award = awards[active];
  const panelId = "links-award-panel";

  const onEnter = () => {
    if (!canHover) return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    if (!canHover || pinned) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };
  const toggle = () => {
    if (open && (pinned || !canHover)) {
      setOpen(false);
      setPinned(false);
    } else {
      setOpen(true);
      setPinned(true);
    }
  };
  const close = () => {
    setOpen(false);
    setPinned(false);
  };

  return (
    <div className={styles.award} onMouseEnter={onEnter} onMouseLeave={onLeave} data-open={open}>
      <button
        type="button"
        className={styles.awardStack}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        {awards.map((a, i) => (
          <span
            key={a.key}
            className={`${styles.awardItem} ${a.key === "bsa" ? styles.awardBsa : styles.awardVlaio}`}
            data-active={i === active}
            aria-hidden={i !== active}
          >
            <AwardIcon award={a.key} className={styles.awardIco} />
            <span className={styles.awardDivider} aria-hidden />
            <span className={styles.awardText}>
              <span className={styles.awardTop}>{a.top}</span>
              <span className={styles.awardBottom}>{a.bottom}</span>
            </span>
            <svg className={styles.awardChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        ))}
      </button>

      <div id={panelId} className={styles.awardPanel} data-open={open} role="region" aria-label={award.bottom}>
        <div className={styles.awardPanelInner}>
          <div className={`${styles.awardCard} ${award.key === "bsa" ? styles.awardBsa : styles.awardVlaio}`} inert={!open}>
            <div className={styles.awardMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={award.image} alt={award.imageAlt} width={960} height={600} loading="lazy" />
              <button type="button" className={styles.awardClose} onClick={close} aria-label={closeLabel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className={styles.awardBody}>
              <p className={styles.awardMeta}>{award.meta}</p>
              <p className={styles.awardTitle}>{award.title}</p>
              <p className={styles.awardCopy}>{award.body}</p>
              <ul className={styles.awardLinks}>
                {award.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" data-track={`links-award-${award.key}`}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BACKGROUNDS = [
  { name: "hills", portrait: "/brand/backgrounds/9x16/wonka-bg-hills-1080x1920.webp", landscape: "/brand/backgrounds/16x9/wonka-bg-hills-1920x1080.webp" },
  { name: "snowy-mountain", portrait: "/links/backgrounds/wonka-bg-snowy-mountain-720x1280.webp", landscape: "/brand/backgrounds/16x9/wonka-bg-snowy-mountain-1920x1080.webp" },
  { name: "wheatfield", portrait: "/links/backgrounds/wonka-bg-wheatfield-720x1280.webp", landscape: "/brand/backgrounds/16x9/wonka-bg-wheatfield-1920x1080.webp" },
  { name: "river", portrait: "/brand/backgrounds/9x16/wonka-bg-river-1080x1920.webp", landscape: "/brand/backgrounds/16x9/wonka-bg-river-1920x1080.webp" },
  { name: "waterfall", portrait: "/brand/backgrounds/9x16/wonka-bg-waterfall-1080x1920.webp", landscape: "/brand/backgrounds/16x9/wonka-bg-waterfall-1920x1080.webp" },
  { name: "mountain-range", portrait: "/links/backgrounds/wonka-bg-mountain-range-720x1280.webp", landscape: "/brand/backgrounds/16x9/wonka-bg-mountain-range-1920x1080.webp" },
] as const;

/**
 * Wonka AI landscapes crossfade every `intervalMs` of time the page is actually
 * visible. The next image is preloaded before the fade, so it never flashes empty.
 * Phone-shaped images on portrait screens, landscape ones on wide screens.
 */
export function BackgroundRotator({ intervalMs = 30000 }: { intervalMs?: number }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const activeRef = useRef(0);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let visibleMs = 0;
    const tickMs = 1000;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      visibleMs += tickMs;
      if (visibleMs < intervalMs) return;
      visibleMs = 0;
      const next = (activeRef.current + 1) % BACKGROUNDS.length;
      const wide = window.matchMedia("(min-aspect-ratio: 1/1)").matches;
      const img = new Image();
      img.onload = () => {
        setLoaded((list) => (list.includes(next) ? list : [...list, next]));
        // Let the new layer mount at opacity 0 before fading it in.
        window.setTimeout(() => {
          activeRef.current = next;
          setActive(next);
        }, 60);
      };
      img.src = wide ? BACKGROUNDS[next].landscape : BACKGROUNDS[next].portrait;
    }, tickMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduce]);

  return (
    <div className={styles.bg} aria-hidden>
      {BACKGROUNDS.map((bg, i) =>
        loaded.includes(i) ? (
          <div
            key={bg.name}
            className={styles.bgLayer}
            data-active={i === active}
            style={{ "--bg-portrait": `url(${bg.portrait})`, "--bg-landscape": `url(${bg.landscape})` } as CSSProperties}
          />
        ) : null,
      )}
    </div>
  );
}
