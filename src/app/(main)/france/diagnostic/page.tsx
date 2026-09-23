"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { ButtonLink, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headingClass } from "@/lib/design-tokens";
import {
  getLeadAnalyticsContext,
  markLeadQualified,
  trackWebsiteEvent,
  WEBSITE_EVENTS,
} from "@/lib/analytics";

type QuestionId = "secteur" | "outil" | "donnees" | "frein" | "role";

interface Question {
  id: QuestionId;
  question: string;
  options: Array<{ value: string; label: string }>;
}

const QUESTIONS: Question[] = [
  {
    id: "secteur",
    question: "Vous travaillez dans quel secteur ?",
    options: [
      { value: "industrie", label: "Industrie" },
      { value: "finance", label: "Finance" },
      { value: "energie", label: "Énergie" },
      { value: "public", label: "Secteur public" },
      { value: "services", label: "Services" },
      { value: "autre", label: "Autre" },
    ],
  },
  {
    id: "outil",
    question: "Aujourd'hui, l'IA chez vous c'est quoi ?",
    options: [
      { value: "chatgpt-perso", label: "ChatGPT personnel" },
      { value: "copilot", label: "Copilot" },
      { value: "rien", label: "Rien de structuré" },
      { value: "outil-entreprise", label: "Un outil entreprise déjà en place" },
    ],
  },
  {
    id: "donnees",
    question: "Où vivent surtout vos données de travail ?",
    options: [
      { value: "sharepoint", label: "SharePoint" },
      { value: "odoo", label: "Odoo" },
      { value: "mail", label: "Mail" },
      { value: "crm", label: "CRM" },
      { value: "mix", label: "Un mix" },
    ],
  },
  {
    id: "frein",
    question: "Le vrai frein, c'est quoi ?",
    options: [
      { value: "rssi", label: "Le RSSI" },
      { value: "shadow-it", label: "Le shadow IT" },
      { value: "pas-de-temps", label: "Pas le temps" },
      { value: "pas-de-cas", label: "Pas de cas d'usage clair" },
    ],
  },
  {
    id: "role",
    question: "Vous, vous êtes ?",
    options: [
      { value: "dsi", label: "DSI" },
      { value: "rssi", label: "RSSI" },
      { value: "metier", label: "Direction métier" },
      { value: "direction", label: "Direction générale" },
    ],
  },
];

interface AgentType {
  title: string;
  description: string;
}

const AGENT_POOL: Record<string, AgentType> = {
  "support-mail": {
    title: "Agent support mail",
    description: "Gère automatiquement les emails support récurrents, avec escalade vers un humain si nécessaire. Connecté à votre CRM et base de connaissances.",
  },
  "knowledge-sharepoint": {
    title: "Agent knowledge SharePoint",
    description: "Répond aux questions de l'équipe à partir de votre documentation interne (SharePoint, Confluence, wikis). Contexte d'entreprise inclus.",
  },
  "copilote-erp-crm": {
    title: "Copilote branché ERP/CRM",
    description: "Assistant personnalisé pour les workflows métier (finance, RH, ops). Connecté à vos outils existants (ERP, CRM, mail).",
  },
  "agents-gouvernes": {
    title: "Agents privés gouvernés",
    description: "Un seul endroit pour tous vos agents IA. Le RSSI voit ce qui sort de l'entreprise, contrôle d'accès centralisé, logs d'audit. Hébergement Azure West Europe.",
  },
};

function pickAgents(answers: Record<QuestionId, string>): AgentType[] {
  const picked: AgentType[] = [];
  const used = new Set<string>();

  if ((answers.donnees === "mail" || answers.frein === "rssi" || answers.frein === "shadow-it") && !used.has("support-mail")) {
    picked.push(AGENT_POOL["support-mail"]);
    used.add("support-mail");
  }

  if (answers.donnees === "sharepoint" && !used.has("knowledge-sharepoint")) {
    picked.push(AGENT_POOL["knowledge-sharepoint"]);
    used.add("knowledge-sharepoint");
  }

  if ((answers.donnees === "odoo" || answers.donnees === "crm") && !used.has("copilote-erp-crm")) {
    picked.push(AGENT_POOL["copilote-erp-crm"]);
    used.add("copilote-erp-crm");
  }

  if ((answers.outil === "chatgpt-perso" || answers.frein === "rssi" || answers.frein === "shadow-it") && !used.has("agents-gouvernes")) {
    picked.push(AGENT_POOL["agents-gouvernes"]);
    used.add("agents-gouvernes");
  }

  const remaining = Object.entries(AGENT_POOL)
    .filter(([key]) => !used.has(key))
    .map(([, agent]) => agent);

  while (picked.length < 3 && remaining.length > 0) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    picked.push(remaining[randomIndex]);
    remaining.splice(randomIndex, 1);
  }

  return picked.slice(0, 3);
}

type Step = "questions" | "email" | "result";

