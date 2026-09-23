import type { Locale } from "@/i18n/config";

interface Criterion {
  label: { en: string; fr: string; nl: string };
  wonka: boolean;
  competitor: boolean | "partial";
}

const criteria: Criterion[] = [
  {
    label: { en: "Data stays on your infrastructure", fr: "Données sur votre infrastructure", nl: "Data in uw infrastructuur" },
    wonka: true,
    competitor: false,
  },
  {
    label: { en: "EU data residency guaranteed", fr: "Résidence des données UE garantie", nl: "EU-gegevenslocatie gegarandeerd" },
    wonka: true,
    competitor: "partial",
  },
  {
    label: { en: "No CLOUD Act exposure", fr: "Aucune exposition au CLOUD Act", nl: "Geen CLOUD Act-blootstelling" },
    wonka: true,
    competitor: false,
  },
  {
    label: { en: "Connects to any tool stack", fr: "Se connecte à toute votre stack", nl: "Verbindt met elke toolstack" },
    wonka: true,
    competitor: "partial",
  },
  {
    label: { en: "Self-hosted LLM option", fr: "Option LLM auto-hébergé", nl: "Zelf-gehoste LLM-optie" },
    wonka: true,
    competitor: false,
  },
  {
    label: { en: "Open model support (Llama, Mistral)", fr: "Support modèles open source (Llama, Mistral)", nl: "Ondersteuning open modellen (Llama, Mistral)" },
    wonka: true,
    competitor: false,
  },
  {
    label: { en: "Full GDPR contractual guarantee", fr: "Garantie contractuelle RGPD complète", nl: "Volledige AVG-contractgarantie" },
    wonka: true,
    competitor: "partial",
  },
];

const labels = {
  en: { title: "Side-by-side comparison", yes: "Yes", no: "No", partial: "Partial" },
  fr: { title: "Comparaison côte à côte", yes: "Oui", no: "Non", partial: "Partiel" },
  nl: { title: "Vergelijking naast elkaar", yes: "Ja", no: "Nee", partial: "Gedeeltelijk" },
};

function Cell({ value, locale }: { value: boolean | "partial"; locale: Locale }) {
  const t = labels[locale];
  if (value === true) return <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 type-paragraph-m font-medium">✓ {t.yes}</span>;
  if (value === "partial") return <span className="inline-flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 type-paragraph-m">~ {t.partial}</span>;
  return <span className="inline-flex items-center gap-1.5 text-text/30 type-paragraph-m">✗ {t.no}</span>;
}

interface ComparisonTableProps {
  locale: Locale;
  competitor: string;
}

export function ComparisonTable({ locale, competitor }: ComparisonTableProps) {
  const t = labels[locale];

  return (
    <section className="mt-16">
      <h2 className="type-h5 mb-8">{t.title}</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-text/[0.03]">
              <th className="px-5 py-4 type-paragraph-m-bold w-1/2"></th>
              <th className="px-5 py-4 type-paragraph-m-bold text-accent">Wonka AI</th>
              <th className="px-5 py-4 type-paragraph-m-bold text-text/50">{competitor}</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-text/[0.02] transition-colors">
                <td className="px-5 py-4 type-paragraph-m text-text/70">{c.label[locale]}</td>
                <td className="px-5 py-4"><Cell value={c.wonka} locale={locale} /></td>
                <td className="px-5 py-4"><Cell value={c.competitor} locale={locale} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
