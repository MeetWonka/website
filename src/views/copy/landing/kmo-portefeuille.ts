import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";
import { FLANDERS_SUBSIDY_URL } from "@/components/sections/start-ai-subsidized-flanders/constants";

/**
 * Guide page on using the VLAIO KMO-portefeuille for an AI project.
 * Dutch only (Flemish subsidy). The Start AI programme itself lives at
 * /services/start-ai-subsidized-flanders — this page explains the subsidy
 * and links there instead of repeating the programme page.
 */
export const KMO_PORTEFEUILLE_COPY: Partial<Record<Locale, LandingCopy>> = {
  nl: {
    seo: {
      title: "KMO-portefeuille voor AI: tot 70% subsidie | Wonka",
      description:
        "Zo gebruikt u de VLAIO KMO-portefeuille voor een AI-traject: wie in aanmerking komt, wat het kost en hoe u aanvraagt. Tot 70% terug op Start AI.",
    },
    breadcrumb: "KMO-portefeuille voor AI",
    schema: {
      serviceName: "Start AI met KMO-portefeuille",
      serviceType: "Gesubsidieerd AI-adviestraject voor Vlaamse kmo's",
    },
    hero: {
      eyebrow: "VLAIO KMO-portefeuille",
      title: "KMO-portefeuille voor uw AI-project: tot 70% subsidie.",
      subtitle:
        "Wonka is een erkende dienstverlener voor de KMO-portefeuille. Vlaamse kmo's recupereren zo tot 70% van de kost van Start AI, ons traject naar een concrete AI-strategie en roadmap. Wij helpen u met het papierwerk.",
      primaryCta: { label: "Subsidie aanvragen", href: FLANDERS_SUBSIDY_URL },
      secondaryCta: {
        label: "Bekijk het Start AI-programma",
        href: "/services/start-ai-subsidized-flanders",
      },
      facts: [
        ["Subsidie", "Tot 70% terug"],
        ["Dienstverlener", "Wonka, erkend voor de KMO-portefeuille"],
        ["Programma", "Start AI, vanaf €15.000"],
        ["Ervaring", "+150 Start AI-trajecten"],
      ],
    },
    answer: {
      heading: "Wat is de KMO-portefeuille en hoe gebruikt u die voor AI?",
      paragraphs: [
        "De KMO-portefeuille is een subsidiemaatregel van VLAIO, het Vlaams Agentschap Innoveren & Ondernemen. Vlaamse kmo's krijgen er steun mee voor opleiding en advies bij erkende dienstverleners. Omdat Wonka erkend is, kunt u de KMO-portefeuille inzetten voor Start AI en tot 70% van de programmakost recupereren.",
        "Voor veel kmo's is dat het verschil tussen 'we moeten iets met AI' en een echt plan. Met de subsidie investeert u in een helder beeld van waar AI waarde creëert, welke use cases prioriteit krijgen en hoe u AI veilig en verantwoord inzet, zonder het volledige budget zelf te dragen.",
        "Start AI vertrekt niet van tools, maar van uw organisatie. We analyseren uw processen en knelpunten, bepalen de AI-kansen met de hoogste impact en vertalen die naar een concrete roadmap met een 90-dagenplan. U krijgt ook een AI-beleid op maat, zodat iedereen in uw team met dezelfde spelregels werkt.",
        "Het aanvragen hoeft geen administratieve last te zijn. U vult ons korte formulier in, wij bekijken samen of uw kmo in aanmerking komt en helpen u met het papierwerk. De meeste teams starten binnen twee weken na het eerste gesprek.",
      ],
    },
    benefits: {
      eyebrow: "Waarom nu",
      heading: "Waarom de KMO-portefeuille inzetten voor een AI-traject",
      items: [
        {
          title: "Tot 70% van de kost terug",
          body: "De meeste Vlaamse kmo's recupereren tot 70% van de programmakost van Start AI via de KMO-portefeuille. Zo wordt een doordachte AI-strategie haalbaar voor bedrijven die geen eigen AI-team hebben.",
        },
        {
          title: "Een erkende dienstverlener",
          body: "Wonka is erkend voor de KMO-portefeuille. U hoeft dus geen aparte partner te zoeken om van de subsidie te genieten: het advies en de begeleiding komen van hetzelfde team dat daarna ook kan bouwen.",
        },
        {
          title: "Van AI-hype naar een plan",
          body: "In plaats van losse experimenten krijgt u geprioriteerde business cases, quick wins en een roadmap: wat eerst, wat later en waarom. Een plan dat u kunt voorleggen aan uw directie.",
        },
        {
          title: "Uw hele team mee",
          body: "AI blijft vaak hangen bij een paar pioniers. Start AI brengt directie en teams op dezelfde lijn, met een prompting workshop en duidelijke afspraken over hoe u AI inzet.",
        },
        {
          title: "Veilig en verantwoord",
          body: "U krijgt een AI-beleid en governance-kader op maat, zodat vertrouwelijke gegevens beschermd blijven en iedereen weet wat wel en niet mag. Wonka is ISO 27001-gecertificeerd en AVG-conform.",
        },
        {
          title: "Wij regelen het papierwerk",
          body: "Subsidies aanvragen kost tijd. Wij helpen u met de administratie rond de KMO-portefeuille, zodat u zich kunt concentreren op de inhoud van het traject.",
        },
      ],
    },
    useCases: {
      eyebrow: "Wat u krijgt",
      heading: "Wat een gesubsidieerd AI-traject u oplevert",
      items: [
        {
          title: "Een AI-readiness assessment",
          body: "Een helder beeld van waar uw organisatie vandaag staat: processen, data, tools en de bereidheid van uw team om met AI te werken.",
        },
        {
          title: "Geprioriteerde AI-business cases",
          body: "De AI-kansen met het hoogste rendement, inclusief een berekening van de ROI, zodat u weet waar u eerst moet investeren.",
        },
        {
          title: "Een concrete AI-roadmap en 90-dagenplan",
          body: "Wat u implementeert, in welke volgorde en waarom, met een uitvoeringsplan voor de eerste 90 dagen en een presentatie voor uw directie.",
          link: { label: "Meer over Start AI", href: "/nl/start-ai" },
        },
        {
          title: "Een AI-beleid op maat",
          body: "Richtlijnen en governance zodat alles wat volgt binnen het juiste kader gebeurt, met advies over training, tooling en investeringen.",
        },
        {
          title: "Quick wins en concepten voor AI-agents",
          body: "Kansen waarmee uw team meteen aan de slag kan, en de plekken waar AI-assistenten of agents op maat het meeste waarde leveren.",
          link: { label: "Wat AI-agents voor u kunnen doen", href: "/nl/ai-agents" },
        },
      ],
    },
    process: {
      eyebrow: "Stappenplan",
      heading: "In vijf stappen van aanvraag tot AI-roadmap",
      steps: [
        {
          title: "Controleer of uw kmo in aanmerking komt",
          body: "De KMO-portefeuille is bedoeld voor Vlaamse kmo's. Twijfelt u? Wij bekijken het samen met u tijdens het eerste gesprek.",
        },
        {
          title: "Plan een gesprek van 30 minuten",
          body: "Geen slides en geen pitch: een echt gesprek over uw bedrijf, uw vragen rond AI en wat Start AI voor u kan betekenen.",
        },
        {
          title: "Vraag de subsidie aan",
          body: "Via ons korte formulier start u de aanvraag. Wij helpen u met het papierwerk rond de KMO-portefeuille.",
        },
        {
          title: "Start AI begint",
          body: "De meeste teams starten binnen twee weken: intake, een halve dag kick-off met prompting workshop, diepte-interviews en analyse van uw processen.",
        },
        {
          title: "U krijgt uw roadmap",
          body: "Een geprioriteerde roadmap, een 90-dagenplan en een AI-beleid op maat. Wilt u daarna verder, dan kan hetzelfde team de eerste toepassingen bouwen.",
        },
      ],
    },
    faq: {
      heading: "Veelgestelde vragen over de KMO-portefeuille voor AI",
      items: [
        {
          question: "Wat is de KMO-portefeuille?",
          answer:
            "De KMO-portefeuille is een subsidiemaatregel van VLAIO, het Vlaams Agentschap Innoveren & Ondernemen. Vlaamse kmo's krijgen er financiële steun mee voor opleiding en advies bij erkende dienstverleners. Wonka is zo'n erkende dienstverlener, waardoor u de KMO-portefeuille kunt gebruiken voor Start AI.",
        },
        {
          question: "Kan ik de KMO-portefeuille gebruiken voor een AI-project?",
          answer:
            "Ja, voor advies en opleiding bij een erkende dienstverlener. Start AI, ons traject naar een AI-strategie, roadmap en AI-beleid, komt in aanmerking. De meeste Vlaamse kmo's recupereren zo tot 70% van de programmakost.",
        },
        {
          question: "Hoeveel kost Start AI na subsidie?",
          answer:
            "Start AI-programma's beginnen bij €15.000. Via de KMO-portefeuille recupereren de meeste Vlaamse kmo's tot 70% van die kost. Het exacte bedrag hangt af van uw onderneming en de voorwaarden van VLAIO; we bekijken het samen tijdens het eerste gesprek.",
        },
        {
          question: "Komt mijn bedrijf in aanmerking voor de KMO-portefeuille?",
          answer:
            "De KMO-portefeuille richt zich op kmo's in Vlaanderen. Of uw onderneming in aanmerking komt, hangt af van de voorwaarden van VLAIO. Vraag de subsidie aan via ons formulier of plan een gesprek, dan controleren we het samen.",
        },
        {
          question: "Hoe vraag ik de KMO-portefeuille aan voor Start AI?",
          answer:
            "Klik op 'Subsidie aanvragen' en vul het korte formulier in. Wij nemen contact met u op, bekijken of uw kmo in aanmerking komt en helpen u met het papierwerk. U kunt ook meteen een gesprek van 30 minuten inplannen met ons team.",
        },
        {
          question: "Hoe snel kunnen we starten?",
          answer:
            "De meeste teams starten binnen twee weken na het eerste gesprek. Het traject begint met een intake en een halve dag kick-off, en eindigt met een concreet actieplan en een 90-dagenplan dat u meteen kunt uitvoeren.",
        },
        {
          question: "Wat gebeurt er na Start AI?",
          answer:
            "U kiest zelf. Met de roadmap kunt u intern verder, of hetzelfde team bouwt de eerste AI-toepassingen met Wonka Build en rolt WonkaChat uit als veilige AI-werkplek voor uw hele organisatie.",
        },
      ],
    },
    related: {
      heading: "Verder lezen",
      links: [
        {
          label: "Start AI in Vlaanderen",
          href: "/services/start-ai-subsidized-flanders",
          description: "Het volledige programma, met reviews van deelnemers.",
        },
        {
          label: "Start AI",
          href: "/nl/start-ai",
          description: "Onze aanpak voor een AI-strategie en roadmap.",
        },
        {
          label: "AI voor bedrijven",
          href: "/nl/ai-voor-bedrijven",
          description: "Wat AI concreet kan betekenen voor uw organisatie.",
        },
        {
          label: "AI-consultancy",
          href: "/nl/ai-consultancy",
          description: "Van strategie tot AI-agents die in productie draaien.",
        },
        {
          label: "Wonka Build",
          href: "/nl/wonka-build",
          description: "AI-toepassingen op maat, na uw roadmap.",
        },
        {
          label: "Klantcases",
          href: "/nl/klantcases",
          description: "Hoe andere bedrijven AI in de praktijk inzetten.",
        },
      ],
    },
    cta: {
      heading: "Klaar om AI te starten met subsidie?",
      body: "Plan een gesprek van 30 minuten. We bekijken samen of uw kmo in aanmerking komt voor de KMO-portefeuille en wat Start AI voor u kan betekenen.",
    },
  },
};