export default function FranceDiagnosticPage() {
  const [step, setStep] = useState<Step>("questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<QuestionId, string>>({} as Record<QuestionId, string>);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [franceMeetingUrl, setFranceMeetingUrl] = useState<string | null>(null);
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("diagnostic-answers");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAnswers(parsed);
        const completedCount = Object.keys(parsed).length;
        if (completedCount > 0 && completedCount < QUESTIONS.length) {
          setCurrentQuestionIndex(completedCount);
        } else if (completedCount === QUESTIONS.length) {
          setStep("email");
        }
      } catch {
        // ignore
      }
    }

    fetch("/api/meeting-url?context=france")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setFranceMeetingUrl(data.url);
        }
      })
      .catch(() => {
        // ignore
      });
  }, []);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    trackWebsiteEvent(WEBSITE_EVENTS.DIAGNOSTIC_STEP_COMPLETED, {
      diagnostic_name: "france",
      step_name: currentQuestion.id,
      step_index: currentQuestionIndex + 1,
      answer: value,
    });
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    sessionStorage.setItem("diagnostic-answers", JSON.stringify(newAnswers));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep("email");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          company,
          source: "france-diagnostic",
          website: "",
          diagnostic: answers,
          analytics: getLeadAnalyticsContext(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }

      const result = (await res.json()) as {
        leadId: string;
        lifecycleStage: "lead" | "mql";
        leadScore: number;
      };
      markLeadQualified({
        lead_id: result.leadId,
        lifecycle_stage: result.lifecycleStage,
        lead_score: result.leadScore,
        lead_source: "france-diagnostic",
      });
      trackWebsiteEvent(WEBSITE_EVENTS.FRANCE_DIAGNOSTIC_COMPLETE, {
        diagnostic_name: "france",
        lead_id: result.leadId,
        lifecycle_stage: result.lifecycleStage,
        lead_score: result.leadScore,
        ...answers,
      });

      const agents = pickAgents(answers);
      setSelectedAgents(agents);
      sessionStorage.removeItem("diagnostic-answers");
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const utmParams = new URLSearchParams();
  utmParams.set("utm_campaign", "france");
  utmParams.set("utm_source", "diagnostic");
  utmParams.set("utm_medium", "web");
  const meetingUrlWithUtm = franceMeetingUrl ? `${franceMeetingUrl}${franceMeetingUrl.includes("?") ? "&" : "?"}${utmParams.toString()}` : "";

  return (
    <main className="bg-background text-text">
      <Section className="min-h-[80vh] py-20 md:py-30">
        <div className="mx-auto max-w-[42rem]">
          {step === "questions" && (
            <>
              <div className="mb-10">
                <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-mid-gray">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="type-paragraph-m text-text/60">
                  Question {currentQuestionIndex + 1} sur {QUESTIONS.length}
                </p>
              </div>

              <h1 className={cn(headingClass.section, "mb-10")}>{currentQuestion.question}</h1>

              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={cn(
                      "type-body w-full rounded-sm border border-border bg-background p-5 text-left transition-colors hover:border-accent hover:bg-mid-gray",
                      answers[currentQuestion.id] === option.value && "border-accent bg-mid-gray",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {currentQuestionIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="type-paragraph-m-bold mt-6 text-text/60 underline underline-offset-4 hover:text-text"
                >
                  Retour
                </button>
              )}
            </>
          )}

          {step === "email" && (
            <>
              <h1 className={cn(headingClass.section, "mb-6")}>
                On prépare vos 3 agents.
              </h1>
              <p className="type-body mb-10 text-text/70">
                Prénom, email pro, entreprise. Pas de newsletter. Le résultat s'affiche ensuite.
              </p>

              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="firstName" className="type-paragraph-m-bold mb-2 block text-text">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="type-body w-full rounded-sm border border-border bg-background p-4 text-text focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="type-paragraph-m-bold mb-2 block text-text">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="type-body w-full rounded-sm border border-border bg-background p-4 text-text focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="type-paragraph-m-bold mb-2 block text-text">
                    Entreprise
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="type-body w-full rounded-sm border border-border bg-background p-4 text-text focus:border-accent focus:outline-none"
                  />
                </div>

                {error && (
                  <p className="type-paragraph-m text-red-600">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="mt-2"
                >
                  {isSubmitting ? "Envoi en cours..." : "Voir mon résultat"}
                </Button>
              </form>

              <button
                onClick={() => setStep("questions")}
                className="type-paragraph-m-bold mt-6 text-text/60 underline underline-offset-4 hover:text-text"
              >
                Retour aux questions
              </button>
            </>
          )}

          {step === "result" && (
            <>
              <h1 className={cn(headingClass.section, "mb-6")}>
                {firstName && company
                  ? `${firstName}, voici 3 agents pour ${company}.`
                  : firstName
                    ? `${firstName}, voici 3 agents pour vos outils.`
                    : "Voici 3 agents pour vos outils."}
              </h1>
              <p className="type-body mb-10 text-text/70">
                Ces agents sont des exemples concrets de ce que Wonka AI peut déployer pour votre entreprise. Chaque agent est connecté à vos systèmes existants et gouverné de manière centralisée.
              </p>

              <div className="flex flex-col gap-6">
                {selectedAgents.map((agent) => (
                  <div
                    key={agent.title}
                    className="rounded-sm border border-border bg-background p-6 md:p-8"
                  >
                    <h2 className={cn(headingClass.card, "mb-3")}>{agent.title}</h2>
                    <p className="type-paragraph-m text-text/70">{agent.description}</p>
                  </div>
                ))}
              </div>

              {meetingUrlWithUtm ? (
                <div className="mt-10 text-center">
                  <p className="type-body mb-6 text-text/70">
                    Prêt à discuter de votre cas spécifique ?
                  </p>
                  <ButtonLink 
                    href={meetingUrlWithUtm} 
                    variant="primary"
                    onClick={() => trackWebsiteEvent(WEBSITE_EVENTS.FRANCE_BOOKING_CLICK, {
                      diagnostic_name: "france",
                    })}
                  >
                    Voir ça en 45 min avec Gabriel
                  </ButtonLink>
                </div>
              ) : (
                <div className="mt-10 text-center">
                  <p className="type-body text-text/70">
                    Merci d'avoir complété le diagnostic. Nous vous contacterons bientôt.
                  </p>
                </div>
              )}

              <div className="mt-10 text-center">
                <ButtonLink href="/france" variant="secondary">
                  Retour à la page France
                </ButtonLink>
              </div>
            </>
          )}
        </div>
      </Section>
    </main>
  );
}
