import type { Locale } from "@/i18n/config";
import type { FaqItem, UseCase } from "@/lib/types";
import type { CatalogIntegration, IntegrationCategory } from "./integrations-catalog";

interface CategoryCopy {
  label: string;
  tagline: (name: string) => string;
  description: (name: string, objects: string) => string;
  useCases: (name: string) => UseCase[];
}

const uc = (title: string, description: string, prompt: string): UseCase => ({ title, description, prompt });

const EN: Record<IntegrationCategory, CategoryCopy> = {
  crm: {
    label: "CRM",
    tagline: (n) => `AI agents that work inside your ${n} pipeline`,
    description: (n, o) => `Connect Wonka to ${n} so your team can search, summarize and update ${o} from one private AI workspace, with permissions and sources kept intact.`,
    useCases: (n) => [
      uc("Account briefings", "Get a sourced summary of any account before a call: open deals, recent interactions and next steps.", `Summarize everything we know about this client in ${n} before my call.`),
      uc("Pipeline follow-up", "Spot stalled opportunities and draft follow-ups based on the latest activity.", `Which deals in ${n} have had no activity in the last 14 days?`),
      uc("Record updates", "Log notes, update fields and create tasks straight from a conversation, with human approval.", `Log this meeting summary in ${n} and create a follow-up task.`),
    ],
  },
  erp: {
    label: "ERP",
    tagline: (n) => `Ask ${n} questions in plain language`,
    description: (n, o) => `Wonka connects to ${n} so teams can query and act on ${o} without digging through menus, while ERP permissions stay in control.`,
    useCases: (n) => [
      uc("Operational answers", "Get instant answers on orders, stock and invoices, with links back to the source records.", `What is the status of open sales orders for this customer in ${n}?`),
      uc("Finance follow-up", "List overdue invoices and prepare reminder drafts for review.", `Show overdue invoices in ${n} and draft a polite reminder for each.`),
      uc("Management reporting", "Turn ERP data into a weekly summary the team can actually read.", `Give me a weekly sales and margin summary from ${n}.`),
    ],
  },
  finance: {
    label: "Finance",
    tagline: (n) => `Private AI for your ${n} finance workflows`,
    description: (n, o) => `Connect Wonka to ${n} to look up and organize ${o}, prepare reconciliations and answer finance questions with sources attached.`,
    useCases: (n) => [
      uc("Spend overview", "Summarize spending by supplier, team or period in seconds.", `What did we spend per supplier last quarter according to ${n}?`),
      uc("Missing documents", "Find transactions without receipts or invoices and prepare follow-ups.", `Which transactions in ${n} are still missing a receipt?`),
      uc("Month-end support", "Prepare a checklist and draft commentary for the monthly close.", `Prepare a month-end summary from ${n} with the main variances.`),
    ],
  },
  project: {
    label: "Project management",
    tagline: (n) => `Keep ${n} projects moving with AI agents`,
    description: (n, o) => `Wonka connects to ${n} so teams can find, summarize and update ${o} from a single AI workspace instead of switching tools.`,
    useCases: (n) => [
      uc("Status updates", "Generate a clear project status from tasks, comments and due dates.", `Write a status update for this week based on ${n}.`),
      uc("Blocker detection", "Surface overdue or blocked work before it slows the team down.", `Which tasks in ${n} are overdue or blocked, and who owns them?`),
      uc("Task creation", "Turn meeting notes or emails into structured tasks, ready for approval.", `Create tasks in ${n} from these meeting notes.`),
    ],
  },
  knowledge: {
    label: "Knowledge",
    tagline: (n) => `Search and summarize your ${n} knowledge with AI`,
    description: (n, o) => `Connect Wonka to ${n} so every answer can cite your own ${o}, while existing access rights decide who sees what.`,
    useCases: (n) => [
      uc("Sourced answers", "Ask questions and get answers that link back to the exact document.", `What is our current policy on this topic? Use ${n} as the source.`),
      uc("Document summaries", "Summarize long documents and compare versions in seconds.", `Summarize the key points of the latest proposal in ${n}.`),
      uc("Draft from templates", "Reuse existing content to draft new documents faster.", `Draft a new offer based on similar documents in ${n}.`),
    ],
  },
  communication: {
    label: "Communication",
    tagline: (n) => `Bring AI agents into ${n}`,
    description: (n, o) => `Wonka connects to ${n} so teams can search, summarize and respond to ${o} faster, without copying conversations into a generic assistant.`,
    useCases: (n) => [
      uc("Catch-up summaries", "Get a short summary of what happened while you were away.", `Summarize the important messages in ${n} from the last two days.`),
      uc("Reply drafts", "Draft answers in your tone of voice, ready to review and send.", `Draft a reply to this customer question in ${n}.`),
      uc("Action extraction", "Pull decisions and to-dos out of long threads.", `List the decisions and open actions from this ${n} thread.`),
    ],
  },
  meetings: {
    label: "Meetings",
    tagline: (n) => `Turn ${n} into meeting intelligence`,
    description: (n, o) => `Connect Wonka to ${n} to work with ${o}, so preparation, notes and follow-ups happen automatically.`,
    useCases: (n) => [
      uc("Meeting prep", "Get a briefing with context and open points before every meeting.", `Prepare me for my next meeting using ${n}.`),
      uc("Recap and actions", "Turn conversations into a recap with decisions and owners.", `Write a recap with action items from my last meeting in ${n}.`),
      uc("Scheduling help", "Find the right slot and prepare invitations without back-and-forth.", `Find a 30-minute slot next week for this team in ${n}.`),
    ],
  },
  marketing: {
    label: "Marketing",
    tagline: (n) => `AI agents for your ${n} marketing`,
    description: (n, o) => `Wonka connects to ${n} so marketing teams can analyze and act on ${o} with AI, from reporting to content ideas.`,
    useCases: (n) => [
      uc("Performance reporting", "Summarize results and highlight what changed since last period.", `How did our ${n} results evolve compared to last month?`),
      uc("Content ideas", "Generate ideas and drafts based on what already performs well.", `Suggest five content ideas based on our best results in ${n}.`),
      uc("Audience insights", "Understand who engages and where to focus next.", `Which audience segments respond best in ${n}?`),
    ],
  },
  analytics: {
    label: "Analytics",
    tagline: (n) => `Ask your ${n} data questions in plain language`,
    description: (n, o) => `Connect Wonka to ${n} to explore ${o} conversationally and share clear takeaways with the team.`,
    useCases: (n) => [
      uc("Instant insights", "Ask a question and get the numbers plus a short explanation.", `What are the three biggest changes in ${n} this week?`),
      uc("Recurring reports", "Turn data into a weekly summary that is ready to share.", `Prepare a weekly report from ${n} for the management team.`),
      uc("Anomaly checks", "Spot unusual drops or spikes before they become problems.", `Are there any unusual trends in ${n} I should know about?`),
    ],
  },
  dev: {
    label: "Engineering",
    tagline: (n) => `AI agents that understand your ${n} work`,
    description: (n, o) => `Wonka connects to ${n} so engineering and product teams can search and summarize ${o} without leaving their workflow.`,
    useCases: (n) => [
      uc("Release notes", "Generate release notes from merged work and closed issues.", `Write release notes for this week's changes in ${n}.`),
      uc("Triage support", "Summarize new issues and suggest priority and owner.", `Summarize the new issues in ${n} and suggest priorities.`),
      uc("Status for stakeholders", "Translate technical progress into an update anyone can read.", `Explain the progress in ${n} for a non-technical audience.`),
    ],
  },
  support: {
    label: "Customer support",
    tagline: (n) => `Faster, sourced answers for your ${n} support team`,
    description: (n, o) => `Connect Wonka to ${n} so support teams can work with ${o} faster, with answers grounded in your own knowledge.`,
    useCases: (n) => [
      uc("Reply suggestions", "Draft answers based on past tickets and help articles.", `Draft a reply to this ${n} ticket using our help articles.`),
      uc("Ticket summaries", "Summarize long conversations before handing them over.", `Summarize this customer's history in ${n}.`),
      uc("Trend detection", "Find recurring questions and gaps in your documentation.", `What are the most common questions in ${n} this month?`),
    ],
  },
  hr: {
    label: "HR",
    tagline: (n) => `Private AI for your ${n} people workflows`,
    description: (n, o) => `Wonka connects to ${n} so HR teams can look up and organize ${o} securely, with strict access rights.`,
    useCases: (n) => [
      uc("Quick lookups", "Answer people questions without searching through screens.", `Who is on leave next week according to ${n}?`),
      uc("Candidate summaries", "Summarize profiles and feedback before a decision.", `Summarize the feedback on this candidate in ${n}.`),
      uc("Process support", "Prepare onboarding or offboarding checklists automatically.", `Prepare an onboarding checklist for a new hire from ${n}.`),
    ],
  },
  commerce: {
    label: "Commerce",
    tagline: (n) => `AI agents for your ${n} sales and payments`,
    description: (n, o) => `Connect Wonka to ${n} to analyze ${o} and answer customer and revenue questions in seconds.`,
    useCases: (n) => [
      uc("Revenue overview", "Get a sourced summary of sales and payments for any period.", `What was our revenue last month according to ${n}?`),
      uc("Customer lookups", "Find order or payment history for a customer instantly.", `Show the order and payment history for this customer in ${n}.`),
      uc("Issue follow-up", "List failed payments or open orders that need attention.", `Which payments or orders in ${n} need follow-up today?`),
    ],
  },
  design: {
    label: "Design",
    tagline: (n) => `Bring AI into your ${n} collaboration`,
    description: (n, o) => `Wonka connects to ${n} so teams can find, summarize and reuse ${o} in their daily work.`,
    useCases: (n) => [
      uc("Board summaries", "Turn a busy workspace into a short, structured summary.", `Summarize the main ideas from this ${n} board.`),
      uc("Find assets", "Locate the right design or template without browsing.", `Find our latest presentation templates in ${n}.`),
      uc("Workshop follow-up", "Turn workshop output into actions and owners.", `Create an action list from this ${n} workshop.`),
    ],
  },
  operations: {
    label: "Operations",
    tagline: (n) => `Automate ${n} operations with AI agents`,
    description: (n, o) => `Connect Wonka to ${n} to manage ${o} faster, with AI agents that prepare the work and people who approve it.`,
    useCases: (n) => [
      uc("Daily overview", "Start every day with a summary of what needs attention.", `What needs my attention today in ${n}?`),
      uc("Follow-up drafts", "Prepare messages and updates for the right people.", `Draft updates for the open items in ${n}.`),
      uc("Process checks", "Spot delays or missing steps before they become problems.", `Which items in ${n} are delayed or incomplete?`),
    ],
  },
};

