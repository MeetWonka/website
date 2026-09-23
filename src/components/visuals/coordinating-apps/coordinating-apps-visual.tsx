"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Section } from "@/components/ui/section";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import { LogoMark } from "@/components/ui/logo-mark";
import { cn } from "@/lib/utils";

const PARALLAX_SPRING = { stiffness: 150, damping: 25, mass: 0.5 };
const MAX_PARALLAX_X = 20;
const MAX_PARALLAX_Y = 14;
const CENTER_PARALLAX_FACTOR = 0.35;
const BADGE_INTERVAL_MS = 2200;
const FADE_DURATION_S = 0.4;
const ACTIVE_FILTER = "blur(0px)";
const INACTIVE_FILTER = "blur(1px)";
const ACTIVE_OPACITY = 1;
const INACTIVE_OPACITY = 0.6;
const STEPS_PER_ROLE = 5;

type IconKind =
  | "outlook"
  | "acerta"
  | "teams"
  | "check"
  | "spinner"
  | "word"
  | "pause"
  | "sharepoint"
  | "microsoft"
  | "odoo"
  | "chat"
  | "jira"
  | "slack"
  | "pdf"
  | "planner";

type BadgeVariant = "default" | "success" | "waiting";

interface BadgeData {
  label: string;
  icon: IconKind;
  variant?: BadgeVariant;
}

interface Role {
  id: string;
  title: string;
  subtitle: string;
  badges: BadgeData[];
}

const ROLES: Role[] = [
  {
    id: "sales",
    title: "Sales",
    subtitle: "Create customized offers",
    badges: [
      { label: "Teams meeting finished", icon: "teams" },
      { label: "Create custom proposal based on template", icon: "spinner" },
      { label: "Custom proposal finished", icon: "word" },
      {
        label: "Waiting for approval to send follow-up mail",
        icon: "pause",
        variant: "waiting",
      },
      { label: "Follow-up mail send!", icon: "check", variant: "success" },
    ],
  },
  {
    id: "it",
    title: "IT",
    subtitle: "Manage support tickets",
    badges: [
      { label: "Describing IT issue via chat", icon: "chat" },
      { label: "Jira ticket created", icon: "jira" },
      { label: "IT manager notified", icon: "slack" },
      {
        label: "Waiting for IT manager to resolve issue",
        icon: "pause",
        variant: "waiting",
      },
      {
        label: "Issue resolved, employee notified!",
        icon: "check",
        variant: "success",
      },
    ],
  },
  {
    id: "hr",
    title: "HR",
    subtitle: "Onboard new employees",
    badges: [
      { label: "Onboarding checklist referenced", icon: "sharepoint" },
      { label: "Adding new user to Microsoft 365 suite", icon: "microsoft" },
      { label: "Dimona requested", icon: "acerta" },
      { label: "Account created, laptop assigned, badge ordered", icon: "odoo" },
      { label: "Employee fully onboarded!", icon: "check", variant: "success" },
    ],
  },
  {
    id: "ops",
    title: "OPS",
    subtitle: "Manage transport documentation",
    badges: [
      { label: "Shipment request received and validated", icon: "outlook" },
      { label: "Port documents created", icon: "pdf" },
      {
        label: "Waiting for human validation",
        icon: "pause",
        variant: "waiting",
      },
      { label: "Checking planning for next 2 weeks", icon: "planner" },
      { label: "Shipment added to agenda!", icon: "check", variant: "success" },
    ],
  },
];

interface SlotPosition {
  left?: string;
  right?: string;
  top: string;
  transform?: string;
}

interface Slot {
  id: string;
  portrait: { src: string; alt: string };
  desktop: { portrait: SlotPosition; badge: SlotPosition };
  mobile: { portrait: SlotPosition; badge: SlotPosition };
  parallax: { x: number; y: number };
}

