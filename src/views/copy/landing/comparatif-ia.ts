import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * /fr/comparatif-ia-entreprise — fair buyer's guide for French PME/ETI choosing
 * between the enterprise offers of ChatGPT, Claude, Gemini, Microsoft Copilot
 * and Le Chat (Mistral AI), then how WonkaChat fits (multi-model, EU-hosted,
 * connected, governed). French only (France market).
 * Competitor statements stay general and non-numeric (vendor, country,
 * ecosystem, own model family): no prices, benchmarks or certification claims.
 */
export const COMPARATIF_IA_COPY: Partial<Record<Locale, LandingCopy>> = {
  fr: {
    meetingContext: "default",
    seo: {
      title: "Comparatif IA entreprise : ChatGPT, Claude, Gemini, Mistral",
      description:
        "Comparatif IA entreprise : ChatGPT, Claude, Gemini, Copilot et Le Chat de Mistral, jugés sur données, intégrations et gouvernance. Guide PME/ETI.",
    },
    breadcrumb: "Comparatif IA entreprise",
    schema: {
      serviceName: "WonkaChat : espace de travail IA multi-modèles pour entreprise",
      serviceType: "Espace de travail IA privé pour entreprises",
    },
    hero: {
      eyebrow: "Guide d'achat · IA générative",
      title: "Comparatif IA entreprise : quelle IA choisir pour votre organisation ?",
      subtitle:
        "ChatGPT, Claude, Gemini, Copilot, Le Chat de Mistral : les offres se ressemblent en démo et diffèrent sur ce qui compte. Ce guide compare les critères d'achat d'une PME ou d'une ETI.",
      primaryCta: { label: "Essai gratuit 7 jours", href: "trial" },
      secondaryCta: { label: "Réserver un appel de 30 minutes", href: "meeting" },
      facts: [
        ["Offres comparées", "ChatGPT · Claude · Gemini · Copilot · Le Chat"],
        ["Critères", "8 critères d'achat pour PME et ETI"],
        ["WonkaChat", "Hébergé dans Azure West Europe"],
        ["Essai gratuit", "7 jours, sans carte"],
      ],
    },
    answer: {
      heading: "Comparatif IA entreprise : ce qu'il faut vraiment comparer",
      paragraphs: [
        "Un comparatif IA entreprise ne se résume pas à savoir quel modèle écrit le mieux. Pour une PME ou une ETI, la bonne question est : où vont nos données, à quels outils l'IA se connecte, qui contrôle les accès et à quel point nous dépendons d'un seul éditeur. La qualité du modèle compte, mais elle évolue vite.",
        "ChatGPT est édité par OpenAI, Claude par Anthropic, deux entreprises américaines. Gemini est proposé par Google et s'intègre à Google Workspace. Microsoft Copilot, également américain, vit au cœur de Microsoft 365. Le Chat est l'assistant de Mistral AI, éditeur français. Chacune de ces offres est d'abord construite autour de la famille de modèles de son éditeur.",
        "Choisir une de ces offres, c'est aussi parier sur un modèle, alors que le classement des modèles change vite et qu'aucun n'est le meilleur pour toutes les tâches. C'est aussi accepter son écosystème : un assistant à l'aise dans ses propres applications l'est souvent moins dans votre ERP ou votre CRM.",
        "WonkaChat propose une autre approche : un seul espace de travail IA, hébergé dans Azure West Europe (Microsoft Irlande), où vos équipes utilisent le modèle adapté à chaque besoin, avec des modèles hébergés dans l'UE inclus ou votre propre clé API. Il se connecte à vos outils (Odoo, SharePoint, Outlook, Teams, Salesforce, HubSpot…) et s'accompagne des contrôles attendus par votre DSI : SSO, permissions par équipe, journaux d'audit. Les données clients ne servent pas à entraîner des modèles d'IA publics. Ce guide dit aussi quand une offre d'éditeur suffit.",
      ],
    },
    benefits: {
      eyebrow: "Les critères qui comptent",
      heading: "Quelle IA choisir pour son entreprise : 6 critères avant de signer",
      items: [
        {
          title: "Hébergement et souveraineté des données",
          body: "Où les données sont-elles hébergées, sous quel contrat, servent-elles à l'entraînement ? Envoyer des données personnelles à un outil d'IA tiers est un traitement au sens du RGPD : il faut une base légale et, pour un sous-traitant, un accord de traitement (DPA).",
        },
        {
          title: "Le choix des modèles",
          body: "Une offre liée à une seule famille de modèles vous rend dépendant de sa feuille de route. Pouvez-vous utiliser plusieurs modèles, ou votre propre clé API ?",
        },
        {
          title: "L'intégration à vos outils",
          body: "La valeur apparaît quand l'IA travaille sur vos documents, vos fiches ERP ou CRM et vos e-mails. Vérifiez, connecteur par connecteur, ce qui existe réellement.",
        },
        {
          title: "Agents et actions",
          body: "Répondre est une chose, agir en est une autre : mettre à jour une fiche, préparer une réponse client. Vérifiez si une validation humaine peut être imposée avant exécution.",
        },
        {
          title: "Administration et permissions",
          body: "SSO, droits par équipe, journaux d'audit : ces fonctions permettent à la DSI et au RSSI de valider un déploiement à toute l'entreprise.",
        },
        {
          title: "Adoption, accompagnement et dépendance",
          body: "Un outil utilisé par quelques pionniers ne rapporte rien. Regardez l'accompagnement proposé, et ce que coûterait un changement d'éditeur dans deux ans.",
        },
      ],
    },
    useCases: {
      eyebrow: "Guide de choix",
      heading: "ChatGPT vs Claude vs Gemini vs Copilot : quel outil pour quel besoin ?",
      items: [
        {
          title: "Vous êtes déjà tout sur Microsoft 365",
          body: "Si vos équipes vivent dans Word, Outlook et Teams et cherchent surtout à rédiger et synthétiser, Microsoft Copilot peut suffire pour des usages simples. Les limites apparaissent quand l'IA doit travailler avec des outils hors de l'écosystème Microsoft.",
          link: {
            label: "Quand Microsoft Copilot ne suffit plus",
            href: "/fr/blog/fr-microsoft-copilot-insuffisant",
          },
        },
        {
          title: "Votre entreprise tourne sur Google Workspace",
          body: "Gemini est pensé pour Gmail, Docs et Drive : pour une équipe entièrement sur Google Workspace, c'est un point de départ logique. Vérifiez la connexion à votre ERP et à votre CRM.",
          link: { label: "Voir les intégrations WonkaChat", href: "/fr/integrations" },
        },
        {
          title: "Un usage centré sur un modèle précis",
          body: "Si une équipe a trouvé le modèle idéal pour sa tâche, l'offre de son éditeur (ChatGPT, Claude ou Le Chat de Mistral) est une option directe. Gardez en tête qu'elle restera construite autour de cette seule famille de modèles.",
          link: { label: "Comment choisir un modèle d'IA", href: "/fr/blog/fr-choisir-modele-ia" },
        },
        {
          title: "Remplacer les comptes ChatGPT personnels",
          body: "Si le vrai sujet est le shadow AI, proposez un outil validé aussi pratique que ChatGPT, avec hébergement dans l'UE et visibilité pour l'IT.",
          link: { label: "ChatGPT entreprise, version privée", href: "/fr/chatgpt-entreprise" },
        },
        {
          title: "Plusieurs modèles, et une IA connectée à votre ERP",
          body: "Pour utiliser différents modèles selon les tâches, connecter l'IA à Odoo, SharePoint ou Salesforce et déployer des agents avec validation humaine, un espace multi-modèles comme WonkaChat est plus adapté.",
          link: { label: "Découvrir WonkaChat", href: "/fr/wonka-chat" },
        },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "Comment mener votre comparatif IA entreprise en 5 étapes",
      steps: [
        {
          title: "Partir de 3 à 5 cas d'usage réels",
          body: "Choisissez des tâches réelles : e-mails de support, recherche dans des contrats, reporting. Sans cas d'usage, on compare des démos.",
        },
        {
          title: "Cartographier vos données et vos outils",
          body: "Quelles données l'IA lira-t-elle, lesquelles sont sensibles, dans quels systèmes ? Cette carte élimine vite les offres inadaptées.",
        },
        {
          title: "Valider sécurité et conformité avec la DSI et le DPO",
          body: "Hébergement, DPA, entraînement, SSO, journaux d'audit : posez les mêmes questions à chaque éditeur, par écrit.",
        },
        {
          title: "Tester sur vos propres données",
          body: "Faites exécuter les mêmes cas d'usage par de vrais utilisateurs. WonkaChat peut être testé 7 jours gratuitement, sans carte de crédit.",
        },
        {
          title: "Décider en pensant à l'adoption",
          body: "Retenez l'outil que vos équipes utiliseront, que l'IT peut gouverner et qui ne vous enferme pas.",
        },
      ],
    },
    comparison: {
      eyebrow: "Comparatif",
      heading: "Meilleure IA pour entreprise : WonkaChat face aux offres des grands éditeurs",
      columns: ["Critère", "WonkaChat", "Offres IA des grands éditeurs"],
      rows: [
        [
          "Éditeur",
          "Wonka AI, entreprise belge",
          "OpenAI, Anthropic, Google et Microsoft (États-Unis) ; Mistral AI (France)",
        ],
        [
          "Modèles d'IA",
          "Au choix : modèles hébergés dans l'UE inclus, ou votre propre clé API",
          "Chaque offre est d'abord construite autour de la famille de modèles de son éditeur",
        ],
        [
          "Hébergement des données",
          "Azure West Europe (Microsoft Irlande), contrôle de la résidence des données dans l'UE",
          "Opéré par l'éditeur ; options de résidence selon l'éditeur et l'offre",
        ],
        [
          "Écosystème",
          "Indépendant de votre suite bureautique : Microsoft 365, Google ou autre",
          "Copilot lié à Microsoft 365, Gemini lié à Google Workspace ; les autres en application autonome",
        ],
        [
          "Outils de l'entreprise",
          "Odoo, SharePoint, Outlook, Teams, Salesforce, HubSpot et plus",
          "Connecteurs variables, souvent plus riches dans l'écosystème de l'éditeur",
        ],
        [
          "Agents et actions",
          "Agents partagés par rôle, avec validation humaine",
          "Fonctions d'agent et assistants personnalisés, périmètre selon l'offre",
        ],
        [
          "Administration",
          "SSO via Azure AD / Entra ID, MFA, permissions par utilisateur et équipe, journaux d'audit",
          "Console d'administration ; contrôles avancés selon l'offre",
        ],
        [
          "Accompagnement",
          "Équipe qui vous aide à définir et déployer vos cas d'usage",
          "Principalement en libre-service ; accompagnement selon l'offre",
        ],
      ],
      footnote:
        "Les offres des éditeurs évoluent rapidement. Ce tableau reflète des informations générales au moment de la rédaction ; consultez le site de chaque éditeur (OpenAI, Anthropic, Google, Microsoft, Mistral AI) pour les fonctionnalités, conditions et tarifs à jour.",
    },
    faq: {
      heading: "Comparatif IA entreprise : questions fréquentes",
      items: [
        {
          question: "Quelle est la meilleure IA pour une entreprise ?",
          answer:
            "Il n'existe pas de meilleure IA dans l'absolu : les modèles progressent vite et chacun a ses points forts. Le bon choix dépend surtout de vos données, de vos outils, de vos exigences de sécurité et de l'adoption par vos équipes. C'est pourquoi un espace de travail qui donne accès à plusieurs modèles limite le risque de mauvais pari.",
        },
        {
          question: "ChatGPT, Claude ou Gemini : lequel choisir pour son entreprise ?",
          answer:
            "ChatGPT (OpenAI), Claude (Anthropic) et Gemini (Google) sont trois offres américaines, chacune construite autour de ses propres modèles. Gemini a l'avantage de l'intégration à Google Workspace. Testez-les sur vos cas d'usage réels, et demandez-vous si vous voulez dépendre d'un seul modèle.",
        },
        {
          question: "Que vaut Claude pour une entreprise ?",
          answer:
            "Claude est la famille de modèles d'Anthropic, entreprise américaine, qui propose des offres pour les équipes et les entreprises. Comme pour toute offre, examinez l'hébergement, le contrat, les connecteurs et les contrôles d'administration. Consultez le site d'Anthropic pour les conditions actuelles.",
        },
        {
          question: "Gemini entreprise : est-ce adapté si nous utilisons Google Workspace ?",
          answer:
            "Oui, c'est son terrain naturel : Gemini est proposé par Google et s'intègre à Gmail, Docs, Sheets et Drive. Si toute votre activité passe par Google Workspace, c'est une option logique pour des usages bureautiques. Vérifiez en revanche ce qu'il peut faire avec vos systèmes hors Google, comme votre ERP ou votre CRM.",
        },
        {
          question: "Mistral Le Chat est-il une bonne option pour une entreprise française ?",
          answer:
            "Le Chat est l'assistant de Mistral AI, éditeur français, construit autour des modèles Mistral. Sa nationalité compte pour beaucoup d'entreprises, mais ne remplace pas l'analyse : hébergement, contrat, connecteurs, administration. Posez-lui les mêmes questions qu'aux autres éditeurs, et testez-le sur vos cas d'usage.",
        },
        {
          question: "Microsoft Copilot suffit-il si nous sommes sur Microsoft 365 ?",
          answer:
            "Pour des usages simples dans Word, Outlook ou Teams, Copilot peut suffire. Les besoins changent quand l'IA doit exploiter des outils hors Microsoft ou d'autres modèles. WonkaChat se connecte aussi à SharePoint, Outlook et Teams, et peut compléter Microsoft 365 plutôt que le remplacer.",
        },
        {
          question: "Qu'est-ce qu'un comparatif LLM et est-ce utile pour choisir ?",
          answer:
            "Un comparatif LLM compare les grands modèles de langage eux-mêmes, souvent sur des tests standardisés. Utile pour suivre les tendances, moins pour choisir un outil : les classements changent vite et ne disent rien de vos données ni de vos intégrations. Testez plutôt sur vos propres cas d'usage.",
        },
        {
          question: "Peut-on utiliser plusieurs modèles d'IA dans un seul outil ?",
          answer:
            "Oui. WonkaChat laisse votre organisation choisir le modèle adapté à ses besoins et à ses exigences de sécurité : modèles hébergés dans l'UE inclus dans la licence, ou votre propre clé API avec la facturation de votre fournisseur. Vous n'êtes pas enfermé dans une seule famille de modèles.",
        },
      ],
    },
    related: {
      heading: "Pour aller plus loin",
      links: [
        {
          label: "ChatGPT entreprise",
          href: "/fr/chatgpt-entreprise",
          description: "WonkaChat face à ChatGPT Business, critère par critère.",
        },
        {
          label: "Wonka AI vs ChatGPT Enterprise",
          href: "/fr/vs/wonka-ai-vs-chatgpt-enterprise",
          description: "Le comparatif détaillé pour les grandes organisations.",
        },
        {
          label: "Choisir son modèle d'IA",
          href: "/fr/blog/fr-choisir-modele-ia",
          description: "Comment raisonner le choix d'un modèle pour l'entreprise.",
        },
        {
          label: "Quand Microsoft Copilot ne suffit plus",
          href: "/fr/blog/fr-microsoft-copilot-insuffisant",
          description: "Les limites de Copilot hors de l'écosystème Microsoft.",
        },
        {
          label: "Qu'est-ce qu'un LLM ?",
          href: "/fr/apprendre/llm",
          description: "Les grands modèles de langage expliqués simplement.",
        },
        {
          label: "LLM privé ou LLM public",
          href: "/fr/vs/private-llm-vs-public-llm",
          description: "Ce qui change quand l'IA tourne en privé.",
        },
        {
          label: "Tarifs WonkaChat",
          href: "/fr/pricing",
          description: "Licences par utilisateur et essai gratuit de 7 jours.",
        },
        { label: "Shadow AI : définition et risques", href: "/fr/shadow-ai", description: "Reprendre la main sur les usages d'IA non encadrés, sans les interdire." },
        { label: "Charte IA entreprise", href: "/fr/charte-ia-entreprise", description: "Des règles d'usage claires, appliquées par vos outils." },
      ],
    },
    cta: {
      heading: "Ne pariez pas sur un seul modèle d'IA.",
      body: "Testez WonkaChat 7 jours, sans carte, sur un vrai cas d'usage : plusieurs modèles, vos outils connectés, hébergement dans l'UE. Ou réservez un appel de 30 minutes avec notre équipe.",
    },
  },
};