const FR: Record<IntegrationCategory, CategoryCopy> = {
  crm: {
    label: "CRM",
    tagline: (n) => `Des agents IA qui travaillent dans votre pipeline ${n}`,
    description: (n, o) => `Connectez Wonka à ${n} pour rechercher, résumer et mettre à jour vos ${o} depuis un espace IA privé, en conservant les permissions et les sources.`,
    useCases: (n) => [
      uc("Briefings clients", "Obtenez un résumé sourcé de chaque compte avant un appel : opportunités, échanges récents et prochaines étapes.", `Résume tout ce que nous savons sur ce client dans ${n} avant mon appel.`),
      uc("Suivi du pipeline", "Repérez les opportunités bloquées et préparez des relances basées sur la dernière activité.", `Quelles affaires dans ${n} n'ont eu aucune activité depuis 14 jours ?`),
      uc("Mise à jour des fiches", "Ajoutez des notes, mettez à jour des champs et créez des tâches depuis une conversation, avec validation humaine.", `Ajoute ce compte rendu dans ${n} et crée une tâche de relance.`),
    ],
  },
  erp: {
    label: "ERP",
    tagline: (n) => `Interrogez ${n} en langage naturel`,
    description: (n, o) => `Wonka se connecte à ${n} pour consulter et exploiter vos ${o} sans naviguer dans les menus, en respectant les permissions de l'ERP.`,
    useCases: (n) => [
      uc("Réponses opérationnelles", "Obtenez des réponses immédiates sur les commandes, le stock et les factures, avec des liens vers les sources.", `Quel est le statut des commandes ouvertes de ce client dans ${n} ?`),
      uc("Suivi financier", "Listez les factures en retard et préparez des relances à valider.", `Montre les factures en retard dans ${n} et rédige une relance pour chacune.`),
      uc("Reporting de direction", "Transformez les données ERP en synthèse hebdomadaire lisible.", `Donne-moi une synthèse hebdomadaire des ventes et marges depuis ${n}.`),
    ],
  },
  finance: {
    label: "Finance",
    tagline: (n) => `Une IA privée pour vos workflows financiers ${n}`,
    description: (n, o) => `Connectez Wonka à ${n} pour retrouver et organiser vos ${o}, préparer les rapprochements et répondre aux questions financières avec les sources.`,
    useCases: (n) => [
      uc("Vue des dépenses", "Résumez les dépenses par fournisseur, équipe ou période en quelques secondes.", `Combien avons-nous dépensé par fournisseur le trimestre dernier selon ${n} ?`),
      uc("Justificatifs manquants", "Trouvez les transactions sans justificatif et préparez les relances.", `Quelles transactions dans ${n} n'ont pas encore de justificatif ?`),
      uc("Clôture mensuelle", "Préparez une checklist et un commentaire pour la clôture du mois.", `Prépare une synthèse de clôture depuis ${n} avec les principaux écarts.`),
    ],
  },
  project: {
    label: "Gestion de projet",
    tagline: (n) => `Faites avancer vos projets ${n} avec des agents IA`,
    description: (n, o) => `Wonka se connecte à ${n} pour retrouver, résumer et mettre à jour vos ${o} depuis un seul espace IA, sans changer d'outil.`,
    useCases: (n) => [
      uc("Points d'avancement", "Générez un statut clair à partir des tâches, commentaires et échéances.", `Rédige le point d'avancement de la semaine à partir de ${n}.`),
      uc("Détection des blocages", "Faites remonter le travail en retard ou bloqué avant qu'il ne ralentisse l'équipe.", `Quelles tâches dans ${n} sont en retard ou bloquées, et qui en est responsable ?`),
      uc("Création de tâches", "Transformez des notes de réunion ou des emails en tâches structurées, prêtes à valider.", `Crée des tâches dans ${n} à partir de ces notes de réunion.`),
    ],
  },
  knowledge: {
    label: "Connaissance",
    tagline: (n) => `Recherchez et résumez votre savoir ${n} avec l'IA`,
    description: (n, o) => `Connectez Wonka à ${n} pour que chaque réponse cite vos propres ${o}, tandis que les droits d'accès existants décident qui voit quoi.`,
    useCases: (n) => [
      uc("Réponses sourcées", "Posez vos questions et obtenez des réponses liées au document exact.", `Quelle est notre politique actuelle sur ce sujet ? Utilise ${n} comme source.`),
      uc("Résumés de documents", "Résumez de longs documents et comparez des versions en quelques secondes.", `Résume les points clés de la dernière proposition dans ${n}.`),
      uc("Rédaction à partir de modèles", "Réutilisez vos contenus existants pour rédiger plus vite.", `Rédige une nouvelle offre à partir de documents similaires dans ${n}.`),
    ],
  },
  communication: {
    label: "Communication",
    tagline: (n) => `Des agents IA directement dans ${n}`,
    description: (n, o) => `Wonka se connecte à ${n} pour rechercher, résumer et répondre plus vite à vos ${o}, sans copier les conversations dans un assistant générique.`,
    useCases: (n) => [
      uc("Résumés de rattrapage", "Obtenez un court résumé de ce qui s'est passé pendant votre absence.", `Résume les messages importants dans ${n} des deux derniers jours.`),
      uc("Brouillons de réponse", "Préparez des réponses dans votre ton, prêtes à relire et envoyer.", `Rédige une réponse à cette question client dans ${n}.`),
      uc("Extraction d'actions", "Faites ressortir décisions et to-dos des longues discussions.", `Liste les décisions et actions ouvertes de cette discussion ${n}.`),
    ],
  },
  meetings: {
    label: "Réunions",
    tagline: (n) => `Transformez ${n} en intelligence de réunion`,
    description: (n, o) => `Connectez Wonka à ${n} pour exploiter vos ${o} : la préparation, les notes et les relances se font automatiquement.`,
    useCases: (n) => [
      uc("Préparation", "Recevez un briefing avec le contexte et les points ouverts avant chaque réunion.", `Prépare ma prochaine réunion à partir de ${n}.`),
      uc("Compte rendu et actions", "Transformez les échanges en compte rendu avec décisions et responsables.", `Rédige un compte rendu avec actions de ma dernière réunion dans ${n}.`),
      uc("Aide à la planification", "Trouvez le bon créneau et préparez les invitations sans allers-retours.", `Trouve un créneau de 30 minutes la semaine prochaine pour cette équipe dans ${n}.`),
    ],
  },
  marketing: {
    label: "Marketing",
    tagline: (n) => `Des agents IA pour votre marketing ${n}`,
    description: (n, o) => `Wonka se connecte à ${n} pour que les équipes marketing analysent et exploitent leurs ${o} avec l'IA, du reporting aux idées de contenu.`,
    useCases: (n) => [
      uc("Reporting de performance", "Résumez les résultats et identifiez ce qui a changé depuis la période précédente.", `Comment nos résultats ${n} ont-ils évolué par rapport au mois dernier ?`),
      uc("Idées de contenu", "Générez des idées et brouillons basés sur ce qui fonctionne déjà.", `Propose cinq idées de contenu basées sur nos meilleurs résultats dans ${n}.`),
      uc("Insights audience", "Comprenez qui s'engage et où concentrer vos efforts.", `Quels segments d'audience réagissent le mieux dans ${n} ?`),
    ],
  },
  analytics: {
    label: "Analytics",
    tagline: (n) => `Interrogez vos données ${n} en langage naturel`,
    description: (n, o) => `Connectez Wonka à ${n} pour explorer vos ${o} en conversation et partager des conclusions claires avec l'équipe.`,
    useCases: (n) => [
      uc("Insights immédiats", "Posez une question et obtenez les chiffres avec une courte explication.", `Quels sont les trois plus grands changements dans ${n} cette semaine ?`),
      uc("Rapports récurrents", "Transformez les données en synthèse hebdomadaire prête à partager.", `Prépare un rapport hebdomadaire depuis ${n} pour la direction.`),
      uc("Détection d'anomalies", "Repérez les baisses ou pics inhabituels avant qu'ils ne posent problème.", `Y a-t-il des tendances inhabituelles dans ${n} que je dois connaître ?`),
    ],
  },
  dev: {
    label: "Engineering",
    tagline: (n) => `Des agents IA qui comprennent votre travail ${n}`,
    description: (n, o) => `Wonka se connecte à ${n} pour que les équipes produit et tech recherchent et résument leurs ${o} sans quitter leur workflow.`,
    useCases: (n) => [
      uc("Notes de version", "Générez des notes de version à partir du travail fusionné et des tickets fermés.", `Rédige les notes de version des changements de la semaine dans ${n}.`),
      uc("Aide au tri", "Résumez les nouveaux tickets et suggérez priorité et responsable.", `Résume les nouveaux tickets dans ${n} et propose des priorités.`),
      uc("Statut pour les parties prenantes", "Traduisez l'avancement technique en point lisible par tous.", `Explique l'avancement dans ${n} pour un public non technique.`),
    ],
  },
  support: {
    label: "Support client",
    tagline: (n) => `Des réponses plus rapides et sourcées pour votre support ${n}`,
    description: (n, o) => `Connectez Wonka à ${n} pour traiter plus vite vos ${o}, avec des réponses fondées sur votre propre base de connaissances.`,
    useCases: (n) => [
      uc("Suggestions de réponse", "Préparez des réponses basées sur les anciens tickets et articles d'aide.", `Rédige une réponse à ce ticket ${n} à partir de nos articles d'aide.`),
      uc("Résumés de tickets", "Résumez les longues conversations avant de les transférer.", `Résume l'historique de ce client dans ${n}.`),
      uc("Détection de tendances", "Trouvez les questions récurrentes et les lacunes de votre documentation.", `Quelles sont les questions les plus fréquentes dans ${n} ce mois-ci ?`),
    ],
  },
  hr: {
    label: "RH",
    tagline: (n) => `Une IA privée pour vos processus RH ${n}`,
    description: (n, o) => `Wonka se connecte à ${n} pour que les équipes RH consultent et organisent leurs ${o} en toute sécurité, avec des droits d'accès stricts.`,
    useCases: (n) => [
      uc("Recherches rapides", "Répondez aux questions RH sans chercher dans les écrans.", `Qui est absent la semaine prochaine selon ${n} ?`),
      uc("Synthèses candidats", "Résumez profils et retours avant une décision.", `Résume les retours sur ce candidat dans ${n}.`),
      uc("Support aux processus", "Préparez automatiquement les checklists d'arrivée ou de départ.", `Prépare une checklist d'onboarding pour une nouvelle recrue depuis ${n}.`),
    ],
  },
  commerce: {
    label: "Commerce",
    tagline: (n) => `Des agents IA pour vos ventes et paiements ${n}`,
    description: (n, o) => `Connectez Wonka à ${n} pour analyser vos ${o} et répondre en quelques secondes aux questions clients et chiffre d'affaires.`,
    useCases: (n) => [
      uc("Vue du chiffre d'affaires", "Obtenez un résumé sourcé des ventes et paiements sur n'importe quelle période.", `Quel a été notre chiffre d'affaires le mois dernier selon ${n} ?`),
      uc("Recherche client", "Retrouvez instantanément l'historique de commandes ou de paiements d'un client.", `Montre l'historique de commandes et paiements de ce client dans ${n}.`),
      uc("Suivi des incidents", "Listez les paiements échoués ou commandes ouvertes à traiter.", `Quels paiements ou commandes dans ${n} doivent être suivis aujourd'hui ?`),
    ],
  },
  design: {
    label: "Design",
    tagline: (n) => `L'IA au cœur de votre collaboration ${n}`,
    description: (n, o) => `Wonka se connecte à ${n} pour que les équipes retrouvent, résument et réutilisent leurs ${o} au quotidien.`,
    useCases: (n) => [
      uc("Synthèse de tableaux", "Transformez un espace chargé en résumé court et structuré.", `Résume les idées principales de ce tableau ${n}.`),
      uc("Retrouver des ressources", "Trouvez le bon design ou modèle sans naviguer.", `Trouve nos derniers modèles de présentation dans ${n}.`),
      uc("Suivi d'atelier", "Transformez les résultats d'un atelier en actions et responsables.", `Crée une liste d'actions à partir de cet atelier ${n}.`),
    ],
  },
  operations: {
    label: "Opérations",
    tagline: (n) => `Automatisez vos opérations ${n} avec des agents IA`,
    description: (n, o) => `Connectez Wonka à ${n} pour gérer plus vite vos ${o}, avec des agents IA qui préparent le travail et des personnes qui valident.`,
    useCases: (n) => [
      uc("Vue quotidienne", "Commencez chaque journée avec un résumé de ce qui demande votre attention.", `Qu'est-ce qui demande mon attention aujourd'hui dans ${n} ?`),
      uc("Brouillons de suivi", "Préparez messages et mises à jour pour les bonnes personnes.", `Rédige des mises à jour pour les éléments ouverts dans ${n}.`),
      uc("Contrôle des processus", "Repérez les retards ou étapes manquantes avant qu'ils ne posent problème.", `Quels éléments dans ${n} sont en retard ou incomplets ?`),
    ],
  },
};

