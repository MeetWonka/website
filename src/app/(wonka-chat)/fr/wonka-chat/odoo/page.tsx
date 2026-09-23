import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import {
  SITE_SETTINGS_QUERY,
} from "@sanity/lib/queries";
import { BreadcrumbSchema } from "@/components/json-ld";
import { ContactBlock } from "@/components/sections/contact-block";
import { Cta } from "@/components/sections/cta";
import { IconFeatureGrid } from "@/components/sections/icon-feature-grid";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ProblemBento } from "@/components/sections/problem-bento";
import { ProductHero } from "@/components/sections/product-hero";
import { Security } from "@/components/sections/security";
import { StickyFeatures } from "@/components/sections/sticky-features";
import { WorkflowSteps } from "@/components/sections/workflow-steps";
import { DEFAULT_WONKA_CHAT_SECURITY } from "@/lib/cms-sections";
import { WONKA_CHAT_DEFAULTS } from "@/lib/page-defaults/wonka-chat";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";
import type {
  ContactSectionResolved,
  IconFeatureGridData,
  ProblemBentoData,
  ProductHeroResolved,
  StickyFeaturesResolved,
  WorkflowStepsData,
} from "@/lib/types/page-sections";

export const dynamic = "force-static";

const pagePath = "/fr/wonka-chat/odoo";

async function getSettings() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return settings as SiteSettings | null;
}

function bentoCard(
  _key: string,
  title: string,
  body: string,
): ProblemBentoData["largeCards"][number] {
  return { _key, title, body, image: null, fallbackImage: null };
}

function capabilityItem(
  _key: string,
  icon: string,
  title: string,
  body: string,
): IconFeatureGridData["items"][number] {
  return { _key, icon, title, body, image: null, fallbackImage: null };
}

// French content defaults
const heroFr: ProductHeroResolved = {
  ...WONKA_CHAT_DEFAULTS.hero,
  eyebrow: "WonkaChat · Odoo",
  title: "Des agents IA qui agissent dans Odoo, pour la direction informatique et les ops d'ETI déjà sur Odoo",
  subtitle:
    "WonkaChat se connecte à Odoo pour que votre équipe puisse interroger les données CRM, ventes, stock et comptabilité — et préparer la prochaine action sans naviguer dans les modules.",
  secondaryLink: null,
};

const problemFr: ProblemBentoData = {
  header: {
    eyebrow: "Le Problème",
    heading: "Odoo devrait être plus simple que ça?",
    body: "Les ERP comme Odoo sont conçus pour simplifier les opérations... mais la partie « simple » se perd souvent quelque part entre l'implémentation et l'adoption.",
  },
  largeCards: [
    bentoCard(
      "navigation",
      "La navigation est complexe",
      "Votre responsable d'entrepôt connaît son métier sur le bout des doigts. Mais vérifier les niveaux de stock signifie naviguer vers Inventaire → Produits → Stock → Filtrer par emplacement. Elle sait ce dont elle a besoin. L'interface le rend juste difficile.",
    ),
    bentoCard(
      "experts",
      "Goulots d'étranglement experts",
      "Seulement 2-3 personnes comprennent vraiment Odoo. Tout le monde les interrompt. Une question simple prend 30 minutes et empêche votre responsable IT de se concentrer sur des activités plus valorisantes.",
    ),
  ],
  smallCards: [
    bentoCard(
      "consultants",
      "Dépendance aux consultants",
      "100-200€/heure à chaque fois que vous avez besoin d'un workflow personnalisé. Les coûts augmentent plus vite que la valeur obtenue. Et pas parce que vous avez besoin de personnalisation complexe, juste pour obtenir des rapports qui devraient être simples.",
    ),
    bentoCard(
      "ai-tools",
      "Trop d'outils IA",
      "Les outils IA génériques créent plus de confusion que de valeur. Informations sensibles éparpillées dans des endroits que votre direction informatique ne contrôle pas. Et l'IA intégrée d'Odoo est trop simple pour vos workflows.",
    ),
    bentoCard(
      "adoption",
      "Faibles taux d'adoption",
      "Tout le monde s'en tient aux bases apprises en formation. Le reste reste inutilisé, non pas parce que ce n'est pas utile, mais parce que le trouver demande du travail.",
    ),
  ],
};

