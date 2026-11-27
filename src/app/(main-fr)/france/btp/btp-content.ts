export type BtpAgent = {
  name: string;
  input: string;
  output: string;
  check: string;
};

export type BtpPhase = {
  id: string;
  label: string;
  intro: string;
  agents: readonly BtpAgent[];
};

export const btpPhases: readonly BtpPhase[] = [
  {
    id: "appel-offres",
    label: "Appel d’offres",
    intro:
      "Le dossier de consultation arrive. Vos équipes partent d’une lecture structurée au lieu d’une page blanche.",
    agents: [
      {
        name: "Analyseur d’appel d’offres",
        input: "CCTP, plans, DPGF, règlement de consultation",
        output: "Prescriptions, points de vigilance et questions à poser, avec l’article source",
        check: "Les écarts à chiffrer et les points à clarifier",
      },
      {
        name: "Mémoire technique",
        input: "Vos références chantier, moyens et méthodes",
        output: "Une trame de mémoire alignée sur les critères du règlement",
        check: "Le ton, les engagements et les moyens annoncés",
      },
      {
        name: "Comparatif fournisseurs",
        input: "Offres de fournisseurs et sous-traitants",
        output: "Un tableau comparatif avec les écarts de périmètre signalés",
        check: "Le choix du fournisseur et la négociation",
      },
    ],
  },
  {
    id: "preparation",
    label: "Préparation",
    intro:
      "Le marché est signé. Les pièces d’exécution et les consultations se préparent plus vite.",
    agents: [
      {
        name: "Préparation du planning",
        input: "Planning marché, contraintes du site, notes de réunion",
        output: "Un phasage par lot avec les dépendances et les manques signalés",
        check: "Les durées, les enchaînements et les priorités",
      },
      {
        name: "Analyse de risques",
        input: "Mode opératoire, plan d’installation, DUER",
        output: "Un brouillon d’analyse de risques et les mesures à confirmer",
        check: "Les mesures retenues avant diffusion",
      },
      {
        name: "Consultation sous-traitants",
        input: "Extrait du CCTP et quantités du lot",
        output: "Un dossier de consultation et une demande de prix à relire",
        check: "Le périmètre envoyé et la liste des entreprises",
      },
    ],
  },
  {
    id: "execution",
    label: "Exécution",
    intro:
      "Le chantier tourne. Les comptes rendus et les suivis ne s’écrivent plus le soir.",
    agents: [
      {
        name: "Rédacteur de compte rendu",
        input: "Notes de visite, photos, mémos vocaux",
        output: "Un compte rendu structuré par lot, avec les actions et les responsables",
        check: "Le contenu avant diffusion aux intervenants",
      },
      {
        name: "Suivi de chantier",
        input: "Comptes rendus, planning, échanges avec les lots",
        output: "Les actions de la semaine, classées par lot, avec la pièce source",
        check: "Les priorités et les relances",
      },
      {
        name: "Réponse aux devis",
        input: "Demande client ou maître d’œuvre",
        output: "Une trame de réponse et la liste des éléments à confirmer",
        check: "Le prix, les délais et l’envoi",
      },
    ],
  },
  {
    id: "reception",
    label: "Réception",
    intro:
      "Les travaux se terminent. Les dossiers de fin de chantier se constituent au fil de l’eau.",
    agents: [
      {
        name: "Constitution du DOE",
        input: "Fiches techniques, plans, PV et notices",
        output: "Un sommaire de DOE avec les pièces présentes et les manques",
        check: "La complétude avant remise au maître d’ouvrage",
      },
      {
        name: "Suivi des réserves",
        input: "PV de réception et photos",
        output: "Une liste de réserves par lot, avec responsable et échéance",
        check: "Les levées de réserves",
      },
      {
        name: "Contrôle des factures",
        input: "Factures fournisseurs, bons de commande, situations",
        output: "Les écarts entre commandé, livré et facturé",
        check: "Le bon à payer",
      },
    ],
  },
];

export const btpPains = [
  ["Le CCTP de 300 pages lu en diagonale", "Une lecture structurée, article par article, avec les points à clarifier"],
  ["Le compte rendu tapé le soir", "Un brouillon préparé depuis vos notes, photos et mémos vocaux"],
  ["Les offres fournisseurs à comparer ligne à ligne", "Un comparatif prêt à arbitrer, écarts de périmètre signalés"],
  ["Le DOE rassemblé dans l’urgence à la réception", "Un dossier qui se constitue au fil du chantier, manques visibles"],
] as const;

export const btpTeams = [
  ["Direction", "Une vue claire des points à arbitrer, chantier par chantier."],
  ["Travaux", "Comptes rendus, suivis et réserves préparés à partir du terrain."],
  ["Études de prix", "Des dossiers de consultation lus sans rater une prescription."],
  ["QSE", "Analyses de risques, rapports et plans d’action à relire."],
  ["Achats", "Comparatifs fournisseurs et consultations prêts à arbitrer."],
  ["Finance", "Factures, situations et écarts rapprochés avant validation."],
  ["Ressources humaines", "Offres d’emploi, accueil des nouveaux et questions courantes."],
  ["Commercial", "Réponses aux demandes, relances et préparation de rendez-vous."],
] as const;