const NL: Record<IntegrationCategory, CategoryCopy> = {
  crm: {
    label: "CRM",
    tagline: (n) => `AI-agents die werken in uw ${n}-pipeline`,
    description: (n, o) => `Koppel Wonka aan ${n} zodat uw team ${o} kan zoeken, samenvatten en bijwerken vanuit één private AI-werkruimte, met behoud van permissies en bronnen.`,
    useCases: (n) => [
      uc("Klantbriefings", "Krijg voor elk gesprek een samenvatting met bronnen: open deals, recente interacties en volgende stappen.", `Vat alles samen wat we in ${n} over deze klant weten voor mijn gesprek.`),
      uc("Pipeline-opvolging", "Spot stilgevallen opportuniteiten en maak opvolgingen op basis van de laatste activiteit.", `Welke deals in ${n} hebben de voorbije 14 dagen geen activiteit gehad?`),
      uc("Records bijwerken", "Log notities, werk velden bij en maak taken aan vanuit een gesprek, met menselijke goedkeuring.", `Log dit vergaderverslag in ${n} en maak een opvolgtaak aan.`),
    ],
  },
  erp: {
    label: "ERP",
    tagline: (n) => `Stel vragen aan ${n} in gewone taal`,
    description: (n, o) => `Wonka koppelt met ${n} zodat teams ${o} kunnen opvragen en verwerken zonder door menu's te zoeken, terwijl de ERP-permissies gelden.`,
    useCases: (n) => [
      uc("Operationele antwoorden", "Krijg meteen antwoord over orders, voorraad en facturen, met links naar de bron.", `Wat is de status van de open verkooporders van deze klant in ${n}?`),
      uc("Financiële opvolging", "Lijst vervallen facturen op en bereid herinneringen voor ter controle.", `Toon de vervallen facturen in ${n} en schrijf voor elk een herinnering.`),
      uc("Managementrapportering", "Zet ERP-data om in een leesbare weekelijkse samenvatting.", `Geef me een weekoverzicht van omzet en marge uit ${n}.`),
    ],
  },
  finance: {
    label: "Finance",
    tagline: (n) => `Private AI voor uw ${n}-financeworkflows`,
    description: (n, o) => `Koppel Wonka aan ${n} om ${o} op te zoeken en te ordenen, afstemmingen voor te bereiden en financiële vragen met bronnen te beantwoorden.`,
    useCases: (n) => [
      uc("Uitgavenoverzicht", "Vat uitgaven per leverancier, team of periode samen in enkele seconden.", `Hoeveel hebben we vorig kwartaal per leverancier uitgegeven volgens ${n}?`),
      uc("Ontbrekende documenten", "Vind transacties zonder bonnetje of factuur en bereid opvolging voor.", `Welke transacties in ${n} hebben nog geen bonnetje?`),
      uc("Maandafsluiting", "Bereid een checklist en toelichting voor de maandafsluiting voor.", `Maak een maandafsluiting uit ${n} met de belangrijkste afwijkingen.`),
    ],
  },
  project: {
    label: "Projectmanagement",
    tagline: (n) => `Houd ${n}-projecten in beweging met AI-agents`,
    description: (n, o) => `Wonka koppelt met ${n} zodat teams ${o} kunnen vinden, samenvatten en bijwerken vanuit één AI-werkruimte, zonder van tool te wisselen.`,
    useCases: (n) => [
      uc("Statusupdates", "Genereer een duidelijke projectstatus uit taken, opmerkingen en deadlines.", `Schrijf een statusupdate voor deze week op basis van ${n}.`),
      uc("Blokkades opsporen", "Breng achterstallig of geblokkeerd werk naar boven voor het team vertraagt.", `Welke taken in ${n} zijn te laat of geblokkeerd, en wie is eigenaar?`),
      uc("Taken aanmaken", "Zet vergadernotities of e-mails om in gestructureerde taken, klaar voor goedkeuring.", `Maak taken aan in ${n} op basis van deze vergadernotities.`),
    ],
  },
  knowledge: {
    label: "Kennis",
    tagline: (n) => `Doorzoek en vat uw ${n}-kennis samen met AI`,
    description: (n, o) => `Koppel Wonka aan ${n} zodat elk antwoord naar uw eigen ${o} verwijst, terwijl bestaande toegangsrechten bepalen wie wat ziet.`,
    useCases: (n) => [
      uc("Antwoorden met bronnen", "Stel vragen en krijg antwoorden met een link naar het juiste document.", `Wat is ons huidige beleid hierover? Gebruik ${n} als bron.`),
      uc("Documentsamenvattingen", "Vat lange documenten samen en vergelijk versies in enkele seconden.", `Vat de kernpunten van het laatste voorstel in ${n} samen.`),
      uc("Opstellen vanuit templates", "Hergebruik bestaande content om sneller nieuwe documenten te schrijven.", `Schrijf een nieuwe offerte op basis van gelijkaardige documenten in ${n}.`),
    ],
  },
  communication: {
    label: "Communicatie",
    tagline: (n) => `Breng AI-agents naar ${n}`,
    description: (n, o) => `Wonka koppelt met ${n} zodat teams sneller ${o} kunnen doorzoeken, samenvatten en beantwoorden, zonder gesprekken naar een generieke assistent te kopiëren.`,
    useCases: (n) => [
      uc("Bijpraat-samenvattingen", "Krijg een korte samenvatting van wat er gebeurde tijdens uw afwezigheid.", `Vat de belangrijke berichten in ${n} van de voorbije twee dagen samen.`),
      uc("Antwoordvoorstellen", "Stel antwoorden op in uw eigen tone of voice, klaar om na te lezen en te versturen.", `Schrijf een antwoord op deze klantvraag in ${n}.`),
      uc("Acties extraheren", "Haal beslissingen en to-do's uit lange threads.", `Lijst de beslissingen en open acties uit deze ${n}-thread op.`),
    ],
  },
  meetings: {
    label: "Vergaderingen",
    tagline: (n) => `Maak van ${n} vergaderintelligentie`,
    description: (n, o) => `Koppel Wonka aan ${n} om met ${o} te werken, zodat voorbereiding, notities en opvolging automatisch gebeuren.`,
    useCases: (n) => [
      uc("Voorbereiding", "Krijg voor elke vergadering een briefing met context en openstaande punten.", `Bereid mijn volgende vergadering voor met ${n}.`),
      uc("Verslag en acties", "Zet gesprekken om in een verslag met beslissingen en eigenaars.", `Schrijf een verslag met actiepunten van mijn laatste vergadering in ${n}.`),
      uc("Hulp bij plannen", "Vind het juiste moment en bereid uitnodigingen voor zonder heen-en-weer.", `Zoek volgende week een slot van 30 minuten voor dit team in ${n}.`),
    ],
  },
  marketing: {
    label: "Marketing",
    tagline: (n) => `AI-agents voor uw ${n}-marketing`,
    description: (n, o) => `Wonka koppelt met ${n} zodat marketingteams ${o} met AI kunnen analyseren en benutten, van rapportering tot contentideeën.`,
    useCases: (n) => [
      uc("Prestatierapportering", "Vat resultaten samen en toon wat veranderde sinds de vorige periode.", `Hoe evolueerden onze ${n}-resultaten tegenover vorige maand?`),
      uc("Contentideeën", "Genereer ideeën en drafts op basis van wat nu al goed werkt.", `Stel vijf contentideeën voor op basis van onze beste resultaten in ${n}.`),
      uc("Doelgroepinzichten", "Begrijp wie reageert en waar u best op focust.", `Welke doelgroepsegmenten reageren het best in ${n}?`),
    ],
  },
  analytics: {
    label: "Analytics",
    tagline: (n) => `Stel vragen aan uw ${n}-data in gewone taal`,
    description: (n, o) => `Koppel Wonka aan ${n} om ${o} conversationeel te verkennen en heldere conclusies met het team te delen.`,
    useCases: (n) => [
      uc("Directe inzichten", "Stel een vraag en krijg de cijfers met een korte uitleg.", `Wat zijn de drie grootste veranderingen in ${n} deze week?`),
      uc("Terugkerende rapporten", "Zet data om in een weekoverzicht dat klaar is om te delen.", `Maak een weekrapport uit ${n} voor het managementteam.`),
      uc("Afwijkingen opsporen", "Spot ongewone dalingen of pieken voor ze een probleem worden.", `Zijn er ongewone trends in ${n} die ik moet kennen?`),
    ],
  },
  dev: {
    label: "Engineering",
    tagline: (n) => `AI-agents die uw ${n}-werk begrijpen`,
    description: (n, o) => `Wonka koppelt met ${n} zodat engineering- en productteams ${o} kunnen doorzoeken en samenvatten zonder hun workflow te verlaten.`,
    useCases: (n) => [
      uc("Release notes", "Genereer release notes uit gemerged werk en gesloten issues.", `Schrijf release notes voor de wijzigingen van deze week in ${n}.`),
      uc("Hulp bij triage", "Vat nieuwe issues samen en stel prioriteit en eigenaar voor.", `Vat de nieuwe issues in ${n} samen en stel prioriteiten voor.`),
      uc("Status voor stakeholders", "Vertaal technische vooruitgang naar een update die iedereen begrijpt.", `Leg de vooruitgang in ${n} uit voor een niet-technisch publiek.`),
    ],
  },
  support: {
    label: "Klantenservice",
    tagline: (n) => `Snellere antwoorden met bronnen voor uw ${n}-supportteam`,
    description: (n, o) => `Koppel Wonka aan ${n} zodat supportteams sneller met ${o} werken, met antwoorden gebaseerd op uw eigen kennis.`,
    useCases: (n) => [
      uc("Antwoordsuggesties", "Stel antwoorden op op basis van eerdere tickets en helpartikels.", `Schrijf een antwoord op dit ${n}-ticket met onze helpartikels.`),
      uc("Ticketsamenvattingen", "Vat lange gesprekken samen voor u ze doorgeeft.", `Vat de historiek van deze klant in ${n} samen.`),
      uc("Trends opsporen", "Vind terugkerende vragen en hiaten in uw documentatie.", `Wat zijn de meest gestelde vragen in ${n} deze maand?`),
    ],
  },
  hr: {
    label: "HR",
    tagline: (n) => `Private AI voor uw ${n}-HR-processen`,
    description: (n, o) => `Wonka koppelt met ${n} zodat HR-teams ${o} veilig kunnen opzoeken en ordenen, met strikte toegangsrechten.`,
    useCases: (n) => [
      uc("Snelle opzoekingen", "Beantwoord HR-vragen zonder door schermen te zoeken.", `Wie is volgende week afwezig volgens ${n}?`),
      uc("Kandidaatsamenvattingen", "Vat profielen en feedback samen voor een beslissing.", `Vat de feedback over deze kandidaat in ${n} samen.`),
      uc("Procesondersteuning", "Bereid automatisch onboarding- of offboardingchecklists voor.", `Maak een onboardingchecklist voor een nieuwe medewerker uit ${n}.`),
    ],
  },
  commerce: {
    label: "Commerce",
    tagline: (n) => `AI-agents voor uw ${n}-verkoop en betalingen`,
    description: (n, o) => `Koppel Wonka aan ${n} om ${o} te analyseren en klant- en omzetvragen in enkele seconden te beantwoorden.`,
    useCases: (n) => [
      uc("Omzetoverzicht", "Krijg een samenvatting met bronnen van verkoop en betalingen voor elke periode.", `Wat was onze omzet vorige maand volgens ${n}?`),
      uc("Klant opzoeken", "Vind meteen de bestel- of betaalhistoriek van een klant.", `Toon de bestel- en betaalhistoriek van deze klant in ${n}.`),
      uc("Opvolging van problemen", "Lijst mislukte betalingen of open bestellingen op die aandacht vragen.", `Welke betalingen of bestellingen in ${n} moeten vandaag opgevolgd worden?`),
    ],
  },
  design: {
    label: "Design",
    tagline: (n) => `Breng AI in uw ${n}-samenwerking`,
    description: (n, o) => `Wonka koppelt met ${n} zodat teams ${o} kunnen vinden, samenvatten en hergebruiken in hun dagelijkse werk.`,
    useCases: (n) => [
      uc("Bordsamenvattingen", "Zet een drukke werkruimte om in een korte, gestructureerde samenvatting.", `Vat de belangrijkste ideeën van dit ${n}-bord samen.`),
      uc("Assets vinden", "Vind het juiste ontwerp of template zonder te zoeken.", `Zoek onze laatste presentatietemplates in ${n}.`),
      uc("Workshopopvolging", "Zet workshopresultaten om in acties en eigenaars.", `Maak een actielijst op basis van deze ${n}-workshop.`),
    ],
  },
  operations: {
    label: "Operations",
    tagline: (n) => `Automatiseer ${n}-operations met AI-agents`,
    description: (n, o) => `Koppel Wonka aan ${n} om ${o} sneller te beheren, met AI-agents die het werk voorbereiden en mensen die goedkeuren.`,
    useCases: (n) => [
      uc("Dagelijks overzicht", "Start elke dag met een samenvatting van wat aandacht vraagt.", `Wat vraagt vandaag mijn aandacht in ${n}?`),
      uc("Opvolgdrafts", "Bereid berichten en updates voor de juiste mensen voor.", `Schrijf updates voor de openstaande items in ${n}.`),
      uc("Procescontrole", "Spot vertragingen of ontbrekende stappen voor ze een probleem worden.", `Welke items in ${n} zijn vertraagd of onvolledig?`),
    ],
  },
};

