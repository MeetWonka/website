import { resolveTeamMeetingUrl } from "@/lib/resolve-meeting-url";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { LogoMark } from "@/components/ui/logo-mark";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

const copy = {
  en: {
    eyebrow: "The Wonka AI answer",
    headline: "Private enterprise AI with GDPR built in.",
    body: "Wonka AI connects private AI agents to your existing tools and data. Hosted in Azure West Europe (Microsoft Ireland) by default, with GDPR compliance, access control and audit logs included.",
    bullets: [
      "Connects to your full stack: SharePoint, Salesforce, Slack, Jira and more",
      "Azure West Europe hosting, GDPR compliant, ISO 27001 certified",
      "Deployed in weeks, not months",
    ],
    cta: "Book a demo",
  },
  fr: {
    eyebrow: "La réponse Wonka AI",
    headline: "IA d'entreprise privée avec RGPD intégré.",
    body: "Wonka AI connecte des agents IA privés à vos outils et données existants. Hébergement par défaut sur Azure West Europe (Microsoft Irlande), avec conformité RGPD, contrôle d'accès et journaux d'audit inclus.",
    bullets: [
      "Connecté à toute votre stack : SharePoint, Salesforce, Slack, Jira et plus",
      "Hébergement Azure West Europe, conforme RGPD, certifié ISO 27001",
      "Déployé en semaines, pas en mois",
    ],
    cta: "Réserver une démo",
  },
  nl: {
    eyebrow: "Het Wonka AI antwoord",
    headline: "Private enterprise AI met AVG ingebouwd.",
    body: "Wonka AI verbindt private AI-agents met uw bestaande tools en data. Standaard gehost op Azure West Europe (Microsoft Ierland), met AVG-naleving, toegangscontrole en auditlogs inbegrepen.",
    bullets: [
      "Verbonden met uw volledige stack: SharePoint, Salesforce, Slack, Jira en meer",
      "Azure West Europe hosting, AVG-conform, ISO 27001 gecertificeerd",
      "Geïmplementeerd in weken, niet maanden",
    ],
    cta: "Demo boeken",
  },
};

interface WonkaSolvesProps {
  locale: Locale;
  meetingUrl?: string | null;
  meetingTrackType?: MeetingTrackType;
}

export function WonkaSolves({
  locale,
  meetingUrl,
  meetingTrackType = "general",
}: WonkaSolvesProps) {
  const t = copy[locale];

  return (
    <section className="mt-20 border-t border-b border-border pt-16 pb-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
        <div className="flex flex-col gap-6 md:max-w-sm">
          <div className="flex items-center gap-3">
            <LogoMark className="size-8 shrink-0" />
            <span className="type-eyebrow text-accent">{t.eyebrow}</span>
          </div>
          <h2 className="type-h4">{t.headline}</h2>
          <p className="type-paragraph-m text-text/60">{t.body}</p>
          <ButtonLink
            href={resolveTeamMeetingUrl(meetingUrl)}
            variant="primary"
            className="self-start"
            {...meetingTrackProps(meetingTrackType)}
          >
            {t.cta}
          </ButtonLink>
        </div>
        <ul className="flex flex-col gap-4 md:flex-1 md:pt-2">
          {t.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="type-paragraph-m text-text/80">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
