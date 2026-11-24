import type { Locale } from "@/i18n/config";

export type IntegrationCategory =
  | "crm"
  | "erp"
  | "finance"
  | "project"
  | "knowledge"
  | "communication"
  | "meetings"
  | "marketing"
  | "analytics"
  | "dev"
  | "support"
  | "hr"
  | "commerce"
  | "design"
  | "operations";

export interface CatalogIntegration {
  slug: string;
  name: string;
  logo: string;
  category: IntegrationCategory;
  objects: Record<Locale, string>;
}

const M = "/images/mcp-integrations";
const H = "/images/home/logos";

function entry(
  slug: string,
  name: string,
  logo: string,
  category: IntegrationCategory,
  en: string,
  fr: string,
  nl: string,
): CatalogIntegration {
  return { slug, name, logo, category, objects: { en, fr, nl } };
}

export const INTEGRATIONS_CATALOG: CatalogIntegration[] = [
  entry("airtable", "Airtable", `${M}/airtable.svg`, "project", "bases, tables and records", "bases, tables et enregistrements", "bases, tabellen en records"),
  entry("asana", "Asana", `${M}/asana.svg`, "project", "projects, tasks and comments", "projets, tâches et commentaires", "projecten, taken en opmerkingen"),
  entry("attio", "Attio", `${M}/attio.svg`, "crm", "companies, people and deals", "entreprises, contacts et opportunités", "bedrijven, contactpersonen en deals"),
  entry("axonaut", "Axonaut", `${M}/axonaut.png`, "crm", "contacts, quotes, invoices and opportunities", "contacts, devis, factures et opportunités", "contacten, offertes, facturen en opportuniteiten"),
  entry("basecamp", "Basecamp", `${M}/basecamp.svg`, "project", "projects, to-dos and message boards", "projets, to-dos et fils de discussion", "projecten, to-do's en berichtenborden"),
  entry("bitbucket", "Bitbucket", `${M}/bitbucket.svg`, "dev", "repositories, pull requests and issues", "dépôts, pull requests et tickets", "repositories, pull requests en issues"),
  entry("box", "Box", `${M}/box.svg`, "knowledge", "files, folders and shared content", "fichiers, dossiers et contenus partagés", "bestanden, mappen en gedeelde content"),
  entry("breezeway", "Breezeway", `${H}/breezeway.png`, "operations", "property tasks, inspections and maintenance", "tâches, inspections et maintenance des logements", "taken, inspecties en onderhoud van panden"),
  entry("brevo", "Brevo", `${M}/brevo.jpg`, "marketing", "contacts, campaigns and transactional emails", "contacts, campagnes et emails transactionnels", "contacten, campagnes en transactionele e-mails"),
  entry("cal-com", "Cal.com", `${M}/cal-com.png`, "meetings", "event types, availability and bookings", "types d'événements, disponibilités et réservations", "eventtypes, beschikbaarheid en boekingen"),
  entry("canva", "Canva", `${M}/canva.png`, "design", "designs, templates and brand assets", "designs, modèles et ressources de marque", "ontwerpen, templates en merkassets"),
  entry("clickup", "ClickUp", `${M}/clickup.svg`, "project", "tasks, lists and docs", "tâches, listes et docs", "taken, lijsten en docs"),
  entry("confluence", "Confluence", `${M}/confluence.svg`, "knowledge", "spaces, pages and comments", "espaces, pages et commentaires", "spaces, pagina's en opmerkingen"),
  entry("contentful", "Contentful", `${M}/contentful.svg`, "knowledge", "entries, content types and assets", "entrées, types de contenu et assets", "entries, contenttypes en assets"),
  entry("dropbox", "Dropbox", `${M}/dropbox.svg`, "knowledge", "files, folders and shared links", "fichiers, dossiers et liens partagés", "bestanden, mappen en gedeelde links"),
  entry("dynamics-365", "Dynamics 365", `${M}/dynamics-365.png`, "crm", "accounts, contacts, opportunities and orders", "comptes, contacts, opportunités et commandes", "accounts, contacten, opportuniteiten en orders"),
  entry("eventbrite", "Eventbrite", `${M}/eventbrite.svg`, "marketing", "events, attendees and orders", "événements, participants et commandes", "events, deelnemers en bestellingen"),
  entry("facebook", "Facebook", `${H}/facebook.png`, "marketing", "pages, posts and comments", "pages, publications et commentaires", "pagina's, posts en reacties"),
  entry("github", "GitHub", `${M}/github.svg`, "dev", "repositories, issues and pull requests", "dépôts, tickets et pull requests", "repositories, issues en pull requests"),
  entry("gitlab", "GitLab", `${M}/gitlab.png`, "dev", "projects, merge requests and pipelines", "projets, merge requests et pipelines", "projecten, merge requests en pipelines"),
  entry("gmail", "Gmail", `${M}/gmail.svg`, "communication", "emails, threads and drafts", "emails, conversations et brouillons", "e-mails, threads en concepten"),
  entry("google-ads", "Google Ads", `${M}/google-ads.png`, "marketing", "campaigns, ad groups and performance data", "campagnes, groupes d'annonces et performances", "campagnes, advertentiegroepen en prestaties"),
  entry("google-analytics", "Google Analytics", `${M}/google-analytics.svg`, "analytics", "traffic, conversions and audience reports", "trafic, conversions et rapports d'audience", "verkeer, conversies en doelgroeprapporten"),
  entry("google-calendar", "Google Calendar", `${M}/google-calendar.png`, "meetings", "events, invites and availability", "événements, invitations et disponibilités", "afspraken, uitnodigingen en beschikbaarheid"),
  entry("google-docs", "Google Docs", `${M}/google-docs.jpg`, "knowledge", "documents, comments and revisions", "documents, commentaires et révisions", "documenten, opmerkingen en revisies"),
  entry("google-drive", "Google Drive", `${M}/google-drive.png`, "knowledge", "files, folders and shared drives", "fichiers, dossiers et drives partagés", "bestanden, mappen en gedeelde drives"),
  entry("google-search-console", "Google Search Console", `${M}/google-search-console.svg`, "analytics", "search queries, pages and indexing status", "requêtes, pages et statut d'indexation", "zoekopdrachten, pagina's en indexeringsstatus"),
  entry("google-sheets", "Google Sheets", `${M}/google-sheets.png`, "analytics", "spreadsheets, rows and formulas", "feuilles de calcul, lignes et formules", "spreadsheets, rijen en formules"),
  entry("google-workspace", "Google Workspace", `${M}/google-super.png`, "knowledge", "mail, calendar, drive and docs", "emails, agenda, drive et documents", "mail, agenda, drive en documenten"),
  entry("greenhouse", "Greenhouse", `${M}/greenhouse.svg`, "hr", "jobs, candidates and interviews", "postes, candidats et entretiens", "vacatures, kandidaten en interviews"),
  entry("horus", "Horus", `${H}/horus.png`, "finance", "invoices, bookkeeping entries and documents", "factures, écritures comptables et pièces", "facturen, boekingen en documenten"),
  entry("hostaway", "Hostaway", `${H}/hostaway.png`, "operations", "listings, reservations and guest messages", "annonces, réservations et messages voyageurs", "listings, reservaties en gastberichten"),
  entry("hubspot", "HubSpot", `${M}/hubspot.svg`, "crm", "contacts, companies, deals and tickets", "contacts, entreprises, transactions et tickets", "contacten, bedrijven, deals en tickets"),
  entry("instagram", "Instagram", `${H}/instagram.png`, "marketing", "posts, comments and insights", "publications, commentaires et statistiques", "posts, reacties en inzichten"),
  entry("intercom", "Intercom", `${M}/intercom.png`, "support", "conversations, contacts and help articles", "conversations, contacts et articles d'aide", "gesprekken, contacten en helpartikels"),
  entry("jira", "Jira", `${M}/jira.svg`, "project", "issues, sprints and projects", "tickets, sprints et projets", "issues, sprints en projecten"),
  entry("leexi", "Leexi", `${M}/leexi.png`, "meetings", "call recordings, transcripts and summaries", "enregistrements d'appels, transcriptions et résumés", "gespreksopnames, transcripties en samenvattingen"),
  entry("linear", "Linear", `${M}/linear.svg`, "project", "issues, projects and cycles", "tickets, projets et cycles", "issues, projecten en cycles"),
  entry("linkedin", "LinkedIn", `${M}/linkedin.svg`, "marketing", "posts, company pages and engagement", "publications, pages entreprise et engagement", "posts, bedrijfspagina's en engagement"),
  entry("mailchimp", "Mailchimp", `${M}/mailchimp.png`, "marketing", "audiences, campaigns and reports", "audiences, campagnes et rapports", "doelgroepen, campagnes en rapporten"),
  entry("meta-ads", "Meta Ads", `${M}/meta-ads.jpg`, "marketing", "campaigns, ad sets and results", "campagnes, ensembles de publicités et résultats", "campagnes, advertentiesets en resultaten"),
  entry("power-bi", "Microsoft Power BI", `${M}/power-bi.svg`, "analytics", "reports, dashboards and datasets", "rapports, tableaux de bord et jeux de données", "rapporten, dashboards en datasets"),
  entry("microsoft-teams", "Microsoft Teams", `${H}/teams.svg`, "communication", "chats, channels and meetings", "conversations, canaux et réunions", "chats, kanalen en vergaderingen"),
  entry("microsoft-to-do", "Microsoft To Do", `${M}/microsoft-to-do.png`, "project", "tasks, lists and reminders", "tâches, listes et rappels", "taken, lijsten en herinneringen"),
  entry("miro", "Miro", `${M}/miro.png`, "design", "boards, sticky notes and frames", "tableaux, post-its et frames", "borden, sticky notes en frames"),
  entry("nocrm", "noCRM.io", `${M}/nocrm.png`, "crm", "leads, pipelines and follow-ups", "leads, pipelines et relances", "leads, pipelines en opvolgingen"),
  entry("notion", "Notion", `${M}/notion.svg`, "knowledge", "pages, databases and wikis", "pages, bases de données et wikis", "pagina's, databases en wiki's"),
  entry("odoo", "Odoo", `${H}/odoo.svg`, "erp", "contacts, sales orders, invoices and inventory", "contacts, commandes, factures et stock", "contacten, verkooporders, facturen en voorraad"),
  entry("onedrive", "OneDrive", `${M}/onedrive.svg`, "knowledge", "files, folders and shared documents", "fichiers, dossiers et documents partagés", "bestanden, mappen en gedeelde documenten"),
  entry("onenote", "OneNote", `${M}/onenote.png`, "knowledge", "notebooks, sections and pages", "blocs-notes, sections et pages", "notitieblokken, secties en pagina's"),
  entry("outlook", "Outlook", `${H}/outlook.svg`, "communication", "emails, calendar events and contacts", "emails, événements d'agenda et contacts", "e-mails, agenda-afspraken en contacten"),
  entry("payfit", "PayFit", `${M}/payfit.png`, "hr", "employees, absences and payroll data", "salariés, absences et données de paie", "medewerkers, afwezigheden en payrolldata"),
  entry("pennylane", "Pennylane", `${M}/pennylane.png`, "finance", "invoices, suppliers, transactions and bookkeeping", "factures, fournisseurs, transactions et comptabilité", "facturen, leveranciers, transacties en boekhouding"),
  entry("pipedrive", "Pipedrive", `${H}/pipedrive.png`, "crm", "deals, persons, organizations and activities", "affaires, personnes, organisations et activités", "deals, personen, organisaties en activiteiten"),
  entry("plaud", "Plaud", `${M}/plaud.png`, "meetings", "recordings, transcripts and summaries", "enregistrements, transcriptions et résumés", "opnames, transcripties en samenvattingen"),
  entry("productboard", "Productboard", `${M}/productboard.svg`, "project", "features, insights and roadmaps", "fonctionnalités, insights et roadmaps", "features, inzichten en roadmaps"),
  entry("qonto", "Qonto", `${M}/qonto.png`, "finance", "transactions, cards and receipts", "transactions, cartes et justificatifs", "transacties, kaarten en bonnetjes"),
  entry("quickbooks", "QuickBooks", `${H}/quickbooks.png`, "finance", "invoices, customers, payments and accounts", "factures, clients, paiements et comptes", "facturen, klanten, betalingen en rekeningen"),
  entry("ringover", "Ringover", `${M}/ringover.png`, "communication", "calls, recordings and SMS", "appels, enregistrements et SMS", "oproepen, opnames en sms'en"),
  entry("salesforce", "Salesforce", `${M}/salesforce.svg`, "crm", "accounts, opportunities, leads and cases", "comptes, opportunités, leads et cases", "accounts, opportuniteiten, leads en cases"),
  entry("sentry", "Sentry", `${M}/sentry.svg`, "dev", "issues, errors and releases", "incidents, erreurs et releases", "issues, errors en releases"),
  entry("sharepoint", "SharePoint", `${H}/sharepoint.svg`, "knowledge", "sites, document libraries and lists", "sites, bibliothèques de documents et listes", "sites, documentbibliotheken en lijsten"),
  entry("shopify", "Shopify", `${M}/shopify.jpg`, "commerce", "products, orders and customers", "produits, commandes et clients", "producten, bestellingen en klanten"),
  entry("slack", "Slack", `${M}/slack.svg`, "communication", "channels, threads and messages", "canaux, fils et messages", "kanalen, threads en berichten"),
  entry("spendesk", "Spendesk", `${M}/spendesk.png`, "finance", "expenses, payments and budgets", "dépenses, paiements et budgets", "uitgaven, betalingen en budgetten"),
  entry("square", "Square", `${M}/square.svg`, "commerce", "payments, orders and catalog items", "paiements, commandes et catalogue", "betalingen, bestellingen en catalogusitems"),
  entry("stafiz", "Stafiz", `${H}/stafiz.png`, "operations", "projects, staffing and timesheets", "projets, staffing et feuilles de temps", "projecten, staffing en timesheets"),
  entry("stripe", "Stripe", `${M}/stripe.webp`, "commerce", "customers, payments, subscriptions and invoices", "clients, paiements, abonnements et factures", "klanten, betalingen, abonnementen en facturen"),
  entry("teamleader", "Teamleader", `${M}/teamleader.png`, "crm", "contacts, deals, quotes and projects", "contacts, affaires, devis et projets", "contacten, deals, offertes en projecten"),
  entry("trello", "Trello", `${M}/trello.svg`, "project", "boards, lists and cards", "tableaux, listes et cartes", "borden, lijsten en kaarten"),
  entry("whatsapp", "WhatsApp", `${M}/whatsapp.webp`, "communication", "conversations, messages and templates", "conversations, messages et modèles", "gesprekken, berichten en templates"),
  entry("wordpress", "WordPress", `${M}/wordpress.svg`, "marketing", "posts, pages and media", "articles, pages et médias", "berichten, pagina's en media"),
  entry("wrike", "Wrike", `${M}/wrike.svg`, "project", "projects, tasks and folders", "projets, tâches et dossiers", "projecten, taken en mappen"),
  entry("yousign", "Yousign", `${M}/yousign.png`, "operations", "signature requests, documents and signers", "demandes de signature, documents et signataires", "handtekeningaanvragen, documenten en ondertekenaars"),
  entry("youtube", "YouTube", `${M}/youtube.svg`, "marketing", "videos, playlists and channel analytics", "vidéos, playlists et statistiques de chaîne", "video's, playlists en kanaalstatistieken"),
  entry("zendesk", "Zendesk", `${M}/zendesk.svg`, "support", "tickets, users and help center articles", "tickets, utilisateurs et articles du centre d'aide", "tickets, gebruikers en helpcenterartikels"),
  entry("zoho-books", "Zoho Books", `${H}/zoho-books.png`, "finance", "invoices, estimates, expenses and contacts", "factures, devis, dépenses et contacts", "facturen, offertes, uitgaven en contacten"),
  entry("zoom", "Zoom", `${M}/zoom.svg`, "meetings", "meetings, recordings and transcripts", "réunions, enregistrements et transcriptions", "vergaderingen, opnames en transcripties"),
];

export function getCatalogIntegration(slug: string): CatalogIntegration | undefined {
  return INTEGRATIONS_CATALOG.find((integration) => integration.slug === slug);
}
