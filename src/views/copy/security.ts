import type { Locale } from "@/i18n/config";

export interface SecurityCopy {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; body: string };
  certifications: { heading: string; body: string };
  /** Order: ISO 27001, GDPR, NIS 2. */
  certificationItems: { iso: CertItem; gdpr: CertItem; nis2: CertItem };
  practices: { heading: string };
  securityFeatures: { title: string; items: string[] }[];
  clarifications: { heading: string; label: string; body: string };
  legal: {
    heading: string;
    privacy: string;
    terms: string;
    cookies: string;
    dpa: string;
  };
}

interface CertItem {
  label: string;
  detail: string;
}

const en: SecurityCopy = {
  seo: {
    title: "Security & Compliance | Wonka AI",
    description:
      "ISO 27001 certified, GDPR compliant, NIS 2 compliant. Hosted in Azure West Europe (Microsoft Ireland). SOC 2 Type II in progress.",
  },
  hero: {
    eyebrow: "Trust & compliance",
    title: "Security at Wonka AI",
    body: "Wonka AI is built for European enterprises that handle sensitive data and require GDPR compliance, data residency controls and auditable access management.",
  },
  certifications: {
    heading: "Certifications",
    body: "Wonka AI maintains ISO 27001 certification for information security management, full GDPR compliance and NIS 2 compliance. SOC 2 Type II audit is in progress.",
  },
  certificationItems: {
    iso: {
      label: "ISO 27001 certified",
      detail: "Information security management system certified to ISO/IEC 27001.",
    },
    gdpr: {
      label: "GDPR compliant",
      detail:
        "Full compliance with the General Data Protection Regulation. Data Processing Agreement available.",
    },
    nis2: {
      label: "NIS 2 compliant",
      detail: "Compliant with the EU Network and Information Security Directive (NIS 2).",
    },
  },
  practices: { heading: "Security practices" },
  securityFeatures: [
    {
      title: "Hosting",
      items: [
        "Azure West Europe (Microsoft Ireland) by default",
        "Cloudflare for CDN and edge delivery",
        "EU-based infrastructure with data residency controls",
        "Enterprise-grade Azure security and compliance",
      ],
    },
    {
      title: "Data governance",
      items: [
        "Encryption at rest (AES-256)",
        "Encryption in transit (TLS 1.2 or higher)",
        "Customer data is not used to train public AI models",
        "Data Processing Agreement (DPA) included",
        "Role-based access control and audit logs",
      ],
    },
    {
      title: "Authentication & access",
      items: [
        "Single Sign-On (SSO) support via Azure AD / Entra ID",
        "Multi-factor authentication (MFA) available",
        "Granular permission management per user and team",
      ],
    },
    {
      title: "Compliance in progress",
      items: [
        "SOC 2 Type II audit in progress",
        "Annual independent (external black-box) penetration testing",
        "Independent information security audits (Sencom)",
        "Annual sub-processor security reviews",
        "Continuous monitoring and incident response procedures",
      ],
    },
  ],
  clarifications: {
    heading: "Important clarifications",
    label: "Hosting default:",
    body: "Wonka AI is hosted in Azure West Europe (Microsoft Ireland) by default. This is not an on-premises deployment unless explicitly contracted.",
  },
  legal: {
    heading: "Legal documents",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookies: "Cookie Policy",
    dpa: "A Data Processing Agreement is available on request.",
  },
};

const fr: SecurityCopy = {
  seo: {
    title: "Sécurité et conformité | Wonka AI",
    description:
      "Certifié ISO 27001, conforme RGPD et NIS 2. Hébergé dans Azure West Europe (Microsoft Irlande). Audit SOC 2 Type II en cours.",
  },
  hero: {
    eyebrow: "Confiance et conformité",
    title: "La sécurité chez Wonka AI",
    body: "Wonka AI est conçu pour les entreprises européennes qui traitent des données sensibles et exigent la conformité RGPD, la maîtrise de la résidence des données et une gestion des accès auditable.",
  },
  certifications: {
    heading: "Certifications",
    body: "Wonka AI est certifié ISO 27001 pour la gestion de la sécurité de l'information, pleinement conforme au RGPD et conforme à NIS 2. L'audit SOC 2 Type II est en cours.",
  },
  certificationItems: {
    iso: {
      label: "Certifié ISO 27001",
      detail:
        "Système de management de la sécurité de l'information certifié ISO/IEC 27001.",
    },
    gdpr: {
      label: "Conforme au RGPD",
      detail:
        "Pleine conformité au Règlement général sur la protection des données. Accord de traitement des données (DPA) disponible.",
    },
    nis2: {
      label: "Conforme à NIS 2",
      detail:
        "Conforme à la directive européenne sur la sécurité des réseaux et des systèmes d'information (NIS 2).",
    },
  },
  practices: { heading: "Pratiques de sécurité" },
  securityFeatures: [
    {
      title: "Hébergement",
      items: [
        "Azure West Europe (Microsoft Irlande) par défaut",
        "Cloudflare pour le CDN et la diffusion en périphérie",
        "Infrastructure basée dans l'UE avec contrôle de la résidence des données",
        "Sécurité et conformité Azure de niveau entreprise",
      ],
    },
    {
      title: "Gouvernance des données",
      items: [
        "Chiffrement au repos (AES-256)",
        "Chiffrement en transit (TLS 1.2 ou supérieur)",
        "Les données clients ne servent pas à entraîner des modèles d'IA publics",
        "Accord de traitement des données (DPA) inclus",
        "Contrôle d'accès basé sur les rôles et journaux d'audit",
      ],
    },
    {
      title: "Authentification et accès",
      items: [
        "Authentification unique (SSO) via Azure AD / Entra ID",
        "Authentification multifacteur (MFA) disponible",
        "Gestion fine des permissions par utilisateur et par équipe",
      ],
    },
    {
      title: "Conformité en cours",
      items: [
        "Audit SOC 2 Type II en cours",
        "Tests d'intrusion annuels indépendants (externes, en boîte noire)",
        "Audits indépendants de sécurité de l'information (Sencom)",
        "Revues de sécurité annuelles des sous-traitants",
        "Surveillance continue et procédures de réponse aux incidents",
      ],
    },
  ],
  clarifications: {
    heading: "Précisions importantes",
    label: "Hébergement par défaut :",
    body: "Wonka AI est hébergé par défaut dans Azure West Europe (Microsoft Irlande). Il ne s'agit pas d'un déploiement sur site (on-premise), sauf mention contractuelle explicite.",
  },
  legal: {
    heading: "Documents juridiques",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    cookies: "Politique en matière de cookies",
    dpa: "Un accord de traitement des données (DPA) est disponible sur demande.",
  },
};