const workflowStepsFr: WorkflowStepsData = {
  header: {
    eyebrow: "Comment ça marche",
    heading: "De la demande au résultat.\nPas suggéré.",
    body: null,
  },
  steps: [
    {
      _key: "step-1",
      title: "Dites-le.",
      body: "Écrivez ce qui doit être fait. Comme vous le feriez à un collègue. « Créer une opportunité dans Odoo. Ajouter ce résumé. Créer un bon de commande. »",
      visual: "step1",
      image: null,
      fallbackImage: null,
      variant: "trapezoid",
      mirror: false,
      svgFillClassName: "fill-light-gray",
      divBgClassName: "bg-light-gray",
    },
    {
      _key: "step-2",
      title: "WonkaChat agit.",
      body: "WonkaChat récupère les données, voit ce qui doit être fait, et le fait. CRM mis à jour. Notes ajoutées. Commandes enregistrées.",
      visual: "step2",
      image: null,
      fallbackImage: null,
      variant: "rectangle",
      mirror: false,
      svgFillClassName: "fill-mid-gray",
      divBgClassName: "bg-mid-gray",
    },
    {
      _key: "step-3",
      title: "Ça devient la façon de travailler.",
      body: "Faites-le une fois. Ça tourne à chaque fois. Le travail n'attend plus que quelqu'un le fasse avancer.",
      visual: "step3",
      image: null,
      fallbackImage: null,
      variant: "trapezoid",
      mirror: true,
      svgFillClassName: "fill-light-gray",
      divBgClassName: "bg-light-gray",
    },
  ],
};

const capabilitiesFr: IconFeatureGridData = {
  header: {
    eyebrow: null,
    heading: "Transformez Odoo en colonne vertébrale de votre entreprise",
    body: "Quelques exemples de comment WonkaChat peut booster votre configuration Odoo:",
  },
  items: [
    capabilityItem(
      "reconcile-bank",
      "bank",
      "Rapprocher les comptes bancaires",
      "Surveillance automatique, rappels intelligents et escalade, assurant une conformité à 100% des feuilles de temps sans suivi manuel ni intervention de manager.",
    ),
    capabilityItem(
      "sales-quotes",
      "quote",
      "Générer des devis",
      "Capture automatiquement les leads, fait progresser les opportunités, assigne les tâches et signale les affaires nécessitant attention, éliminant complètement le travail CRM manuel.",
    ),
    capabilityItem(
      "ask-odoo",
      "chat",
      "Interroger Odoo",
      "Répond instantanément aux questions, explique les fonctionnalités et vous oriente automatiquement vers le bon workflow, rendant Odoo intuitif pour tout le monde.",
    ),
    capabilityItem(
      "customer-tickets",
      "ticket",
      "Résoudre les tickets clients",
      "Récupère, analyse et priorise automatiquement les tickets support de JIRA et Odoo, signalant instantanément les informations manquantes et les tendances.",
    ),
    capabilityItem(
      "instant-quotes",
      "document",
      "Créer des devis instantanés",
      "Les demandes de devis entrantes deviennent instantanément des devis complets avec les bons produits, remises et conditions appliqués automatiquement.",
    ),
    capabilityItem(
      "seo-content",
      "search",
      "Rédiger du contenu SEO",
      "Génère automatiquement des descriptions optimisées pour les moteurs de recherche, des balises méta et des copies axées sur la conversion suivant les bonnes pratiques de Google pour chaque produit.",
    ),
    capabilityItem(
      "new-leads",
      "userPlus",
      "Créer de nouveaux leads",
      "Recherche automatiquement les entreprises, enrichit les contacts et crée des enregistrements CRM complets, éliminant la saisie manuelle de données et le travail de recherche.",
    ),
    capabilityItem(
      "stock-levels",
      "boxes",
      "Surveiller les niveaux de stock",
      "Surveillance automatisée, ajustements et alertes avec contrôles de sécurité intégrés, prévenant les erreurs coûteuses avant qu'elles ne se produisent.",
    ),
    capabilityItem(
      "crm-data",
      "database",
      "Mettre à jour les données CRM",
      "Transforme les conversations en documentation CRM structurée, extrayant les décisions, les éléments d'action et faisant progresser automatiquement les opportunités le cas échéant.",
    ),
    capabilityItem(
      "gitlab-tasks",
      "gitBranch",
      "Synchroniser les tâches GitLab",
      "Les commits de code deviennent instantanément des mises à jour de projet, reliant le travail de développement aux tâches sans suivi manuel ni rapport de statut.",
    ),
    capabilityItem(
      "financial-reconciliation",
      "scale",
      "Automatiser le rapprochement financier",
      "Identifie automatiquement les transactions correspondantes, signale les exceptions et organise le travail de rapprochement quotidien ; les comptables approuvent simplement les correspondances.",
    ),
  ],
};