// One slot per role, in the same order as ROLES. Four corners.
// Left-side badges anchor via `left`, right-side via `right` — pinning the right edge
// independently of badge width so cross-fading badges of different widths don't shift.
const SLOTS: Slot[] = [
  {
    id: "sales",
    portrait: {
      src: "/images/visual/portrait-1.png",
      alt: "Sales",
    },
    desktop: {
      portrait: { left: "12.54%", top: "23.25%" },
      badge: { left: "14.71%", top: "34.75%" },
    },
    mobile: {
      portrait: { left: "8%", top: "14%" },
      badge: { left: "8%", top: "24%" },
    },
    parallax: { x: 1.55, y: 1.3 },
  },
  {
    id: "it",
    portrait: {
      src: "/images/visual/portrait-3.png",
      alt: "IT",
    },
    desktop: {
      portrait: { left: "80.16%", top: "16.58%" },
      badge: { right: "16.39%", top: "28.08%" },
    },
    mobile: {
      portrait: { left: "92%", top: "11%", transform: "translateX(-100%)" },
      badge: { right: "8%", top: "21%" },
    },
    parallax: { x: 0.5, y: 0.7 },
  },
  {
    id: "hr",
    portrait: {
      src: "/images/visual/portrait-4.png",
      alt: "HR",
    },
    desktop: {
      portrait: { left: "78.05%", top: "68.58%" },
      badge: { right: "18.50%", top: "80.08%" },
    },
    mobile: {
      portrait: { left: "92%", top: "65%", transform: "translateX(-100%)" },
      badge: { right: "8%", top: "75%" },
    },
    parallax: { x: 1.2, y: 0.6 },
  },
  {
    id: "ops",
    portrait: {
      src: "/images/visual/portrait-2.png",
      alt: "OPS",
    },
    desktop: {
      portrait: { left: "16.33%", top: "68.92%" },
      badge: { left: "20.61%", top: "80.42%" },
    },
    mobile: {
      portrait: { left: "8%", top: "62%" },
      badge: { left: "8%", top: "72%" },
    },
    parallax: { x: 0.85, y: 1.45 },
  },
];

interface IconSpec {
  src?: string;
  render?: () => React.ReactNode;
  widthRefPx: number;
  aspectRatio: string;
}

const ICON_SPECS: Record<IconKind, IconSpec> = {
  outlook: {
    src: "/images/visual/outlook.svg",
    widthRefPx: 24,
    aspectRatio: "24 / 17",
  },
  acerta: {
    src: "/images/visual/acerta.svg",
    widthRefPx: 12,
    aspectRatio: "12 / 17",
  },
  teams: {
    src: "/images/visual/teams.svg",
    widthRefPx: 17,
    aspectRatio: "17 / 17",
  },
  check: {
    render: () => <CheckmarkIcon className="block h-full w-full" />,
    widthRefPx: 14,
    aspectRatio: "12 / 10",
  },
  spinner: {
    render: () => <SpinnerIcon />,
    widthRefPx: 16,
    aspectRatio: "1 / 1",
  },
  word: {
    src: "/images/visual/word.svg",
    widthRefPx: 16,
    aspectRatio: "127 / 131",
  },
  pause: {
    render: () => <PauseIcon />,
    widthRefPx: 16,
    aspectRatio: "1 / 1",
  },
  sharepoint: {
    src: "/images/visual/sharepoint.svg",
    widthRefPx: 16,
    aspectRatio: "130 / 144",
  },
  microsoft: {
    src: "/images/visual/microsoft.svg",
    widthRefPx: 16,
    aspectRatio: "1 / 1",
  },
  odoo: {
    src: "/images/visual/odoo.png",
    widthRefPx: 16,
    aspectRatio: "1 / 1",
  },
  chat: {
    render: () => <LogoMark className="block h-full w-full" />,
    widthRefPx: 14,
    aspectRatio: "137 / 150",
  },
  jira: {
    src: "/images/visual/jira.svg",
    widthRefPx: 16,
    aspectRatio: "64 / 65",
  },
  slack: {
    src: "/images/visual/slack.svg",
    widthRefPx: 16,
    aspectRatio: "228 / 229",
  },
  pdf: {
    src: "/images/visual/pdf.svg",
    widthRefPx: 16,
    aspectRatio: "1 / 1",
  },
  planner: {
    src: "/images/visual/planner.png",
    widthRefPx: 16,
    aspectRatio: "310 / 304",
  },
};

export function CoordinatingAppsVisual({ id }: { id?: string }) {
  const [tick, setTick] = useState(0);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, BADGE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduce]);

  const activeRole = Math.floor(tick / STEPS_PER_ROLE) % ROLES.length;
  const step = tick % STEPS_PER_ROLE;

  return (
    <Section
      id={id}
      wide
      className="py-2"
      aria-label="Wonka coordinating apps and people"
    >
      <VisualBox
        layout="desktop"
        className="hidden md:block"
        activeRole={activeRole}
        step={step}
      />
      <VisualBox
        layout="mobile"
        className="md:hidden"
        activeRole={activeRole}
        step={step}
      />
    </Section>
  );
}