export const btpLibrary = [
  "Mémoire technique",
  "Situations de travaux",
  "Ordres de service",
  "Avenants",
  "PPSPS",
  "Plan d’installation de chantier",
  "Rapport photo de visite",
  "Synthèse de réunion de chantier",
  "Relance des sous-traitants",
  "Recherche DTU et normes",
  "Suivi des approvisionnements",
  "Fiches de non-conformité",
  "Causeries sécurité",
  "Rapport QSE mensuel",
  "Rapprochement des factures",
  "Suivi de trésorerie chantier",
  "Offres d’emploi",
  "Accueil des nouveaux",
  "Réponse aux appels d’offres privés",
  "Préparation de rendez-vous client",
  "Veille marchés publics",
  "Synthèse de contrat",
  "Courriers et mises en demeure",
  "Tableaux de bord de direction",
] as const;

export const btpComparison = {
  columns: ["Wonka Chat", "IA grand public", "Logiciel de gestion BTP"],
  rows: [
    ["Agents préparés pour vos tâches BTP", "yes", "no", "partial"],
    ["Sources citées et vérifiables", "yes", "partial", "no"],
    ["Validation humaine avant toute action", "yes", "no", "partial"],
    ["Connecté à vos outils actuels", "yes", "no", "partial"],
    ["Données hébergées en Europe, ISO 27001", "yes", "partial", "partial"],
    ["Déploiement accompagné dans vos équipes", "yes", "no", "partial"],
  ],
} as const;

export const btpFaqs = [
  [
    "Que fait l’IA, et que gardons-nous sous contrôle ?",
    "Les agents lisent vos pièces et préparent des brouillons : synthèses, comptes rendus, comparatifs, listes d’actions. Chaque point renvoie à sa source. Rien n’est envoyé, validé ou modifié dans vos outils sans l’action d’une personne habilitée.",
  ],
  [
    "Combien d’agents pouvons-nous utiliser ?",
    "Autant que vos équipes en ont besoin. Vous partez des agents prêts à l’emploi, vous les adaptez à vos règles, et vous en créez de nouveaux quand un besoin apparaît. Les agents se partagent entre collègues et s’ajoutent à tout moment.",
  ],
  [
    "Pouvons-nous créer nos propres agents ?",
    "Oui. Vous décrivez la tâche, vous donnez vos documents de référence et vos règles métier, puis vous partagez l’agent avec votre équipe. Dans le programme accompagné, nous construisons avec vous les premiers agents sur mesure.",
  ],
  [
    "Quels modèles d’IA sont disponibles ?",
    "Wonka Chat donne accès aux principaux modèles du marché : OpenAI, Anthropic, Google, Mistral et d’autres. Vous choisissez le modèle adapté à chaque tâche, ou vous laissez Wonka choisir automatiquement. Les nouveaux modèles sont ajoutés au fil de leur sortie.",
  ],
  [
    "Avec quels outils Wonka se connecte-t-il ?",
    "Plus de cent connecteurs sont disponibles : messagerie, stockage de documents, tableurs, CRM, gestion de projet, ERP. Les logiciels BTP comme Obat, Sage, ProGBat, Costructor ou Graneet en font aussi partie. Si un connecteur manque, nous l’ajoutons ou cadrons l’intégration avec vous.",
  ],
  [
    "Où sont hébergées nos données ?",
    "Wonka est certifié ISO 27001, conforme au RGPD et à NIS 2. Les données sont hébergées par défaut sur Microsoft Azure, région Europe de l’Ouest (Irlande). Les accès et les permissions sont définis avec votre entreprise.",
  ],
  [
    "Je n’ai déjà pas le temps. Qui prépare les agents ?",
    "Dans le programme entreprise, nous identifions les tâches avec vos services et accompagnons la préparation des usages convenus. Vos équipes apportent leurs documents et leurs règles métier : elles n’ont pas à inventer seules leur stratégie IA.",
  ],
  [
    "Mon entreprise compte moins de 100 personnes : puis-je utiliser Wonka ?",
    "Oui. Wonka Chat peut s’utiliser individuellement. Le programme accompagné présenté ici s’adresse aux entreprises de 100 collaborateurs et plus. Le nombre de licences, la durée d’engagement et le périmètre sont définis ensemble avant signature.",
  ],
  [
    "Mes équipes doivent-elles changer de logiciels ?",
    "Non. Wonka complète vos outils, y compris votre logiciel de gestion BTP. Pour les logiciels métier, nous vérifions le connecteur ou cadrons l’intégration avec vos équipes.",
  ],
  [
    "Qu’inclut l’accompagnement offert ?",
    "Le pré-kick-off, le kick-off, les échanges avec vos services, la cartographie des cas d’usage, un plan d’action priorisé et l’accompagnement au déploiement convenu. Nous accompagnons 5 entreprises par mois ; une fois ces places prises, les nouvelles demandes passent au mois suivant.",
  ],
] as const;