const CATEGORY_COPY: Record<Locale, Record<IntegrationCategory, CategoryCopy>> = { en: EN, fr: FR, nl: NL };

const FAQ: Record<Locale, (name: string) => FaqItem[]> = {
  en: (n) => [
    { question: `What can Wonka do with ${n}?`, answer: `Wonka lets your team search, summarize and act on ${n} data from a private AI workspace. Agents can prepare updates and drafts, and sensitive actions always go through human approval.` },
    { question: `Does Wonka respect ${n} permissions?`, answer: `Yes. Each user connects with their own access, so Wonka only sees what that person can already see in ${n}. Answers show their sources.` },
    { question: `Is my ${n} data used to train AI models?`, answer: `No. Wonka runs as a private deployment and your ${n} data is never used to train public models.` },
  ],
  fr: (n) => [
    { question: `Que peut faire Wonka avec ${n} ?`, answer: `Wonka permet à votre équipe de rechercher, résumer et agir sur les données ${n} depuis un espace IA privé. Les agents préparent mises à jour et brouillons, et les actions sensibles passent toujours par une validation humaine.` },
    { question: `Wonka respecte-t-il les permissions ${n} ?`, answer: `Oui. Chaque utilisateur se connecte avec ses propres accès : Wonka ne voit que ce que cette personne voit déjà dans ${n}. Les réponses affichent leurs sources.` },
    { question: `Mes données ${n} servent-elles à entraîner des modèles IA ?`, answer: `Non. Wonka fonctionne en déploiement privé et vos données ${n} ne servent jamais à entraîner des modèles publics.` },
  ],
  nl: (n) => [
    { question: `Wat kan Wonka met ${n}?`, answer: `Met Wonka kan uw team ${n}-data doorzoeken, samenvatten en erop actie ondernemen vanuit een private AI-werkruimte. Agents bereiden updates en drafts voor, en gevoelige acties vragen altijd menselijke goedkeuring.` },
    { question: `Respecteert Wonka de permissies van ${n}?`, answer: `Ja. Elke gebruiker koppelt met zijn eigen toegang, dus Wonka ziet enkel wat die persoon al in ${n} kan zien. Antwoorden tonen hun bronnen.` },
    { question: `Wordt mijn ${n}-data gebruikt om AI-modellen te trainen?`, answer: `Nee. Wonka draait als private deployment en uw ${n}-data wordt nooit gebruikt om publieke modellen te trainen.` },
  ],
};

export function integrationCategoryLabel(category: IntegrationCategory, locale: Locale): string {
  return CATEGORY_COPY[locale][category].label;
}

export function buildIntegrationDefaults(integration: CatalogIntegration, locale: Locale) {
  const copy = CATEGORY_COPY[locale][integration.category];
  const objects = integration.objects[locale];
  return {
    tagline: copy.tagline(integration.name),
    description: copy.description(integration.name, objects),
    useCases: copy.useCases(integration.name),
    tags: [copy.label],
    faq: FAQ[locale](integration.name),
  };
}
