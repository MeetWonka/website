/**
 * Seed blog posts, glossary terms, comparisons, and connector pages.
 * Usage: bun run ./scripts/seed-content.ts
 */

import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env");
try {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// ── Helpers ─────────────────────────────────────────────────────────────────

let _k = 0;
const k = () => `k${++_k}`;

const p = (text: string) => ({
  _type: "block", _key: k(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const h2 = (text: string) => ({
  _type: "block", _key: k(), style: "h2", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const faq = (q: string, a: string) => ({ _type: "faqItem", _key: k(), question: q, answer: a });
const slug = (s: string) => ({ _type: "slug", current: s });
const seo = (title: string, desc: string) => ({ _type: "seo", metaTitle: title, metaDescription: desc });

// ── Blog Posts ───────────────────────────────────────────────────────────────

const blogPosts = [
  {
    slug: "why-microsoft-copilot-is-not-enough",
    en: {
      title: "Why Microsoft Copilot Isn't Enough for European Enterprises",
      excerpt: "Microsoft Copilot is everywhere — but for European companies bound by GDPR and data sovereignty requirements, it raises serious questions. Here's what you need to know.",
      category: "ai-strategy",
      tags: ["copilot", "rgpd", "souveraineté", "microsoft"],
      body: [
        h2("The Copilot promise — and its limits"),
        p("Microsoft Copilot has been aggressively marketed as the AI layer for Office 365. It summarizes emails, drafts documents, and answers questions from your data. For many teams, the productivity gains are real."),
        p("But for European enterprises — especially those in regulated sectors like finance, legal, or healthcare — the underlying architecture raises a critical question: where does your data actually go?"),
        h2("Your data leaves your walls"),
        p("Copilot is built on Azure OpenAI. When your employees use it, their queries — and the context pulled from your files, emails, and chats — are processed on Microsoft's infrastructure. Microsoft has made commitments around data residency, but the LLM itself runs in their environment."),
        p("For companies subject to strict GDPR compliance, sector-specific regulations, or clients who require data sovereignty contractually, this is a showstopper — not a minor concern."),
        h2("What the alternative looks like"),
        p("A private LLM deployment means the model runs inside your own infrastructure — your cloud VPC, your on-premise servers, or a dedicated environment you control entirely. No query leaves your perimeter. No Microsoft, no OpenAI, no third party sees your data."),
        p("Wonka AI deploys exactly this: a private AI assistant connected to your existing tools (Outlook, SharePoint, Salesforce, Slack) that processes everything within your environment. The user experience is identical to Copilot. The data handling is fundamentally different."),
        h2("The decision framework"),
        p("If your organization handles sensitive client data, operates under GDPR or sector-specific regulations, or has clients who require data sovereignty clauses — Copilot is not the right answer. If your priority is simplicity and your data risk profile is low, Copilot may be sufficient."),
        p("The question is not 'is Copilot useful?' It clearly is. The question is 'can your organization accept the data handling implications?' For most European enterprises, the answer is no."),
      ],
      faq: [
        faq("Does Microsoft Copilot comply with GDPR?", "Microsoft offers GDPR compliance commitments and data residency options for Copilot. However, your data is still processed on Microsoft's infrastructure, which means it leaves your organization's control. For many regulated European enterprises, this is insufficient."),
        faq("What is a private LLM?", "A private LLM is a large language model deployed entirely within your own infrastructure — your servers, your cloud environment. No data is sent to external providers. You get the same AI capabilities as Copilot, with full data sovereignty."),
        faq("Can Wonka AI replace Microsoft Copilot?", "Yes. Wonka AI connects to the same tools (Outlook, SharePoint, Teams, Salesforce) and provides the same core capabilities — email summarization, document Q&A, meeting notes, drafting — but runs entirely in your infrastructure."),
      ],
      seo: seo("Why Microsoft Copilot Isn't Enough for European Enterprises | Wonka AI", "Microsoft Copilot sends your data to Microsoft servers. For European enterprises bound by GDPR and sovereignty requirements, a private LLM is the only viable alternative."),
    },
    fr: {
      title: "Pourquoi Microsoft Copilot ne suffit pas pour les entreprises européennes",
      excerpt: "Microsoft Copilot est partout — mais pour les entreprises européennes soumises au RGPD et aux exigences de souveraineté des données, il soulève des questions sérieuses.",
      category: "ai-strategy",
      tags: ["copilot", "rgpd", "souveraineté", "microsoft"],
      body: [
        h2("La promesse Copilot — et ses limites"),
        p("Microsoft Copilot est commercialisé comme la couche IA pour Office 365. Il résume des emails, rédige des documents et répond aux questions à partir de vos données. Pour de nombreuses équipes, les gains de productivité sont réels."),
        p("Mais pour les entreprises européennes — en particulier dans des secteurs réglementés comme la finance, le droit ou la santé — l'architecture sous-jacente soulève une question critique : où vont réellement vos données ?"),
        h2("Vos données quittent vos murs"),
        p("Copilot repose sur Azure OpenAI. Quand vos employés l'utilisent, leurs requêtes — et le contexte tiré de vos fichiers, emails et chats — sont traités sur l'infrastructure de Microsoft. Aucune requête ne reste dans votre périmètre."),
        p("Pour les entreprises soumises à un RGPD strict, à des réglementations sectorielles ou à des clients exigeant contractuellement la souveraineté des données, c'est rédhibitoire — pas une préoccupation mineure."),
        h2("À quoi ressemble l'alternative"),
        p("Un déploiement LLM privé signifie que le modèle tourne dans votre propre infrastructure — votre VPC cloud, vos serveurs on-premise ou un environnement dédié que vous contrôlez entièrement. Aucune requête ne quitte votre périmètre."),
        p("Wonka AI déploie exactement cela : un assistant IA privé connecté à vos outils existants (Outlook, SharePoint, Salesforce, Slack) qui traite tout dans votre environnement. L'expérience utilisateur est identique à Copilot. La gestion des données est fondamentalement différente."),
        h2("Le cadre de décision"),
        p("Si votre organisation traite des données clients sensibles, opère sous RGPD ou des réglementations sectorielles, ou a des clients qui exigent des clauses de souveraineté des données — Copilot n'est pas la bonne réponse."),
      ],
      faq: [
        faq("Microsoft Copilot est-il conforme au RGPD ?", "Microsoft offre des engagements de conformité RGPD et des options de résidence des données pour Copilot. Cependant, vos données sont quand même traitées sur l'infrastructure de Microsoft, ce qui signifie qu'elles quittent le contrôle de votre organisation."),
        faq("Qu'est-ce qu'un LLM privé ?", "Un LLM privé est un grand modèle de langage déployé entièrement dans votre propre infrastructure. Aucune donnée n'est envoyée à des fournisseurs externes. Vous bénéficiez des mêmes capacités IA que Copilot, avec une souveraineté totale des données."),
        faq("Wonka AI peut-il remplacer Microsoft Copilot ?", "Oui. Wonka AI se connecte aux mêmes outils (Outlook, SharePoint, Teams, Salesforce) et offre les mêmes capacités principales, mais tourne entièrement dans votre infrastructure."),
      ],
      seo: seo("Pourquoi Microsoft Copilot ne suffit pas pour les entreprises européennes | Wonka AI", "Microsoft Copilot envoie vos données aux serveurs Microsoft. Pour les entreprises européennes soumises au RGPD, un LLM privé est la seule alternative viable."),
    },
    nl: {
      title: "Waarom Microsoft Copilot niet genoeg is voor Europese ondernemingen",
      excerpt: "Microsoft Copilot is overal — maar voor Europese bedrijven die gebonden zijn aan GDPR en gegevenssouvereiniteit, roept het serieuze vragen op.",
      category: "ai-strategy",
      tags: ["copilot", "avg", "soevereiniteit", "microsoft"],
      body: [
        h2("De Copilot-belofte — en de beperkingen ervan"),
        p("Microsoft Copilot wordt aangeboden als de AI-laag voor Office 365. Het vat e-mails samen, stelt documenten op en beantwoordt vragen vanuit uw data. Voor veel teams zijn de productiviteitswinsten reëel."),
        p("Maar voor Europese ondernemingen — vooral in gereguleerde sectoren zoals financiën, recht of gezondheidszorg — stelt de onderliggende architectuur een kritische vraag: waar gaan uw gegevens eigenlijk naartoe?"),
        h2("Uw gegevens verlaten uw muren"),
        p("Copilot is gebouwd op Azure OpenAI. Wanneer uw medewerkers het gebruiken, worden hun vragen — en de context uit uw bestanden, e-mails en chats — verwerkt op de infrastructuur van Microsoft."),
        p("Voor bedrijven die onderworpen zijn aan strikte AVG-naleving, sectorspecifieke regelgeving of klanten die contractueel gegevenssouvereiniteit vereisen, is dit een dealbreaker."),
        h2("Hoe het alternatief eruitziet"),
        p("Een private LLM-implementatie betekent dat het model draait binnen uw eigen infrastructuur. Geen query verlaat uw perimeter. Geen Microsoft, geen OpenAI, geen derde partij ziet uw data."),
      ],
      faq: [
        faq("Voldoet Microsoft Copilot aan de AVG?", "Microsoft biedt AVG-nalevingsengagementen en opties voor gegevenslocatie voor Copilot. Uw gegevens worden echter nog steeds verwerkt op de infrastructuur van Microsoft, wat betekent dat ze de controle van uw organisatie verlaten."),
        faq("Wat is een private LLM?", "Een private LLM is een groot taalmodel dat volledig binnen uw eigen infrastructuur wordt ingezet. Er worden geen gegevens naar externe providers gestuurd. U krijgt dezelfde AI-mogelijkheden als Copilot, met volledige gegevenssouvereiniteit."),
        faq("Kan Wonka AI Microsoft Copilot vervangen?", "Ja. Wonka AI verbindt met dezelfde tools (Outlook, SharePoint, Teams, Salesforce) en biedt dezelfde kernmogelijkheden, maar draait volledig in uw infrastructuur."),
      ],
      seo: seo("Waarom Microsoft Copilot niet genoeg is voor Europese ondernemingen | Wonka AI", "Microsoft Copilot stuurt uw gegevens naar Microsoft-servers. Voor Europese ondernemingen die gebonden zijn aan AVG, is een private LLM het enige haalbare alternatief."),
    },
  },
  {
    slug: "how-to-choose-enterprise-ai-model",
    en: {
      title: "How to Choose the Right AI Model for Your Enterprise in 2026",
      excerpt: "Open source or proprietary? Cloud or on-premise? 7B or 70B? The enterprise AI model decision is more nuanced than vendor pitches suggest. Here's the framework we use to help clients navigate it.",
      category: "ai-strategy",
      tags: ["ai-model", "open-source", "enterprise-ai", "llm-selection"],
      body: [
        h2("Why model selection matters more than most people think"),
        p("Most enterprise AI projects fail not because the technology doesn't work, but because the wrong model was chosen for the use case. A frontier model used for a simple classification task wastes budget. A small open model used for complex legal reasoning produces unreliable outputs. The mismatch between model capability and task complexity is the most common and most costly mistake in enterprise AI."),
        p("This guide gives you a practical decision framework to match model capabilities to your specific use cases, budget, and data handling requirements."),
        h2("The three axes that matter"),
        p("Task complexity: Is your use case primarily retrieval (finding and summarizing existing content), generation (drafting new content), or reasoning (drawing inferences, analyzing arguments, making decisions)? Retrieval tasks can run efficiently on smaller models. Reasoning tasks typically require larger, more capable models."),
        p("Data sensitivity: Does your use case involve confidential client data, personal data subject to GDPR, proprietary business information, or regulated information (medical, legal, financial)? If yes, you need either a private deployment or a provider with strong contractual data protections and EU data residency. This constraint eliminates most consumer-grade public APIs."),
        p("Scale and latency requirements: How many requests per day? What response time is acceptable? High-volume, low-latency use cases (customer support, real-time assistance) favor smaller, faster models. Low-volume, high-accuracy use cases (legal review, strategic analysis) can afford slower, larger models."),
        h2("Open source vs. proprietary: the real trade-offs"),
        p("Proprietary frontier models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro) offer the highest general capability with minimal deployment overhead. The trade-off: your data passes through the provider's infrastructure, and you depend on their pricing, uptime, and roadmap decisions."),
        p("Open models (Llama 3.1 70B, Mistral Large, Qwen 2.5 72B) can be deployed entirely within your infrastructure. Quality has closed significantly — on many enterprise tasks, a well-configured Llama 3.1 70B with RAG matches GPT-4 performance while keeping data fully private. The trade-off: higher infrastructure cost and deployment complexity."),
        h2("The decision matrix"),
        p("Low sensitivity, low complexity: public API, small model (GPT-4o mini, Claude Haiku). Fast, cheap, no data concerns. Good for internal productivity tools, low-stakes automation."),
        p("High sensitivity, any complexity: private deployment, open model (Llama 3.1 70B+ or Mistral Large). Data stays in your environment. Wonka AI handles the deployment and infrastructure layer."),
        p("Low sensitivity, high complexity: public API, frontier model. Complex reasoning, strategic analysis, creative work where data risk is low."),
        p("High sensitivity, high complexity: private deployment, largest available open model or dedicated fine-tuned model. Highest cost, highest capability, full data sovereignty."),
      ],
      faq: [
        faq("Can open-source models match GPT-4 quality for enterprise tasks?", "For most enterprise tasks — document Q&A, summarization, structured extraction, customer communication — yes. Llama 3.1 70B and Mistral Large match or approach GPT-4 performance on these tasks when combined with good RAG infrastructure. The gap is more pronounced on open-ended complex reasoning."),
        faq("What hardware do you need to run a 70B parameter model?", "A 70B model in 4-bit quantization requires approximately 40GB of GPU VRAM. In practice, this means 2-4 A100 or H100 GPUs, or an equivalent cloud GPU instance (AWS p4, Azure NC, GCP A2). For most enterprises, cloud-based private deployment is more cost-effective than on-premise GPU infrastructure."),
        faq("How often should we re-evaluate our model choice?", "The open-source model landscape evolves quickly. We recommend reviewing your model selection every 6 months. A model that was the right choice 12 months ago may have been surpassed by newer open models at lower infrastructure cost."),
      ],
      seo: seo("How to Choose the Right Enterprise AI Model in 2026 | Wonka AI", "Open or proprietary? Cloud or on-premise? A practical decision framework for selecting the right AI model for your enterprise use case, budget, and data requirements."),
    },
    fr: {
      title: "Comment choisir le bon modèle IA pour votre entreprise en 2026",
      excerpt: "Open source ou propriétaire ? Cloud ou on-premise ? 7 ou 70 milliards de paramètres ? Le choix du modèle IA en entreprise est plus nuancé que les pitches commerciaux ne le suggèrent. Voici notre cadre de décision.",
      category: "ai-strategy",
      tags: ["modèle-ia", "open-source", "ia-entreprise", "sélection-llm"],
      body: [
        h2("Pourquoi le choix du modèle compte plus qu'on ne le pense"),
        p("La plupart des projets IA en entreprise échouent non pas parce que la technologie ne fonctionne pas, mais parce que le mauvais modèle a été choisi pour le cas d'usage. Un modèle frontier utilisé pour une tâche de classification simple gaspille le budget. Un petit modèle open source utilisé pour un raisonnement juridique complexe produit des résultats peu fiables."),
        p("Ce guide vous donne un cadre de décision pratique pour faire correspondre les capacités du modèle à vos cas d'usage spécifiques, votre budget et vos exigences de traitement des données."),
        h2("Les trois axes qui comptent"),
        p("Complexité de la tâche : votre cas d'usage est-il principalement de la récupération (trouver et résumer du contenu existant), de la génération (rédiger du nouveau contenu) ou du raisonnement (tirer des inférences, analyser des arguments) ? Les tâches de récupération peuvent être exécutées efficacement sur des modèles plus petits. Les tâches de raisonnement nécessitent généralement des modèles plus grands."),
        p("Sensibilité des données : votre cas d'usage implique-t-il des données clients confidentielles, des données personnelles soumises au RGPD ou des informations réglementées ? Si oui, vous avez besoin d'un déploiement privé ou d'un fournisseur avec de solides protections contractuelles et résidence des données en UE."),
        p("Exigences de volume et de latence : combien de requêtes par jour ? Les cas d'usage à volume élevé et faible latence favorisent les modèles plus petits et plus rapides. Les cas d'usage à faible volume et haute précision peuvent se permettre des modèles plus lents et plus grands."),
        h2("Open source vs propriétaire : les vrais compromis"),
        p("Les modèles frontier propriétaires (GPT-4o, Claude 3.5 Sonnet) offrent la plus haute capacité générale avec un overhead de déploiement minimal. Le compromis : vos données passent par l'infrastructure du fournisseur."),
        p("Les modèles open source (Llama 3.1 70B, Mistral Large, Qwen 2.5 72B) peuvent être déployés entièrement dans votre infrastructure. La qualité a considérablement rattrapé son retard. Le compromis : coût d'infrastructure plus élevé et complexité de déploiement."),
        h2("La matrice de décision"),
        p("Faible sensibilité, faible complexité : API publique, petit modèle. Rapide, économique, sans risque pour les données."),
        p("Haute sensibilité, toute complexité : déploiement privé, modèle open source. Les données restent dans votre environnement. Wonka AI gère la couche déploiement."),
        p("Faible sensibilité, haute complexité : API publique, modèle frontier. Raisonnement complexe où le risque données est faible."),
        p("Haute sensibilité, haute complexité : déploiement privé, plus grand modèle disponible. Coût le plus élevé, capacité maximale, souveraineté totale des données."),
      ],
      faq: [
        faq("Les modèles open source peuvent-ils égaler GPT-4 pour les tâches enterprise ?", "Pour la plupart des tâches enterprise — Q&R documentaire, résumé, extraction structurée — oui. Llama 3.1 70B et Mistral Large atteignent ou approchent les performances de GPT-4 sur ces tâches combinés à une bonne infrastructure RAG."),
        faq("Quel matériel faut-il pour faire tourner un modèle de 70 milliards de paramètres ?", "Un modèle 70B en quantification 4 bits nécessite environ 40 Go de VRAM GPU, soit 2 à 4 GPU A100 ou H100. Pour la plupart des entreprises, le déploiement privé basé sur le cloud est plus rentable que l'infrastructure GPU on-premise."),
        faq("À quelle fréquence faut-il réévaluer son choix de modèle ?", "Le paysage des modèles open source évolue rapidement. Nous recommandons de revoir votre sélection de modèle tous les 6 mois."),
      ],
      seo: seo("Comment choisir le bon modèle IA pour votre entreprise en 2026 | Wonka AI", "Open source ou propriétaire ? Cloud ou on-premise ? Un cadre de décision pratique pour choisir le bon modèle IA en entreprise selon votre cas d'usage et vos exigences de données."),
    },
    nl: {
      title: "Hoe kiest u het juiste AI-model voor uw onderneming in 2026",
      excerpt: "Open source of propriëtair? Cloud of on-premise? 7 of 70 miljard parameters? De keuze van het enterprise AI-model is genuanceerder dan leveranciersgesprekken doen vermoeden. Dit is ons beslisserskader.",
      category: "ai-strategy",
      tags: ["ai-model", "open-source", "enterprise-ai", "llm-selectie"],
      body: [
        h2("Waarom modelkeuze er meer toe doet dan de meeste mensen denken"),
        p("De meeste enterprise AI-projecten mislukken niet omdat de technologie niet werkt, maar omdat het verkeerde model voor de use case is gekozen. Een frontiermodel gebruikt voor een eenvoudige classificatietaak verspilt budget. Een klein open model gebruikt voor complexe juridische redenering produceert onbetrouwbare resultaten."),
        p("Deze gids geeft u een praktisch beslisserskader om modelcapaciteiten te koppelen aan uw specifieke use cases, budget en gegevensverwerkingsvereisten."),
        h2("De drie assen die tellen"),
        p("Taakcomplexiteit: is uw use case primair retrieval (bestaande inhoud vinden en samenvatten), generatie (nieuwe inhoud opstellen) of redenering (inferenties trekken, argumenten analyseren)? Retrievaltaken draaien efficiënt op kleinere modellen. Redeneertaken vereisen doorgaans grotere modellen."),
        p("Gegevensgevoeligheid: betreft uw use case vertrouwelijke klantgegevens, persoonsgegevens die onder AVG vallen, of gereguleerde informatie? Zo ja, heeft u een private implementatie nodig of een aanbieder met sterke contractuele gegevensbescherming en EU-gegevenslocatie."),
        p("Volume- en latentievereisten: hoeveel verzoeken per dag? Use cases met hoog volume en lage latentie vereisen kleinere, snellere modellen. Use cases met laag volume en hoge nauwkeurigheid kunnen grotere, langzamere modellen gebruiken."),
        h2("Open source vs. propriëtair: de echte afwegingen"),
        p("Propriëtaire frontiermodellen (GPT-4o, Claude 3.5 Sonnet) bieden de hoogste algemene capaciteit met minimale implementatie-overhead. De afweging: uw gegevens passeren de infrastructuur van de aanbieder."),
        p("Open modellen (Llama 3.1 70B, Mistral Large, Qwen 2.5 72B) kunnen volledig binnen uw eigen infrastructuur worden ingezet. De kwaliteit heeft een significante inhaalslag gemaakt."),
        h2("De beslissingsmatrix"),
        p("Lage gevoeligheid, lage complexiteit: publieke API, klein model. Snel, goedkoop, geen datarisico's."),
        p("Hoge gevoeligheid, welke complexiteit dan ook: private implementatie, open model. Gegevens blijven in uw omgeving. Wonka AI regelt de implementatielaag."),
        p("Lage gevoeligheid, hoge complexiteit: publieke API, frontiermodel. Complexe redenering waar datarisico laag is."),
        p("Hoge gevoeligheid, hoge complexiteit: private implementatie, grootste beschikbare model. Hoogste kosten, maximale capaciteit, volledige gegevenssouvereiniteit."),
      ],
      faq: [
        faq("Kunnen open-source modellen GPT-4-kwaliteit evenaren voor enterprise taken?", "Voor de meeste enterprise taken — document Q&A, samenvatting, gestructureerde extractie — ja. Llama 3.1 70B en Mistral Large benaderen GPT-4-prestaties op deze taken gecombineerd met goede RAG-infrastructuur."),
        faq("Welke hardware heeft u nodig voor een model van 70 miljard parameters?", "Een 70B model in 4-bit kwantisering vereist ongeveer 40GB GPU VRAM, ofwel 2-4 A100 of H100 GPU's. Voor de meeste ondernemingen is cloudgebaseerde private implementatie kosteneffectiever dan on-premise GPU-infrastructuur."),
        faq("Hoe vaak moet u uw modelkeuze heroverwegen?", "Het open-source modellandschap evolueert snel. We raden aan uw modelselectie elke 6 maanden te herzien."),
      ],
      seo: seo("Hoe kiest u het juiste enterprise AI-model in 2026 | Wonka AI", "Open source of propriëtair? Cloud of on-premise? Een praktisch beslisserskader voor het kiezen van het juiste AI-model voor uw enterprise use case en gegevensvereisten."),
    },
  },
  {
    slug: "how-to-calculate-roi-enterprise-ai",
    en: {
      title: "How to Calculate the ROI of Enterprise AI: A Practical Framework",
      excerpt: "Every AI vendor promises productivity gains. Few give you a concrete method to measure them. Here's the framework we use with clients to calculate actual ROI before committing to a deployment.",
      category: "ai-strategy",
      tags: ["roi", "ia-entreprise", "productivité", "déploiement"],
      body: [
        h2("Why most AI ROI calculations are wrong"),
        p("The standard approach: 'Our AI saves each employee 2 hours per week. We have 500 employees. At an average salary of €60K, that's €30M in annual savings.' This is almost always wrong — or at least deeply misleading."),
        p("Time saved is not money saved. Time that was spent on low-value tasks gets reallocated to other low-value tasks unless you actively redesign workflows. The question is not 'how much time does AI save?' but 'what happens with that time?'"),
        h2("The four ROI levers that actually matter"),
        p("Revenue acceleration: AI that helps sales teams qualify leads faster, respond to prospects more quickly, or personalize outreach at scale directly impacts revenue. This is measurable. Track time-to-first-response, lead qualification rate, and deal velocity before and after."),
        p("Cost avoidance: AI that handles tier-1 support queries, automates document processing, or reduces manual data entry has a clear cost model. Count the FTE hours redirected and the error rate reduction."),
        p("Risk reduction: For legal, compliance, and financial teams, AI that catches errors or surfaces relevant precedents has a risk-adjusted value. This requires modeling the cost of errors you're currently making."),
        p("Talent retention: This is undervalued. Teams that use well-implemented AI tools report higher job satisfaction. Reducing turnover for specialized roles has enormous financial impact."),
        h2("The measurement framework"),
        p("Before deployment, baseline three metrics for your target use case: current time spent on the task, current error rate or quality score, and current throughput. After 90 days of AI deployment, measure the same metrics. The delta — adjusted for implementation cost and change management — is your actual ROI."),
        p("A realistic enterprise AI deployment pays for itself in 8-18 months for most use cases. Deployments targeting high-volume, high-repetition tasks (support, document processing) tend to pay back faster. Strategic use cases (market analysis, complex writing) take longer but compound more."),
      ],
      faq: [
        faq("What's a realistic ROI timeline for enterprise AI?", "Most enterprise AI deployments show measurable ROI within 8-18 months. High-volume, repetitive task automation (support, document processing) often reaches payback within 6 months. Strategic use cases take longer but deliver compounding returns."),
        faq("How do you account for implementation costs in AI ROI?", "Total cost of ownership includes: licensing fees, integration/deployment work (typically 2-4 weeks of engineering time for a private LLM deployment), change management and training (often underestimated at 20-30% of total project cost), and ongoing maintenance."),
        faq("What's the biggest mistake companies make when measuring AI ROI?", "Measuring time saved rather than value created. Time saved only converts to ROI when workflows are actively redesigned to redirect that capacity. Build the workflow redesign into the deployment plan, not as an afterthought."),
      ],
      seo: seo("How to Calculate Enterprise AI ROI: A Practical Framework | Wonka AI", "Stop guessing. Use this concrete framework to calculate the real ROI of your enterprise AI deployment — before you commit."),
    },
    fr: {
      title: "Comment calculer le ROI de l'IA en entreprise : un cadre pratique",
      excerpt: "Chaque éditeur IA promet des gains de productivité. Peu donnent une méthode concrète pour les mesurer. Voici le cadre que nous utilisons avec nos clients pour calculer le ROI réel avant de s'engager dans un déploiement.",
      category: "ai-strategy",
      tags: ["roi", "ia-entreprise", "productivité", "déploiement"],
      body: [
        h2("Pourquoi la plupart des calculs de ROI IA sont faux"),
        p("L'approche standard : 'Notre IA fait gagner 2 heures par semaine à chaque employé. Nous avons 500 employés. Avec un salaire moyen de 60K€, ça représente 30M€ d'économies annuelles.' C'est presque toujours faux — ou du moins profondément trompeur."),
        p("Le temps économisé n'est pas de l'argent économisé. Le temps autrefois consacré à des tâches à faible valeur est réalloué à d'autres tâches à faible valeur, sauf si vous repensez activement les flux de travail."),
        h2("Les quatre leviers ROI qui comptent vraiment"),
        p("Accélération des revenus : une IA qui aide les équipes commerciales à qualifier les prospects plus rapidement, à répondre plus vite ou à personnaliser l'outreach à grande échelle impacte directement les revenus."),
        p("Évitement des coûts : une IA qui gère les requêtes de support de niveau 1, automatise le traitement des documents ou réduit la saisie manuelle a un modèle de coût clair."),
        p("Réduction des risques : pour les équipes juridiques, compliance et financières, une IA qui détecte les erreurs a une valeur ajustée au risque."),
        p("Rétention des talents : sous-évalué. Les équipes qui utilisent des outils IA bien déployés rapportent une satisfaction au travail plus élevée."),
      ],
      faq: [
        faq("Quel est un délai de ROI réaliste pour l'IA en entreprise ?", "La plupart des déploiements IA en entreprise montrent un ROI mesurable dans les 8 à 18 mois. L'automatisation de tâches répétitives à volume élevé atteint souvent le retour sur investissement en 6 mois."),
        faq("Comment tenir compte des coûts de déploiement dans le ROI IA ?", "Le coût total de possession comprend : les frais de licence, le travail d'intégration/déploiement (2 à 4 semaines d'ingénierie pour un LLM privé), la gestion du changement et la formation (souvent 20-30% du coût total), et la maintenance continue."),
        faq("Quelle est la plus grande erreur dans la mesure du ROI IA ?", "Mesurer le temps économisé plutôt que la valeur créée. Le temps économisé ne se convertit en ROI que si les flux de travail sont activement repensés pour rediriger cette capacité."),
      ],
      seo: seo("Comment calculer le ROI de l'IA en entreprise : cadre pratique | Wonka AI", "Arrêtez de supposer. Utilisez ce cadre concret pour calculer le vrai ROI de votre déploiement IA en entreprise — avant de vous engager."),
    },
    nl: {
      title: "Hoe bereken je de ROI van enterprise AI: een praktisch kader",
      excerpt: "Elke AI-leverancier belooft productiviteitswinsten. Weinigen geven u een concrete methode om ze te meten. Dit is het kader dat we gebruiken met klanten om de werkelijke ROI te berekenen.",
      category: "ai-strategy",
      tags: ["roi", "enterprise-ai", "productiviteit", "implementatie"],
      body: [
        h2("Waarom de meeste AI ROI-berekeningen fout zijn"),
        p("De standaardbenadering: 'Onze AI bespaart elke medewerker 2 uur per week. We hebben 500 medewerkers. Bij een gemiddeld salaris van €60K is dat €30M aan jaarlijkse besparingen.' Dit is bijna altijd fout."),
        p("Bespaard tijd is geen bespaard geld. Tijd die werd besteed aan taken met lage waarde wordt herverdeeld naar andere taken met lage waarde, tenzij u workflows actief herontwerpt."),
        h2("De vier ROI-hefbomen die er werkelijk toe doen"),
        p("Omzetversnelling: AI die verkoopteams helpt leads sneller te kwalificeren of outreach op schaal te personaliseren, heeft directe impact op omzet."),
        p("Kostenpreventie: AI die tier-1 supportvragen afhandelt of documentverwerking automatiseert, heeft een duidelijk kostenmodel."),
        p("Risicoreductie: voor juridische en compliance-teams heeft AI die fouten opspoort een risicogecorrigeerde waarde."),
        p("Talentstrategie: teams die goed geïmplementeerde AI-tools gebruiken, rapporteren hogere werktevredenheid."),
      ],
      faq: [
        faq("Wat is een realistisch ROI-tijdlijn voor enterprise AI?", "De meeste enterprise AI-implementaties tonen meetbare ROI binnen 8-18 maanden. Automatisering van repetitieve taken bereikt vaak terugverdientijd binnen 6 maanden."),
        faq("Hoe houdt u rekening met implementatiekosten in AI ROI?", "Total cost of ownership omvat: licentiekosten, integratie/implementatiewerk (2-4 weken engineeringtijd voor een private LLM), change management en training (vaak 20-30% van totale projectkosten), en doorlopend onderhoud."),
        faq("Wat is de grootste fout bij het meten van AI ROI?", "Het meten van bespaarde tijd in plaats van gecreëerde waarde. Bespaarde tijd converteert alleen naar ROI als workflows actief worden herontworpen."),
      ],
      seo: seo("Hoe bereken je enterprise AI ROI: praktisch kader | Wonka AI", "Stop met gissen. Gebruik dit concrete kader om de werkelijke ROI van uw enterprise AI-implementatie te berekenen — voordat u zich vastlegt."),
    },
  },
];

// ── Glossary Terms ───────────────────────────────────────────────────────────

const glossaryTerms = [
  {
    slug: "llm",
    en: {
      term: "LLM (Large Language Model)",
      shortDefinition: "A large language model is an AI system trained on massive text datasets that can understand and generate human language. Examples include GPT-4, Claude, Llama, and Mistral.",
      body: [
        h2("What is an LLM?"),
        p("A large language model (LLM) is a type of artificial intelligence system built on transformer architecture and trained on billions of text examples. The 'large' refers to the model's parameter count — modern LLMs have hundreds of billions of parameters that encode statistical patterns about language."),
        p("LLMs can perform a wide range of language tasks without being explicitly programmed for each one: summarizing documents, answering questions, translating languages, writing code, generating reports, and extracting structured information from unstructured text."),
        h2("How LLMs work"),
        p("During training, the model processes enormous quantities of text — books, websites, scientific papers, code repositories — and learns to predict what word comes next in a sequence. Through this process, the model develops internal representations of concepts, facts, and reasoning patterns."),
        p("At inference time (when you use the model), you provide a prompt, and the model generates a response by predicting the most likely continuation given its training and your input. The quality of the output depends on the model size, training data quality, and how the prompt is structured."),
        h2("Private LLMs vs. public LLMs"),
        p("Public LLMs (like ChatGPT or Claude.ai accessed through a browser) process your inputs on the provider's servers. Private LLMs are deployed within your controlled infrastructure — Azure West Europe (Microsoft Ireland) by default for Wonka AI, with ISO 27001 certification and GDPR compliance, or on-premise as an Enterprise option. For enterprises handling sensitive data, private deployment is often required by GDPR obligations or contractual commitments to clients."),
      ],
      faq: [
        faq("What's the difference between an LLM and ChatGPT?", "ChatGPT is a product built by OpenAI on top of their GPT family of LLMs. An LLM is the underlying model technology. ChatGPT is one specific application; LLMs are the general technology class that powers it and many similar tools."),
        faq("What does it mean to deploy an LLM privately?", "Private deployment means running the LLM in your controlled infrastructure. Wonka AI deploys in Azure West Europe (Microsoft Ireland) by default, with GDPR compliance and ISO 27001 certification. On-premise deployment is available as an Enterprise option. Your data is processed within your environment, not by a third-party provider."),
        faq("How large does an LLM need to be for enterprise use?", "Model size is not the only factor. A smaller, well-fine-tuned model (7B-13B parameters) can outperform a larger general model on specific enterprise tasks. The right size depends on your use case, hardware constraints, and required response speed."),
      ],
      seo: seo("LLM (Large Language Model) — Definition & Enterprise Guide | Wonka AI", "What is an LLM? A plain-language explanation of large language models, how they work, and what private LLM deployment means for European enterprises."),
    },
    fr: {
      term: "LLM (Grand Modèle de Langage)",
      shortDefinition: "Un grand modèle de langage est un système IA entraîné sur d'immenses corpus de texte qui peut comprendre et générer du langage humain. Exemples : GPT-4, Claude, Llama, Mistral.",
      body: [
        h2("Qu'est-ce qu'un LLM ?"),
        p("Un grand modèle de langage (LLM) est un type de système d'intelligence artificielle construit sur une architecture transformer et entraîné sur des milliards d'exemples de texte. Le terme 'grand' fait référence au nombre de paramètres du modèle — les LLM modernes en ont des centaines de milliards."),
        p("Les LLM peuvent effectuer un large éventail de tâches linguistiques sans être explicitement programmés pour chacune : résumer des documents, répondre à des questions, traduire des langues, générer des rapports et extraire des informations structurées."),
        h2("Comment fonctionnent les LLM"),
        p("Pendant l'entraînement, le modèle traite d'énormes quantités de texte — livres, sites web, articles scientifiques — et apprend à prédire quel mot vient ensuite dans une séquence."),
        p("Au moment de l'inférence, vous fournissez une invite et le modèle génère une réponse en prédisant la suite la plus probable étant donné son entraînement et votre entrée."),
        h2("LLM privé vs LLM public"),
        p("Les LLM publics (comme ChatGPT) traitent vos entrées sur les serveurs du fournisseur. Les LLM privés sont déployés dans votre infrastructure contrôlée — Azure West Europe (Microsoft Irlande) par défaut pour Wonka AI, avec conformité RGPD et certification ISO 27001, ou on-premise en option Entreprise."),
      ],
      faq: [
        faq("Quelle est la différence entre un LLM et ChatGPT ?", "ChatGPT est un produit construit par OpenAI sur leur famille de LLM GPT. Un LLM est la technologie de modèle sous-jacente. ChatGPT est une application spécifique ; les LLM sont la classe technologique générale qui l'alimente."),
        faq("Que signifie déployer un LLM en mode privé ?", "Le déploiement privé signifie exécuter le LLM sur vos propres serveurs ou environnement cloud. Vos données ne quittent jamais votre infrastructure et ne sont jamais traitées par un fournisseur tiers."),
        faq("Quelle taille doit avoir un LLM pour un usage enterprise ?", "La taille du modèle n'est pas le seul facteur. Un modèle plus petit mais bien affiné (7 à 13 milliards de paramètres) peut surpasser un modèle général plus grand sur des tâches enterprise spécifiques."),
      ],
      seo: seo("LLM (Grand Modèle de Langage) — Définition & Guide Enterprise | Wonka AI", "Qu'est-ce qu'un LLM ? Explication simple des grands modèles de langage et ce que signifie le déploiement LLM privé pour les entreprises européennes."),
    },
    nl: {
      term: "LLM (Groot Taalmodel)",
      shortDefinition: "Een groot taalmodel is een AI-systeem getraind op enorme tekstdatasets dat menselijke taal kan begrijpen en genereren. Voorbeelden zijn GPT-4, Claude, Llama en Mistral.",
      body: [
        h2("Wat is een LLM?"),
        p("Een groot taalmodel (LLM) is een type kunstmatige intelligentiesysteem gebouwd op transformerarchitectuur en getraind op miljarden tekstvoorbeelden. Het woord 'groot' verwijst naar het aantal parameters van het model."),
        p("LLMs kunnen een breed scala aan taaltaken uitvoeren zonder expliciet voor elk te zijn geprogrammeerd: documenten samenvatten, vragen beantwoorden, talen vertalen en rapporten genereren."),
        h2("Hoe LLMs werken"),
        p("Tijdens training verwerkt het model enorme hoeveelheden tekst en leert het te voorspellen welk woord volgt in een reeks. Zo ontwikkelt het model interne representaties van concepten en redeneerpatronen."),
        h2("Private vs publieke LLMs"),
        p("Publieke LLMs verwerken uw invoer op de servers van de aanbieder. Private LLMs worden ingezet binnen uw eigen infrastructuur, zodat uw gegevens nooit uw controle verlaten."),
      ],
      faq: [
        faq("Wat is het verschil tussen een LLM en ChatGPT?", "ChatGPT is een product gebouwd door OpenAI op hun GPT-familie van LLMs. Een LLM is de onderliggende modeltechnologie. ChatGPT is één specifieke toepassing; LLMs zijn de algemene technologieklasse."),
        faq("Wat betekent het om een LLM privé te implementeren?", "Private implementatie betekent het uitvoeren van de LLM op uw eigen servers of cloudomgeving. Uw gegevens verlaten nooit uw infrastructuur en worden nooit verwerkt door een externe aanbieder."),
        faq("Hoe groot moet een LLM zijn voor enterprise gebruik?", "Modelgrootte is niet de enige factor. Een kleiner, goed afgestemd model kan een groter algemeen model overtreffen op specifieke enterprise taken."),
      ],
      seo: seo("LLM (Groot Taalmodel) — Definitie & Enterprise Gids | Wonka AI", "Wat is een LLM? Een duidelijke uitleg van grote taalmodellen en wat private LLM-implementatie betekent voor Europese ondernemingen."),
    },
  },
  {
    slug: "rag",
    en: {
      term: "RAG (Retrieval-Augmented Generation)",
      shortDefinition: "RAG is an AI architecture that combines a language model with a retrieval system, allowing the AI to search your documents and data in real time before generating a response.",
      body: [
        h2("What is RAG?"),
        p("Retrieval-Augmented Generation (RAG) is an architecture for AI systems that addresses one of the core limitations of standard LLMs: their knowledge is frozen at training time. A standard LLM knows what was in its training data, nothing more. It cannot access your internal documents, your CRM, your policies, or anything that happened after its training cutoff."),
        p("RAG solves this by adding a retrieval step before generation. When a user submits a query, the system first searches a database of your documents (using vector similarity or keyword search), retrieves the most relevant passages, and provides them as context to the LLM. The LLM then generates a response grounded in your actual content."),
        h2("Why RAG matters for enterprise AI"),
        p("For enterprise use cases, RAG is often more practical than fine-tuning. Fine-tuning requires retraining the model when your data changes — expensive, slow, and requires specialized expertise. RAG allows you to update your document database without touching the model. When a policy changes, you update the document. The model adapts instantly."),
        p("RAG also provides citations. Because the model's response is grounded in retrieved passages, you can show users exactly which document and which section the answer came from. This is critical for regulated industries where auditability matters."),
        h2("RAG in practice with Wonka AI"),
        p("Wonka AI uses RAG to connect your LLM to all your internal data sources — SharePoint documents, Notion wikis, Salesforce records, email threads. When an employee asks a question, the system retrieves relevant content from across your tool stack and generates a response grounded in your actual data."),
      ],
      faq: [
        faq("What's the difference between RAG and fine-tuning?", "Fine-tuning modifies the model's weights by training it on your data. RAG keeps the model unchanged but gives it access to your data at query time. RAG is faster to implement, easier to update, and provides citations. Fine-tuning is better for tasks requiring the model to internalize a specific writing style or specialized vocabulary."),
        faq("Does RAG require storing data in the cloud?", "Not necessarily. RAG systems can be deployed entirely on-premise. The document database (vector store) and retrieval infrastructure run within your environment. For enterprise deployments with privacy requirements, fully on-premise RAG is the standard approach."),
        faq("How accurate is RAG?", "RAG accuracy depends on the quality of your document database, the retrieval system configuration, and the LLM quality. Well-implemented RAG systems achieve 85-95% answer accuracy on enterprise knowledge bases. The system should also know when it cannot find a reliable answer rather than hallucinating one."),
      ],
      seo: seo("RAG (Retrieval-Augmented Generation) — Enterprise AI Definition | Wonka AI", "What is RAG? How retrieval-augmented generation works, why it matters for enterprise AI, and how it differs from fine-tuning."),
    },
    fr: {
      term: "RAG (Génération Augmentée par Récupération)",
      shortDefinition: "Le RAG est une architecture IA qui combine un modèle de langage avec un système de récupération, permettant à l'IA de rechercher dans vos documents en temps réel avant de générer une réponse.",
      body: [
        h2("Qu'est-ce que le RAG ?"),
        p("La Génération Augmentée par Récupération (RAG) est une architecture pour les systèmes IA qui résout une des limitations fondamentales des LLM standard : leurs connaissances sont gelées au moment de l'entraînement."),
        p("Le RAG résout ce problème en ajoutant une étape de récupération avant la génération. Quand un utilisateur soumet une requête, le système recherche d'abord dans une base de données de vos documents, récupère les passages les plus pertinents, et les fournit comme contexte au LLM."),
        h2("Pourquoi le RAG est important pour l'IA en entreprise"),
        p("Pour les cas d'usage enterprise, le RAG est souvent plus pratique que le fine-tuning. Il vous permet de mettre à jour votre base documentaire sans toucher au modèle."),
        p("Le RAG fournit également des citations. Parce que la réponse du modèle est fondée sur des passages récupérés, vous pouvez montrer aux utilisateurs exactement quel document et quelle section a servi de source."),
      ],
      faq: [
        faq("Quelle est la différence entre RAG et fine-tuning ?", "Le fine-tuning modifie les poids du modèle en l'entraînant sur vos données. Le RAG garde le modèle inchangé mais lui donne accès à vos données au moment de la requête. Le RAG est plus rapide à implémenter, plus facile à mettre à jour et fournit des citations."),
        faq("Le RAG nécessite-t-il de stocker des données dans le cloud ?", "Pas nécessairement. Les systèmes RAG peuvent être déployés entièrement on-premise. La base documentaire et l'infrastructure de récupération fonctionnent dans votre environnement."),
        faq("Quelle est la précision du RAG ?", "Les systèmes RAG bien implémentés atteignent 85-95% de précision des réponses sur des bases de connaissances enterprise."),
      ],
      seo: seo("RAG (Génération Augmentée par Récupération) — Définition IA Enterprise | Wonka AI", "Qu'est-ce que le RAG ? Comment fonctionne la génération augmentée par récupération et pourquoi c'est essentiel pour l'IA en entreprise."),
    },
    nl: {
      term: "RAG (Retrieval-Augmented Generation)",
      shortDefinition: "RAG is een AI-architectuur die een taalmodel combineert met een retrievalsysteem, waardoor de AI uw documenten en data in real time kan doorzoeken voordat een antwoord wordt gegenereerd.",
      body: [
        h2("Wat is RAG?"),
        p("Retrieval-Augmented Generation (RAG) is een architectuur voor AI-systemen die een kernbeperking van standaard LLMs aanpakt: hun kennis is bevroren op het moment van training."),
        p("RAG lost dit op door een retrievalstap toe te voegen vóór generatie. Wanneer een gebruiker een query indient, doorzoekt het systeem eerst een database van uw documenten, haalt de meest relevante passages op en levert deze als context aan het LLM."),
        h2("Waarom RAG belangrijk is voor enterprise AI"),
        p("Voor enterprise-gebruiksscenario's is RAG vaak praktischer dan fine-tuning. U kunt uw documentendatabase bijwerken zonder het model aan te raken."),
        p("RAG biedt ook citaties. Omdat de reactie van het model gebaseerd is op opgehaalde passages, kunt u gebruikers precies tonen welk document als bron diende."),
      ],
      faq: [
        faq("Wat is het verschil tussen RAG en fine-tuning?", "Fine-tuning past de gewichten van het model aan door het op uw data te trainen. RAG houdt het model ongewijzigd maar geeft het toegang tot uw data op querytijd. RAG is sneller te implementeren en gemakkelijker bij te werken."),
        faq("Vereist RAG het opslaan van gegevens in de cloud?", "Niet noodzakelijk. RAG-systemen kunnen volledig on-premise worden ingezet. Voor enterprise-implementaties met privacyvereisten is volledig on-premise RAG de standaardbenadering."),
        faq("Hoe nauwkeurig is RAG?", "Goed geïmplementeerde RAG-systemen bereiken 85-95% antwoordnauwkeurigheid op enterprise kennisbanken."),
      ],
      seo: seo("RAG (Retrieval-Augmented Generation) — Enterprise AI Definitie | Wonka AI", "Wat is RAG? Hoe retrieval-augmented generation werkt, waarom het belangrijk is voor enterprise AI en hoe het verschilt van fine-tuning."),
    },
  },
  {
    slug: "data-sovereignty",
    en: {
      term: "Data Sovereignty",
      shortDefinition: "Data sovereignty is the principle that data is subject to the laws and governance structures of the country in which it is collected or processed. For enterprises, it determines where data can be stored, who can access it, and under what legal framework.",
      body: [
        h2("What is data sovereignty?"),
        p("Data sovereignty refers to the idea that digital data is subject to the laws of the nation where it physically resides or where the entity that controls it is domiciled. For businesses operating in Europe, this concept intersects directly with GDPR, national data protection laws, and increasingly with sector-specific regulations in finance, healthcare, and critical infrastructure."),
        p("In practice, data sovereignty questions arise whenever an organization considers using a cloud service, AI tool, or SaaS platform provided by a company headquartered outside the EU — or that processes data on servers outside the EU. The fundamental question is: under whose jurisdiction does your data fall, and what can authorities in that jurisdiction demand?"),
        h2("Why data sovereignty matters for enterprise AI"),
        p("Most consumer AI tools — ChatGPT, Microsoft Copilot, Google Gemini — process data on US-based infrastructure. Even with EU data residency options, the parent companies are subject to US law, including the CLOUD Act, which allows US authorities to compel disclosure of data held by US companies regardless of where that data physically resides."),
        p("For European enterprises, particularly those in regulated sectors or handling sensitive client data, this creates a genuine legal and reputational risk. Clients increasingly include data sovereignty clauses in contracts. Regulators are increasing scrutiny of cross-border data transfers. The risk is not hypothetical."),
        h2("How to achieve data sovereignty in practice"),
        p("True data sovereignty for AI workloads requires that the model and the data it processes both reside within your controlled environment. Wonka AI deploys in Azure West Europe (Microsoft Ireland) by default. ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. On-premise deployment is available as an Enterprise option for specific data residency requirements."),
        p("This is exactly what private LLM deployment achieves. When Wonka AI deploys within your infrastructure, the model runs in your environment, processes your documents within Azure West Europe or your own servers, and the results stay under your control. Data sovereignty is not a configuration option — it is the architecture."),
      ],
      faq: [
        faq("Is GDPR compliance the same as data sovereignty?", "No. GDPR compliance is a legal obligation about how personal data is handled — consent, access rights, breach notification. Data sovereignty is about jurisdiction and control — who has legal authority over your data. A service can be GDPR-compliant while still being subject to US CLOUD Act requests. True data sovereignty requires that your data be outside the reach of foreign legal processes."),
        faq("Does EU data residency satisfy data sovereignty requirements?", "Partially. EU data residency means your data is stored in EU-based data centers. But if the service provider is a US company, US authorities can still compel access under the CLOUD Act. Full sovereignty requires both EU residency AND a provider not subject to foreign jurisdiction — or a private deployment you control entirely."),
        faq("Which sectors have the strictest data sovereignty requirements?", "Financial services (banking, insurance, asset management), healthcare, legal, defense, and critical infrastructure. In Belgium and France, sector regulators have issued specific guidance requiring data to remain within EU-controlled environments. Clients in these sectors routinely include data sovereignty clauses in vendor contracts."),
      ],
      seo: seo("Data Sovereignty — Definition & Enterprise Guide | Wonka AI", "What is data sovereignty? How it differs from GDPR compliance, why it matters for European enterprise AI, and how private LLM deployment achieves true data sovereignty."),
    },
    fr: {
      term: "Souveraineté des données",
      shortDefinition: "La souveraineté des données est le principe selon lequel les données sont soumises aux lois et structures de gouvernance du pays dans lequel elles sont collectées ou traitées. Pour les entreprises, cela détermine où les données peuvent être stockées, qui peut y accéder et sous quel cadre légal.",
      body: [
        h2("Qu'est-ce que la souveraineté des données ?"),
        p("La souveraineté des données désigne le principe selon lequel les données numériques sont soumises aux lois du pays où elles résident physiquement ou où l'entité qui les contrôle est domiciliée. Pour les entreprises opérant en Europe, ce concept croise directement le RGPD, les lois nationales de protection des données et les réglementations sectorielles en finance, santé et infrastructures critiques."),
        p("En pratique, les questions de souveraineté des données se posent dès qu'une organisation envisage d'utiliser un service cloud, un outil IA ou une plateforme SaaS fourni par une entreprise dont le siège est hors de l'UE — ou qui traite des données sur des serveurs hors UE."),
        h2("Pourquoi la souveraineté des données compte pour l'IA en entreprise"),
        p("La plupart des outils IA grand public — ChatGPT, Microsoft Copilot, Google Gemini — traitent les données sur une infrastructure basée aux États-Unis. Même avec des options de résidence des données en UE, les sociétés mères sont soumises au droit américain, notamment au CLOUD Act, qui permet aux autorités américaines d'exiger la divulgation de données détenues par des entreprises américaines, peu importe où ces données résident physiquement."),
        p("Pour les entreprises européennes, en particulier dans les secteurs réglementés, cela crée un risque juridique et réputationnel réel. Les clients incluent de plus en plus des clauses de souveraineté des données dans les contrats."),
        h2("Comment atteindre la souveraineté des données en pratique"),
        p("La vraie souveraineté des données pour les charges de travail IA exige que le modèle et les données qu'il traite résident tous deux dans votre environnement contrôlé. Wonka AI est déployé en Azure West Europe (Microsoft Irlande) par défaut. Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. Audit SOC 2 Type II en cours. Le déploiement on-premise est disponible en option Entreprise pour des exigences spécifiques de résidence des données."),
        p("C'est exactement ce qu'un déploiement LLM privé réalise. Quand Wonka AI est déployé dans votre infrastructure, le modèle tourne dans votre environnement, traite vos documents dans Azure West Europe ou sur vos propres serveurs, et les résultats restent sous votre contrôle. La souveraineté des données n'est pas une option de configuration — c'est l'architecture."),
      ],
      faq: [
        faq("La conformité RGPD est-elle identique à la souveraineté des données ?", "Non. La conformité RGPD est une obligation légale sur la façon dont les données personnelles sont traitées. La souveraineté des données concerne la juridiction et le contrôle. Un service peut être conforme au RGPD tout en restant soumis aux demandes du CLOUD Act américain. La vraie souveraineté exige que vos données soient hors de portée des processus légaux étrangers."),
        faq("La résidence des données en UE satisfait-elle les exigences de souveraineté ?", "Partiellement. La résidence en UE signifie que vos données sont stockées dans des centres de données européens. Mais si le fournisseur est une entreprise américaine, les autorités américaines peuvent toujours exiger l'accès via le CLOUD Act. La souveraineté totale nécessite à la fois une résidence en UE et un fournisseur non soumis à une juridiction étrangère — ou un déploiement privé que vous contrôlez entièrement."),
        faq("Quels secteurs ont les exigences de souveraineté les plus strictes ?", "Services financiers, santé, juridique, défense et infrastructures critiques. En Belgique et en France, les régulateurs sectoriels ont émis des directives spécifiques exigeant que les données restent dans des environnements contrôlés par l'UE."),
      ],
      seo: seo("Souveraineté des données — Définition & Guide Enterprise | Wonka AI", "Qu'est-ce que la souveraineté des données ? En quoi elle diffère de la conformité RGPD, pourquoi elle compte pour l'IA en entreprise et comment le déploiement LLM privé l'assure."),
    },
    nl: {
      term: "Gegevenssouvereiniteit",
      shortDefinition: "Gegevenssouvereiniteit is het principe dat gegevens onderworpen zijn aan de wetten en bestuurstructuren van het land waar ze worden verzameld of verwerkt. Voor ondernemingen bepaalt dit waar gegevens mogen worden opgeslagen, wie er toegang toe heeft en onder welk juridisch kader.",
      body: [
        h2("Wat is gegevenssouvereiniteit?"),
        p("Gegevenssouvereiniteit verwijst naar het principe dat digitale gegevens onderworpen zijn aan de wetten van het land waar ze fysiek residen of waar de entiteit die ze beheert is gevestigd. Voor ondernemingen die in Europa opereren, kruist dit concept rechtstreeks de AVG, nationale gegevensbeschermingswetten en sectorspecifieke regelgeving in financiën, gezondheidszorg en kritieke infrastructuur."),
        p("In de praktijk rijzen vragen over gegevenssouvereiniteit telkens wanneer een organisatie overweegt een clouddienst, AI-tool of SaaS-platform te gebruiken van een bedrijf met hoofdkantoor buiten de EU — of dat gegevens verwerkt op servers buiten de EU."),
        h2("Waarom gegevenssouvereiniteit belangrijk is voor enterprise AI"),
        p("De meeste AI-tools voor consumenten — ChatGPT, Microsoft Copilot, Google Gemini — verwerken gegevens op US-gebaseerde infrastructuur. Zelfs met EU-gegevenslocatieopties zijn de moederbedrijven onderworpen aan Amerikaans recht, inclusief de CLOUD Act, die Amerikaanse autoriteiten toestaat openbaarmaking te eisen van gegevens die worden aangehouden door Amerikaanse bedrijven, ongeacht waar die gegevens fysiek zijn."),
        p("Voor Europese ondernemingen, met name in gereguleerde sectoren, creëert dit een reëel juridisch en reputatierisico."),
        h2("Hoe u gegevenssouvereiniteit in de praktijk bereikt"),
        p("Echte gegevenssouvereiniteit voor AI-workloads vereist dat zowel het model als de gegevens die het verwerkt binnen uw gecontroleerde omgeving residen — uw on-premise servers, een dedicated EU-cloudomgeving, of een private cloudimplementatie die u bezit en beheert."),
        p("Dit is precies wat private LLM-implementatie bereikt. Wanneer Wonka AI binnen uw infrastructuur wordt ingezet, draait het model in uw omgeving. Uw gegevens verlaten nooit uw perimeter. Gegevenssouvereiniteit is geen configuratieoptie — het is de architectuur."),
      ],
      faq: [
        faq("Is AVG-naleving hetzelfde als gegevenssouvereiniteit?", "Nee. AVG-naleving is een wettelijke verplichting over hoe persoonsgegevens worden verwerkt. Gegevenssouvereiniteit gaat over jurisdictie en controle. Een dienst kan AVG-conform zijn terwijl hij nog steeds onderworpen is aan CLOUD Act-verzoeken. Echte souvereiniteit vereist dat uw gegevens buiten het bereik van buitenlandse juridische processen zijn."),
        faq("Voldoet EU-gegevenslocatie aan souvereiniteitsvereisten?", "Gedeeltelijk. EU-gegevenslocatie betekent dat uw gegevens zijn opgeslagen in EU-datacenters. Maar als de dienstverlener een Amerikaans bedrijf is, kunnen Amerikaanse autoriteiten via de CLOUD Act nog steeds toegang eisen. Volledige souvereiniteit vereist zowel EU-locatie als een aanbieder die niet onderworpen is aan buitenlandse jurisdictie — of een private implementatie die u volledig beheert."),
        faq("Welke sectoren hebben de strengste souvereiniteitsvereisten?", "Financiële diensten, gezondheidszorg, juridische sector, defensie en kritieke infrastructuur. In België en Frankrijk hebben sectortoezichthouders specifieke richtlijnen uitgevaardigd die vereisen dat gegevens binnen EU-gecontroleerde omgevingen blijven."),
      ],
      seo: seo("Gegevenssouvereiniteit — Definitie & Enterprise Gids | Wonka AI", "Wat is gegevenssouvereiniteit? Hoe het verschilt van AVG-naleving, waarom het belangrijk is voor enterprise AI en hoe private LLM-implementatie echte gegevenssouvereiniteit bereikt."),
    },
  },
  {
    slug: "mcp",
    en: {
      term: "MCP (Model Context Protocol)",
      shortDefinition: "MCP is an open standard developed by Anthropic that allows AI models to connect securely to external tools, data sources, and services. It gives LLMs a standardized way to read files, query databases, call APIs, and take actions — without custom integration code for each tool.",
      body: [
        h2("What is MCP?"),
        p("Model Context Protocol (MCP) is an open protocol introduced by Anthropic in 2024 that standardizes how AI models interact with the outside world. Before MCP, connecting an LLM to a tool — a database, a file system, a web service — required custom integration code for every combination. MCP defines a universal interface: any tool that implements the protocol can be used by any model that supports it."),
        p("Think of MCP as the USB standard for AI. Just as USB lets any device connect to any computer without custom hardware, MCP lets any tool connect to any AI model without custom code. This dramatically reduces the engineering effort required to build AI-powered workflows."),
        h2("How MCP works"),
        p("An MCP server is a small program that exposes a set of capabilities — called 'tools' — to an AI model. A tool might be 'read a file', 'query a database', 'send an email', or 'search Salesforce contacts'. The AI model can call these tools during a conversation to get information or take actions."),
        p("The protocol handles authentication, input/output formatting, and error handling in a standardized way. From the model's perspective, every MCP server looks the same — it declares what it can do, the model calls what it needs, and the result comes back in a predictable format."),
        h2("Why MCP matters for enterprise AI"),
        p("Enterprise AI is only useful when it can access the data and tools your team actually uses. MCP makes this practical. Instead of building a custom integration for every tool in your stack, you deploy MCP servers — one per tool — and any AI in your environment can use all of them immediately."),
        p("Wonka AI uses MCP to connect to your existing tool stack: SharePoint, Salesforce, Jira, Slack, Notion, and more. When you add a new tool, you add an MCP server. The AI gains access to it without any changes to the core system. This is how enterprise AI scales across a heterogeneous tool environment."),
      ],
      faq: [
        faq("Who created MCP and is it open source?", "MCP was created by Anthropic and released as an open standard in November 2024. The specification and reference implementations are open source. It is designed to be model-agnostic — any LLM can implement MCP support, not just Anthropic's Claude."),
        faq("What is the difference between MCP and a standard API?", "A standard API is a fixed interface to one specific service. MCP is a meta-protocol: it defines how AI models discover and call any tool, regardless of what that tool does. An MCP server wraps an existing API and exposes it in a way the AI model can understand and use autonomously."),
        faq("Is MCP secure for enterprise use?", "MCP includes authentication and authorization mechanisms. In an enterprise deployment, MCP servers run within your private infrastructure — they never expose your tools to the public internet. Each server's permissions are explicitly defined, so the AI can only do what you have authorized."),
      ],
      seo: seo("MCP (Model Context Protocol) — Definition & Enterprise Guide | Wonka AI", "What is MCP? How the Model Context Protocol works, why it matters for enterprise AI, and how it enables AI models to connect to any tool without custom integration code."),
    },
    fr: {
      term: "MCP (Model Context Protocol)",
      shortDefinition: "Le MCP est un standard ouvert développé par Anthropic qui permet aux modèles IA de se connecter de manière sécurisée à des outils externes, des sources de données et des services. Il donne aux LLM une façon standardisée de lire des fichiers, interroger des bases de données et appeler des APIs.",
      body: [
        h2("Qu'est-ce que le MCP ?"),
        p("Le Model Context Protocol (MCP) est un protocole ouvert introduit par Anthropic en 2024 qui standardise la façon dont les modèles IA interagissent avec le monde extérieur. Avant MCP, connecter un LLM à un outil nécessitait un code d'intégration personnalisé pour chaque combinaison. MCP définit une interface universelle : tout outil qui implémente le protocole peut être utilisé par tout modèle qui le supporte."),
        p("Pensez au MCP comme à la norme USB pour l'IA. Tout comme USB permet à n'importe quel appareil de se connecter à n'importe quel ordinateur sans matériel personnalisé, MCP permet à n'importe quel outil de se connecter à n'importe quel modèle IA sans code personnalisé."),
        h2("Comment fonctionne le MCP"),
        p("Un serveur MCP est un petit programme qui expose un ensemble de capacités — appelées 'outils' — à un modèle IA. Un outil peut être 'lire un fichier', 'interroger une base de données', 'envoyer un email' ou 'rechercher des contacts Salesforce'."),
        p("Le protocole gère l'authentification, le formatage des entrées/sorties et la gestion des erreurs de manière standardisée. Du point de vue du modèle, chaque serveur MCP est identique."),
        h2("Pourquoi le MCP est important pour l'IA en entreprise"),
        p("L'IA en entreprise n'est utile que lorsqu'elle peut accéder aux données et outils que votre équipe utilise réellement. Le MCP rend cela pratique : au lieu de construire une intégration personnalisée pour chaque outil, vous déployez des serveurs MCP — un par outil — et toute IA dans votre environnement peut tous les utiliser immédiatement."),
        p("Wonka AI utilise MCP pour se connecter à votre stack d'outils existant : SharePoint, Salesforce, Jira, Slack, Notion et bien d'autres. Quand vous ajoutez un nouvel outil, vous ajoutez un serveur MCP. L'IA y accède sans aucun changement au système principal."),
      ],
      faq: [
        faq("Qui a créé MCP et est-il open source ?", "MCP a été créé par Anthropic et publié comme standard ouvert en novembre 2024. La spécification et les implémentations de référence sont open source. Il est conçu pour être agnostique au modèle — tout LLM peut implémenter le support MCP."),
        faq("Quelle est la différence entre MCP et une API standard ?", "Une API standard est une interface fixe vers un service spécifique. MCP est un méta-protocole : il définit comment les modèles IA découvrent et appellent n'importe quel outil. Un serveur MCP encapsule une API existante et l'expose d'une manière que le modèle IA peut comprendre et utiliser de manière autonome."),
        faq("MCP est-il sécurisé pour un usage enterprise ?", "MCP inclut des mécanismes d'authentification et d'autorisation. Dans un déploiement enterprise, les serveurs MCP tournent dans votre infrastructure privée — ils n'exposent jamais vos outils à l'internet public."),
      ],
      seo: seo("MCP (Model Context Protocol) — Définition & Guide Enterprise | Wonka AI", "Qu'est-ce que le MCP ? Comment le Model Context Protocol fonctionne, pourquoi il est essentiel pour l'IA en entreprise et comment il permet aux modèles IA de se connecter à n'importe quel outil."),
    },
    nl: {
      term: "MCP (Model Context Protocol)",
      shortDefinition: "MCP is een open standaard ontwikkeld door Anthropic waarmee AI-modellen veilig verbinding kunnen maken met externe tools, gegevensbronnen en diensten. Het geeft LLMs een gestandaardiseerde manier om bestanden te lezen, databases te bevragen en API's aan te roepen.",
      body: [
        h2("Wat is MCP?"),
        p("Model Context Protocol (MCP) is een open protocol geïntroduceerd door Anthropic in 2024 dat standaardiseert hoe AI-modellen met de buitenwereld interageren. Vóór MCP vereiste het verbinden van een LLM met een tool aangepaste integratiecode voor elke combinatie. MCP definieert een universele interface: elke tool die het protocol implementeert kan worden gebruikt door elk model dat het ondersteunt."),
        p("Denk aan MCP als de USB-standaard voor AI. Net zoals USB elk apparaat met elke computer laat verbinden zonder aangepaste hardware, laat MCP elke tool verbinden met elk AI-model zonder aangepaste code."),
        h2("Hoe MCP werkt"),
        p("Een MCP-server is een klein programma dat een set mogelijkheden — 'tools' genaamd — blootstelt aan een AI-model. Een tool kan 'een bestand lezen', 'een database bevragen', 'een e-mail sturen' of 'Salesforce-contacten zoeken' zijn."),
        p("Het protocol verwerkt authenticatie, invoer-/uitvoerformattering en foutafhandeling op een gestandaardiseerde manier."),
        h2("Waarom MCP belangrijk is voor enterprise AI"),
        p("Enterprise AI is alleen nuttig als het toegang heeft tot de data en tools die uw team daadwerkelijk gebruikt. MCP maakt dit praktisch: in plaats van een aangepaste integratie voor elke tool te bouwen, implementeert u MCP-servers — één per tool — en kan elke AI in uw omgeving ze allemaal onmiddellijk gebruiken."),
        p("Wonka AI gebruikt MCP om verbinding te maken met uw bestaande toolstack: SharePoint, Salesforce, Jira, Slack, Notion en meer."),
      ],
      faq: [
        faq("Wie heeft MCP gemaakt en is het open source?", "MCP werd gemaakt door Anthropic en uitgebracht als open standaard in november 2024. De specificatie en referentie-implementaties zijn open source. Het is ontworpen als modelagnostisch — elk LLM kan MCP-ondersteuning implementeren."),
        faq("Wat is het verschil tussen MCP en een standaard API?", "Een standaard API is een vaste interface naar één specifieke dienst. MCP is een metaprotocol: het definieert hoe AI-modellen elke tool ontdekken en aanroepen. Een MCP-server wikkelt een bestaande API in en stelt deze bloot op een manier die het AI-model kan begrijpen."),
        faq("Is MCP veilig voor enterprise gebruik?", "MCP bevat authenticatie- en autorisatiemechanismen. In een enterprise-implementatie draaien MCP-servers binnen uw privéinfrastructuur — ze stellen uw tools nooit bloot aan het openbare internet."),
      ],
      seo: seo("MCP (Model Context Protocol) — Definitie & Enterprise Gids | Wonka AI", "Wat is MCP? Hoe het Model Context Protocol werkt, waarom het belangrijk is voor enterprise AI en hoe het AI-modellen in staat stelt verbinding te maken met elke tool."),
    },
  },
  {
    slug: "fine-tuning",
    en: {
      term: "Fine-tuning",
      shortDefinition: "Fine-tuning is the process of further training a pre-trained AI model on a specific dataset to adapt its behavior for a particular task or domain. It allows organizations to specialize a general-purpose LLM for their industry, writing style, or internal vocabulary.",
      body: [
        h2("What is fine-tuning?"),
        p("Large language models are trained on massive, general datasets. This gives them broad capabilities but no specialization. Fine-tuning is a second training step: you take a pre-trained model and continue training it on a smaller, task-specific dataset. The model's weights are adjusted to perform better on your specific use case."),
        p("A legal firm might fine-tune a model on thousands of contracts to make it better at legal drafting. A bank might fine-tune on financial reports to improve analysis quality. A customer service team might fine-tune on past support tickets to make responses match their tone and policies."),
        h2("Fine-tuning vs. RAG: which should you use?"),
        p("This is one of the most common questions in enterprise AI, and the answer is usually: RAG first, fine-tuning if needed. RAG (Retrieval-Augmented Generation) gives the model access to your documents at query time without modifying the model itself. It is faster to implement, easier to update, and provides citations. For most knowledge retrieval use cases, RAG is sufficient."),
        p("Fine-tuning is the right choice when: you need the model to internalize a specific writing style or format (not just access information), the task requires consistent behavioral changes that are hard to achieve with prompting, or you need to distill a large model's capabilities into a smaller, faster model for a specific task."),
        h2("The cost and complexity of fine-tuning"),
        p("Fine-tuning requires a quality training dataset (typically 500–10,000 examples for instruction fine-tuning), GPU compute for the training run, and evaluation infrastructure to measure improvement. For open models, a fine-tuning run for a 7B parameter model takes 2–8 hours on a single A100 GPU. For larger models, it scales accordingly."),
        p("The more significant cost is data preparation: curating, cleaning, and formatting training examples is time-intensive and requires domain expertise. Plan for 2–4 weeks of data work before the first fine-tuning run."),
      ],
      faq: [
        faq("Can you fine-tune proprietary models like GPT-4?", "OpenAI and some other providers offer fine-tuning for certain model versions via API. However, you provide your training data to their infrastructure — which creates data sovereignty concerns for sensitive datasets. For private fine-tuning on confidential data, open models deployed in your own infrastructure are the standard approach."),
        faq("How much training data do you need for fine-tuning?", "It depends on the task. For instruction fine-tuning (teaching the model to follow specific formats or styles), 500–2,000 high-quality examples are often sufficient. For domain adaptation, more data is better — 10,000+ examples for specialized domains. Quality matters more than quantity: 500 clean, representative examples outperform 5,000 noisy ones."),
        faq("Does fine-tuning improve factual accuracy?", "Not reliably. Fine-tuning improves style, format, and task-specific behavior. It does not update the model's knowledge of facts — for that, you need RAG. A common mistake is fine-tuning to inject knowledge rather than to improve behavior, which produces a model that sounds more confident but hallucinates more."),
      ],
      seo: seo("Fine-tuning — AI Model Customization Guide for Enterprises | Wonka AI", "What is fine-tuning? How it works, when to use it vs. RAG, how much data you need, and the real costs of fine-tuning an LLM for enterprise use cases."),
    },
    fr: {
      term: "Fine-tuning",
      shortDefinition: "Le fine-tuning est le processus qui consiste à continuer l'entraînement d'un modèle IA pré-entraîné sur un dataset spécifique pour adapter son comportement à une tâche ou un domaine particulier.",
      body: [
        h2("Qu'est-ce que le fine-tuning ?"),
        p("Les grands modèles de langage sont entraînés sur des datasets massifs et généraux. Cela leur donne de larges capacités mais aucune spécialisation. Le fine-tuning est une deuxième étape d'entraînement : vous prenez un modèle pré-entraîné et continuez à l'entraîner sur un dataset plus petit et spécifique à la tâche. Les poids du modèle sont ajustés pour mieux performer sur votre cas d'usage."),
        p("Un cabinet d'avocats pourrait fine-tuner un modèle sur des milliers de contrats. Une banque pourrait fine-tuner sur des rapports financiers. Une équipe de support client pourrait fine-tuner sur des tickets passés pour que les réponses correspondent à leur ton et leurs politiques."),
        h2("Fine-tuning vs. RAG : lequel utiliser ?"),
        p("La réponse est généralement : RAG d'abord, fine-tuning si nécessaire. Le RAG donne au modèle accès à vos documents au moment de la requête sans modifier le modèle lui-même. Il est plus rapide à implémenter, plus facile à mettre à jour et fournit des citations."),
        p("Le fine-tuning est le bon choix quand : vous avez besoin que le modèle internalise un style d'écriture ou un format spécifique, la tâche nécessite des changements comportementaux cohérents difficiles à obtenir avec le prompting, ou vous devez distiller les capacités d'un grand modèle dans un modèle plus petit et plus rapide."),
        h2("Le coût et la complexité du fine-tuning"),
        p("Le fine-tuning nécessite un dataset d'entraînement de qualité (généralement 500 à 10 000 exemples), du calcul GPU et une infrastructure d'évaluation. Le coût le plus significatif est la préparation des données : curatorer, nettoyer et formater les exemples d'entraînement est chronophage et nécessite une expertise métier."),
      ],
      faq: [
        faq("Peut-on fine-tuner des modèles propriétaires comme GPT-4 ?", "OpenAI propose du fine-tuning pour certaines versions de modèles via API. Cependant, vous fournissez vos données d'entraînement à leur infrastructure — ce qui pose des problèmes de souveraineté des données pour les datasets sensibles. Pour un fine-tuning privé sur des données confidentielles, les modèles open source déployés dans votre propre infrastructure sont l'approche standard."),
        faq("De combien de données d'entraînement avez-vous besoin ?", "Pour le fine-tuning d'instructions, 500 à 2 000 exemples de haute qualité suffisent souvent. Pour l'adaptation de domaine, plus de données sont meilleures — 10 000+ exemples pour des domaines spécialisés. La qualité prime sur la quantité."),
        faq("Le fine-tuning améliore-t-il la précision factuelle ?", "Pas de manière fiable. Le fine-tuning améliore le style, le format et le comportement spécifique à la tâche. Il ne met pas à jour les connaissances factuelles du modèle — pour cela, vous avez besoin du RAG."),
      ],
      seo: seo("Fine-tuning — Guide de personnalisation de modèle IA en entreprise | Wonka AI", "Qu'est-ce que le fine-tuning ? Comment ça fonctionne, quand l'utiliser vs. RAG, de combien de données vous avez besoin et les vrais coûts du fine-tuning pour les entreprises."),
    },
    nl: {
      term: "Fine-tuning",
      shortDefinition: "Fine-tuning is het proces waarbij een vooraf getraind AI-model verder wordt getraind op een specifieke dataset om het gedrag aan te passen voor een bepaalde taak of domein.",
      body: [
        h2("Wat is fine-tuning?"),
        p("Grote taalmodellen worden getraind op massale, algemene datasets. Dit geeft ze brede mogelijkheden maar geen specialisatie. Fine-tuning is een tweede trainingsstap: u neemt een vooraf getraind model en blijft het trainen op een kleinere, taakspecifieke dataset. De gewichten van het model worden aangepast om beter te presteren op uw specifieke use case."),
        p("Een advocatenkantoor kan een model fine-tunen op duizenden contracten. Een bank kan fine-tunen op financiële rapporten. Een klantenserviceteam kan fine-tunen op vroegere supporttickets zodat antwoorden overeenkomen met hun toon en beleid."),
        h2("Fine-tuning vs. RAG: welke moet u gebruiken?"),
        p("Het antwoord is doorgaans: RAG eerst, fine-tuning indien nodig. RAG geeft het model toegang tot uw documenten op querytijd zonder het model zelf te wijzigen. Het is sneller te implementeren, makkelijker bij te werken en biedt citaties."),
        p("Fine-tuning is de juiste keuze wanneer: u het model een specifieke schrijfstijl of format wilt laten internaliseren, de taak consistente gedragsveranderingen vereist die moeilijk te bereiken zijn met prompting, of u de capaciteiten van een groot model wilt destilleren in een kleiner, sneller model."),
        h2("De kosten en complexiteit van fine-tuning"),
        p("Fine-tuning vereist een kwaliteitstrainingsset (doorgaans 500–10.000 voorbeelden), GPU-rekenkracht en evaluatie-infrastructuur. De meest significante kost is datavoorbereiding: het samenstellen, opschonen en opmaken van trainingsvoorbeelden is tijdintensief."),
      ],
      faq: [
        faq("Kunt u propriëtaire modellen zoals GPT-4 fine-tunen?", "OpenAI biedt fine-tuning voor bepaalde modelversies via API. U verstrekt echter uw trainingsdata aan hun infrastructuur — wat gegevenssouvereiniteitsproblemen oplevert voor gevoelige datasets. Voor private fine-tuning op vertrouwelijke data zijn open modellen in uw eigen infrastructuur de standaardbenadering."),
        faq("Hoeveel trainingsdata heeft u nodig?", "Voor instructie-fine-tuning zijn 500–2.000 hoogwaardige voorbeelden vaak voldoende. Voor domeinadaptatie is meer data beter — 10.000+ voorbeelden voor gespecialiseerde domeinen. Kwaliteit telt meer dan kwantiteit."),
        faq("Verbetert fine-tuning de feitelijke nauwkeurigheid?", "Niet betrouwbaar. Fine-tuning verbetert stijl, format en taakspecifiek gedrag. Het werkt de feitelijke kennis van het model niet bij — daarvoor heeft u RAG nodig."),
      ],
      seo: seo("Fine-tuning — AI-modelaanpassingsgids voor ondernemingen | Wonka AI", "Wat is fine-tuning? Hoe het werkt, wanneer u het gebruikt vs. RAG, hoeveel data u nodig heeft en de werkelijke kosten van het fine-tunen van een LLM voor enterprise use cases."),
    },
  },
  {
    slug: "ai-agent",
    en: {
      term: "AI Agent",
      shortDefinition: "An AI agent is an AI system that can take sequences of actions autonomously to accomplish a goal — not just respond to a single prompt, but plan, use tools, check results, and iterate until the task is complete.",
      body: [
        h2("What is an AI agent?"),
        p("A standard LLM interaction is a single exchange: you send a prompt, the model generates a response, done. An AI agent goes further. Given a goal, it can break the task into steps, execute each step using available tools (web search, database queries, file operations, API calls), observe the results, and adjust its plan accordingly — repeating until the goal is achieved."),
        p("The key properties that define an agent are: autonomy (it acts without human input at each step), tool use (it can interact with external systems), memory (it retains context across steps), and goal-directedness (it works toward an objective, not just generating the next response)."),
        h2("How agents work in practice"),
        p("An agent starts with a goal: 'research competitors and prepare a summary report.' It plans the steps: identify competitors, search for recent news on each, pull financial data, compare features. It then executes: calls web search, reads pages, queries a database, writes sections. At each step it observes what worked and what didn't, and adapts."),
        p("Modern agent frameworks (like Claude's tool use, OpenAI's function calling, or LangChain) give developers the building blocks to construct these loops. The LLM acts as the reasoning core; tools extend what it can do; memory systems preserve context across steps."),
        h2("Agents in the enterprise"),
        p("Enterprise agents handle workflows that previously required human coordination: processing incoming requests, gathering data from multiple systems, drafting responses, routing approvals. A well-designed agent can handle a customer support ticket end-to-end — reading the ticket, querying order history in Salesforce, checking the return policy in SharePoint, drafting a response, and flagging to a human only if escalation criteria are met."),
        p("The critical design question for enterprise agents is not 'what can the agent do?' but 'where does it stop and ask a human?' Agents are powerful when the task is well-defined and the consequences of errors are manageable. High-stakes decisions — contract signing, financial transactions, personnel actions — should remain human-in-the-loop."),
      ],
      faq: [
        faq("What is the difference between an AI agent and a chatbot?", "A chatbot responds to one message at a time within a pre-defined conversation flow. An AI agent can autonomously execute multi-step tasks, use tools, and pursue a goal across many actions without human input at each step. The distinction is autonomy and the ability to take real-world actions."),
        faq("Are AI agents reliable enough for enterprise workflows?", "For well-scoped, repetitive tasks with clear success criteria — yes. Document processing, data extraction, structured reporting, tier-1 support — agents handle these reliably when properly designed. For tasks requiring nuanced judgment, agents are better used as assistants that prepare work for human review rather than acting fully autonomously."),
        faq("How do you prevent an AI agent from making mistakes?", "Key safeguards: define a clear scope of allowed actions, require human approval for irreversible actions (sending emails, modifying records, financial transactions), implement logging of every action taken, and test the agent against representative failure scenarios before production deployment."),
      ],
      seo: seo("AI Agent — Definition & Enterprise Applications Guide | Wonka AI", "What is an AI agent? How agents differ from chatbots, how they work in enterprise workflows, and how to deploy them safely with human-in-the-loop controls."),
    },
    fr: {
      term: "Agent IA",
      shortDefinition: "Un agent IA est un système d'intelligence artificielle capable d'effectuer des séquences d'actions de manière autonome pour accomplir un objectif — pas seulement répondre à un seul prompt, mais planifier, utiliser des outils, vérifier les résultats et itérer jusqu'à ce que la tâche soit terminée.",
      body: [
        h2("Qu'est-ce qu'un agent IA ?"),
        p("Une interaction standard avec un LLM est un échange unique : vous envoyez un prompt, le modèle génère une réponse, c'est terminé. Un agent IA va plus loin. Face à un objectif, il peut décomposer la tâche en étapes, exécuter chaque étape à l'aide des outils disponibles (recherche web, requêtes de base de données, opérations sur fichiers, appels API), observer les résultats et ajuster son plan en conséquence — en répétant jusqu'à ce que l'objectif soit atteint."),
        p("Les propriétés clés d'un agent sont : l'autonomie, l'utilisation d'outils, la mémoire et l'orientation vers un objectif."),
        h2("Comment fonctionnent les agents en pratique"),
        p("Un agent commence par un objectif : 'rechercher des concurrents et préparer un rapport de synthèse.' Il planifie les étapes, les exécute, observe ce qui a fonctionné et s'adapte."),
        p("Les frameworks d'agents modernes (comme le tool use de Claude, function calling d'OpenAI ou LangChain) donnent aux développeurs les blocs de construction pour construire ces boucles. Le LLM agit comme le noyau de raisonnement ; les outils étendent ses capacités."),
        h2("Les agents en entreprise"),
        p("Les agents enterprise gèrent des workflows qui nécessitaient auparavant une coordination humaine : traitement des demandes entrantes, collecte de données depuis plusieurs systèmes, rédaction de réponses, routage des approbations."),
        p("La question de conception critique pour les agents enterprise n'est pas 'que peut faire l'agent ?' mais 'où s'arrête-t-il pour demander à un humain ?'"),
      ],
      faq: [
        faq("Quelle est la différence entre un agent IA et un chatbot ?", "Un chatbot répond à un message à la fois dans un flux de conversation prédéfini. Un agent IA peut exécuter de manière autonome des tâches en plusieurs étapes, utiliser des outils et poursuivre un objectif sur de nombreuses actions sans intervention humaine à chaque étape."),
        faq("Les agents IA sont-ils suffisamment fiables pour les workflows enterprise ?", "Pour les tâches bien délimitées et répétitives avec des critères de succès clairs — oui. Pour les tâches nécessitant un jugement nuancé, les agents sont mieux utilisés comme assistants qui préparent le travail pour une révision humaine."),
        faq("Comment éviter qu'un agent IA fasse des erreurs ?", "Garde-fous clés : définir un périmètre clair d'actions autorisées, exiger une approbation humaine pour les actions irréversibles, mettre en place un logging de chaque action, et tester l'agent sur des scénarios d'échec représentatifs avant le déploiement."),
      ],
      seo: seo("Agent IA — Définition & Guide d'applications enterprise | Wonka AI", "Qu'est-ce qu'un agent IA ? Comment les agents diffèrent des chatbots, comment ils fonctionnent dans les workflows enterprise et comment les déployer en toute sécurité."),
    },
    nl: {
      term: "AI-agent",
      shortDefinition: "Een AI-agent is een AI-systeem dat autonoom reeksen acties kan uitvoeren om een doel te bereiken — niet alleen reageren op één prompt, maar plannen, tools gebruiken, resultaten controleren en herhalen totdat de taak is voltooid.",
      body: [
        h2("Wat is een AI-agent?"),
        p("Een standaard LLM-interactie is een enkele uitwisseling: u stuurt een prompt, het model genereert een antwoord, klaar. Een AI-agent gaat verder. Gegeven een doel kan het de taak in stappen opsplitsen, elke stap uitvoeren met beschikbare tools (webzoekopdracht, database-queries, bestandsbewerkingen, API-aanroepen), de resultaten observeren en zijn plan dienovereenkomstig aanpassen."),
        p("De sleuteleigenschappen van een agent zijn: autonomie, toolgebruik, geheugen en doelgerichtheid."),
        h2("Hoe agents in de praktijk werken"),
        p("Een agent begint met een doel: 'concurrenten onderzoeken en een samenvattingsrapport opstellen.' Het plant de stappen, voert ze uit, observeert wat werkte en past zich aan."),
        p("Moderne agentframeworks geven ontwikkelaars de bouwstenen om deze lussen te construeren. Het LLM fungeert als de redeneer-kern; tools breiden uit wat het kan doen."),
        h2("Agents in de onderneming"),
        p("Enterprise-agents verwerken workflows die voorheen menselijke coördinatie vereisten: inkomende verzoeken verwerken, gegevens verzamelen uit meerdere systemen, antwoorden opstellen, goedkeuringen routeren."),
        p("De kritieke ontwerpvraag voor enterprise-agents is niet 'wat kan de agent doen?' maar 'waar stopt hij om een mens te vragen?'"),
      ],
      faq: [
        faq("Wat is het verschil tussen een AI-agent en een chatbot?", "Een chatbot reageert op één bericht tegelijk binnen een vooraf gedefinieerde gespreksstroom. Een AI-agent kan autonoom meerstapstaken uitvoeren, tools gebruiken en een doel nastreven over vele acties zonder menselijke input bij elke stap."),
        faq("Zijn AI-agents betrouwbaar genoeg voor enterprise workflows?", "Voor goed afgebakende, repetitieve taken met duidelijke succescriteria — ja. Voor taken die genuanceerd oordeel vereisen, worden agents beter gebruikt als assistenten die werk voorbereiden voor menselijke beoordeling."),
        faq("Hoe voorkomt u dat een AI-agent fouten maakt?", "Sleutelwaarborgen: definieer een duidelijk bereik van toegestane acties, vereist menselijke goedkeuring voor onomkeerbare acties, implementeer logging van elke uitgevoerde actie en test de agent op representatieve faalscenario's voor productie-implementatie."),
      ],
      seo: seo("AI-agent — Definitie & Enterprise toepassingsgids | Wonka AI", "Wat is een AI-agent? Hoe agents verschillen van chatbots, hoe ze werken in enterprise workflows en hoe ze veilig te implementeren met human-in-the-loop controles."),
    },
  },
  {
    slug: "vector-database",
    en: {
      term: "Vector Database",
      shortDefinition: "A vector database stores data as mathematical vectors (numerical representations of meaning) and enables similarity search — finding content that is semantically similar to a query, not just keyword-matching. It is the storage layer that powers RAG systems.",
      body: [
        h2("What is a vector database?"),
        p("Traditional databases search for exact matches: find all rows where the column equals a specific value. Vector databases work differently. They store data as high-dimensional numerical vectors — called embeddings — where similar concepts are represented by vectors that are close together in mathematical space."),
        p("When you ask a question, your question is also converted into a vector. The database finds the stored vectors that are mathematically closest to your question vector, and returns those items. This is called semantic search or similarity search: it finds content that means the same thing, even if the exact words are different."),
        h2("Why vector databases are essential for enterprise AI"),
        p("RAG systems need a fast, accurate way to find the most relevant documents from a large corpus when a user asks a question. A vector database solves this. Your documents are chunked, converted to embeddings (via an embedding model), and stored. At query time, the question is embedded, the nearest document chunks are retrieved, and passed to the LLM as context."),
        p("Without a vector database, you would have to send every document to the LLM for every query — which is impossibly slow and expensive at enterprise scale. The vector database makes retrieval instant even across millions of document chunks."),
        h2("Popular vector databases for enterprise use"),
        p("Managed cloud options (Pinecone, Weaviate Cloud, Qdrant Cloud) are easy to set up but involve sending your data to a third-party service. For private enterprise deployments with data sovereignty requirements, self-hosted options are standard: pgvector (extends PostgreSQL), Qdrant (self-hosted), Chroma, or Weaviate self-hosted. Wonka AI's private deployment uses a self-hosted vector database within your infrastructure."),
      ],
      faq: [
        faq("What is an embedding?", "An embedding is a numerical representation of a piece of text as a high-dimensional vector (typically 768 to 3,072 numbers). Texts with similar meaning produce vectors that are close together in this high-dimensional space. Embeddings are created by embedding models — specialized neural networks trained to capture semantic meaning."),
        faq("How many documents can a vector database handle?", "Modern vector databases scale to hundreds of millions of vectors. For enterprise document corpora (SharePoint libraries, email archives, CRM data), typical sizes are 1–50 million chunks, which vector databases handle without performance degradation. The engineering challenge is usually document ingestion and update pipelines, not the database itself."),
        faq("Do vector databases replace traditional databases?", "No. Vector databases are specialized for similarity search. They work alongside your existing databases — SQL for structured data, document stores for unstructured data, vector databases for semantic retrieval. In a typical enterprise AI architecture, you have all three."),
      ],
      seo: seo("Vector Database — Definition & Enterprise AI Guide | Wonka AI", "What is a vector database? How embeddings and similarity search work, why vector databases power RAG systems, and which options are best for private enterprise deployment."),
    },
    fr: {
      term: "Base de données vectorielle",
      shortDefinition: "Une base de données vectorielle stocke les données sous forme de vecteurs mathématiques (représentations numériques du sens) et permet la recherche par similarité — trouver du contenu sémantiquement similaire à une requête, pas seulement par correspondance de mots-clés.",
      body: [
        h2("Qu'est-ce qu'une base de données vectorielle ?"),
        p("Les bases de données traditionnelles recherchent des correspondances exactes. Les bases de données vectorielles fonctionnent différemment. Elles stockent les données sous forme de vecteurs numériques à haute dimension — appelés embeddings — où des concepts similaires sont représentés par des vecteurs proches dans l'espace mathématique."),
        p("Quand vous posez une question, elle est aussi convertie en vecteur. La base de données trouve les vecteurs stockés les plus proches mathématiquement et retourne ces éléments. C'est la recherche sémantique : elle trouve du contenu qui a le même sens, même si les mots exacts sont différents."),
        h2("Pourquoi les bases de données vectorielles sont essentielles pour l'IA enterprise"),
        p("Les systèmes RAG ont besoin d'un moyen rapide et précis de trouver les documents les plus pertinents dans un grand corpus quand un utilisateur pose une question. Une base de données vectorielle résout ce problème."),
        p("Sans base de données vectorielle, vous devriez envoyer chaque document au LLM pour chaque requête — ce qui est impossiblement lent et coûteux à l'échelle enterprise."),
        h2("Bases de données vectorielles populaires pour l'usage enterprise"),
        p("Les options cloud gérées (Pinecone, Weaviate Cloud, Qdrant Cloud) sont faciles à configurer mais impliquent d'envoyer vos données à un service tiers. Pour les déploiements enterprise privés, les options auto-hébergées sont standard : pgvector, Qdrant auto-hébergé, Chroma ou Weaviate. Wonka AI utilise une base de données vectorielle auto-hébergée dans votre infrastructure."),
      ],
      faq: [
        faq("Qu'est-ce qu'un embedding ?", "Un embedding est une représentation numérique d'un texte sous forme de vecteur à haute dimension (typiquement 768 à 3 072 nombres). Les textes au sens similaire produisent des vecteurs proches dans cet espace. Les embeddings sont créés par des modèles d'embedding — des réseaux de neurones spécialisés entraînés pour capturer le sens sémantique."),
        faq("Combien de documents une base de données vectorielle peut-elle gérer ?", "Les bases de données vectorielles modernes passent à l'échelle jusqu'à des centaines de millions de vecteurs. Pour les corpus documentaires enterprise, les tailles typiques sont de 1 à 50 millions de chunks, que les bases de données vectorielles gèrent sans dégradation des performances."),
        faq("Les bases de données vectorielles remplacent-elles les bases de données traditionnelles ?", "Non. Les bases de données vectorielles sont spécialisées pour la recherche par similarité. Elles fonctionnent aux côtés de vos bases de données existantes — SQL pour les données structurées, bases documentaires pour les données non structurées, bases vectorielles pour la récupération sémantique."),
      ],
      seo: seo("Base de données vectorielle — Définition & Guide IA Enterprise | Wonka AI", "Qu'est-ce qu'une base de données vectorielle ? Comment fonctionnent les embeddings et la recherche par similarité, pourquoi elles alimentent les systèmes RAG."),
    },
    nl: {
      term: "Vectordatabase",
      shortDefinition: "Een vectordatabase slaat gegevens op als wiskundige vectoren (numerieke representaties van betekenis) en maakt similariteitszoeken mogelijk — inhoud vinden die semantisch vergelijkbaar is met een query, niet alleen op trefwoordovereenkomst.",
      body: [
        h2("Wat is een vectordatabase?"),
        p("Traditionele databases zoeken naar exacte overeenkomsten. Vectordatabases werken anders. Ze slaan gegevens op als hoog-dimensionale numerieke vectoren — embeddings genaamd — waarbij gelijkaardige concepten worden weergegeven door vectoren die dicht bij elkaar liggen in wiskundige ruimte."),
        p("Wanneer u een vraag stelt, wordt uw vraag ook omgezet in een vector. De database vindt de opgeslagen vectoren die wiskundig het dichtst bij uw vraagvector liggen en retourneert die items. Dit is semantisch zoeken: het vindt inhoud met dezelfde betekenis, zelfs als de exacte woorden anders zijn."),
        h2("Waarom vectordatabases essentieel zijn voor enterprise AI"),
        p("RAG-systemen hebben een snelle, nauwkeurige manier nodig om de meest relevante documenten te vinden uit een groot corpus wanneer een gebruiker een vraag stelt. Een vectordatabase lost dit op."),
        p("Zonder vectordatabase zou u elk document naar het LLM moeten sturen voor elke query — wat onmogelijk traag en duur is op enterprise schaal."),
        h2("Populaire vectordatabases voor enterprise gebruik"),
        p("Beheerde cloudopties zijn eenvoudig in te stellen maar houden in dat u uw data naar een externe dienst stuurt. Voor private enterprise-implementaties zijn zelf-gehoste opties standaard: pgvector, Qdrant zelf-gehost, Chroma of Weaviate. Wonka AI gebruikt een zelf-gehoste vectordatabase binnen uw infrastructuur."),
      ],
      faq: [
        faq("Wat is een embedding?", "Een embedding is een numerieke representatie van een stuk tekst als hoog-dimensionale vector (typisch 768 tot 3.072 getallen). Teksten met vergelijkbare betekenis produceren vectoren die dicht bij elkaar liggen. Embeddings worden gemaakt door embedding-modellen — gespecialiseerde neurale netwerken getraind om semantische betekenis vast te leggen."),
        faq("Hoeveel documenten kan een vectordatabase verwerken?", "Moderne vectordatabases schalen tot honderden miljoenen vectoren. Voor enterprise documentcorpora zijn typische groottes 1–50 miljoen chunks, die vectordatabases verwerken zonder prestatieverlies."),
        faq("Vervangen vectordatabases traditionele databases?", "Nee. Vectordatabases zijn gespecialiseerd voor similariteitszoeken. Ze werken naast uw bestaande databases — SQL voor gestructureerde data, documentopslag voor ongestructureerde data, vectordatabases voor semantisch ophalen."),
      ],
      seo: seo("Vectordatabase — Definitie & Enterprise AI Gids | Wonka AI", "Wat is een vectordatabase? Hoe embeddings en similariteitszoeken werken, waarom vectordatabases RAG-systemen aandrijven en welke opties het beste zijn voor private enterprise-implementatie."),
    },
  },
  {
    slug: "prompt-engineering",
    en: {
      term: "Prompt Engineering",
      shortDefinition: "Prompt engineering is the practice of designing and optimizing the instructions given to an AI model to get reliable, high-quality outputs. It is the craft of communicating effectively with LLMs — structuring inputs so the model produces the response you need.",
      body: [
        h2("What is prompt engineering?"),
        p("LLMs are general-purpose text processors — they generate the most likely continuation of whatever input you provide. Prompt engineering is the discipline of designing that input to reliably get the output you want. Small changes in how a prompt is worded can produce dramatically different outputs: more accurate, more concise, better structured, or more aligned with your requirements."),
        p("At its most basic, prompt engineering involves writing clear instructions. At its most sophisticated, it involves techniques like chain-of-thought prompting, few-shot examples, role assignment, output format specification, and systematic evaluation of prompt variants."),
        h2("Key prompt engineering techniques"),
        p("Few-shot prompting: include examples of the input-output pairs you want in the prompt itself. Instead of explaining what a good output looks like, show the model three examples. This dramatically improves output consistency for structured tasks."),
        p("Chain-of-thought prompting: ask the model to 'think step by step' before giving its final answer. This technique improves performance on reasoning tasks by forcing the model to articulate intermediate steps rather than jumping to a conclusion."),
        p("Role and context setting: tell the model who it is and what the context is before asking your question. 'You are a senior lawyer reviewing a commercial contract. Identify any clauses that create unusual liability exposure.' The role frames the model's interpretation of every subsequent instruction."),
        p("Output format specification: explicitly define the format you need. 'Respond in JSON with the following fields.' 'Use bullet points.' 'Maximum 3 sentences.' Format specification prevents the model from choosing a structure that doesn't work for your downstream use case."),
        h2("Prompt engineering vs. fine-tuning"),
        p("Prompt engineering modifies the input; fine-tuning modifies the model. For most enterprise use cases, prompt engineering should come first — it's fast, free, and often sufficient. Fine-tuning is warranted when you need the model to behave in ways that can't be reliably achieved through prompting alone, or when you need to reduce token costs by shortening prompts."),
      ],
      faq: [
        faq("Is prompt engineering still relevant with modern models?", "Yes, but the techniques have evolved. Newer models (Claude 3.5, GPT-4o) are less sensitive to exact phrasing and more capable of inferring intent from natural language. However, structured prompting — format specification, few-shot examples, chain-of-thought — still substantially improves output quality and consistency on complex tasks."),
        faq("What is a system prompt?", "A system prompt is an instruction given to the model before the user's message, typically by the application developer. It sets the model's role, constraints, and behavior for the entire conversation. In enterprise AI deployments, system prompts define the AI's persona, access scope, output format, and safety guardrails."),
        faq("How do you evaluate whether a prompt is good?", "Systematically: define what 'good output' looks like for your task, create a test set of representative inputs, run the prompt against the test set, and score the outputs. Gut feel is not sufficient for production prompts. A/B testing prompt variants against a scored test set is the standard approach."),
      ],
      seo: seo("Prompt Engineering — Guide & Techniques for Enterprise AI | Wonka AI", "What is prompt engineering? Key techniques including few-shot prompting, chain-of-thought, and system prompts — and how to evaluate prompts for enterprise AI applications."),
    },
    fr: {
      term: "Prompt Engineering",
      shortDefinition: "Le prompt engineering est la pratique qui consiste à concevoir et optimiser les instructions données à un modèle IA pour obtenir des résultats fiables et de haute qualité. C'est l'art de communiquer efficacement avec les LLM.",
      body: [
        h2("Qu'est-ce que le prompt engineering ?"),
        p("Les LLM sont des processeurs de texte généralistes — ils génèrent la continuation la plus probable de ce que vous leur fournissez. Le prompt engineering est la discipline qui consiste à concevoir cette entrée pour obtenir de manière fiable la sortie souhaitée. De petits changements dans la formulation d'un prompt peuvent produire des résultats radicalement différents."),
        h2("Techniques clés de prompt engineering"),
        p("Le few-shot prompting : inclure des exemples de paires entrée-sortie dans le prompt lui-même. Au lieu d'expliquer à quoi ressemble un bon résultat, montrez au modèle trois exemples."),
        p("Le chain-of-thought prompting : demander au modèle de 'penser étape par étape' avant de donner sa réponse finale. Cette technique améliore les performances sur les tâches de raisonnement."),
        p("La définition du rôle et du contexte : dites au modèle qui il est et quel est le contexte avant de poser votre question."),
        p("La spécification du format de sortie : définissez explicitement le format dont vous avez besoin. 'Répondez en JSON avec les champs suivants.' 'Utilisez des puces.' 'Maximum 3 phrases.'"),
        h2("Prompt engineering vs. fine-tuning"),
        p("Le prompt engineering modifie l'entrée ; le fine-tuning modifie le modèle. Pour la plupart des cas d'usage enterprise, le prompt engineering doit venir en premier — c'est rapide, gratuit et souvent suffisant."),
      ],
      faq: [
        faq("Le prompt engineering est-il encore pertinent avec les modèles modernes ?", "Oui, mais les techniques ont évolué. Les modèles plus récents sont moins sensibles à la formulation exacte. Cependant, le prompting structuré — spécification de format, exemples few-shot, chain-of-thought — améliore encore substantiellement la qualité des sorties sur des tâches complexes."),
        faq("Qu'est-ce qu'un system prompt ?", "Un system prompt est une instruction donnée au modèle avant le message de l'utilisateur, généralement par le développeur de l'application. Il définit le rôle, les contraintes et le comportement du modèle pour toute la conversation."),
        faq("Comment évaluer si un prompt est bon ?", "De manière systématique : définissez à quoi ressemble une 'bonne sortie', créez un ensemble de tests d'entrées représentatives, exécutez le prompt sur cet ensemble de tests et évaluez les sorties. Le ressenti ne suffit pas pour les prompts en production."),
      ],
      seo: seo("Prompt Engineering — Guide & techniques pour l'IA enterprise | Wonka AI", "Qu'est-ce que le prompt engineering ? Techniques clés incluant le few-shot prompting, le chain-of-thought et les system prompts pour les applications IA enterprise."),
    },
    nl: {
      term: "Prompt Engineering",
      shortDefinition: "Prompt engineering is de praktijk van het ontwerpen en optimaliseren van instructies voor een AI-model om betrouwbare, hoogwaardige uitvoer te krijgen. Het is de kunst van effectief communiceren met LLMs.",
      body: [
        h2("Wat is prompt engineering?"),
        p("LLMs zijn algemene tekstverwerkers — ze genereren de meest waarschijnlijke voortzetting van wat u ze geeft. Prompt engineering is de discipline van het ontwerpen van die invoer om betrouwbaar de gewenste uitvoer te krijgen. Kleine veranderingen in de formulering van een prompt kunnen dramatisch verschillende resultaten produceren."),
        h2("Sleuteltechnieken voor prompt engineering"),
        p("Few-shot prompting: voorbeelden van invoer-uitvoerparen opnemen in de prompt zelf. In plaats van uit te leggen hoe een goede uitvoer eruitziet, toont u het model drie voorbeelden."),
        p("Chain-of-thought prompting: vraag het model 'stap voor stap te denken' voordat het zijn definitieve antwoord geeft. Deze techniek verbetert de prestaties op redeneer taken."),
        p("Rol- en contextinstelling: vertel het model wie het is en wat de context is voordat u uw vraag stelt."),
        p("Uitvoerformatspecificatie: definieer expliciet het formaat dat u nodig heeft. 'Antwoord in JSON met de volgende velden.' 'Gebruik opsommingstekens.' 'Maximaal 3 zinnen.'"),
        h2("Prompt engineering vs. fine-tuning"),
        p("Prompt engineering wijzigt de invoer; fine-tuning wijzigt het model. Voor de meeste enterprise use cases moet prompt engineering eerst komen — het is snel, gratis en vaak voldoende."),
      ],
      faq: [
        faq("Is prompt engineering nog steeds relevant met moderne modellen?", "Ja, maar de technieken zijn geëvolueerd. Nieuwere modellen zijn minder gevoelig voor exacte bewoordingen. Gestructureerd prompting — formaatspecificatie, few-shot voorbeelden, chain-of-thought — verbetert echter nog steeds substantieel de uitvoerkwaliteit op complexe taken."),
        faq("Wat is een systeem-prompt?", "Een systeem-prompt is een instructie die vóór het bericht van de gebruiker aan het model wordt gegeven, doorgaans door de applicatie-ontwikkelaar. Het stelt de rol, beperkingen en het gedrag van het model in voor het hele gesprek."),
        faq("Hoe evalueert u of een prompt goed is?", "Systematisch: definieer hoe 'goede uitvoer' eruitziet voor uw taak, maak een testset van representatieve invoeren, voer de prompt uit op de testset en beoordeel de uitvoeren. Gevoel is niet voldoende voor productie-prompts."),
      ],
      seo: seo("Prompt Engineering — Gids & technieken voor enterprise AI | Wonka AI", "Wat is prompt engineering? Sleuteltechnieken waaronder few-shot prompting, chain-of-thought en systeem-prompts voor enterprise AI-toepassingen."),
    },
  },
  {
    slug: "on-premise",
    en: {
      term: "On-premise (On-prem)",
      shortDefinition: "On-premise refers to software and infrastructure that is installed and runs on servers physically located within an organization's own facilities — as opposed to cloud-based solutions hosted by a third-party provider. For AI deployments, on-premise means the model runs on hardware you own and control.",
      body: [
        h2("What does on-premise mean?"),
        p("On-premise (often abbreviated 'on-prem') describes a deployment model where software runs on hardware that the organization owns or leases and physically controls. The servers are in your data center, your office, or a co-location facility you manage — not in a cloud provider's infrastructure."),
        p("The opposite of on-premise is cloud-hosted or SaaS: the software runs on servers owned by a vendor (AWS, Microsoft Azure, Google Cloud, or the software vendor itself), and you access it over the internet. Most modern enterprise software has shifted to cloud delivery, but on-premise remains the standard in regulated industries, high-security environments, and organizations with strict data sovereignty requirements."),
        h2("On-premise AI: what it means in practice"),
        p("For enterprise AI, on-premise deployment means the LLM itself — the model weights and the inference infrastructure — runs on servers within your environment. When an employee asks a question, the query goes to your server, the model processes it on your hardware, and the response is returned — nothing touches a cloud provider's infrastructure."),
        p("True on-premise AI requires significant hardware investment: GPU servers for model inference, storage for document indexing, networking for low-latency access. A 70B parameter model in 4-bit quantization needs approximately 40GB of GPU VRAM, meaning multiple high-end GPU servers for a production deployment."),
        h2("On-premise vs. private cloud"),
        p("On-premise means hardware you physically own and operate. Private cloud means a dedicated cloud environment you control — either in a public cloud provider's infrastructure (your own VPC on AWS or Azure) or in a co-location facility — but the hardware is not managed by you. Both approaches achieve data sovereignty; the difference is who manages the underlying hardware."),
        p("For most enterprises, private cloud deployment offers a practical middle ground: full data sovereignty without the capital expense and operational complexity of owning GPU servers. Wonka AI supports both on-premise and private cloud deployment depending on your infrastructure requirements."),
      ],
      faq: [
        faq("Is on-premise AI more secure than cloud AI?", "It can be, but security depends more on how you configure and manage the environment than where it runs. A poorly secured on-premise server is less safe than a well-configured private cloud environment. On-premise gives you full control; what matters is whether you exercise that control effectively."),
        faq("What are the main disadvantages of on-premise AI?", "Capital cost (GPU servers are expensive), operational complexity (you manage hardware, software updates, and reliability), scaling constraints (adding capacity requires hardware procurement), and slower access to model improvements (you update models manually rather than automatically)."),
        faq("Can on-premise AI connect to cloud services?", "Yes, selectively. An on-premise AI can call external APIs for non-sensitive operations while keeping sensitive data processing local. The architecture question is: which data leaves your environment and which stays? For most regulated enterprises, the model inference and document processing must stay on-premise, while non-sensitive API calls (sending a calendar invite, looking up a public data source) can go to the cloud."),
      ],
      seo: seo("On-premise AI — Definition, Pros and Cons for Enterprises | Wonka AI", "What does on-premise mean for AI deployments? How on-prem differs from private cloud, the real hardware requirements, and when on-premise is the right choice for data sovereignty."),
    },
    fr: {
      term: "On-premise (On-prem)",
      shortDefinition: "L'on-premise désigne les logiciels et infrastructures installés et fonctionnant sur des serveurs physiquement situés dans les propres locaux d'une organisation — par opposition aux solutions cloud hébergées par un prestataire tiers.",
      body: [
        h2("Que signifie on-premise ?"),
        p("L'on-premise (souvent abrégé 'on-prem') décrit un modèle de déploiement où le logiciel tourne sur du matériel que l'organisation possède ou loue et contrôle physiquement. Les serveurs sont dans votre datacenter, vos bureaux ou une installation de colocation que vous gérez — pas dans l'infrastructure d'un fournisseur cloud."),
        p("L'opposé de l'on-premise est le cloud ou le SaaS : le logiciel tourne sur des serveurs appartenant à un éditeur, et vous y accédez via internet. L'on-premise reste la norme dans les secteurs réglementés et les organisations avec des exigences strictes de souveraineté des données."),
        h2("L'IA on-premise : ce que cela signifie en pratique"),
        p("Pour l'IA en entreprise, le déploiement on-premise signifie que le LLM lui-même tourne sur des serveurs dans votre environnement. Quand un employé pose une question, la requête va à votre serveur, le modèle la traite sur votre matériel — rien ne touche l'infrastructure d'un fournisseur cloud."),
        p("La vraie IA on-premise nécessite un investissement matériel significatif : des serveurs GPU pour l'inférence du modèle, du stockage pour l'indexation des documents. Un modèle de 70 milliards de paramètres nécessite environ 40 Go de VRAM GPU."),
        h2("On-premise vs. cloud privé"),
        p("L'on-premise signifie du matériel que vous possédez et exploitez physiquement. Le cloud privé signifie un environnement cloud dédié que vous contrôlez. Les deux approches permettent la souveraineté des données ; la différence est qui gère le matériel sous-jacent."),
        p("Pour la plupart des entreprises, le déploiement en cloud privé offre un juste milieu : souveraineté totale des données sans la dépense d'investissement ni la complexité opérationnelle de posséder des serveurs GPU. Wonka AI supporte les deux modes de déploiement."),
      ],
      faq: [
        faq("L'IA on-premise est-elle plus sécurisée que l'IA cloud ?", "Ça peut l'être, mais la sécurité dépend davantage de la façon dont vous configurez et gérez l'environnement que de son emplacement. L'on-premise vous donne le contrôle total ; ce qui compte, c'est de l'exercer efficacement."),
        faq("Quels sont les principaux inconvénients de l'IA on-premise ?", "Coût d'investissement (les serveurs GPU sont chers), complexité opérationnelle, contraintes de mise à l'échelle et accès plus lent aux améliorations des modèles."),
        faq("L'IA on-premise peut-elle se connecter à des services cloud ?", "Oui, sélectivement. Une IA on-premise peut appeler des APIs externes pour des opérations non sensibles tout en maintenant le traitement des données sensibles en local. La question architecturale est : quelles données quittent votre environnement ?"),
      ],
      seo: seo("On-premise IA — Définition, avantages et inconvénients pour les entreprises | Wonka AI", "Que signifie l'on-premise pour les déploiements IA ? Comment l'on-prem diffère du cloud privé, les vraies exigences matérielles et quand l'on-premise est le bon choix."),
    },
    nl: {
      term: "On-premise (On-prem)",
      shortDefinition: "On-premise verwijst naar software en infrastructuur die is geïnstalleerd en draait op servers die fysiek zijn gevestigd in de eigen faciliteiten van een organisatie — in tegenstelling tot cloudgebaseerde oplossingen gehost door een externe aanbieder.",
      body: [
        h2("Wat betekent on-premise?"),
        p("On-premise (vaak afgekort als 'on-prem') beschrijft een implementatiemodel waarbij software draait op hardware die de organisatie bezit of least en fysiek beheert. De servers bevinden zich in uw datacenter, uw kantoor of een co-locatiefaciliteit die u beheert — niet in de infrastructuur van een cloudaanbieder."),
        p("Het tegenovergestelde van on-premise is cloud-hosted of SaaS: de software draait op servers van een leverancier en u heeft er toegang toe via het internet. On-premise blijft de standaard in gereguleerde industrieën en organisaties met strikte vereisten voor gegevenssouvereiniteit."),
        h2("On-premise AI: wat het in de praktijk betekent"),
        p("Voor enterprise AI betekent on-premise implementatie dat het LLM zelf draait op servers binnen uw omgeving. Wanneer een medewerker een vraag stelt, gaat de query naar uw server, verwerkt het model deze op uw hardware — niets raakt de infrastructuur van een cloudaanbieder."),
        h2("On-premise vs. private cloud"),
        p("On-premise betekent hardware die u fysiek bezit en exploiteert. Private cloud betekent een dedicated cloudomgeving die u beheert. Beide benaderingen bereiken gegevenssouvereiniteit; het verschil is wie de onderliggende hardware beheert."),
        p("Voor de meeste ondernemingen biedt private cloud-implementatie een praktisch compromis: volledige gegevenssouvereiniteit zonder de kapitaaluitgave en operationele complexiteit van het bezitten van GPU-servers. Wonka AI ondersteunt beide implementatiemodi."),
      ],
      faq: [
        faq("Is on-premise AI veiliger dan cloud AI?", "Dat kan, maar beveiliging hangt meer af van hoe u de omgeving configureert en beheert dan van waar deze draait. On-premise geeft u volledige controle; wat telt is of u die controle effectief uitoefent."),
        faq("Wat zijn de belangrijkste nadelen van on-premise AI?", "Kapitaalkosten (GPU-servers zijn duur), operationele complexiteit, schaalbaarheidsbeperkin gen en langzamere toegang tot modelverbeteringen."),
        faq("Kan on-premise AI verbinding maken met clouddiensten?", "Ja, selectief. Een on-premise AI kan externe API's aanroepen voor niet-gevoelige bewerkingen terwijl gevoelige gegevensverwerking lokaal blijft. De architectuurvraag is: welke gegevens verlaten uw omgeving?"),
      ],
      seo: seo("On-premise AI — Definitie, voor- en nadelen voor ondernemingen | Wonka AI", "Wat betekent on-premise voor AI-implementaties? Hoe on-prem verschilt van private cloud, de werkelijke hardwarevereisten en wanneer on-premise de juiste keuze is voor gegevenssouvereiniteit."),
    },
  },
];

// ── Comparisons ──────────────────────────────────────────────────────────────

const comparisons = [
  {
    slug: "wonka-ai-vs-microsoft-copilot",
    en: {
      title: "Wonka AI vs Microsoft Copilot: Which AI Is Right for Your Enterprise?",
      competitor: "Microsoft Copilot",
      excerpt: "Both Wonka AI and Microsoft Copilot bring AI to your workplace. But they make fundamentally different choices on data handling, deployment, and who controls your AI. Here's the breakdown.",
      body: [
        h2("The core difference: where your data goes"),
        p("Microsoft Copilot runs on Azure OpenAI. Your data — the queries, the context from your emails and files — is processed on Microsoft's infrastructure. Microsoft provides data residency options and security commitments, but the model itself is not running in your environment."),
        p("Wonka AI deploys a private LLM within your own infrastructure. Nothing leaves your environment. Your data is processed on your servers or your dedicated cloud environment. This is not a configuration option — it's the fundamental architecture."),
        h2("Licensing and cost model"),
        p("Microsoft Copilot for Microsoft 365 costs €30/user/month on top of your existing Microsoft 365 license. For a 500-person organization, that's €15,000/month or €180,000/year — before any customization or integration work."),
        p("Wonka AI pricing is based on deployment scope and team size. For organizations with complex integration needs or strict data requirements, the economics typically favor Wonka AI beyond 100 users."),
        h2("Integration depth"),
        p("Copilot integrates deeply with the Microsoft ecosystem: Outlook, Teams, Word, Excel, PowerPoint, SharePoint. If your stack is 100% Microsoft, this is a real advantage."),
        p("Wonka AI integrates across your entire tool stack, regardless of vendor: Microsoft tools, Salesforce, HubSpot, Jira, Slack, Google Workspace, SAP, Odoo, and custom systems via API. If you run a heterogeneous stack, Wonka AI covers it."),
        h2("Who should choose which"),
        p("Choose Microsoft Copilot if: your stack is entirely Microsoft, your data sensitivity is low, you want a fully managed solution with no deployment overhead, and GDPR concerns are manageable."),
        p("Choose Wonka AI if: you handle sensitive data subject to GDPR or sector regulations, your stack includes non-Microsoft tools, you need full data sovereignty, or you want AI that adapts to your specific workflows rather than Microsoft's product roadmap."),
      ],
      faq: [
        faq("Is Wonka AI more expensive than Microsoft Copilot?", "Not necessarily. Microsoft Copilot requires a €30/user/month add-on license. Wonka AI pricing scales with deployment scope. For organizations with 100+ users and complex integration needs, Wonka AI is often more cost-effective when total cost of ownership is considered."),
        faq("Can Wonka AI work alongside Microsoft Copilot?", "Yes. Some organizations deploy Wonka AI for sensitive workflows requiring data sovereignty while using Copilot for general productivity tasks. The tools are complementary rather than mutually exclusive."),
        faq("Does Wonka AI require Microsoft licenses?", "No. Wonka AI connects to Microsoft tools (Outlook, SharePoint, Teams) via API without requiring Microsoft Copilot licenses. Your existing Microsoft 365 subscription is sufficient."),
      ],
      seo: seo("Wonka AI vs Microsoft Copilot: Enterprise AI Comparison | Wonka AI", "Wonka AI or Microsoft Copilot? A detailed comparison of data handling, cost, integrations, and GDPR compliance to help you choose the right enterprise AI."),
    },
    fr: {
      title: "Wonka AI vs Microsoft Copilot : quelle IA pour votre entreprise ?",
      competitor: "Microsoft Copilot",
      excerpt: "Wonka AI et Microsoft Copilot apportent tous deux l'IA sur votre lieu de travail. Mais ils font des choix fondamentalement différents sur la gestion des données, le déploiement et le contrôle de votre IA.",
      body: [
        h2("La différence fondamentale : où vont vos données"),
        p("Microsoft Copilot tourne sur Azure OpenAI. Vos données — les requêtes, le contexte de vos emails et fichiers — sont traitées sur l'infrastructure de Microsoft."),
        p("Wonka AI déploie un LLM privé dans votre propre infrastructure. Rien ne quitte votre environnement. C'est l'architecture fondamentale, pas une option de configuration."),
        h2("Modèle de licence et coût"),
        p("Microsoft Copilot pour Microsoft 365 coûte 30€/utilisateur/mois en plus de votre licence Microsoft 365 existante. Pour une organisation de 500 personnes, c'est 15 000€/mois ou 180 000€/an."),
        p("La tarification de Wonka AI est basée sur la portée du déploiement et la taille de l'équipe. Pour les organisations avec des besoins d'intégration complexes, l'économie favorise généralement Wonka AI au-delà de 100 utilisateurs."),
        h2("Profondeur d'intégration"),
        p("Copilot s'intègre profondément dans l'écosystème Microsoft. Si votre stack est 100% Microsoft, c'est un avantage réel."),
        p("Wonka AI s'intègre dans l'ensemble de votre stack, quel que soit le fournisseur : outils Microsoft, Salesforce, HubSpot, Jira, Slack, Google Workspace, SAP, Odoo et systèmes personnalisés via API."),
      ],
      faq: [
        faq("Wonka AI est-il plus cher que Microsoft Copilot ?", "Pas nécessairement. Microsoft Copilot nécessite une licence supplémentaire à 30€/utilisateur/mois. Pour les organisations de 100+ utilisateurs avec des besoins d'intégration complexes, Wonka AI est souvent plus rentable en coût total de possession."),
        faq("Wonka AI peut-il fonctionner en parallèle avec Microsoft Copilot ?", "Oui. Certaines organisations déploient Wonka AI pour les workflows sensibles nécessitant la souveraineté des données et utilisent Copilot pour les tâches de productivité générale."),
        faq("Wonka AI nécessite-t-il des licences Microsoft ?", "Non. Wonka AI se connecte aux outils Microsoft via API sans nécessiter de licences Microsoft Copilot. Votre abonnement Microsoft 365 existant est suffisant."),
      ],
      seo: seo("Wonka AI vs Microsoft Copilot : comparaison IA enterprise | Wonka AI", "Wonka AI ou Microsoft Copilot ? Comparaison détaillée sur la gestion des données, le coût, les intégrations et la conformité RGPD pour choisir la bonne IA enterprise."),
    },
    nl: {
      title: "Wonka AI vs Microsoft Copilot: welke AI voor uw onderneming?",
      competitor: "Microsoft Copilot",
      excerpt: "Wonka AI en Microsoft Copilot brengen beide AI op uw werkplek. Maar ze maken fundamenteel verschillende keuzes over gegevensverwerking, implementatie en wie uw AI beheert.",
      body: [
        h2("Het kernverschil: waar uw data naartoe gaat"),
        p("Microsoft Copilot draait op Azure OpenAI. Uw gegevens worden verwerkt op de infrastructuur van Microsoft."),
        p("Wonka AI implementeert een private LLM binnen uw eigen infrastructuur. Niets verlaat uw omgeving. Dit is de fundamentele architectuur, geen configuratieoptie."),
        h2("Licentie- en kostenmodel"),
        p("Microsoft Copilot voor Microsoft 365 kost €30/gebruiker/maand bovenop uw bestaande Microsoft 365-licentie. Voor een organisatie van 500 mensen is dat €15.000/maand of €180.000/jaar."),
        h2("Integratiediepte"),
        p("Copilot integreert diep in het Microsoft-ecosysteem. Als uw stack 100% Microsoft is, is dit een reëel voordeel."),
        p("Wonka AI integreert in uw volledige tool-stack, ongeacht de leverancier: Microsoft-tools, Salesforce, HubSpot, Jira, Slack, Google Workspace, SAP, Odoo en maatwerksystemen via API."),
      ],
      faq: [
        faq("Is Wonka AI duurder dan Microsoft Copilot?", "Niet noodzakelijk. Microsoft Copilot vereist een extra licentie van €30/gebruiker/maand. Voor organisaties met 100+ gebruikers en complexe integratiebehoeften is Wonka AI vaak kosteneffectiever."),
        faq("Kan Wonka AI naast Microsoft Copilot werken?", "Ja. Sommige organisaties implementeren Wonka AI voor gevoelige workflows die gegevenssouvereiniteit vereisen en gebruiken Copilot voor algemene productiviteitstaken."),
        faq("Vereist Wonka AI Microsoft-licenties?", "Nee. Wonka AI verbindt met Microsoft-tools via API zonder Microsoft Copilot-licenties te vereisen."),
      ],
      seo: seo("Wonka AI vs Microsoft Copilot: enterprise AI vergelijking | Wonka AI", "Wonka AI of Microsoft Copilot? Een gedetailleerde vergelijking van gegevensverwerking, kosten, integraties en AVG-naleving."),
    },
  },
  {
    slug: "private-llm-vs-public-llm",
    en: {
      title: "Private LLM vs Public LLM: Which Should Your Enterprise Choose?",
      competitor: "Public LLM",
      excerpt: "Private or public LLM — the choice shapes your data handling, compliance posture, customization options, and total cost of ownership. Here's what you need to know to make the right call.",
      body: [
        h2("The fundamental trade-off"),
        p("Public LLMs (ChatGPT, Claude, Gemini accessed via API or browser) give you immediate access to state-of-the-art models with no deployment overhead. Private LLMs require infrastructure, deployment expertise, and ongoing maintenance — but give you complete control over your data and model behavior."),
        h2("Data handling"),
        p("With a public LLM, your inputs are processed by the provider. Most providers offer enterprise tiers with data privacy commitments — OpenAI Enterprise claims not to use your data for training, for example — but your data still passes through their systems. For many European enterprises, this creates GDPR exposure."),
        p("With a private LLM, your data is processed within your controlled infrastructure — hosted in Azure West Europe (Microsoft Ireland) by default, or on-premise as an Enterprise option. This architecture satisfies data sovereignty requirements for regulated sectors."),
        h2("Cost"),
        p("Public LLMs are pay-per-token. At scale, this adds up: a company with 500 employees each making 100 API calls per day, averaging 1000 tokens per call, generates 50M tokens daily — at roughly €0.002 per 1000 tokens (GPT-4 pricing), that's €3,600/month or €43,200/year, and that's a conservative estimate."),
        p("Private LLM infrastructure has higher upfront cost (servers or dedicated cloud capacity) but predictable, fixed operating costs that don't scale with usage. For organizations at scale, private often beats public on total cost within 12-18 months."),
        h2("Model quality and customization"),
        p("Public LLMs (especially frontier models like GPT-4, Claude 3 Opus) currently outperform most privately deployable models on general benchmarks. If your use cases require cutting-edge reasoning, public APIs may have an edge."),
        p("However, open models (Llama 3, Mistral, Qwen) are closing the gap rapidly, and private deployment allows fine-tuning on your specific data and domain — which can outperform general frontier models on targeted enterprise tasks."),
      ],
      faq: [
        faq("Can a private LLM match the quality of GPT-4?", "On general benchmarks, frontier models like GPT-4 and Claude 3 Opus still lead. However, for specific enterprise use cases — document Q&A, ticket classification, internal knowledge retrieval — a well-configured private LLM with RAG often matches or exceeds frontier models because it's grounded in your actual data."),
        faq("What infrastructure do you need to run a private LLM?", "Requirements depend on the model size. A 7B parameter model can run on a single A100 GPU server. A 70B parameter model requires multiple GPUs. Cloud-based private deployment (your VPC on AWS, Azure, or GCP) is often more practical than on-premise for most enterprises."),
        faq("Is a private LLM harder to maintain?", "Yes, compared to a fully managed public API. You're responsible for model updates, infrastructure reliability, and monitoring. However, managed private LLM services (like Wonka AI) handle the infrastructure layer for you while keeping your data in your environment."),
      ],
      seo: seo("Private LLM vs Public LLM: Enterprise Decision Guide | Wonka AI", "Private or public LLM? A detailed comparison of data handling, cost, quality, and compliance to help European enterprises make the right AI architecture decision."),
    },
    fr: {
      title: "LLM privé vs LLM public : lequel choisir pour votre entreprise ?",
      competitor: "LLM public",
      excerpt: "Privé ou public — ce choix détermine votre gestion des données, votre posture de conformité, vos options de personnalisation et votre coût total de possession.",
      body: [
        h2("Le compromis fondamental"),
        p("Les LLM publics (ChatGPT, Claude, Gemini via API) donnent un accès immédiat à des modèles de pointe sans overhead de déploiement. Les LLM privés nécessitent infrastructure, expertise et maintenance — mais vous donnent un contrôle total sur vos données."),
        h2("Gestion des données"),
        p("Avec un LLM public, vos entrées sont traitées par le fournisseur. Pour de nombreuses entreprises européennes, cela crée une exposition RGPD."),
        p("Avec un LLM privé, vos données sont traitées dans votre infrastructure contrôlée — hébergée en Azure West Europe (Microsoft Irlande) par défaut, ou on-premise en option Entreprise. C'est l'architecture qui satisfait les exigences de souveraineté des données pour les secteurs réglementés."),
        h2("Coût"),
        p("Les LLM publics sont facturés au token. À grande échelle, ça s'accumule : une entreprise de 500 employés peut dépenser 43 000€/an en frais d'API."),
        p("L'infrastructure LLM privée a un coût initial plus élevé mais des coûts opérationnels prévisibles et fixes. Pour les organisations à grande échelle, le privé l'emporte souvent sur le public en coût total dans les 12 à 18 mois."),
      ],
      faq: [
        faq("Un LLM privé peut-il égaler la qualité de GPT-4 ?", "Sur les benchmarks généraux, les modèles frontier ont encore l'avantage. Cependant, pour les cas d'usage enterprise spécifiques — Q&R documentaire, classification de tickets, récupération de connaissances internes — un LLM privé bien configuré avec RAG correspond souvent ou dépasse les modèles frontier."),
        faq("Quelle infrastructure faut-il pour faire tourner un LLM privé ?", "Un modèle de 7 milliards de paramètres peut tourner sur un seul serveur GPU A100. Un modèle de 70 milliards nécessite plusieurs GPU. Le déploiement privé basé sur le cloud est souvent plus pratique que l'on-premise."),
        faq("Un LLM privé est-il plus difficile à maintenir ?", "Oui, comparé à une API publique gérée. Cependant, des services LLM privés managés (comme Wonka AI) gèrent la couche infrastructure pour vous tout en gardant vos données dans votre environnement."),
      ],
      seo: seo("LLM privé vs LLM public : guide de décision enterprise | Wonka AI", "LLM privé ou public ? Comparaison détaillée sur la gestion des données, le coût, la qualité et la conformité RGPD pour les entreprises européennes."),
    },
    nl: {
      title: "Private LLM vs publieke LLM: welke kiest uw onderneming?",
      competitor: "Publieke LLM",
      excerpt: "Privé of publiek — deze keuze bepaalt uw gegevensverwerking, compliance, aanpassingsopties en total cost of ownership.",
      body: [
        h2("De fundamentele afweging"),
        p("Publieke LLMs geven directe toegang tot state-of-the-art modellen zonder implementatie-overhead. Private LLMs vereisen infrastructuur en expertise, maar geven u volledige controle over uw gegevens."),
        h2("Gegevensverwerking"),
        p("Met een publieke LLM worden uw invoeren verwerkt door de aanbieder. Voor veel Europese ondernemingen creëert dit AVG-blootstelling."),
        p("Met een private LLM verlaten uw gegevens nooit uw omgeving. Dit is de enige architectuur die volledig voldoet aan vereisten voor gegevenssouvereiniteit."),
        h2("Kosten"),
        p("Publieke LLMs worden per token gefactureerd. Op schaal loopt dit op: een bedrijf van 500 medewerkers kan €43.000/jaar aan API-kosten uitgeven."),
        p("Private LLM-infrastructuur heeft hogere initiële kosten maar voorspelbare, vaste operationele kosten."),
      ],
      faq: [
        faq("Kan een private LLM de kwaliteit van GPT-4 evenaren?", "Op algemene benchmarks hebben frontiermodellen nog een voordeel. Voor specifieke enterprise-gebruiksscenario's — document Q&A, ticketclassificatie — presteert een goed geconfigureerde private LLM met RAG vaak net zo goed."),
        faq("Welke infrastructuur heeft u nodig voor een private LLM?", "Een model van 7 miljard parameters kan draaien op één A100 GPU-server. Cloudgebaseerde private implementatie is vaak praktischer dan on-premise."),
        faq("Is een private LLM moeilijker te onderhouden?", "Ja, vergeleken met een volledig beheerde publieke API. Beheerde private LLM-services (zoals Wonka AI) regelen de infrastructuurlaag voor u terwijl uw gegevens in uw omgeving blijven."),
      ],
      seo: seo("Private LLM vs publieke LLM: enterprise beslissingsguide | Wonka AI", "Private of publieke LLM? Een gedetailleerde vergelijking van gegevensverwerking, kosten, kwaliteit en AVG-naleving voor Europese ondernemingen."),
    },
  },
  {
    slug: "wonka-ai-vs-chatgpt-enterprise",
    en: {
      title: "Wonka AI vs ChatGPT Enterprise: Which Is Right for European Businesses?",
      competitor: "ChatGPT Enterprise",
      excerpt: "ChatGPT Enterprise promises privacy and performance. But for European enterprises with strict data requirements, the question isn't just about features — it's about where your data goes and who controls it.",
      body: [
        h2("What ChatGPT Enterprise actually offers"),
        p("OpenAI launched ChatGPT Enterprise in 2023 with a clear message to business buyers: your data won't be used for training, you get higher usage limits, and enterprise SSO. For many organizations, it resolved the most obvious concern about using ChatGPT at work."),
        p("But ChatGPT Enterprise still processes your data on OpenAI's infrastructure — US-based servers under US jurisdiction. OpenAI has made contractual commitments not to use your data for training, but your queries and the context you provide still pass through their systems. For European enterprises subject to GDPR or sector-specific regulations, this architecture creates real exposure."),
        h2("The CLOUD Act problem"),
        p("OpenAI is a US company. Under the CLOUD Act (Clarifying Lawful Overseas Use of Data Act), US authorities can compel OpenAI to disclose data it holds — including data from European enterprise customers — regardless of where that data physically resides. OpenAI's privacy commitments do not override US law. This is not a theoretical risk; it is a structural characteristic of any US-based AI provider."),
        p("For enterprises whose clients include financial institutions, healthcare providers, law firms, or any organization with contractual data sovereignty requirements, using ChatGPT Enterprise may put those contracts at risk."),
        h2("Capability comparison"),
        p("ChatGPT Enterprise is built on GPT-4o — currently one of the strongest general-purpose language models available. For general productivity tasks — drafting, summarization, code generation, research — it is excellent. The product is mature, the interface is polished, and OpenAI's model iteration pace is rapid."),
        p("Wonka AI uses private open models (Llama 3.1, Mistral, or customer-specified alternatives) deployed in your infrastructure, combined with RAG across your connected data sources. For targeted enterprise use cases — document Q&A on your internal content, CRM intelligence, support automation — the combination of private deployment and RAG often matches or exceeds GPT-4o because the model is grounded in your actual data rather than its training corpus."),
        h2("Integration depth"),
        p("ChatGPT Enterprise operates as a standalone product. Integration with your existing tools (Outlook, Salesforce, SharePoint, Jira) requires custom plugins, API work, and an OpenAI developer ecosystem that is still maturing. The out-of-the-box experience is a general assistant; making it useful for your specific workflows requires significant configuration effort."),
        p("Wonka AI is designed as an integration layer from the ground up. Connectors for SharePoint, Slack, Salesforce, HubSpot, Google Drive, Jira, Notion, and Microsoft Teams are built-in. Your employees ask questions; Wonka retrieves context from across your tool stack and answers from your actual data. No custom development required for standard integrations."),
        h2("Who should choose which"),
        p("Choose ChatGPT Enterprise if: your data sensitivity is low, you primarily need a general-purpose AI assistant for individual productivity, and regulatory constraints are manageable. The product is mature and the interface is excellent."),
        p("Choose Wonka AI if: you handle data subject to GDPR or sector regulations, your clients require data sovereignty, you need AI integrated across your existing tool stack rather than a standalone product, or you cannot accept data leaving your infrastructure under any circumstances."),
      ],
      faq: [
        faq("Is ChatGPT Enterprise GDPR compliant?", "OpenAI offers a Data Processing Agreement for ChatGPT Enterprise that addresses GDPR requirements. However, GDPR compliance does not equal data sovereignty. Your data is still processed on US infrastructure by a US company subject to the CLOUD Act. For organizations where data leaving the EU is legally or contractually prohibited, ChatGPT Enterprise does not fully satisfy these requirements."),
        faq("Can Wonka AI match GPT-4o quality?", "For general open-ended tasks, frontier models like GPT-4o have an edge. For targeted enterprise use cases — querying your internal documents, CRM data, and tool history — a private LLM with RAG configured on your data often performs better because it answers from your actual content rather than its training data."),
        faq("What does ChatGPT Enterprise cost compared to Wonka AI?", "ChatGPT Enterprise pricing is not publicly disclosed; OpenAI negotiates enterprise contracts. Publicly available pricing for ChatGPT Team is approximately €25/user/month. Wonka AI pricing depends on deployment scope and team size. For organizations with deep integration needs and 50+ users, Wonka AI typically offers better total cost of ownership."),
      ],
      seo: seo("Wonka AI vs ChatGPT Enterprise: European Business Comparison | Wonka AI", "ChatGPT Enterprise or Wonka AI? A detailed comparison for European enterprises on data sovereignty, GDPR compliance, integration depth, and total cost of ownership."),
    },
    fr: {
      title: "Wonka AI vs ChatGPT Enterprise : lequel pour les entreprises européennes ?",
      competitor: "ChatGPT Enterprise",
      excerpt: "ChatGPT Enterprise promet confidentialité et performance. Mais pour les entreprises européennes avec des exigences strictes sur les données, la question n'est pas que fonctionnelle — c'est une question de souveraineté.",
      body: [
        h2("Ce que ChatGPT Enterprise offre vraiment"),
        p("OpenAI a lancé ChatGPT Enterprise avec un message clair : vos données ne seront pas utilisées pour l'entraînement, vous bénéficiez de limites d'utilisation plus élevées et d'un SSO enterprise. Pour de nombreuses organisations, cela a résolu la préoccupation la plus évidente."),
        p("Mais ChatGPT Enterprise traite toujours vos données sur l'infrastructure d'OpenAI — des serveurs basés aux États-Unis soumis à la juridiction américaine. Pour les entreprises européennes soumises au RGPD ou à des réglementations sectorielles, cette architecture crée une exposition réelle."),
        h2("Le problème du CLOUD Act"),
        p("OpenAI est une entreprise américaine. En vertu du CLOUD Act, les autorités américaines peuvent contraindre OpenAI à divulguer les données qu'elle détient — y compris celles de clients enterprise européens — peu importe où ces données résident physiquement. Les engagements de confidentialité d'OpenAI ne prévalent pas sur le droit américain."),
        p("Pour les entreprises dont les clients incluent des institutions financières, des prestataires de santé ou des cabinets d'avocats avec des clauses contractuelles de souveraineté des données, utiliser ChatGPT Enterprise peut mettre ces contrats en danger."),
        h2("Comparaison des capacités"),
        p("ChatGPT Enterprise est construit sur GPT-4o — l'un des modèles de langage généralistes les plus performants actuellement. Pour les tâches de productivité générale — rédaction, résumé, génération de code — il est excellent."),
        p("Wonka AI utilise des modèles open source privés (Llama 3.1, Mistral ou alternatives spécifiées par le client) déployés dans votre infrastructure, combinés à du RAG sur vos sources de données connectées. Pour les cas d'usage enterprise ciblés, la combinaison de déploiement privé et de RAG correspond souvent ou dépasse GPT-4o car le modèle est ancré dans vos données réelles."),
        h2("Profondeur d'intégration"),
        p("ChatGPT Enterprise fonctionne comme un produit autonome. L'intégration avec vos outils existants nécessite des plugins personnalisés et du travail de développement."),
        p("Wonka AI est conçu comme une couche d'intégration dès le départ. Les connecteurs pour SharePoint, Slack, Salesforce, HubSpot, Google Drive, Jira, Notion et Microsoft Teams sont intégrés. Aucun développement personnalisé n'est requis pour les intégrations standard."),
      ],
      faq: [
        faq("ChatGPT Enterprise est-il conforme au RGPD ?", "OpenAI propose un DPA pour ChatGPT Enterprise qui répond aux exigences RGPD. Cependant, la conformité RGPD n'équivaut pas à la souveraineté des données. Vos données sont toujours traitées sur l'infrastructure américaine d'une entreprise américaine soumise au CLOUD Act."),
        faq("Wonka AI peut-il égaler la qualité de GPT-4o ?", "Pour les tâches ouvertes générales, les modèles frontier ont un avantage. Pour les cas d'usage enterprise ciblés — interroger vos documents internes, données CRM et historique d'outils — un LLM privé avec RAG configuré sur vos données performe souvent mieux car il répond depuis votre contenu réel."),
        faq("Quel est le coût de ChatGPT Enterprise par rapport à Wonka AI ?", "La tarification de ChatGPT Enterprise n'est pas publiée. ChatGPT Team est environ 25€/utilisateur/mois. Pour les organisations avec des besoins d'intégration profonds et 50+ utilisateurs, Wonka AI offre généralement un meilleur coût total de possession."),
      ],
      seo: seo("Wonka AI vs ChatGPT Enterprise : comparaison pour entreprises européennes | Wonka AI", "ChatGPT Enterprise ou Wonka AI ? Comparaison détaillée sur la souveraineté des données, la conformité RGPD, la profondeur d'intégration et le coût total de possession."),
    },
    nl: {
      title: "Wonka AI vs ChatGPT Enterprise: welke voor Europese bedrijven?",
      competitor: "ChatGPT Enterprise",
      excerpt: "ChatGPT Enterprise belooft privacy en prestaties. Maar voor Europese ondernemingen met strikte gegevensvereisten gaat de vraag verder dan functies — het gaat over waar uw data naartoe gaat en wie het beheert.",
      body: [
        h2("Wat ChatGPT Enterprise werkelijk biedt"),
        p("OpenAI lanceerde ChatGPT Enterprise met een duidelijke boodschap: uw gegevens worden niet gebruikt voor training, u krijgt hogere gebruikslimieten en enterprise SSO. Voor veel organisaties loste dit de meest voor de hand liggende zorg op."),
        p("Maar ChatGPT Enterprise verwerkt uw gegevens nog steeds op de infrastructuur van OpenAI — US-gebaseerde servers onder Amerikaanse jurisdictie. Voor Europese ondernemingen onderworpen aan AVG of sectorspecifieke regelgeving creëert deze architectuur echte blootstelling."),
        h2("Het CLOUD Act-probleem"),
        p("OpenAI is een Amerikaans bedrijf. Op grond van de CLOUD Act kunnen Amerikaanse autoriteiten OpenAI dwingen gegevens te onthullen die het bewaart — inclusief gegevens van Europese enterprise-klanten — ongeacht waar die gegevens fysiek zijn. De privacyverbintenissen van OpenAI hebben geen voorrang op Amerikaans recht."),
        p("Voor ondernemingen waarvan de klanten financiële instellingen, zorgverleners of advocatenkantoren zijn met contractuele clausules voor gegevenssouvereiniteit, kan het gebruik van ChatGPT Enterprise die contracten in gevaar brengen."),
        h2("Vergelijking van capaciteiten"),
        p("ChatGPT Enterprise is gebouwd op GPT-4o — momenteel een van de sterkste algemene taalmodellen. Voor algemene productiviteitstaken is het uitstekend."),
        p("Wonka AI gebruikt private open modellen ingezet in uw infrastructuur, gecombineerd met RAG over uw verbonden gegevensbronnen. Voor gerichte enterprise use cases presteert de combinatie van private implementatie en RAG vaak even goed of beter dan GPT-4o omdat het model is verankerd in uw werkelijke data."),
        h2("Integratiediepte"),
        p("ChatGPT Enterprise werkt als een zelfstandig product. Integratie met uw bestaande tools vereist aangepaste plugins en ontwikkelingswerk."),
        p("Wonka AI is ontworpen als integratielaag. Connectoren voor SharePoint, Slack, Salesforce, HubSpot, Google Drive, Jira, Notion en Microsoft Teams zijn ingebouwd. Geen aangepaste ontwikkeling vereist voor standaardintegraties."),
      ],
      faq: [
        faq("Is ChatGPT Enterprise AVG-conform?", "OpenAI biedt een verwerkersovereenkomst voor ChatGPT Enterprise die AVG-vereisten adresseert. AVG-naleving is echter niet gelijk aan gegevenssouvereiniteit. Uw gegevens worden nog steeds verwerkt op Amerikaanse infrastructuur door een Amerikaans bedrijf dat onderworpen is aan de CLOUD Act."),
        faq("Kan Wonka AI de kwaliteit van GPT-4o evenaren?", "Voor algemene open taken hebben frontiermodellen een voordeel. Voor gerichte enterprise use cases — uw interne documenten, CRM-data en toolgeschiedenis bevragen — presteert een private LLM met RAG geconfigureerd op uw data vaak beter."),
        faq("Wat kost ChatGPT Enterprise vergeleken met Wonka AI?", "De pricing van ChatGPT Enterprise is niet openbaar. ChatGPT Team is ongeveer €25/gebruiker/maand. Voor organisaties met diepe integratiebehoeften en 50+ gebruikers biedt Wonka AI doorgaans een betere total cost of ownership."),
      ],
      seo: seo("Wonka AI vs ChatGPT Enterprise: vergelijking voor Europese bedrijven | Wonka AI", "ChatGPT Enterprise of Wonka AI? Een gedetailleerde vergelijking voor Europese ondernemingen over gegevenssouvereiniteit, AVG-naleving, integratiediepte en total cost of ownership."),
    },
  },
];

// ── New Connectors ───────────────────────────────────────────────────────────

const newConnectors = [
  {
    slug: "sharepoint",
    en: { toolName: "SharePoint", tagline: "AI on SharePoint — instant answers from your document library", description: "Wonka AI connects to your SharePoint environment and turns your document library into a searchable knowledge base. Ask questions in plain language, get answers with source citations — no SharePoint expertise required.", useCases: [{ _type: "useCase", title: "Document Q&A", description: "Ask questions about any document stored in SharePoint. Wonka retrieves the relevant sections and answers in plain language, with a link to the source.", prompt: "What are the key terms in the NDA we signed with Acme Corp last year?" }, { _type: "useCase", title: "Policy and compliance lookup", description: "Employees can ask about company policies, HR procedures, or compliance requirements without hunting through folders.", prompt: "What is our remote work policy for employees working from outside Belgium?" }, { _type: "useCase", title: "Cross-document synthesis", description: "Wonka reads across multiple documents and synthesizes information — useful for due diligence, project handovers, or competitive research.", prompt: "Summarize the key differences between our three supplier contracts for cloud infrastructure." }], faq: [faq("Does Wonka AI require SharePoint admin access?", "No. Wonka AI connects via the Microsoft Graph API with read permissions scoped to the specific SharePoint sites you choose. No admin access is required for the connection."), faq("Can Wonka AI access all SharePoint sites?", "You control which sites and document libraries Wonka AI can access. By default, access is restricted to the sites you explicitly authorize during setup."), faq("Is SharePoint data sent to external servers?", "No. Wonka AI processes all SharePoint content within your own infrastructure. Documents are indexed locally — no content is uploaded to Wonka AI servers or any third party.")], seo: seo("AI on SharePoint — Document Q&A with Private LLM | Wonka AI", "Connect Wonka AI to SharePoint for instant document Q&A, policy lookup, and cross-document synthesis — with your data staying in your infrastructure.") },
    fr: { toolName: "SharePoint", tagline: "IA sur SharePoint — réponses instantanées depuis votre bibliothèque de documents", description: "Wonka AI se connecte à votre environnement SharePoint et transforme votre bibliothèque de documents en une base de connaissances interrogeable en langage naturel.", useCases: [{ _type: "useCase", title: "Q&R documentaire", description: "Posez des questions sur n'importe quel document stocké dans SharePoint. Wonka récupère les sections pertinentes et répond en langage naturel, avec un lien vers la source.", prompt: "Quels sont les termes clés du NDA que nous avons signé avec Acme Corp l'an dernier ?" }, { _type: "useCase", title: "Recherche de politiques et conformité", description: "Les employés peuvent interroger les politiques de l'entreprise, les procédures RH ou les exigences de conformité sans chercher dans les dossiers.", prompt: "Quelle est notre politique de télétravail pour les employés travaillant depuis l'étranger ?" }, { _type: "useCase", title: "Synthèse multi-documents", description: "Wonka lit plusieurs documents et synthétise les informations — utile pour la due diligence, les passations de projet ou la veille concurrentielle.", prompt: "Résume les principales différences entre nos trois contrats fournisseurs pour l'infrastructure cloud." }], faq: [faq("Wonka AI nécessite-t-il un accès admin SharePoint ?", "Non. Wonka AI se connecte via l'API Microsoft Graph avec des permissions de lecture limitées aux sites SharePoint spécifiques que vous choisissez."), faq("Wonka AI peut-il accéder à tous les sites SharePoint ?", "Vous contrôlez quels sites et bibliothèques de documents Wonka AI peut accéder. Par défaut, l'accès est limité aux sites que vous autorisez explicitement."), faq("Les données SharePoint sont-elles envoyées à des serveurs externes ?", "Non. Wonka AI traite tout le contenu SharePoint dans votre propre infrastructure.")], seo: seo("IA sur SharePoint — Q&R documentaire avec LLM privé | Wonka AI", "Connectez Wonka AI à SharePoint pour des réponses documentaires instantanées, la recherche de politiques et la synthèse multi-documents — avec vos données dans votre infrastructure.") },
    nl: { toolName: "SharePoint", tagline: "AI op SharePoint — directe antwoorden uit uw documentbibliotheek", description: "Wonka AI verbindt met uw SharePoint-omgeving en transformeert uw documentbibliotheek in een doorzoekbare kennisbank in natuurlijke taal.", useCases: [{ _type: "useCase", title: "Document Q&A", description: "Stel vragen over elk document in SharePoint. Wonka haalt relevante secties op en antwoordt in gewone taal, met een link naar de bron.", prompt: "Wat zijn de belangrijkste bepalingen in de NDA die we vorig jaar met Acme Corp hebben getekend?" }, { _type: "useCase", title: "Beleid en compliance opzoeken", description: "Medewerkers kunnen vragen stellen over bedrijfsbeleid, HR-procedures of nalevingsvereisten zonder door mappen te zoeken.", prompt: "Wat is ons thuiswerkbeleid voor medewerkers die vanuit het buitenland werken?" }, { _type: "useCase", title: "Synthesese van meerdere documenten", description: "Wonka leest meerdere documenten en synthetiseert informatie — nuttig voor due diligence of projectoverdrachten.", prompt: "Vat de belangrijkste verschillen samen tussen onze drie leverancierscontracten voor cloudinfrastructuur." }], faq: [faq("Vereist Wonka AI SharePoint-beheerderstoegang?", "Nee. Wonka AI verbindt via de Microsoft Graph API met leesrechten beperkt tot de specifieke SharePoint-sites die u kiest."), faq("Kan Wonka AI alle SharePoint-sites openen?", "U bepaalt welke sites Wonka AI kan openen. Standaard is toegang beperkt tot de sites die u expliciet autoriseert."), faq("Worden SharePoint-gegevens naar externe servers gestuurd?", "Nee. Wonka AI verwerkt alle SharePoint-inhoud binnen uw eigen infrastructuur.")], seo: seo("AI op SharePoint — Document Q&A met private LLM | Wonka AI", "Verbind Wonka AI met SharePoint voor directe document Q&A, beleidsopzoekingen en multi-documentsynthese — met uw data in uw infrastructuur.") },
  },
  {
    slug: "slack",
    en: { toolName: "Slack", tagline: "AI on Slack — surface knowledge from your conversations instantly", description: "Wonka AI integrates with your Slack workspace to make your conversation history searchable and useful. Find decisions, summarize threads, and get answers from your team's collective knowledge.", useCases: [{ _type: "useCase", title: "Thread summarization", description: "Get a concise summary of any Slack thread — decisions made, action items, open questions — without reading every message.", prompt: "Summarize the #product-roadmap discussion from last week and list the decisions made." }, { _type: "useCase", title: "Knowledge retrieval from conversations", description: "Find information buried in past conversations across any channel you have access to.", prompt: "What did the engineering team decide about the database migration timeline in September?" }, { _type: "useCase", title: "Meeting preparation from Slack context", description: "Before a meeting, ask Wonka to pull relevant context from Slack conversations, so you arrive prepared.", prompt: "What's the current status of the Acme Corp integration project based on our Slack conversations?" }], faq: [faq("Which Slack data does Wonka AI access?", "Wonka AI accesses the channels and conversations you explicitly authorize. By default, it does not access private messages or DMs — only channels you choose to include during setup."), faq("Does Wonka AI store Slack messages?", "Wonka AI indexes your Slack content within your own infrastructure to enable search and retrieval. No content is stored on Wonka AI servers or shared with third parties."), faq("Can Wonka AI send messages to Slack?", "Wonka AI is primarily a read-and-retrieve tool. It can surface information from Slack but does not send messages on your behalf by default.")], seo: seo("AI on Slack — Thread Summaries & Knowledge Retrieval | Wonka AI", "Connect Wonka AI to Slack to summarize threads, retrieve past decisions, and surface your team's collective knowledge — privately in your infrastructure.") },
    fr: { toolName: "Slack", tagline: "IA sur Slack — accédez instantanément à la connaissance de vos conversations", description: "Wonka AI s'intègre à votre espace de travail Slack pour rendre votre historique de conversations consultable et utile.", useCases: [{ _type: "useCase", title: "Résumé de threads", description: "Obtenez un résumé concis de n'importe quel thread Slack — décisions prises, actions, questions ouvertes — sans lire chaque message.", prompt: "Résume la discussion #roadmap-produit de la semaine dernière et liste les décisions prises." }, { _type: "useCase", title: "Récupération de connaissances depuis les conversations", description: "Trouvez des informations enfouies dans des conversations passées dans n'importe quel canal auquel vous avez accès.", prompt: "Quelle décision l'équipe engineering a-t-elle prise concernant le calendrier de migration de base de données en septembre ?" }, { _type: "useCase", title: "Préparation de réunion depuis le contexte Slack", description: "Avant une réunion, demandez à Wonka de tirer le contexte pertinent des conversations Slack.", prompt: "Quel est le statut actuel du projet d'intégration Acme Corp selon nos conversations Slack ?" }], faq: [faq("Quelles données Slack Wonka AI consulte-t-il ?", "Wonka AI accède aux canaux et conversations que vous autorisez explicitement. Par défaut, il n'accède pas aux messages privés ni aux DM."), faq("Wonka AI stocke-t-il les messages Slack ?", "Wonka AI indexe votre contenu Slack dans votre propre infrastructure. Aucun contenu n'est stocké sur les serveurs de Wonka AI."), faq("Wonka AI peut-il envoyer des messages Slack ?", "Wonka AI est principalement un outil de lecture et de récupération. Il peut remonter des informations de Slack mais n'envoie pas de messages en votre nom par défaut.")], seo: seo("IA sur Slack — Résumés de threads & récupération de connaissances | Wonka AI", "Connectez Wonka AI à Slack pour résumer les threads, retrouver les décisions passées et accéder à la connaissance collective de votre équipe.") },
    nl: { toolName: "Slack", tagline: "AI op Slack — haal onmiddellijk kennis op uit uw gesprekken", description: "Wonka AI integreert met uw Slack-werkruimte om uw gespreksgeschiedenis doorzoekbaar en nuttig te maken.", useCases: [{ _type: "useCase", title: "Thread-samenvatting", description: "Krijg een beknopte samenvatting van elk Slack-thread — genomen beslissingen, actiepunten, open vragen — zonder elk bericht te lezen.", prompt: "Vat de #product-roadmap discussie van vorige week samen en vermeld de genomen beslissingen." }, { _type: "useCase", title: "Kennisophaling uit gesprekken", description: "Vind informatie begraven in vroegere gesprekken in elk kanaal waartoe u toegang heeft.", prompt: "Welke beslissing heeft het engineeringteam genomen over de databasemigratietijdlijn in september?" }, { _type: "useCase", title: "Vergadervoorbereiding vanuit Slack-context", description: "Vraag Wonka voor een vergadering relevante context uit Slack-gesprekken op te halen.", prompt: "Wat is de huidige status van het Acme Corp-integratieproject op basis van onze Slack-gesprekken?" }], faq: [faq("Welke Slack-gegevens raadpleegt Wonka AI?", "Wonka AI heeft toegang tot de kanalen en gesprekken die u expliciet autoriseert. Standaard heeft het geen toegang tot privéberichten of DM's."), faq("Slaat Wonka AI Slack-berichten op?", "Wonka AI indexeert uw Slack-inhoud binnen uw eigen infrastructuur. Geen inhoud wordt opgeslagen op Wonka AI-servers."), faq("Kan Wonka AI Slack-berichten versturen?", "Wonka AI is primair een lees- en ophaalgereedschap. Het kan informatie uit Slack ophalen maar verstuurt standaard geen berichten namens u.")], seo: seo("AI op Slack — Thread-samenvattingen & kennisophaling | Wonka AI", "Verbind Wonka AI met Slack om threads samen te vatten, vroegere beslissingen op te halen en de collectieve kennis van uw team te benutten.") },
  },
  {
    slug: "salesforce",
    en: { toolName: "Salesforce", tagline: "AI on Salesforce — turn your CRM into a deal intelligence engine", description: "Wonka AI connects to Salesforce to give your sales team instant access to deal intelligence, account history, and pipeline analysis — in natural language, without leaving the flow of work.", useCases: [{ _type: "useCase", title: "Deal summaries and next steps", description: "Get an instant summary of any deal: current stage, last activity, key contacts, open risks, and recommended next action.", prompt: "Summarize the Acme Corp opportunity: current stage, last touchpoint, key risks, and what I should do next." }, { _type: "useCase", title: "Pipeline analysis and forecast", description: "Ask for a pipeline view filtered by any criteria: territory, stage, rep, close date. Get an AI analysis of at-risk deals.", prompt: "Which deals in my pipeline are most at risk of slipping this quarter and why?" }, { _type: "useCase", title: "Account research before calls", description: "Before a sales call, get a briefing on the account: history, past interactions, open issues, and key stakeholders.", prompt: "Give me a briefing on Acme Corp before my call today: company context, our relationship history, and what they care about." }], faq: [faq("Does Wonka AI modify Salesforce data?", "No. Wonka AI reads from Salesforce for analysis and retrieval but does not write or modify any CRM data. All changes to Salesforce records must be made by users in Salesforce directly."), faq("Which Salesforce editions are supported?", "Wonka AI works with Salesforce Professional, Enterprise, and Unlimited editions via the Salesforce REST API. Salesforce Essentials is not supported due to API access limitations."), faq("Is Salesforce data sent to external servers?", "No. Wonka AI processes Salesforce data within your own infrastructure. No CRM data is sent to Wonka AI servers or any external service.")], seo: seo("AI on Salesforce — CRM Intelligence in Natural Language | Wonka AI", "Connect Wonka AI to Salesforce for instant deal summaries, pipeline analysis, and account briefings — privately in your infrastructure.") },
    fr: { toolName: "Salesforce", tagline: "IA sur Salesforce — transformez votre CRM en moteur d'intelligence commerciale", description: "Wonka AI se connecte à Salesforce pour donner à votre équipe commerciale un accès instantané à l'intelligence deal, l'historique des comptes et l'analyse du pipeline — en langage naturel.", useCases: [{ _type: "useCase", title: "Résumés de deals et prochaines étapes", description: "Obtenez un résumé instantané de n'importe quel deal : étape actuelle, dernière activité, contacts clés, risques ouverts et prochaine action recommandée.", prompt: "Résume l'opportunité Acme Corp : étape actuelle, dernier point de contact, risques clés et ce que je devrais faire ensuite." }, { _type: "useCase", title: "Analyse du pipeline et prévisions", description: "Demandez une vue du pipeline filtrée par n'importe quel critère : territoire, étape, commercial, date de clôture.", prompt: "Quels deals de mon pipeline risquent le plus de glisser ce trimestre et pourquoi ?" }, { _type: "useCase", title: "Recherche sur le compte avant les appels", description: "Avant un appel commercial, obtenez un briefing sur le compte : historique, interactions passées et parties prenantes clés.", prompt: "Donnez-moi un briefing sur Acme Corp avant mon appel aujourd'hui : contexte de l'entreprise, historique de notre relation et ce qui les préoccupe." }], faq: [faq("Wonka AI modifie-t-il les données Salesforce ?", "Non. Wonka AI lit Salesforce pour l'analyse mais ne modifie aucune donnée CRM. Toutes les modifications doivent être faites par les utilisateurs directement dans Salesforce."), faq("Quelles éditions Salesforce sont supportées ?", "Wonka AI fonctionne avec les éditions Professional, Enterprise et Unlimited via l'API REST Salesforce."), faq("Les données Salesforce sont-elles envoyées à des serveurs externes ?", "Non. Wonka AI traite les données Salesforce dans votre propre infrastructure.")], seo: seo("IA sur Salesforce — Intelligence CRM en langage naturel | Wonka AI", "Connectez Wonka AI à Salesforce pour des résumés de deals instantanés, l'analyse du pipeline et des briefings de comptes — dans votre infrastructure.") },
    nl: { toolName: "Salesforce", tagline: "AI op Salesforce — transformeer uw CRM in een deal-intelligentie-engine", description: "Wonka AI verbindt met Salesforce om uw verkoopteam directe toegang te geven tot deal-intelligentie, accountgeschiedenis en pijplijnanalyse — in natuurlijke taal.", useCases: [{ _type: "useCase", title: "Deal-samenvattingen en vervolgstappen", description: "Krijg een directe samenvatting van elk deal: huidige fase, laatste activiteit, sleutelcontacten, openstaande risico's en aanbevolen volgende actie.", prompt: "Vat de Acme Corp-opportuniteit samen: huidige fase, laatste contactmoment, sleutelrisico's en wat ik hierna moet doen." }, { _type: "useCase", title: "Pijplijnanalyse en prognose", description: "Vraag een pijplijnweergave gefilterd op elk criterium: gebied, fase, vertegenwoordiger, sluitingsdatum.", prompt: "Welke deals in mijn pijplijn lopen het meeste risico om dit kwartaal te verschuiven en waarom?" }, { _type: "useCase", title: "Accountonderzoek voor gesprekken", description: "Krijg voor een verkoopgesprek een briefing over het account: geschiedenis, vroegere interacties en sleutelstakeholders.", prompt: "Geef me een briefing over Acme Corp voor mijn gesprek vandaag: bedrijfscontext, onze relatiegeschiedenis en waar ze om geven." }], faq: [faq("Wijzigt Wonka AI Salesforce-gegevens?", "Nee. Wonka AI leest uit Salesforce voor analyse maar schrijft of wijzigt geen CRM-gegevens."), faq("Welke Salesforce-edities worden ondersteund?", "Wonka AI werkt met Salesforce Professional, Enterprise en Unlimited-edities via de Salesforce REST API."), faq("Worden Salesforce-gegevens naar externe servers gestuurd?", "Nee. Wonka AI verwerkt Salesforce-gegevens binnen uw eigen infrastructuur.")], seo: seo("AI op Salesforce — CRM-intelligentie in natuurlijke taal | Wonka AI", "Verbind Wonka AI met Salesforce voor directe deal-samenvattingen, pijplijnanalyse en accountbriefings — privé in uw infrastructuur.") },
  },
  {
    slug: "jira",
    en: { toolName: "Jira", tagline: "AI on Jira — navigate your project backlog in plain language", description: "Wonka AI connects to Jira to let your team query tickets, sprint status, and project history in natural language — without Jira expertise or complex JQL queries.", useCases: [{ _type: "useCase", title: "Sprint status at a glance", description: "Get an instant summary of the current sprint: completed tickets, blockers, velocity, and risk to sprint goal.", prompt: "What's the current sprint status? Which tickets are blocked and what's at risk for the sprint goal?" }, { _type: "useCase", title: "Ticket generation from description", description: "Describe a bug or feature in plain language, and Wonka generates a properly formatted Jira ticket with title, description, acceptance criteria, and suggested labels.", prompt: "Create a Jira ticket for the login timeout bug reported today: users are logged out after 5 minutes of inactivity on mobile." }, { _type: "useCase", title: "Project history and decision retrieval", description: "Find past decisions, technical choices, and context buried in Jira tickets and comments.", prompt: "Why did we decide to use PostgreSQL instead of MongoDB for the user service? Find the relevant Jira discussion." }], faq: [faq("Does Wonka AI create Jira tickets automatically?", "Wonka AI can draft Jira ticket content but requires your confirmation before creating any ticket. You review the draft and decide whether to create it."), faq("Which Jira plans does Wonka AI support?", "Wonka AI supports Jira Cloud (Free, Standard, Premium, Enterprise) and Jira Data Center via the Jira REST API."), faq("Is Jira data sent to external servers?", "No. Wonka AI processes all Jira data within your own infrastructure.")], seo: seo("AI on Jira — Sprint Status & Ticket Intelligence in Plain Language | Wonka AI", "Connect Wonka AI to Jira for instant sprint summaries, ticket generation, and project history retrieval — without JQL or Jira expertise.") },
    fr: { toolName: "Jira", tagline: "IA sur Jira — naviguez dans votre backlog en langage naturel", description: "Wonka AI se connecte à Jira pour permettre à votre équipe d'interroger les tickets, le statut des sprints et l'historique du projet en langage naturel.", useCases: [{ _type: "useCase", title: "Statut du sprint en un coup d'œil", description: "Obtenez un résumé instantané du sprint actuel : tickets terminés, blocages, vélocité et risque pour l'objectif du sprint.", prompt: "Quel est le statut du sprint actuel ? Quels tickets sont bloqués et qu'est-ce qui risque de compromettre l'objectif du sprint ?" }, { _type: "useCase", title: "Génération de tickets depuis une description", description: "Décrivez un bug ou une fonctionnalité en langage naturel, et Wonka génère un ticket Jira correctement formaté.", prompt: "Crée un ticket Jira pour le bug de timeout de connexion signalé aujourd'hui : les utilisateurs sont déconnectés après 5 minutes d'inactivité sur mobile." }, { _type: "useCase", title: "Récupération de l'historique et des décisions", description: "Trouvez les décisions passées et le contexte enfouis dans les tickets et commentaires Jira.", prompt: "Pourquoi avons-nous décidé d'utiliser PostgreSQL plutôt que MongoDB pour le service utilisateur ? Trouvez la discussion Jira pertinente." }], faq: [faq("Wonka AI crée-t-il automatiquement des tickets Jira ?", "Wonka AI peut rédiger le contenu d'un ticket Jira mais nécessite votre confirmation avant d'en créer un."), faq("Quels plans Jira Wonka AI supporte-t-il ?", "Wonka AI supporte Jira Cloud (Free, Standard, Premium, Enterprise) et Jira Data Center via l'API REST Jira."), faq("Les données Jira sont-elles envoyées à des serveurs externes ?", "Non. Wonka AI traite toutes les données Jira dans votre propre infrastructure.")], seo: seo("IA sur Jira — Statut sprint & intelligence tickets en langage naturel | Wonka AI", "Connectez Wonka AI à Jira pour des résumés de sprint instantanés, la génération de tickets et la récupération de l'historique du projet.") },
    nl: { toolName: "Jira", tagline: "AI op Jira — navigeer uw backlog in gewone taal", description: "Wonka AI verbindt met Jira zodat uw team tickets, sprintstatus en projectgeschiedenis in natuurlijke taal kan bevragen.", useCases: [{ _type: "useCase", title: "Sprintstatus in één oogopslag", description: "Krijg een directe samenvatting van de huidige sprint: voltooide tickets, blokkades, snelheid en risico voor het sprintdoel.", prompt: "Wat is de huidige sprintstatus? Welke tickets zijn geblokkeerd en wat staat het sprintdoel in de weg?" }, { _type: "useCase", title: "Ticketgeneratie vanuit beschrijving", description: "Beschrijf een bug of feature in gewone taal, en Wonka genereert een correct opgemaakt Jira-ticket.", prompt: "Maak een Jira-ticket voor de login-timeout-bug die vandaag is gemeld: gebruikers worden na 5 minuten inactiviteit op mobiel uitgelogd." }, { _type: "useCase", title: "Projectgeschiedenis en beslissingsophaling", description: "Vind vroegere beslissingen en context begraven in Jira-tickets en commentaren.", prompt: "Waarom hebben we besloten PostgreSQL te gebruiken in plaats van MongoDB voor de gebruikersservice? Vind de relevante Jira-discussie." }], faq: [faq("Maakt Wonka AI automatisch Jira-tickets aan?", "Wonka AI kan Jira-ticketinhoud opstellen maar vereist uw bevestiging voordat een ticket wordt aangemaakt."), faq("Welke Jira-plannen ondersteunt Wonka AI?", "Wonka AI ondersteunt Jira Cloud (Free, Standard, Premium, Enterprise) en Jira Data Center via de Jira REST API."), faq("Worden Jira-gegevens naar externe servers gestuurd?", "Nee. Wonka AI verwerkt alle Jira-gegevens binnen uw eigen infrastructuur.")], seo: seo("AI op Jira — Sprintstatus & ticketintelligentie in gewone taal | Wonka AI", "Verbind Wonka AI met Jira voor directe sprintsamenvattingen, ticketgeneratie en projectgeschiedenisophaling.") },
  },
  {
    slug: "google-drive",
    en: { toolName: "Google Drive", tagline: "AI on Google Drive — search and understand your documents instantly", description: "Wonka AI connects to Google Drive to make your Docs, Sheets, and Slides searchable and conversational. Ask questions, get summaries, and extract insights from your Drive content in natural language.", useCases: [{ _type: "useCase", title: "Document search and Q&A", description: "Find and query any document in your Drive without knowing the filename or folder structure.", prompt: "Find our marketing budget document and tell me what the Q4 social media spend was." }, { _type: "useCase", title: "Spreadsheet analysis", description: "Ask questions about data in Google Sheets without writing formulas or knowing the data structure.", prompt: "In our sales tracking sheet, which regions exceeded their Q3 targets and by how much?" }, { _type: "useCase", title: "Meeting notes synthesis", description: "Aggregate and summarize meeting notes from multiple Google Docs to track decisions and action items.", prompt: "Summarize the key decisions from our weekly team meeting notes over the last month." }], faq: [faq("Does Wonka AI work with Shared Drives?", "Yes. Wonka AI can access both personal My Drive and Shared Drives, subject to the permissions of the connected Google account."), faq("Which Google Workspace editions are supported?", "Wonka AI works with all Google Workspace editions (Business Starter through Enterprise) and personal Google accounts via the Google Drive API."), faq("Is Drive content sent to external servers?", "No. Wonka AI indexes and processes your Drive content within your own infrastructure.")], seo: seo("AI on Google Drive — Document Q&A & Search in Plain Language | Wonka AI", "Connect Wonka AI to Google Drive for instant document search, spreadsheet analysis, and meeting note summaries — privately in your infrastructure.") },
    fr: { toolName: "Google Drive", tagline: "IA sur Google Drive — cherchez et comprenez vos documents instantanément", description: "Wonka AI se connecte à Google Drive pour rendre vos Docs, Sheets et Slides consultables et conversationnels en langage naturel.", useCases: [{ _type: "useCase", title: "Recherche et Q&R documentaire", description: "Trouvez et interrogez n'importe quel document dans votre Drive sans connaître le nom du fichier ou la structure des dossiers.", prompt: "Trouvez notre document de budget marketing et dites-moi quelle était la dépense médias sociaux Q4." }, { _type: "useCase", title: "Analyse de feuilles de calcul", description: "Posez des questions sur les données de Google Sheets sans écrire de formules.", prompt: "Dans notre feuille de suivi des ventes, quelles régions ont dépassé leurs objectifs Q3 et de combien ?" }, { _type: "useCase", title: "Synthèse de notes de réunion", description: "Agrégez et résumez les notes de réunion de plusieurs Google Docs pour suivre les décisions.", prompt: "Résumez les décisions clés de nos notes de réunion d'équipe hebdomadaires du mois dernier." }], faq: [faq("Wonka AI fonctionne-t-il avec les Drives partagés ?", "Oui. Wonka AI peut accéder à My Drive personnel et aux Drives partagés."), faq("Quelles éditions Google Workspace sont supportées ?", "Wonka AI fonctionne avec toutes les éditions Google Workspace et les comptes Google personnels via l'API Google Drive."), faq("Le contenu Drive est-il envoyé à des serveurs externes ?", "Non. Wonka AI indexe et traite votre contenu Drive dans votre propre infrastructure.")], seo: seo("IA sur Google Drive — Q&R documentaire en langage naturel | Wonka AI", "Connectez Wonka AI à Google Drive pour la recherche instantanée de documents, l'analyse de feuilles de calcul et les résumés de notes de réunion.") },
    nl: { toolName: "Google Drive", tagline: "AI op Google Drive — doorzoek en begrijp uw documenten direct", description: "Wonka AI verbindt met Google Drive om uw Docs, Sheets en Slides doorzoekbaar en conversationeel te maken in natuurlijke taal.", useCases: [{ _type: "useCase", title: "Documenten zoeken en Q&A", description: "Vind en bevraag elk document in uw Drive zonder de bestandsnaam of mapstructuur te kennen.", prompt: "Vind ons marketingbudgetdocument en vertel me wat de Q4-uitgaven voor sociale media waren." }, { _type: "useCase", title: "Spreadsheetanalyse", description: "Stel vragen over gegevens in Google Sheets zonder formules te schrijven.", prompt: "Welke regio's in onze verkooptrackingsheet hebben hun Q3-doelen overtroffen en met hoeveel?" }, { _type: "useCase", title: "Vergadernotities samenvatten", description: "Aggregeer en vat vergadernotities uit meerdere Google Docs samen om beslissingen bij te houden.", prompt: "Vat de belangrijkste beslissingen samen uit onze wekelijkse teamvergadernotities van de afgelopen maand." }], faq: [faq("Werkt Wonka AI met Gedeelde Drives?", "Ja. Wonka AI heeft toegang tot zowel persoonlijke My Drive als Gedeelde Drives."), faq("Welke Google Workspace-edities worden ondersteund?", "Wonka AI werkt met alle Google Workspace-edities en persoonlijke Google-accounts via de Google Drive API."), faq("Wordt Drive-inhoud naar externe servers gestuurd?", "Nee. Wonka AI indexeert en verwerkt uw Drive-inhoud binnen uw eigen infrastructuur.")], seo: seo("AI op Google Drive — Document Q&A in gewone taal | Wonka AI", "Verbind Wonka AI met Google Drive voor directe documentzoekopdrachten, spreadsheetanalyse en samenvattingen van vergadernotities.") },
  },
  {
    slug: "hubspot",
    en: { toolName: "HubSpot", tagline: "AI on HubSpot — CRM intelligence and marketing insights in plain language", description: "Wonka AI connects to HubSpot to give your marketing and sales teams instant access to contact history, campaign performance, and pipeline insights — without navigating HubSpot's interface.", useCases: [{ _type: "useCase", title: "Contact and deal intelligence", description: "Get a full briefing on any contact or deal: history, touchpoints, stage, and recommended next action.", prompt: "Give me a full overview of our relationship with contact Jean-Marc Dupont: interactions, deals, and what we should do next." }, { _type: "useCase", title: "Campaign performance analysis", description: "Ask for campaign metrics in plain language without building reports in HubSpot.", prompt: "How did our Q3 email campaigns perform? Compare open rate, click rate, and conversions to Q2." }, { _type: "useCase", title: "Pipeline reporting", description: "Get an instant pipeline snapshot filtered by rep, stage, or deal size.", prompt: "Show me all deals above €50K in the proposal stage and which reps own them." }], faq: [faq("Does Wonka AI support HubSpot Free?", "Wonka AI supports HubSpot Professional and Enterprise plans via the HubSpot API. Free plan API access is limited and may not support all Wonka AI features."), faq("Can Wonka AI create contacts or deals in HubSpot?", "Wonka AI can draft contact or deal information but requires your explicit confirmation before creating or updating any HubSpot record."), faq("Is HubSpot data sent to external servers?", "No. All HubSpot data accessed by Wonka AI is processed within your own infrastructure.")], seo: seo("AI on HubSpot — CRM Intelligence & Campaign Analysis in Plain Language | Wonka AI", "Connect Wonka AI to HubSpot for instant contact intelligence, campaign analysis, and pipeline reporting — privately in your infrastructure.") },
    fr: { toolName: "HubSpot", tagline: "IA sur HubSpot — intelligence CRM et insights marketing en langage naturel", description: "Wonka AI se connecte à HubSpot pour donner à vos équipes marketing et commerciale un accès instantané à l'historique des contacts, les performances des campagnes et les insights pipeline.", useCases: [{ _type: "useCase", title: "Intelligence contacts et deals", description: "Obtenez un briefing complet sur n'importe quel contact ou deal : historique, points de contact, étape et prochaine action recommandée.", prompt: "Donnez-moi un aperçu complet de notre relation avec le contact Jean-Marc Dupont : interactions, deals et ce que nous devrions faire ensuite." }, { _type: "useCase", title: "Analyse des performances de campagnes", description: "Demandez des métriques de campagnes en langage naturel sans construire de rapports dans HubSpot.", prompt: "Comment nos campagnes email Q3 ont-elles performé ? Comparez le taux d'ouverture, le taux de clics et les conversions au Q2." }, { _type: "useCase", title: "Reporting du pipeline", description: "Obtenez un instantané du pipeline filtré par commercial, étape ou taille de deal.", prompt: "Montrez-moi tous les deals supérieurs à 50K€ en phase de proposition et quels commerciaux les gèrent." }], faq: [faq("Wonka AI supporte-t-il HubSpot Free ?", "Wonka AI supporte les plans HubSpot Professional et Enterprise. L'accès API du plan Free est limité."), faq("Wonka AI peut-il créer des contacts ou des deals dans HubSpot ?", "Wonka AI peut rédiger des informations de contact ou de deal mais nécessite votre confirmation explicite avant de créer ou de mettre à jour un enregistrement HubSpot."), faq("Les données HubSpot sont-elles envoyées à des serveurs externes ?", "Non. Toutes les données HubSpot auxquelles Wonka AI accède sont traitées dans votre propre infrastructure.")], seo: seo("IA sur HubSpot — Intelligence CRM & analyse de campagnes | Wonka AI", "Connectez Wonka AI à HubSpot pour une intelligence de contacts instantanée, l'analyse de campagnes et le reporting du pipeline.") },
    nl: { toolName: "HubSpot", tagline: "AI op HubSpot — CRM-intelligentie en marketinginzichten in gewone taal", description: "Wonka AI verbindt met HubSpot om uw marketing- en verkoopteams directe toegang te geven tot contactgeschiedenis, campagneprestaties en pijplijninzichten.", useCases: [{ _type: "useCase", title: "Contact- en deal-intelligentie", description: "Krijg een volledige briefing over elk contact of deal: geschiedenis, contactmomenten, fase en aanbevolen volgende actie.", prompt: "Geef me een volledig overzicht van onze relatie met contact Jean-Marc Dupont: interacties, deals en wat we hierna zouden moeten doen." }, { _type: "useCase", title: "Campagneprestatie-analyse", description: "Vraag campagnemetrieken in gewone taal zonder rapporten te bouwen in HubSpot.", prompt: "Hoe presteerden onze Q3-e-mailcampagnes? Vergelijk openingspercentage, klikpercentage en conversies met Q2." }, { _type: "useCase", title: "Pijplijnrapportage", description: "Krijg een directe pijplijn-snapshot gefilterd op vertegenwoordiger, fase of dealgrootte.", prompt: "Toon me alle deals boven €50K in de offertfase en welke vertegenwoordigers ze bezitten." }], faq: [faq("Ondersteunt Wonka AI HubSpot Free?", "Wonka AI ondersteunt HubSpot Professional- en Enterprise-plannen. Free-plan API-toegang is beperkt."), faq("Kan Wonka AI contacten of deals aanmaken in HubSpot?", "Wonka AI kan contact- of dealinformatie opstellen maar vereist uw expliciete bevestiging voordat een HubSpot-record wordt aangemaakt of bijgewerkt."), faq("Worden HubSpot-gegevens naar externe servers gestuurd?", "Nee. Alle HubSpot-gegevens die Wonka AI raadpleegt, worden verwerkt binnen uw eigen infrastructuur.")], seo: seo("AI op HubSpot — CRM-intelligentie & campagneanalyse | Wonka AI", "Verbind Wonka AI met HubSpot voor directe contactintelligentie, campagneanalyse en pijplijnrapportage.") },
  },
  {
    slug: "notion",
    en: { toolName: "Notion", tagline: "AI on Notion — make your team wiki instantly searchable and useful", description: "Wonka AI connects to your Notion workspace to make your wikis, project pages, and SOPs searchable in plain language. Find what you need without knowing where it lives.", useCases: [{ _type: "useCase", title: "Knowledge base Q&A", description: "Ask questions about anything in your Notion wiki and get direct answers with page references.", prompt: "What is our standard process for onboarding a new enterprise client? Find the relevant Notion page." }, { _type: "useCase", title: "SOP retrieval and guidance", description: "Surface the right SOP for any situation without searching through databases manually.", prompt: "What's the step-by-step process for handling a customer complaint escalation?" }, { _type: "useCase", title: "Project status from Notion databases", description: "Query Notion databases in plain language to get project status, owner, and next steps.", prompt: "Which projects in our Notion project tracker are past their deadline and who owns them?" }], faq: [faq("Does Wonka AI work with all Notion workspace types?", "Wonka AI works with Notion Business and Enterprise plans via the Notion API. Free and Plus plans have API rate limits that may impact performance."), faq("Can Wonka AI edit Notion pages?", "Wonka AI can read and retrieve Notion content but does not edit or create pages without explicit user action."), faq("Is Notion content sent to external servers?", "No. Wonka AI processes all Notion content within your own infrastructure.")], seo: seo("AI on Notion — Wiki Q&A & Knowledge Retrieval in Plain Language | Wonka AI", "Connect Wonka AI to Notion to make your team wiki, SOPs, and project databases instantly searchable — privately in your infrastructure.") },
    fr: { toolName: "Notion", tagline: "IA sur Notion — rendez votre wiki d'équipe instantanément consultable", description: "Wonka AI se connecte à votre espace de travail Notion pour rendre vos wikis, pages de projet et SOPs consultables en langage naturel.", useCases: [{ _type: "useCase", title: "Q&R de la base de connaissances", description: "Posez des questions sur n'importe quoi dans votre wiki Notion et obtenez des réponses directes avec des références de pages.", prompt: "Quel est notre processus standard pour l'onboarding d'un nouveau client enterprise ? Trouvez la page Notion pertinente." }, { _type: "useCase", title: "Récupération de SOPs et guidance", description: "Trouvez la bonne SOP pour n'importe quelle situation sans chercher manuellement dans les bases de données.", prompt: "Quelle est la procédure étape par étape pour gérer une escalade de plainte client ?" }, { _type: "useCase", title: "Statut de projet depuis les bases de données Notion", description: "Interrogez les bases de données Notion en langage naturel pour obtenir le statut des projets.", prompt: "Quels projets dans notre tracker de projets Notion sont en retard par rapport à leur délai et qui en est responsable ?" }], faq: [faq("Wonka AI fonctionne-t-il avec tous les types d'espaces de travail Notion ?", "Wonka AI fonctionne avec les plans Notion Business et Enterprise via l'API Notion."), faq("Wonka AI peut-il modifier les pages Notion ?", "Wonka AI peut lire et récupérer le contenu Notion mais ne modifie pas les pages sans action explicite de l'utilisateur."), faq("Le contenu Notion est-il envoyé à des serveurs externes ?", "Non. Wonka AI traite tout le contenu Notion dans votre propre infrastructure.")], seo: seo("IA sur Notion — Q&R wiki & récupération de connaissances | Wonka AI", "Connectez Wonka AI à Notion pour rendre votre wiki, vos SOPs et vos bases de données de projets instantanément consultables.") },
    nl: { toolName: "Notion", tagline: "AI op Notion — maak uw teamwiki direct doorzoekbaar", description: "Wonka AI verbindt met uw Notion-werkruimte om uw wiki's, projectpagina's en SOP's doorzoekbaar te maken in gewone taal.", useCases: [{ _type: "useCase", title: "Kennisbank Q&A", description: "Stel vragen over alles in uw Notion-wiki en krijg directe antwoorden met paginaverwijzingen.", prompt: "Wat is ons standaardproces voor het onboarden van een nieuwe enterprise-klant? Vind de relevante Notion-pagina." }, { _type: "useCase", title: "SOP-ophaling en begeleiding", description: "Vind de juiste SOP voor elke situatie zonder handmatig door databases te zoeken.", prompt: "Wat is het stapsgewijze proces voor het afhandelen van een escalatie van een klachtenklant?" }, { _type: "useCase", title: "Projectstatus uit Notion-databases", description: "Bevraag Notion-databases in gewone taal om projectstatus, eigenaar en vervolgstappen te krijgen.", prompt: "Welke projecten in onze Notion-projecttracker zijn voorbij hun deadline en wie zijn de eigenaren?" }], faq: [faq("Werkt Wonka AI met alle Notion-werkruimtetypen?", "Wonka AI werkt met Notion Business- en Enterprise-plannen via de Notion API."), faq("Kan Wonka AI Notion-pagina's bewerken?", "Wonka AI kan Notion-inhoud lezen en ophalen maar bewerkt geen pagina's zonder expliciete gebruikersactie."), faq("Wordt Notion-inhoud naar externe servers gestuurd?", "Nee. Wonka AI verwerkt alle Notion-inhoud binnen uw eigen infrastructuur.")], seo: seo("AI op Notion — Wiki Q&A & kennisophaling in gewone taal | Wonka AI", "Verbind Wonka AI met Notion om uw teamwiki, SOP's en projectdatabases direct doorzoekbaar te maken.") },
  },
  {
    slug: "microsoft-teams",
    en: { toolName: "Microsoft Teams", tagline: "AI on Microsoft Teams — turn your meeting history into accessible knowledge", description: "Wonka AI connects to Microsoft Teams to make your meeting recordings, transcripts, and channel conversations searchable. Never lose a decision or action item again.", useCases: [{ _type: "useCase", title: "Meeting transcript summary", description: "Get a structured summary of any Teams meeting: agenda covered, decisions made, action items, and who owns them.", prompt: "Summarize last Tuesday's project kickoff meeting: what was decided, what are the action items, and who owns each one?" }, { _type: "useCase", title: "Channel conversation search", description: "Search Teams channels in plain language to find past decisions and context.", prompt: "What was the final decision about the API versioning strategy discussed in the Engineering channel last month?" }, { _type: "useCase", title: "Meeting preparation briefing", description: "Before a Teams meeting, get a briefing on the topic, relevant past discussions, and key stakeholders.", prompt: "I have a Teams call about the Q1 budget review in 30 minutes. What do I need to know?" }], faq: [faq("Does Wonka AI require Teams admin permissions?", "Wonka AI connects via the Microsoft Graph API and requires a Teams admin to authorize the initial connection. Day-to-day use does not require admin access."), faq("Can Wonka AI access private Teams channels?", "Wonka AI accesses only the channels and conversations explicitly authorized during setup. Private channels require explicit authorization from channel members."), faq("Is Teams data sent to external servers?", "No. All Teams data processed by Wonka AI stays within your own infrastructure.")], seo: seo("AI on Microsoft Teams — Meeting Summaries & Channel Search | Wonka AI", "Connect Wonka AI to Microsoft Teams for meeting transcript summaries, channel conversation search, and pre-meeting briefings — privately in your infrastructure.") },
    fr: { toolName: "Microsoft Teams", tagline: "IA sur Microsoft Teams — transformez votre historique de réunions en connaissance accessible", description: "Wonka AI se connecte à Microsoft Teams pour rendre vos enregistrements de réunions, transcriptions et conversations de canaux consultables en langage naturel.", useCases: [{ _type: "useCase", title: "Résumé de transcription de réunion", description: "Obtenez un résumé structuré de n'importe quelle réunion Teams : agenda couvert, décisions prises, actions et leurs responsables.", prompt: "Résumez la réunion de lancement de projet de mardi dernier : qu'a-t-on décidé, quelles sont les actions et qui en est responsable ?" }, { _type: "useCase", title: "Recherche dans les conversations de canaux", description: "Cherchez dans les canaux Teams en langage naturel pour trouver les décisions passées et le contexte.", prompt: "Quelle était la décision finale concernant la stratégie de versionnage d'API discutée dans le canal Engineering le mois dernier ?" }, { _type: "useCase", title: "Briefing de préparation de réunion", description: "Avant une réunion Teams, obtenez un briefing sur le sujet, les discussions passées pertinentes et les parties prenantes clés.", prompt: "J'ai un appel Teams sur la revue de budget Q1 dans 30 minutes. Que dois-je savoir ?" }], faq: [faq("Wonka AI nécessite-t-il des permissions admin Teams ?", "Wonka AI se connecte via l'API Microsoft Graph et nécessite qu'un admin Teams autorise la connexion initiale."), faq("Wonka AI peut-il accéder aux canaux Teams privés ?", "Wonka AI n'accède qu'aux canaux et conversations explicitement autorisés lors de la configuration."), faq("Les données Teams sont-elles envoyées à des serveurs externes ?", "Non. Toutes les données Teams traitées par Wonka AI restent dans votre propre infrastructure.")], seo: seo("IA sur Microsoft Teams — Résumés de réunions & recherche de canaux | Wonka AI", "Connectez Wonka AI à Microsoft Teams pour des résumés de transcriptions de réunions, la recherche de conversations et des briefings pré-réunion.") },
    nl: { toolName: "Microsoft Teams", tagline: "AI op Microsoft Teams — zet uw vergadergeschiedenis om in toegankelijke kennis", description: "Wonka AI verbindt met Microsoft Teams om uw vergaderopnames, transcripties en kanaalconversaties doorzoekbaar te maken in gewone taal.", useCases: [{ _type: "useCase", title: "Vergadertranscriptie-samenvatting", description: "Krijg een gestructureerde samenvatting van elke Teams-vergadering: behandelde agenda, genomen beslissingen, actiepunten en eigenaren.", prompt: "Vat de projectkickoff-vergadering van afgelopen dinsdag samen: wat is besloten, wat zijn de actiepunten en wie is verantwoordelijk voor elk?" }, { _type: "useCase", title: "Kanaalconversatie zoeken", description: "Zoek in Teams-kanalen in gewone taal om vroegere beslissingen en context te vinden.", prompt: "Wat was de definitieve beslissing over de API-versioneringsstrategie die vorige maand in het Engineering-kanaal werd besproken?" }, { _type: "useCase", title: "Vergadervoorbereiding briefing", description: "Krijg voor een Teams-vergadering een briefing over het onderwerp, relevante vroegere discussies en sleutelstakeholders.", prompt: "Ik heb over 30 minuten een Teams-gesprek over de Q1-budgetreview. Wat moet ik weten?" }], faq: [faq("Vereist Wonka AI Teams-beheerdersrechten?", "Wonka AI verbindt via de Microsoft Graph API en vereist dat een Teams-beheerder de initiële verbinding autoriseert."), faq("Kan Wonka AI toegang krijgen tot privé Teams-kanalen?", "Wonka AI heeft alleen toegang tot kanalen en gesprekken die expliciet zijn geautoriseerd tijdens de installatie."), faq("Worden Teams-gegevens naar externe servers gestuurd?", "Nee. Alle Teams-gegevens verwerkt door Wonka AI blijven binnen uw eigen infrastructuur.")], seo: seo("AI op Microsoft Teams — Vergadersamenvattingen & kanaalzoekfunctie | Wonka AI", "Verbind Wonka AI met Microsoft Teams voor samenvattingen van vergadertranscripties, zoeken in kanaalconversaties en pre-vergaderbriefings.") },
  },
];

// ── Seeder ───────────────────────────────────────────────────────────────────

async function upsert(id: string, doc: Record<string, unknown> & { _type: string }) {
  try {
    await client.createOrReplace({ _id: id, ...doc });
    console.log(`  ✅ ${id}`);
  } catch (err) {
    console.error(`  ❌ ${id}:`, err);
  }
}

async function seed() {
  const langs: Array<"en" | "fr" | "nl"> = ["en", "fr", "nl"];

  console.log("\n📝 Seeding blog posts...");
  for (const post of blogPosts) {
    for (const lang of langs) {
      const d = post[lang];
      await upsert(`blogPost-${post.slug}-${lang}`, {
        _type: "blogPost",
        language: lang,
        title: d.title,
        slug: slug(post.slug),
        publishedAt: new Date().toISOString(),
        excerpt: d.excerpt,
        category: d.category,
        tags: d.tags,
        body: d.body,
        faq: d.faq,
        seo: d.seo,
      });
    }
  }

  console.log("\n📖 Seeding glossary terms...");
  for (const term of glossaryTerms) {
    for (const lang of langs) {
      const d = term[lang];
      await upsert(`glossaryTerm-${term.slug}-${lang}`, {
        _type: "glossaryTerm",
        language: lang,
        term: d.term,
        slug: slug(term.slug),
        shortDefinition: d.shortDefinition,
        body: d.body,
        faq: d.faq,
        seo: d.seo,
      });
    }
  }

  console.log("\n⚖️  Seeding comparisons...");
  for (const comp of comparisons) {
    for (const lang of langs) {
      const d = comp[lang];
      await upsert(`comparisonPage-${comp.slug}-${lang}`, {
        _type: "comparisonPage",
        language: lang,
        title: d.title,
        slug: slug(comp.slug),
        competitor: d.competitor,
        excerpt: d.excerpt,
        body: d.body,
        faq: d.faq,
        seo: d.seo,
      });
    }
  }

  console.log("\n🔌 Seeding connectors...");
  for (const conn of newConnectors) {
    for (const lang of langs) {
      const d = conn[lang];
      await upsert(`connectorPage-${conn.slug}-${lang}`, {
        _type: "connectorPage",
        language: lang,
        toolName: d.toolName,
        slug: slug(conn.slug),
        tagline: d.tagline,
        description: d.description,
        useCases: d.useCases,
        faq: d.faq,
        seo: d.seo,
      });
    }
  }

  console.log("\n✨ Done!\n");
}

seed();