function VisualBox({
  layout,
  className,
  activeRole,
  step,
}: {
  layout: "desktop" | "mobile";
  className?: string;
  activeRole: number;
  step: number;
}) {
  const isDesktop = layout === "desktop";
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawCenterX = useMotionValue(0);
  const rawCenterY = useMotionValue(0);

  const satX = useSpring(rawX, PARALLAX_SPRING);
  const satY = useSpring(rawY, PARALLAX_SPRING);
  const centerX = useSpring(rawCenterX, PARALLAX_SPRING);
  const centerY = useSpring(rawCenterY, PARALLAX_SPRING);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !isDesktop || reduce) return;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        rawX.set(nx * MAX_PARALLAX_X);
        rawY.set(ny * MAX_PARALLAX_Y);
        rawCenterX.set(nx * MAX_PARALLAX_X * CENTER_PARALLAX_FACTOR);
        rawCenterY.set(ny * MAX_PARALLAX_Y * CENTER_PARALLAX_FACTOR);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      rawX.set(0);
      rawY.set(0);
      rawCenterX.set(0);
      rawCenterY.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop, reduce, rawX, rawY, rawCenterX, rawCenterY]);

  const aspectRatio = isDesktop ? "1424 / 600" : "4 / 5";

  const orbits = isDesktop
    ? [
        { width: "102.95%", left: "-1.51%", top: "-74.92%" },
        { width: "69.10%", left: "15.41%", top: "-34.75%" },
      ]
    : [
        { width: "150%", left: "-25%", top: "-15%" },
        { width: "108%", left: "-4%", top: "6%" },
      ];

  const centerSize = isDesktop ? "11.24%" : "26%";
  const centerTop = isDesktop ? "46.5%" : "50%";

  const captionTop = isDesktop ? "90.58%" : "94%";
  const captionFontSize = isDesktop
    ? "clamp(1rem, 1.97cqi, 1.75rem)"
    : "1.125rem";
  const captionParagraphSize = isDesktop
    ? "clamp(0.75rem, 0.98cqi, 0.875rem)"
    : "0.75rem";
  const captionGap = isDesktop ? "0.84cqi" : "0.5rem";
  const captionPadding = isDesktop ? "0.84cqi" : "0.5rem";

  const role = ROLES[activeRole];
  const badge = role.badges[step];

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-light-gray [container-type:inline-size]",
        className,
      )}
      style={{
        aspectRatio,
        border: "0.5px solid var(--color-dark-gray)",
      }}
    >
      {orbits.map((o, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute aspect-square rounded-full border border-dashed border-dark-gray"
          style={{ width: o.width, left: o.left, top: o.top }}
        />
      ))}

      <div
        className="absolute"
        style={{
          width: centerSize,
          aspectRatio: 1,
          left: "50%",
          top: centerTop,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            x: centerX,
            y: centerY,
            borderRadius: isDesktop ? "0.45cqi" : "0.5rem",
          }}
        >
          <Image
            src="/images/visual/visual-center.webp"
            alt="Wonka"
            fill
            sizes="(min-width: 1440px) 160px, 25vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {SLOTS.map((slot, slotIndex) => (
        <SlotNode
          key={slot.id}
          slot={slot}
          isActive={slotIndex === activeRole}
          badge={slotIndex === activeRole ? badge : null}
          badgeKey={slotIndex === activeRole ? `${role.id}-${step}` : ""}
          layout={layout}
          px={satX}
          py={satY}
        />
      ))}

      <div
        className="absolute"
        style={{
          left: "50%",
          top: captionTop,
          transform: "translateX(-50%)",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={role.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
            className="flex items-center justify-center"
            style={{ gap: captionGap }}
          >
            <span
              className="flex items-center justify-center border-r border-dashed border-dark-gray font-serif text-text"
              style={{
                fontSize: captionFontSize,
                lineHeight: "1.143",
                letterSpacing: "-0.036em",
                paddingRight: captionPadding,
              }}
            >
              {role.title}
            </span>
            <span
              className="whitespace-nowrap text-text opacity-80"
              style={{
                fontSize: captionParagraphSize,
                lineHeight: "1.5rem",
                paddingTop: isDesktop ? "0.28cqi" : "0.125rem",
              }}
            >
              {role.subtitle}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SlotNode({
  slot,
  isActive,
  badge,
  badgeKey,
  layout,
  px,
  py,
}: {
  slot: Slot;
  isActive: boolean;
  badge: BadgeData | null;
  badgeKey: string;
  layout: "desktop" | "mobile";
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const isDesktop = layout === "desktop";
  const pos = isDesktop ? slot.desktop : slot.mobile;

  const fx = slot.parallax.x;
  const fy = slot.parallax.y;
  const x = useTransform(px, (v) => v * fx);
  const y = useTransform(py, (v) => v * fy);

  const portraitWidth = isDesktop ? "5.62%" : "13%";

  return (
    <>
      <motion.div
        className="absolute"
        style={{
          width: portraitWidth,
          aspectRatio: 1,
          left: pos.portrait.left,
          top: pos.portrait.top,
          transform: pos.portrait.transform,
        }}
        animate={{
          filter: isActive ? ACTIVE_FILTER : INACTIVE_FILTER,
          opacity: isActive ? ACTIVE_OPACITY : INACTIVE_OPACITY,
        }}
        transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
      >
        <motion.div className="absolute inset-0" style={{ x, y }}>
          <Image
            src={slot.portrait.src}
            alt={slot.portrait.alt}
            fill
            sizes="(min-width: 768px) 80px, 25vw"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute"
        style={{
          left: pos.badge.left,
          right: pos.badge.right,
          top: pos.badge.top,
        }}
      >
        <motion.div className="relative" style={{ x, y }}>
          <AnimatePresence>
            {isActive && badge ? (
              <motion.div
                key={badgeKey}
                className="absolute top-0"
                style={{
                  left: pos.badge.right !== undefined ? undefined : 0,
                  right: pos.badge.right !== undefined ? 0 : undefined,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
              >
                <BadgeBody badge={badge} layout={layout} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

function BadgeBody({
  badge,
  layout,
}: {
  badge: BadgeData;
  layout: "desktop" | "mobile";
}) {
  const isDesktop = layout === "desktop";
  const variant = badge.variant ?? "default";

  const bgColor =
    variant === "success"
      ? "var(--color-green-300)"
      : variant === "waiting"
        ? "var(--color-orange-300)"
        : "var(--color-white)";
  const textColor =
    variant === "success" ? "var(--color-green-900)" : "var(--color-black)";
  const textOpacity = variant === "default" ? 0.8 : 1;

  const badgeStyles: React.CSSProperties = isDesktop
    ? {
        gap: "0.62cqi",
        paddingLeft: "0.66cqi",
        paddingRight: "0.75cqi",
        paddingTop: "0.75cqi",
        paddingBottom: "0.75cqi",
        height: "2.11cqi",
        borderRadius: "0.25cqi",
        border: "0.062cqi solid rgba(14, 26, 22, 0.1)",
      }
    : {
        gap: "0.375rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        paddingTop: "0.375rem",
        paddingBottom: "0.375rem",
        borderRadius: "0.25rem",
        border: "1px solid rgba(14, 26, 22, 0.1)",
        maxWidth: "42cqi",
        width: "max-content",
      };

  const labelStyles: React.CSSProperties = isDesktop
    ? { fontSize: "clamp(0.5rem, 0.78cqi, 0.7rem)", lineHeight: "1.6" }
    : { fontSize: "0.55rem", lineHeight: "1.3" };

  return (
    <div
      className={cn("flex", isDesktop ? "items-center" : "items-start")}
      style={{ backgroundColor: bgColor, ...badgeStyles }}
    >
      <BadgeIcon kind={badge.icon} layout={layout} variant={variant} />
      <span
        className={cn(
          "font-sans uppercase",
          isDesktop ? "whitespace-nowrap" : "break-words",
        )}
        style={{
          ...labelStyles,
          letterSpacing: "0.07em",
          fontWeight: 500,
          color: textColor,
          opacity: textOpacity,
        }}
      >
        {badge.label}
      </span>
    </div>
  );
}

function BadgeIcon({
  kind,
  layout,
  variant,
}: {
  kind: IconKind;
  layout: "desktop" | "mobile";
  variant: BadgeVariant;
}) {
  const spec = ICON_SPECS[kind];
  const isDesktop = layout === "desktop";
  const widthValue = isDesktop
    ? `${(spec.widthRefPx / 1424) * 100}cqi`
    : `${Math.round(spec.widthRefPx * 0.85)}px`;

  if (kind === "check") {
    return (
      <span
        aria-hidden
        className={cn(
          "block shrink-0",
          variant === "success" ? "text-green-900" : "text-black",
        )}
        style={{ width: widthValue, aspectRatio: spec.aspectRatio }}
      >
        <CheckmarkIcon className="block h-full w-full" />
      </span>
    );
  }

  if (spec.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={spec.src}
        alt=""
        aria-hidden
        className="block shrink-0"
        style={{ width: widthValue, aspectRatio: spec.aspectRatio }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{ width: widthValue, aspectRatio: spec.aspectRatio }}
    >
      {spec.render?.()}
    </span>
  );
}

function SpinnerIcon() {
  const ticks = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 24 24" className="block h-full w-full">
      {ticks.map((a, i) => (
        <line
          key={a}
          x1="12"
          y1="3"
          x2="12"
          y2="6.5"
          stroke="#9aa0a6"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${a} 12 12)`}
          opacity={0.25 + (i / ticks.length) * 0.75}
        />
      ))}
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="block h-full w-full">
      <rect
        x="6"
        y="5"
        width="4"
        height="14"
        rx="1.2"
        fill="var(--color-orange-900)"
      />
      <rect
        x="14"
        y="5"
        width="4"
        height="14"
        rx="1.2"
        fill="var(--color-orange-900)"
      />
    </svg>
  );
}
