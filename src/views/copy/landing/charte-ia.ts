import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * /fr/charte-ia-entreprise — practical guide on writing a company AI charter
 * (informational intent), then how Wonka helps (Start AI policy framework +
 * WonkaChat enforcing the rules). French only (France market). Not legal advice.
 */
export const CHARTE_IA_COPY: Partial<Record<Locale, LandingCopy>> = {
  fr: {
    meetingContext: "default",
    seo: {
      title: "Charte IA entreprise : guide pratique en 5 étapes | Wonka",
      description:
        "Charte IA entreprise : outils autorisés, données interdites, validation humaine, AI Act. Le guide pour rédiger la vôtre. Parlez-en avec nos experts.",
    },
    breadcrumb: "Charte IA entreprise",
    schema: {
      serviceName: "Politique IA et cadre de gouvernance",
      serviceType: "Accompagnement à la gouvernance et à la charte d'utilisation de l'IA",
    },
    hero: {
      eyebrow: "Guide · Gouvernance IA",
      title: "Charte IA entreprise : des règles claires, que vos outils appliquent.",
      subtitle:
        "Vos équipes utilisent déjà l'IA, avec ou sans règles. Ce guide détaille ce que doit contenir une charte d'utilisation de l'IA, comment la rédiger en cinq étapes, et comment la faire respecter autrement que par un PDF sur l'intranet.",
      primaryCta: { label: "Réserver un appel de 30 minutes", href: "meeting" },
      secondaryCta: { label: "Découvrir Start AI", href: "/fr/start-ai" },
      facts: [
        ["AI Act, article 4", "Maîtrise de l'IA exigée depuis le 2 février 2025"],
        ["Start AI", "Politique IA & cadre de gouvernance inclus"],
        ["Expérience", "+150 programmes Start AI"],
        ["Sécurité", "ISO 27001 · RGPD · NIS 2"],
      ],
    },
    answer: {
      heading: "Qu'est-ce qu'une charte IA entreprise ?",
      paragraphs: [
        "Une charte IA entreprise est un document interne qui fixe comment les collaborateurs peuvent utiliser l'intelligence artificielle : quels outils sont autorisés, quelles données ne doivent jamais y être saisies, quand une validation humaine est obligatoire et qui est responsable de quoi. Elle transforme des usages individuels en règles communes.",
        "Le besoin est rarement théorique. Dans beaucoup d'entreprises, l'IA est déjà là sous forme de comptes ChatGPT personnels : c'est le shadow AI. Le RSSI n'a aucune visibilité sur ce qui sort de l'entreprise, et les collaborateurs qui n'osent pas s'y mettre restent à l'écart. Si chacun utilise l'IA à sa manière, l'organisation perd le contrôle. Si personne ne l'utilise, elle perd son élan.",
        "Le cadre réglementaire pousse dans le même sens. Le règlement européen sur l'IA (AI Act) est entré en vigueur le 1er août 2024. Son article 4, applicable depuis le 2 février 2025, impose aux fournisseurs et aux déployeurs de systèmes d'IA de prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA chez leur personnel. Une charte, accompagnée d'une formation, est une façon concrète de structurer ces mesures.",
        "Reste le point faible de la plupart des chartes : elles restent sur papier. Wonka intervient des deux côtés. Avec Start AI, nous vous remettons une politique IA et un cadre de gouvernance adaptés à votre organisation. Avec WonkaChat, ces règles deviennent techniques : outils et modèles approuvés, droits d'accès par équipe, hébergement dans l'UE, journaux d'audit et validation humaine avant les actions importantes. La règle écrite et la règle appliquée sont enfin les mêmes.",
      ],
    },
    benefits: {
      eyebrow: "Pourquoi une charte",
      heading: "Ce qu'une politique IA entreprise change concrètement",
      items: [
        {
          title: "Sortir du shadow AI",
          body: "Interdire sans proposer d'alternative ne fonctionne pas : les usages passent dans l'ombre. Une charte qui désigne un outil autorisé ramène l'IA dans un cadre visible, que la DSI peut superviser.",
        },
        {
          title: "Protéger les données sensibles",
          body: "Données personnelles, contrats, chiffres financiers, secrets industriels : la charte dit noir sur blanc ce qui ne doit jamais être collé dans une IA publique. C'est le lien direct entre IA et RGPD.",
        },
        {
          title: "Donner le feu vert, pas seulement des interdits",
          body: "Beaucoup de collaborateurs n'utilisent pas l'IA parce qu'ils ignorent ce qui est permis. Une bonne charte liste aussi les usages encouragés, et lève ce frein.",
        },
        {
          title: "Structurer la maîtrise de l'IA",
          body: "L'article 4 de l'AI Act demande des mesures pour que votre personnel maîtrise suffisamment l'IA. Une charte associée à un parcours de formation montre ce que vous avez mis en place.",
        },
        {
          title: "Clarifier les responsabilités",
          body: "Qui valide un nouvel outil ? Qui répond d'un contenu généré par IA envoyé à un client ? La charte attribue les rôles entre direction, DSI, RSSI, DPO et métiers.",
        },
        {
          title: "Accélérer l'adoption",
          body: "Des règles communes rassurent. Quand chacun sait ce qui est autorisé et avec quel outil, l'IA quitte le cercle des pionniers et devient utile pour toute l'équipe.",
        },
      ],
    },
    useCases: {
      eyebrow: "Contenu de la charte",
      heading: "Les 6 rubriques d'une bonne charte d'utilisation de l'IA",
      items: [
        {
          title: "1. Les outils autorisés",
          body: "Listez les outils d'IA approuvés, les modèles autorisés et la procédure pour en faire valider un nouveau. Précisez le statut des comptes personnels : tolérés pour quels usages, ou interdits pour le travail.",
          link: { label: "Un chat IA sécurisé pour vos équipes", href: "/fr/workspace/ai-chat" },
        },
        {
          title: "2. La classification des données",
          body: "Définissez des niveaux (public, interne, confidentiel, données personnelles) et, pour chacun, les outils qui peuvent les traiter. Ce qui ne doit jamais être saisi dans une IA publique doit être explicite, avec des exemples.",
        },
        {
          title: "3. La validation humaine",
          body: "Un contenu généré par IA est un brouillon tant qu'une personne ne l'a pas relu. Fixez les cas où la relecture est obligatoire : e-mails clients, documents contractuels, décisions RH, actions dans vos logiciels.",
          link: { label: "Des agents IA sous contrôle humain", href: "/fr/agent-ia-entreprise" },
        },
        {
          title: "4. La transparence",
          body: "Indiquez quand et comment signaler qu'un contenu a été produit avec l'IA, en interne comme vis-à-vis des clients et partenaires. Les règles de propriété intellectuelle et de citation des sources ont leur place ici.",
        },
        {
          title: "5. Les rôles et responsabilités",
          body: "Nommez qui porte la charte, qui arbitre les demandes d'outils, qui traite les incidents et à qui un collaborateur s'adresse en cas de doute. Sans responsable désigné, une charte ne vit pas.",
        },
        {
          title: "6. La formation et la révision",
          body: "Prévoyez comment chaque collaborateur est formé, pas seulement informé, et à quel rythme la charte est revue. Les outils évoluent vite : une charte figée devient obsolète en quelques mois.",
          link: { label: "Former vos équipes à l'IA", href: "/fr/acculturation-ia" },
        },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "Rédiger votre charte IA en 5 étapes",
      steps: [
        {
          title: "Faites l'état des lieux des usages",
          body: "Qui utilise quoi, pour quelles tâches, avec quelles données ? Sondez les équipes sans jugement : l'objectif est de cartographier le shadow AI, pas de sanctionner.",
        },
        {
          title: "Classez vos données et fixez les interdits",
          body: "Avec le RSSI et le DPO, définissez les niveaux de sensibilité et ce que chaque outil peut traiter. C'est la partie de la charte qui protège le plus.",
        },
        {
          title: "Choisissez les outils autorisés",
          body: "Donnez une alternative crédible aux comptes personnels : un outil approuvé, hébergé dans un cadre que vous maîtrisez, connecté aux documents dont les équipes ont vraiment besoin.",
        },
        {
          title: "Formez et diffusez",
          body: "Une charte que personne n'a lue ne sert à rien. Présentez-la lors d'un atelier pratique, avec des exemples d'usages autorisés et interdits, et intégrez-la à l'onboarding.",
        },
        {
          title: "Appliquez dans l'outil et révisez",
          body: "Traduisez les règles en paramètres : droits d'accès, modèles autorisés, validations obligatoires, journaux d'audit. Puis fixez une date de revue et mettez la charte à jour.",
        },
      ],
    },
    comparison: {
      eyebrow: "Du papier à la pratique",
      heading: "Gouvernance IA : une charte sur papier ou appliquée dans l'outil",
      columns: ["Règle de la charte", "Si elle reste sur papier", "Avec WonkaChat"],
      rows: [
        ["Outils et modèles autorisés", "Chacun garde son compte personnel", "Un espace de travail commun, modèles approuvés par l'entreprise"],
        ["Accès aux données", "Dépend de la vigilance de chacun", "Droits d'accès par utilisateur et par équipe, SSO Entra ID"],
        ["Hébergement", "Inconnu pour les outils personnels", "Azure West Europe (Microsoft Irlande) par défaut"],
        ["Validation humaine", "Une recommandation", "Actions importantes vérifiées avant exécution"],
        ["Traçabilité", "Aucune", "Journaux d'audit et contrôle d'accès par rôle"],
      ],
    },
    faq: {
      heading: "Questions fréquentes sur la charte IA en entreprise",
      items: [
        {
          question: "Une charte IA est-elle obligatoire en entreprise ?",
          answer:
            "L'AI Act n'impose pas un document intitulé « charte IA ». En revanche, son article 4, applicable depuis le 2 février 2025, oblige les entreprises qui déploient des systèmes d'IA à prendre des mesures pour assurer une maîtrise suffisante de l'IA par leur personnel. Une charte associée à une formation est l'une des façons les plus simples de structurer et de documenter ces mesures.",
        },
        {
          question: "Que mettre dans une charte d'utilisation de l'IA ?",
          answer:
            "Au minimum : les outils et modèles autorisés, la classification des données et ce qui ne doit jamais être saisi, les cas où une validation humaine est obligatoire, les règles de transparence, les rôles et responsabilités, et le dispositif de formation et de révision. Restez court et concret : une charte de deux pages lue par tous vaut mieux qu'un document de trente pages que personne n'ouvre.",
        },
        {
          question: "Quelles règles d'usage de ChatGPT en entreprise prévoir ?",
          answer:
            "Précisez si les comptes personnels sont autorisés et pour quoi, interdisez d'y coller des données confidentielles ou personnelles, et exigez une relecture de tout contenu envoyé à l'extérieur. Le plus efficace reste de proposer un outil approuvé et encadré. Notre page ChatGPT entreprise compare les options.",
        },
        {
          question: "IA et RGPD : quelles données ne jamais saisir dans une IA publique ?",
          answer:
            "Toute donnée personnelle de clients, de salariés ou de candidats, ainsi que les informations confidentielles : contrats, chiffres non publiés, données de santé, codes d'accès, secrets de fabrication. La charte doit le dire avec des exemples concrets issus de vos métiers, et désigner l'outil à utiliser à la place, hébergé dans un cadre conforme au RGPD.",
        },
        {
          question: "Qu'est-ce que le shadow AI et comment une charte le limite-t-elle ?",
          answer:
            "Le shadow AI désigne l'usage d'outils d'IA non validés par l'entreprise, souvent des comptes personnels. Une charte le limite si elle s'accompagne d'une alternative réelle : un outil autorisé, aussi simple à utiliser, et connecté aux documents de l'entreprise. Interdire sans alternative déplace simplement le problème.",
        },
        {
          question: "Faut-il faire valider la charte IA par un juriste ?",
          answer:
            "Oui. Ce guide présente des bonnes pratiques et ne constitue pas un conseil juridique. Faites valider votre charte par votre DPO et votre conseil juridique, notamment pour ses liens avec le RGPD, le règlement intérieur et le droit du travail. Selon votre organisation, les représentants du personnel peuvent aussi devoir être consultés : vérifiez-le avec vos conseils.",
        },
        {
          question: "Wonka peut-il nous aider à rédiger notre charte IA ?",
          answer:
            "Oui, dans le cadre de Start AI. Parmi les livrables figurent une politique IA et un cadre de gouvernance adaptés à votre organisation, à côté de la feuille de route et des business cases prioritaires. Les programmes démarrent à 15 000 € et la plupart des équipes commencent dans les deux semaines suivant le premier appel.",
        },
      ],
    },
    related: {
      heading: "Pour aller plus loin",
      links: [
        {
          label: "Start AI",
          href: "/fr/start-ai",
          description: "Stratégie IA, feuille de route et politique IA sur mesure.",
        },
        {
          label: "Audit IA",
          href: "/fr/audit-ia",
          description: "Faire l'état des lieux de vos usages et de vos opportunités IA.",
        },
        {
          label: "Acculturation IA",
          href: "/fr/acculturation-ia",
          description: "Former vos équipes et développer la maîtrise de l'IA.",
        },
        {
          label: "Chatbot entreprise",
          href: "/fr/chatbot-entreprise",
          description: "Un assistant IA interne qui applique vos règles.",
        },
        {
          label: "ChatGPT entreprise",
          href: "/fr/chatgpt-entreprise",
          description: "Les options pour encadrer l'usage de ChatGPT au travail.",
        },
        {
          label: "LLM privé ou LLM public",
          href: "/fr/vs/private-llm-vs-public-llm",
          description: "Ce qui change pour vos données selon le modèle choisi.",
        },
        {
          label: "WonkaChat",
          href: "/fr/wonka-chat",
          description: "L'espace de travail IA gouverné pour toute l'organisation.",
        },
        { label: "Shadow AI : définition et risques", href: "/fr/shadow-ai", description: "Reprendre la main sur les usages d'IA non encadrés, sans les interdire." },
        { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      ],
    },
    cta: {
      heading: "Votre charte IA mérite mieux qu'un PDF.",
      body: "Réservez un appel de 30 minutes. Nous regardons où en sont vos usages de l'IA, ce que votre charte doit couvrir et comment la faire appliquer dans vos outils.",
    },
  },
};