const contactFr: ContactSectionResolved = {
  header: {
    eyebrow: "Prêt à démarrer?",
    heading: "Voyons si Wonka est fait pour vous.",
    body: "30 min, pas de slides. On parle de votre configuration Odoo actuelle et on voit si nos agents peuvent apporter de la valeur.",
  },
  portrait: null,
  fallbackPortrait: null,
  personName: null,
  personRole: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: "Agent IA Odoo pour la direction informatique et les ops | WonkaChat",
      metaDescription:
        "Connectez WonkaChat à Odoo pour interroger les données CRM, stock, comptabilité et ventes en langage naturel. IA privée pour Odoo SaaS et auto-hébergé.",
      ogImage: null,
    },
    {
      path: pagePath,
      fallbackTitle: "Agent IA Odoo pour la direction informatique et les ops | WonkaChat",
    },
  );
}

export default async function WonkaChatOdooPageFr() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath}`;
  const settings = await getSettings();
  const sharedLinks = settings?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "wonka-chat");
  const meetingLabel = sharedLinks?.meetingLabel ?? null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "WonkaChat", url: `${siteUrl}/wonka-chat` },
          { name: "Odoo", url: pageUrl },
        ]}
      />

      <main className="bg-background text-text">
        <ProductHero data={heroFr} leadForm="wonka-chat-odoo-hero" />
        <LogoStrip data={WONKA_CHAT_DEFAULTS.logoStrip} />
        <ProblemBento id="the-problem" data={problemFr} />
        <div id="how-it-works">
          <StickyFeatures
            data={WONKA_CHAT_DEFAULTS.features as StickyFeaturesResolved}
            meetingUrl={meetingUrl}
            meetingLabel={meetingLabel}
            meetingTrackType="wonka-chat"
            className="py-18 md:py-24"
          />
        </div>
        <WorkflowSteps id="how-it-works-steps" data={workflowStepsFr} />
        <IconFeatureGrid id="odoo-capabilities" data={capabilitiesFr} />
        <Security
          id="security"
          data={null}
          defaults={DEFAULT_WONKA_CHAT_SECURITY}
        />
        <ContactBlock
          id="contact"
          data={contactFr}
          meetingUrl={meetingUrl}
          meetingLabel={meetingLabel}
          meetingTrackType="wonka-chat"
          className="py-18 text-center md:py-24"
        />
      </main>

      <Cta meetingUrl={meetingUrl} meetingLabel={meetingLabel} meetingTrackType="wonka-chat" />
    </>
  );
}
