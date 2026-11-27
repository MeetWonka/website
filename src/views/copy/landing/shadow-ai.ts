import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * /fr/shadow-ai — practical guide on shadow AI for DSI / RSSI / DPO
 * (informational intent): definition, causes, risks, detection, and the fix
 * (charte IA + acculturation + a governed WonkaChat workspace).
 * French only (France market). Not legal advice.
 */
export const SHADOW_AI_COPY: Partial<Record<Locale, LandingCopy>> = {
  fr: {
    meetingContext: "default",
    seo: {
      title: "Shadow AI : définition, risques et comment l'éviter | Wonka",
      description:
        "Shadow AI : pourquoi vos équipes utilisent des IA non autorisées, quels risques pour vos données et le RGPD, et comment l'encadrer sans l'interdire.",
    },
    breadcrumb: "Shadow AI",
    schema: {
      serviceName: "Encadrement du shadow AI et gouvernance de l'IA",
      serviceType: "Accompagnement à la gouvernance de l'IA et espace de travail IA sécurisé",
    },
    hero: {
      eyebrow: "Guide · DSI, RSSI, DPO",
      title: "Shadow AI : vos équipes utilisent déjà l'IA. Reprenez la main sans l'interdire.",
      subtitle:
        "Comptes ChatGPT personnels, extensions de navigateur : le shadow AI est rarement de la malveillance, c'est un besoin non couvert. D'où il vient, quels risques, comment le repérer et le réduire en cinq étapes.",
      primaryCta: { label: "Réserver un appel de 30 minutes", href: "meeting" },
      secondaryCta: { label: "Faire le diagnostic gratuit", href: "/france/diagnostic" },
      facts: [
        ["Le problème", "Des données qui sortent sans visibilité"],
        ["La réponse", "Une alternative officielle, pas une interdiction"],
        ["Hébergement WonkaChat", "Azure West Europe (Microsoft Irlande)"],
        ["Sécurité", "ISO 27001 · RGPD · NIS 2"],
      ],
    },
    answer: {
      heading: "Qu'est-ce que le shadow AI ?",
      paragraphs: [
        "Le shadow AI, ou shadow IA, désigne l'utilisation par les collaborateurs d'outils d'intelligence artificielle que l'entreprise n'a ni validés ni encadrés : comptes ChatGPT personnels, assistants gratuits, extensions de navigateur. Des données de l'entreprise y sont saisies sans contrôle de la DSI, du RSSI ni du DPO. On parle aussi d'IA fantôme.",
        "C'est la suite logique du shadow IT. Le shadow IT, c'était une application SaaS installée sans passer par la DSI. Le shadow AI va plus loin : ce qui sort, ce n'est plus seulement un usage, c'est le contenu lui-même. Un e-mail client collé pour être reformulé, un contrat résumé, un tableau financier analysé, tout cela quitte l'entreprise vers un service dont elle ne connaît ni les conditions ni l'hébergement.",
        "Il naît presque toujours du même décalage. Les collaborateurs ont compris ce que l'IA leur fait gagner, et l'entreprise ne leur propose rien d'utilisable. Votre ChatGPT perso marche très bien. Pour les 12 qui savent s'en servir. Pour les autres, le travail avance encore à la main. Et pendant ce temps, le RSSI n'a aucune visibilité sur ce qui sort de l'entreprise.",
        "Interdire ne règle pas le problème : l'usage passe sur le téléphone personnel et devient encore moins visible. Ce qui fonctionne, c'est une alternative officielle au moins aussi pratique, des règles claires et une formation. C'est l'approche de Wonka : une charte IA et un cadre de gouvernance, un accompagnement des équipes, et WonkaChat, un espace de travail IA gouverné, hébergé dans l'UE, avec permissions, modèles approuvés et contrôles d'administration.",
      ],
    },
    benefits: {
      eyebrow: "Les risques",
      heading: "Shadow AI : les risques concrets pour l'entreprise",
      items: [
        {
          title: "Des données qui quittent l'entreprise",
          body: "Chaque copier-coller dans un outil non validé envoie de l'information vers un service tiers. L'entreprise ne sait ni où elle est stockée, ni combien de temps, ni selon quelles conditions d'utilisation.",
        },
        {
          title: "La confidentialité exposée",
          body: "Contrats, chiffres non publiés, dossiers RH, code source, offres commerciales : ce qui est confidentiel en interne ne l'est plus une fois saisi dans un compte personnel dont l'entreprise n'a pas la maîtrise.",
        },
        {
          title: "Un traitement RGPD sans base",
          body: "Des données personnelles envoyées à un outil d'IA tiers constituent un traitement. Il lui faut une base légale et, pour un sous-traitant, un accord de traitement des données. Avec un compte personnel, rien de tout cela n'existe.",
        },
        {
          title: "Aucune traçabilité",
          body: "Qui a utilisé quel outil, avec quelles données, pour produire quel document ? Sans journal ni compte d'entreprise, impossible de répondre en cas d'incident, de question d'un client ou de demande d'un auditeur.",
        },
        {
          title: "Des résultats incohérents",
          body: "Chacun son outil, ses prompts et ses habitudes : la qualité varie d'une personne à l'autre, les contenus générés ne sont pas relus selon une règle commune, et les bonnes pratiques ne se partagent pas.",
        },
        {
          title: "Une adoption qui reste confidentielle",
          body: "Le shadow AI profite à quelques pionniers. Le reste de l'équipe n'y a pas accès ou n'ose pas, et l'entreprise ne capitalise pas sur ce qui marche. Le risque est double : exposition des données et retard collectif.",
        },
      ],
    },
    useCases: {
      eyebrow: "La réponse",
      heading: "Comment éviter le shadow AI : encadrer plutôt qu'interdire",
      items: [
        {
          title: "Repérer les usages réels",
          body: "Commencez par savoir qui utilise quoi. Interrogez les équipes sans esprit de sanction, croisez avec ce que vos outils réseau et vos journaux de navigation remontent, et listez les tâches pour lesquelles l'IA est utilisée.",
          link: { label: "Faire l'état des lieux avec un audit IA", href: "/fr/audit-ia" },
        },
        {
          title: "Fixer des règles avec une charte IA",
          body: "Outils autorisés, données interdites, validation humaine obligatoire, rôles de chacun : une charte courte et concrète transforme des usages individuels en règles communes, que chacun peut suivre.",
          link: { label: "Rédiger votre charte IA", href: "/fr/charte-ia-entreprise" },
        },
        {
          title: "Former toutes les équipes",
          body: "Le shadow AI prospère quand seuls quelques-uns savent utiliser l'IA. Une acculturation pratique, métier par métier, montre ce qui est permis et comment bien s'en servir. L'article 4 de l'AI Act, applicable depuis le 2 février 2025, pousse dans ce sens.",
          link: { label: "Former vos équipes à l'IA", href: "/fr/acculturation-ia" },
        },
        {
          title: "Offrir une alternative officielle",
          body: "WonkaChat garde l'expérience de chat que vos collaborateurs apprécient, dans un espace gouverné : hébergement dans Azure West Europe, choix de modèles approuvés, connexion à vos documents et outils.",
          link: { label: "Découvrir WonkaChat", href: "/fr/wonka-chat" },
        },
        {
          title: "Appliquer les règles dans l'outil",
          body: "Permissions par utilisateur et par équipe, SSO via Azure AD / Entra ID avec MFA, contrôle d'accès par rôle et journaux d'audit : les règles de la charte deviennent des paramètres, pas des vœux pieux.",
        },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "Réduire le shadow AI en 5 étapes",
      steps: [
        {
          title: "Cartographiez les usages",
          body: "Sondez les équipes, identifiez les outils utilisés et les données qui y passent. L'objectif est de comprendre les besoins réels, pas de trouver des coupables.",
        },
        {
          title: "Classez vos données",
          body: "Avec le RSSI et le DPO, définissez ce qui est public, interne, confidentiel ou personnel, et ce qui ne doit jamais être saisi dans une IA non validée.",
        },
        {
          title: "Déployez un outil officiel",
          body: "Mettez à disposition un espace de travail IA validé, accessible à tous, connecté aux documents utiles et hébergé dans un cadre que vous maîtrisez.",
        },
        {
          title: "Écrivez la charte et formez",
          body: "Publiez des règles simples, présentez-les en atelier avec des exemples de vos métiers et intégrez-les à l'onboarding des nouveaux arrivants.",
        },
        {
          title: "Pilotez et ajustez",
          body: "Suivez l'adoption de l'outil officiel grâce aux journaux d'audit, recueillez les besoins non couverts et révisez la charte à intervalles réguliers.",
        },
      ],
    },
    comparison: {
      eyebrow: "Deux stratégies",
      heading: "Shadow IT et shadow AI : interdire ou encadrer ?",
      columns: ["Critère", "Interdire l'IA", "Encadrer avec une alternative officielle"],
      rows: [
        ["Usages réels", "Continuent sur les appareils personnels", "Reviennent dans un outil visible par la DSI"],
        ["Données de l'entreprise", "Sortent sans contrôle, hors du radar", "Restent dans un espace hébergé dans l'UE, avec droits d'accès"],
        ["RGPD", "Traitements non documentés", "Accord de traitement des données et cadre défini"],
        ["Traçabilité", "Aucune", "Journaux d'audit et contrôle d'accès par rôle"],
        ["Adoption", "Réservée à ceux qui contournent la règle", "Ouverte à toute l'équipe, avec formation"],
      ],
      footnote:
        "Comparaison qualitative, à adapter à votre organisation. Ce guide ne constitue pas un conseil juridique : faites valider vos règles par votre DPO et votre conseil juridique.",
    },
    faq: {
      heading: "Questions fréquentes sur le shadow AI",
      items: [
        {
          question: "Shadow AI : quelle définition simple ?",
          answer:
            "Le shadow AI est l'usage d'outils d'intelligence artificielle non autorisés par l'entreprise, le plus souvent des comptes ChatGPT personnels ou des assistants gratuits, avec des données professionnelles. On dit aussi shadow IA ou IA fantôme. Le problème n'est pas l'IA elle-même, mais l'absence de cadre : ni validation, ni visibilité, ni contrôle sur les données saisies.",
        },
        {
          question: "Quelle différence entre shadow IT et shadow AI ?",
          answer:
            "Le shadow IT désigne tout outil informatique utilisé sans l'accord de la DSI. Le shadow AI en est une forme particulière, plus sensible : l'outil reçoit directement du contenu de l'entreprise pour le traiter, qu'il s'agisse d'e-mails, de contrats ou de données clients. Le risque ne porte donc pas seulement sur l'outil, mais sur l'information qui y est envoyée.",
        },
        {
          question: "Quels sont les risques du shadow AI pour une entreprise ?",
          answer:
            "Les principaux : des données confidentielles qui sortent vers des services tiers, des données personnelles traitées sans base légale ni accord de traitement, aucune traçabilité en cas d'incident, et des contenus générés de qualité inégale, parfois envoyés à des clients sans relecture. S'y ajoute un risque moins visible : une adoption de l'IA limitée à quelques personnes.",
        },
        {
          question: "L'usage non autorisé de ChatGPT en entreprise est-il un problème RGPD ?",
          answer:
            "Dès que des données personnelles sont saisies dans un outil d'IA tiers, il s'agit d'un traitement qui doit reposer sur une base légale et, si l'outil agit comme sous-traitant, être couvert par un accord de traitement des données. Avec un compte personnel, l'entreprise n'a généralement ni l'un ni l'autre. Faites le point avec votre DPO.",
        },
        {
          question: "Comment détecter le shadow AI dans son entreprise ?",
          answer:
            "Combinez deux approches. Côté technique, observez ce que vos outils réseau, proxy ou journaux de navigation remontent sur les services d'IA utilisés. Côté humain, interrogez les équipes sans esprit de sanction : quels outils, pour quelles tâches, avec quelles données. Le second volet est souvent le plus instructif, car il révèle les besoins réels.",
        },
        {
          question: "Faut-il interdire ChatGPT pour éviter le shadow AI ?",
          answer:
            "L'interdiction seule fonctionne rarement : les collaborateurs qui gagnent du temps avec l'IA continuent sur leur téléphone, et l'usage devient encore moins visible. Plus efficace : proposer un outil officiel au moins aussi pratique, publier une charte IA claire et former les équipes. Notre page ChatGPT entreprise détaille les options.",
        },
        {
          question: "Comment éviter le shadow AI durablement ?",
          answer:
            "En traitant la cause, pas le symptôme. Les équipes ont besoin de l'IA : donnez-leur un espace de travail IA validé, connecté à leurs documents, avec des modèles approuvés, des permissions et des journaux d'audit. Accompagnez-le d'une charte et d'une formation, puis suivez l'adoption. WonkaChat peut être testé 7 jours, gratuitement et sans carte.",
        },
        {
          question: "Wonka peut-il nous aider à encadrer le shadow AI ?",
          answer:
            "Oui, de deux façons. Avec Start AI, nous vous remettons notamment une politique IA et un cadre de gouvernance adaptés à votre organisation ; les programmes démarrent à 15 000 € et la plupart des équipes commencent dans les deux semaines. Avec WonkaChat, vos équipes disposent d'une alternative officielle hébergée dans l'UE, avec contrôles d'administration.",
        },
      ],
    },
    related: {
      heading: "Pour aller plus loin",
      links: [
        {
          label: "Charte IA entreprise",
          href: "/fr/charte-ia-entreprise",
          description: "Le guide pour rédiger des règles d'usage de l'IA.",
        },
        {
          label: "Acculturation IA",
          href: "/fr/acculturation-ia",
          description: "Former vos équipes et développer la maîtrise de l'IA.",
        },
        {
          label: "ChatGPT entreprise",
          href: "/fr/chatgpt-entreprise",
          description: "Remplacer les comptes personnels par un espace gouverné.",
        },
        {
          label: "WonkaChat",
          href: "/fr/wonka-chat",
          description: "L'espace de travail IA gouverné pour toute l'organisation.",
        },
        {
          label: "Audit IA",
          href: "/fr/audit-ia",
          description: "Faire l'état des lieux de vos usages et opportunités IA.",
        },
        {
          label: "LLM privé ou LLM public",
          href: "/fr/vs/private-llm-vs-public-llm",
          description: "Ce qui change pour vos données selon le modèle choisi.",
        },
        {
          label: "Start AI",
          href: "/fr/start-ai",
          description: "Stratégie IA, feuille de route et politique IA sur mesure.",
        },
        { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      ],
    },
    cta: {
      heading: "Le shadow AI est un signal : vos équipes veulent l'IA.",
      body: "Réservez un appel de 30 minutes. Nous regardons où en sont vos usages, ce que votre charte doit couvrir et comment offrir à vos équipes une alternative officielle qu'elles utiliseront vraiment.",
    },
  },
};