const nl: SecurityCopy = {
  seo: {
    title: "Beveiliging en compliance | Wonka AI",
    description:
      "ISO 27001-gecertificeerd, AVG- en NIS 2-conform. Gehost in Azure West Europe (Microsoft Ierland). SOC 2 Type II-audit loopt.",
  },
  hero: {
    eyebrow: "Vertrouwen en compliance",
    title: "Beveiliging bij Wonka AI",
    body: "Wonka AI is gebouwd voor Europese bedrijven die gevoelige data verwerken en AVG-conformiteit, controle over dataresidentie en controleerbaar toegangsbeheer vereisen.",
  },
  certifications: {
    heading: "Certificeringen",
    body: "Wonka AI beschikt over een ISO 27001-certificering voor informatiebeveiligingsbeheer, is volledig AVG-conform en voldoet aan NIS 2. De SOC 2 Type II-audit loopt.",
  },
  certificationItems: {
    iso: {
      label: "ISO 27001-gecertificeerd",
      detail: "Managementsysteem voor informatiebeveiliging gecertificeerd volgens ISO/IEC 27001.",
    },
    gdpr: {
      label: "AVG-conform",
      detail:
        "Volledige naleving van de Algemene Verordening Gegevensbescherming. Verwerkersovereenkomst (DPA) beschikbaar.",
    },
    nis2: {
      label: "NIS 2-conform",
      detail: "Conform de Europese richtlijn inzake netwerk- en informatiebeveiliging (NIS 2).",
    },
  },
  practices: { heading: "Beveiligingspraktijken" },
  securityFeatures: [
    {
      title: "Hosting",
      items: [
        "Standaard Azure West Europe (Microsoft Ierland)",
        "Cloudflare voor CDN en edge delivery",
        "Infrastructuur in de EU met controle over dataresidentie",
        "Azure-beveiliging en compliance op enterpriseniveau",
      ],
    },
    {
      title: "Databeheer",
      items: [
        "Versleuteling in rust (AES-256)",
        "Versleuteling tijdens transport (TLS 1.2 of hoger)",
        "Klantdata wordt niet gebruikt om publieke AI-modellen te trainen",
        "Verwerkersovereenkomst (DPA) inbegrepen",
        "Rolgebaseerd toegangsbeheer en auditlogs",
      ],
    },
    {
      title: "Authenticatie en toegang",
      items: [
        "Single Sign-On (SSO) via Azure AD / Entra ID",
        "Multifactorauthenticatie (MFA) beschikbaar",
        "Gedetailleerd rechtenbeheer per gebruiker en team",
      ],
    },
    {
      title: "Compliance in uitvoering",
      items: [
        "SOC 2 Type II-audit loopt",
        "Jaarlijkse onafhankelijke penetratietests (extern, black-box)",
        "Onafhankelijke audits van informatiebeveiliging (Sencom)",
        "Jaarlijkse beveiligingsreviews van subverwerkers",
        "Continue monitoring en procedures voor incidentrespons",
      ],
    },
  ],
  clarifications: {
    heading: "Belangrijke verduidelijkingen",
    label: "Standaardhosting:",
    body: "Wonka AI wordt standaard gehost in Azure West Europe (Microsoft Ierland). Dit is geen on-premises-uitrol, tenzij uitdrukkelijk contractueel overeengekomen.",
  },
  legal: {
    heading: "Juridische documenten",
    privacy: "Privacybeleid",
    terms: "Gebruiksvoorwaarden",
    cookies: "Cookiebeleid",
    dpa: "Een verwerkersovereenkomst (DPA) is op aanvraag beschikbaar.",
  },
};

export const SECURITY_COPY: Record<Locale, SecurityCopy> = { en, fr, nl };
