import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * /fr/chatbot-entreprise — internal company chatbot (WonkaChat) connected to
 * company knowledge and tools. French only (France market).
 * Distinct from /fr/chatgpt-entreprise (ChatGPT comparison lives there) and
 * /fr/charte-ia-entreprise (governance guide).
 */
export const CHATBOT_ENTREPRISE_COPY: Partial<Record<Locale, LandingCopy>> = {
  fr: {
    meetingContext: "default",
    seo: {
      title: "Chatbot entreprise : assistant IA interne sécurisé | Wonka",
      description:
        "Chatbot entreprise connecté à SharePoint, Outlook, Teams et Odoo, avec droits d'accès et hébergement UE. Démo sur un vrai cas d'usage.",
    },
    breadcrumb: "Chatbot entreprise",
    schema: {
      serviceName: "WonkaChat, chatbot entreprise interne",
      serviceType: "Chatbot IA interne et espace de travail IA pour entreprises",
    },
    hero: {
      eyebrow: "Chatbot interne · WonkaChat",
      title: "Un chatbot entreprise qui connaît vos documents et vos outils.",
      subtitle:
        "WonkaChat donne à chaque collaborateur un assistant IA interne branché sur SharePoint, Outlook, Teams ou Odoo. Les réponses viennent de vos propres documents, chacun ne voit que ce qu'il a le droit de voir, et les données restent hébergées dans l'UE.",
      primaryCta: { label: "Contacter l'équipe commerciale", href: "meeting" },
      secondaryCta: { label: "Réserver une démo", href: "meeting" },
      facts: [
        ["Démo", "Sur un vrai cas d'usage"],
        ["Hébergement", "Azure West Europe (Microsoft Irlande)"],
        ["Sécurité", "ISO 27001 · RGPD · NIS 2"],
        ["Connecteurs", "SharePoint, Outlook, Teams, Odoo…"],
      ],
    },
    answer: {
      heading: "Qu'est-ce qu'un chatbot entreprise ?",
      paragraphs: [
        "Un chatbot entreprise est un assistant IA réservé à vos collaborateurs, connecté aux documents, e-mails et logiciels de l'entreprise. Il répond aux questions à partir de vos propres sources, pas d'internet, respecte les droits d'accès de chacun et peut préparer des actions dans vos outils, sous contrôle de l'entreprise.",
        "Il ne faut pas le confondre avec le chatbot de FAQ affiché sur un site web. Celui-ci répond à des clients anonymes sur un périmètre figé : horaires, suivi de commande, questions fréquentes. Un chatbot interne entreprise travaille pour vos équipes, sur des informations confidentielles : procédures, contrats, données ERP, historique client. Les exigences ne sont pas les mêmes : identification des utilisateurs, permissions, traçabilité et hébergement maîtrisé.",
        "WonkaChat est construit pour ce second usage. C'est un espace de travail IA privé : un chat familier avec le contexte de votre entreprise intégré, des connecteurs vers vos systèmes, des agents IA pour des tâches précises et une gouvernance centralisée. Vous choisissez le modèle d'IA parmi les principaux modèles hébergés en Europe, ou vous connectez le vôtre. Vous gérez les accès, les autorisations et les agents disponibles pour chaque utilisateur ou équipe.",
        "Côté sécurité, Wonka est certifié ISO 27001, conforme RGPD et NIS 2, et héberge WonkaChat par défaut dans Azure West Europe (Microsoft Irlande). Les données clients ne servent pas à entraîner des modèles d'IA publics. Pour le voir sur un vrai cas d'usage, réservez une démo avec notre équipe. Chez Itzu, 100 % des salariés disposent de leur propre WonkaChat, qui leur fait gagner plusieurs heures par semaine.",
      ],
    },
    benefits: {
      eyebrow: "Pourquoi WonkaChat",
      heading: "Un chatbot IA entreprise que votre RSSI peut valider",
      items: [
        {
          title: "Des réponses tirées de vos documents",
          body: "L'assistant s'appuie sur la connaissance de l'entreprise : documents SharePoint, procédures internes, données métier. Vos collaborateurs arrêtent de fouiller les dossiers partagés ou d'interrompre les deux personnes qui savent.",
        },
        {
          title: "Chacun voit ce qu'il a le droit de voir",
          body: "Vous gérez les accès, les autorisations et les agents disponibles par utilisateur et par équipe. Authentification unique via Azure AD / Entra ID, MFA disponible, contrôle d'accès par rôle et journaux d'audit.",
        },
        {
          title: "Hébergé dans l'UE, conforme RGPD",
          body: "Hébergement par défaut dans Azure West Europe (Microsoft Irlande), chiffrement au repos et en transit, accord de traitement des données (DPA) inclus. Vos données ne servent pas à entraîner des modèles d'IA publics.",
        },
        {
          title: "Le modèle d'IA de votre choix",
          body: "Vous n'êtes pas enfermé chez un fournisseur. Utilisez les principaux modèles hébergés en Europe, ou votre propre clé API avec la facturation de votre fournisseur, selon vos besoins et vos exigences de sécurité.",
        },
        {
          title: "Une validation humaine avant d'agir",
          body: "Quand l'assistant prépare une action dans vos outils, les étapes importantes peuvent être vérifiées avant exécution. L'IA fait le travail préparatoire, votre équipe garde la décision.",
        },
        {
          title: "Pensé pour tous, pas pour 12 experts",
          body: "Un chat simple, des agents et des prompts partagés par service, en français, néerlandais et anglais. Pas besoin de savoir « bien prompter » pour obtenir une réponse utile.",
        },
      ],
    },
    useCases: {
      eyebrow: "Cas d'usage",
      heading: "Ce que fait un assistant IA interne au quotidien",
      items: [
        {
          title: "Un chatbot sur vos documents internes",
          body: "Posez une question, l'assistant cherche dans vos documents et répond avec leur contenu, pas avec une généralité trouvée sur internet. C'est le principe du RAG : récupérer les bons passages avant de générer la réponse.",
          link: { label: "Comprendre le RAG", href: "/fr/apprendre/rag" },
        },
        {
          title: "Politiques RH et onboarding",
          body: "Congés, notes de frais, télétravail : les collaborateurs obtiennent une réponse issue de votre règlement interne, avec sa source. Les cas complexes restent transmis aux RH. Les nouveaux arrivants sont guidés pendant leurs premières semaines.",
          link: { label: "Connecter SharePoint", href: "/fr/integrations/sharepoint" },
        },
        {
          title: "Interroger votre ERP en langage courant",
          body: "Commandes ouvertes, marges, factures : WonkaChat interroge Odoo sans passer par les menus. Vos équipes demandent comme à un collègue, puis préparent l'étape suivante, par exemple créer une opportunité ou un bon de commande.",
          link: { label: "WonkaChat pour Odoo", href: "/fr/integrations/odoo" },
        },
        {
          title: "Support client : trier et préparer les réponses",
          body: "Le chatbot n'est pas face au client, il aide vos agents. Les demandes entrantes sont classées et routées, les réponses sont rédigées à partir de votre base de connaissances et vérifiées avant envoi. Chez N-allo (Engie), des agents IA ont réduit de 50 % le temps passé sur les e-mails de support, pour une équipe de plus de 70 personnes.",
          link: { label: "Voir les cas clients", href: "/fr/cas-clients" },
        },
        {
          title: "E-mails, réunions et documents",
          body: "Avec Outlook et Microsoft Teams connectés, l'assistant travaille là où vos échanges ont lieu. Il rédige et reformule, transforme un résumé en présentation PowerPoint, produit le tableur Excel demandé ou corrige un document Word.",
          link: { label: "Connecter Outlook", href: "/fr/integrations/outlook" },
        },
        {
          title: "Des agents IA pour les tâches récurrentes",
          body: "Au-delà du chat, créez des agents qui connaissent un rôle ou un workflow précis : suivi commercial, contrôles financiers, synthèses support. Partagez-les avec le service concerné.",
          link: { label: "Agents IA pour l'entreprise", href: "/fr/agent-ia-entreprise" },
        },
      ],
    },
    process: {
      eyebrow: "Mise en place",
      heading: "Déployer votre chatbot interne entreprise en cinq étapes",
      steps: [
        {
          title: "Réservez une démo",
          body: "Un appel avec notre équipe pour voir l'espace de travail sur votre contexte. Choisissez un vrai cas d'usage : une procédure interne, une boîte support, un reporting.",
        },
        {
          title: "Connectez vos sources",
          body: "Branchez les outils où vivent vos données : SharePoint, Outlook, Teams, Odoo, mais aussi Salesforce, HubSpot, Google Drive, Jira ou Notion selon votre environnement.",
        },
        {
          title: "Fixez les règles",
          body: "Définissez qui a accès à quoi, quels modèles d'IA sont autorisés et quelles actions demandent une validation humaine. C'est ici que votre charte IA devient concrète.",
        },
        {
          title: "Déployez par équipe",
          body: "Commencez par un service, partagez les agents et prompts qui fonctionnent, puis étendez. L'adoption se joue sur l'usage quotidien, pas sur le jour du lancement.",
        },
        {
          title: "Allez plus loin si besoin",
          body: "Pour un workflow que l'outil standard ne couvre pas, Wonka Build conçoit des agents sur mesure. Pour cadrer la stratégie d'abord, Start AI vous remet une feuille de route.",
        },
      ],
    },
    comparison: {
      eyebrow: "FAQ client ou assistant interne",
      heading: "Chatbot de site web ou chatbot interne : deux outils différents",
      columns: ["", "Chatbot FAQ sur votre site", "Chatbot interne (WonkaChat)"],
      rows: [
        ["Utilisateurs", "Visiteurs anonymes", "Collaborateurs identifiés (SSO)"],
        ["Sources", "Une FAQ publique", "Vos documents, e-mails et logiciels métier"],
        ["Données traitées", "Informations publiques", "Informations confidentielles, avec droits d'accès"],
        ["Actions", "Répondre ou rediriger", "Préparer des actions dans vos outils, avec validation humaine"],
        ["Gouvernance", "Limitée", "Modèles approuvés, contrôle d'accès, journaux d'audit"],
      ],
      footnote:
        "WonkaChat est un espace de travail IA pour vos équipes. Si votre besoin se limite à un widget de FAQ sur votre site, dites-le-nous dès le premier échange : ce n'est pas le cœur de notre offre.",
    },
    faq: {
      heading: "Questions fréquentes sur le chatbot entreprise",
      items: [
        {
          question: "Quelle différence entre un chatbot entreprise et un chatbot de service client ?",
          answer:
            "Un chatbot de service client répond aux visiteurs de votre site sur un périmètre public. Un chatbot entreprise interne sert vos collaborateurs : il accède à des documents et des données confidentiels, avec des droits par utilisateur, et peut préparer des actions dans vos outils. WonkaChat se concentre sur ce second usage, y compris pour aider vos équipes support à traiter les demandes clients.",
        },
        {
          question: "Peut-on créer un chatbot sur nos documents internes ?",
          answer:
            "Oui. WonkaChat se connecte à vos sources, par exemple SharePoint, et répond à partir de vos propres documents plutôt que d'internet. Vous n'avez pas à entraîner un modèle : l'assistant retrouve les passages pertinents et s'en sert pour répondre. Notre guide sur le RAG explique ce mécanisme en détail.",
        },
        {
          question: "Un chatbot IA en entreprise est-il compatible avec le RGPD ?",
          answer:
            "Cela dépend de l'outil et de la façon dont vous l'utilisez. WonkaChat est conforme RGPD, hébergé par défaut dans Azure West Europe (Microsoft Irlande), avec un accord de traitement des données (DPA) inclus. Les données clients ne servent pas à entraîner des modèles d'IA publics. Faites valider votre usage par votre DPO, comme pour tout traitement de données personnelles.",
        },
        {
          question: "Comment contrôler ce que chaque collaborateur peut voir ?",
          answer:
            "Vous gérez les accès, les autorisations et les agents disponibles pour chaque utilisateur ou équipe. La connexion passe par l'authentification unique Azure AD / Entra ID, avec MFA disponible. Le contrôle d'accès par rôle et les journaux d'audit donnent à votre DSI et à votre RSSI la visibilité qui leur manque avec des comptes IA personnels.",
        },
        {
          question: "Quel modèle d'IA utilise le chatbot ?",
          answer:
            "Celui que vous choisissez. WonkaChat donne accès aux principaux modèles d'IA hébergés en Europe, sans facture à l'usage dans la formule avec modèles inclus. Vous pouvez aussi connecter votre propre clé API et garder la facturation de votre fournisseur. Vous n'êtes pas lié à un seul modèle.",
        },
        {
          question: "Combien coûte un chatbot entreprise comme WonkaChat ?",
          answer:
            "WonkaChat est facturé par utilisateur et par mois, avec un tarif dégressif selon le nombre de licences et 20 % de réduction en facturation annuelle. Le détail pour votre taille d'équipe est sur notre page tarifs.",
        },
        {
          question: "Peut-on héberger le chatbot dans notre propre environnement ?",
          answer:
            "Par défaut, WonkaChat est hébergé dans Azure West Europe (Microsoft Irlande) ; ce n'est pas un déploiement sur site sauf mention contractuelle. Pour les grandes organisations, l'offre Enterprise permet un cloud géré, votre propre cloud ou un déploiement on-premise, adapté à vos exigences de sécurité.",
        },
        {
          question: "WonkaChat remplace-t-il ChatGPT ou Copilot ?",
          answer:
            "WonkaChat est différent : c'est un espace de travail IA d'entreprise connecté à vos outils, vos agents, vos workflows et votre gouvernance. Nous détaillons la comparaison avec ChatGPT sur notre page ChatGPT entreprise, et les limites de Copilot dans un article dédié.",
        },
      ],
    },
    related: {
      heading: "Pour aller plus loin",
      links: [
        {
          label: "Chat IA sécurisé",
          href: "/fr/workspace/ai-chat",
          description: "Les fonctionnalités du chat IA de Wonka, en détail.",
        },
        {
          label: "WonkaChat",
          href: "/fr/wonka-chat",
          description: "L'espace de travail IA pour toute votre organisation.",
        },
        {
          label: "ChatGPT entreprise",
          href: "/fr/chatgpt-entreprise",
          description: "Ce que change une alternative encadrée à ChatGPT.",
        },
        {
          label: "Qu'est-ce que le RAG ?",
          href: "/fr/apprendre/rag",
          description: "Comment une IA répond à partir de vos documents.",
        },
        {
          label: "Charte IA entreprise",
          href: "/fr/charte-ia-entreprise",
          description: "Les règles à fixer avant de déployer un assistant IA.",
        },
        {
          label: "Intégrations",
          href: "/fr/integrations",
          description: "SharePoint, Outlook, Teams, Odoo et les autres connecteurs.",
        },
        {
          label: "Tarifs",
          href: "/fr/pricing",
          description: "Prix par utilisateur, modèles IA inclus.",
        },
        { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      ],
    },
    cta: {
      heading: "Voyez votre chatbot entreprise sur un vrai cas d'usage.",
      body: "Réservez une démo avec notre équipe : nous vous montrons WonkaChat connecté à vos outils, sur un cas concret de votre entreprise.",
    },
  },
};
