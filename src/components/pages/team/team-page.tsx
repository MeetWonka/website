import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { Locale } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings } from "@/lib/types";
import { TEAM, TEAM_PAGE_COPY, type TeamMember } from "@/views/copy/team";

const BG = "/brand/backgrounds/16x9";
const AVATAR_SCENES = [
  "hills",
  "river",
  "mountain-range",
  "wheatfield",
  "waterfall",
  "snowy-mountain",
  "hero",
];

/** Kept out of search until every role on the roster is confirmed. */
export function teamMetadata(locale: Locale): Metadata {
  const { seo } = TEAM_PAGE_COPY[locale];
  return {
    title: seo.title,
    description: seo.description,
    robots: { index: false, follow: false },
  };
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return (
    parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

function MemberCard({
  member,
  index,
  linkedinLabel,
}: {
  member: TeamMember;
  index: number;
  linkedinLabel: (name: string) => string;
}) {
  const scene = AVATAR_SCENES[index % AVATAR_SCENES.length];
  return (
    <li className="group">
      <div className="bg-light-gray relative aspect-[4/5] overflow-hidden rounded-sm">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            className="object-cover"
          />
        ) : (
          <>
            <Image
              src={`/brand/backgrounds/16x9/wonka-bg-${scene}-1920x1080.webp`}
              alt=""
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white">
              {initials(member.name)}
            </span>
          </>
        )}
        {member.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${encodeURIComponent(member.linkedin)}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkedinLabel(member.name)}
            className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-white text-black shadow-sm transition-all duration-200 hover:bg-blue-900 hover:text-white focus-visible:opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        )}
      </div>
      <p className="mt-4 font-serif text-xl text-black">{member.name}</p>
      {member.role && (
        <p className="mt-1 text-sm text-black/55">{member.role}</p>
      )}
    </li>
  );
}

export async function TeamPage({ locale = "en" }: { locale?: Locale }) {
  const copy = TEAM_PAGE_COPY[locale];
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat", locale);

  return (
    <main className="bg-white text-black">
      <section data-theme="dark" className="relative overflow-hidden bg-black">
        <Image
          src={`${BG}/wonka-bg-river-1920x1080.webp`}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 pt-36 pb-20 md:pt-44 md:pb-28">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-serif text-[2.6rem] leading-[1.02] text-white md:text-[4.4rem]">
            {copy.title}
          </h1>
          <div className="mt-8">
            <p className="max-w-2xl text-base text-white/85 md:text-lg">
              {copy.body}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i}
              linkedinLabel={copy.linkedinLabel}
            />
          ))}
        </ul>
      </section>

      <section className="px-4 pb-24 md:pb-32">
        <div className="bg-light-gray mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] p-8 md:flex-row md:items-center md:p-14">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight text-black md:text-5xl">
              {copy.ctaTitle}
            </h2>
            <p className="mt-4 text-black/65 md:text-lg">{copy.ctaBody}</p>
          </div>
          <ButtonLink href={meetingUrl} variant="primary" className="shrink-0">
            {copy.cta}
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
