import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RsvpForm } from "./rsvp-form";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Conférence Cedric Gilissen · IA & ERP · 25 juin 2026 -- Wonka x Odovia",
  description:
    "Une matinée d'échanges autour de l'IA connectée aux ERP et à Odoo. Wonka AI et Odovia vous invitent le 25 juin 2026. Places limitées.",
  robots: { index: false, follow: false },
};

const speakers = [
  {
    id: "brieuc",
    name: "Brieuc De Voghel",
    role: "Fondateur · Odovia Integration",
    expertise: "Expert Odoo",
    photo: "/events/conference-erp/brieuc.png",
  },
  {
    id: "cedric",
    name: "Cédric Gilissen",
    role: "Fondateur & CEO · Wonka AI",
    expertise: "Expert IA",
    photo: "/events/conference-erp/cedric.png",
  },
  {
    id: "theau",
    name: "Théau Lepouttre",
    role: "Country Manager · Wonka AI",
    expertise: "Expert IA",
    photo: "/events/conference-erp/theau.png",
  },
];

const schedule = [
  {
    time: "8h30",
    label: "Arrivée & petit-déjeuner",
    description:
      "Accueil autour d'un café. Premiers échanges informels entre participants sélectionnés.",
    type: "optional" as const,
  },
  {
    time: "9h00",
    label: "Conférence de Cédric Gilissen",
    description:
      "Comment l'IA transforme concrètement les entreprises qui utilisent un ERP. Cas Odoo, résultats réels, mise en œuvre en semaines.",
    type: "main" as const,
  },
  {
    time: "10h00",
    label: "Questions & Réponses",
    description:
      "Session ouverte avec Brieuc, Cédric et Théau. Votre situation spécifique, des réponses directes.",
    type: "main" as const,
  },
  {
    time: "11h30",
    label: "Réseautage",
    description:
      "Échanges libres entre les participants présents. Clôture à 11h30.",
    type: "optional" as const,
  },
];

export default function ConferenceErpPage() {
  return (
    <div className="font-sans antialiased">

      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Image
              src="/images/brand/wonka-logo-white.svg"
              alt="Wonka AI"
              width={300}
              height={69}
              style={{ height: 19, width: "auto" }}
            />
            <span className="text-white/20 text-sm select-none">×</span>
            <Image
              src="/events/conference-erp/odovia-logo.webp"
              alt="Odovia Integration"
              width={32}
              height={32}
              style={{ height: 32, width: "auto" }}
              className="opacity-85"
            />
          </div>
          <span className="hidden sm:block text-white/30 text-xs uppercase tracking-widest">
            Sur invitation · 25 juin 2026
          </span>
          <a
            href="#rsvp"
            className="text-black bg-white text-xs font-medium uppercase tracking-widest px-4 py-2 hover:bg-white/80 transition-colors"
          >
            Demander une place
          </a>
        </div>
      </nav>

      {/* ── Hero -- image de fond waterfall ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/events/conference-erp/bg-waterfall.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(14,26,22,0.9) 80%, #0e1a16 100%)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full px-6 pb-24 pt-48">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-10 font-medium">
            Invitation privée · Mercredi 25 juin 2026
          </p>

          <h1
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            L'IA rencontre
            <br />
            <em className="not-italic text-white/40">l'ERP.</em>
          </h1>

          <p className="font-serif text-white/60 text-xl md:text-2xl leading-snug max-w-xl mb-14">
            Et si vos données Odoo étaient enfin
            <br />
            <em>utilisées à leur plein potentiel ?</em>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a
              href="#rsvp"
              className="bg-white text-black text-sm font-medium uppercase tracking-widest px-8 py-4 hover:bg-white/80 transition-colors"
            >
              Demander une place
            </a>
            <p className="text-white/30 text-xs uppercase tracking-widest">
              Clôture le 19 juin · Accès sur invitation uniquement
            </p>
          </div>
        </div>
      </section>

      {/* ── Bande exclusive ── */}
      <section className="bg-black border-y border-white/10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Accès strictement sur invitation
          </p>
          <div className="hidden sm:block h-px flex-1 bg-white/10 mx-8" />
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Nombre de places limité
          </p>
          <div className="hidden sm:block h-px flex-1 bg-white/10 mx-8" />
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Inscriptions closes le 19 juin
          </p>
        </div>
      </section>

      {/* ── L'invitation ── */}
      <section className="bg-mid-gray px-6 py-24 md:py-36">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-light-brown font-medium pt-1">
              L'invitation
            </p>
          </div>
          <div className="space-y-6 max-w-xl">
            <p className="text-black text-lg leading-relaxed">
              Que se passe-t-il quand une IA privée et souveraine comprend enfin ce que contient
              votre ERP, vos commandes, vos stocks, vos clients, vos processus, et sait quoi en
              faire ?
            </p>
            <p className="text-black text-lg leading-relaxed">
              Nous invitons un petit groupe de dirigeants à passer une matinée ensemble pour une
              conversation franche sur ce que ce moment exige, et ce qu'il rend possible.
            </p>
            <p className="text-black text-lg leading-relaxed font-medium">
              Nous espérons vous voir le 25.
            </p>
            <p className="text-light-brown text-base pt-4">
              Cédric Gilissen & Brieuc De Voghel
              <br />
              <span className="text-sm">Wonka AI · Odovia Integration</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Citation ── */}
      <section className="bg-black px-6 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <blockquote
            className="font-serif text-white leading-tight max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
          >
            "Les ERP contiennent toute la mémoire de l'entreprise.
            <br />
            <em className="text-white/50">L'IA lui donne enfin une voix."</em>
          </blockquote>
        </div>
      </section>

      {/* ── Le contexte -- image de fond river ── */}
      <section className="relative px-6 py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/events/conference-erp/bg-river.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-mid-gray/92" />
        </div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-light-brown font-medium pt-1">
              Le contexte
            </p>
          </div>
          <div className="max-w-xl space-y-6">
            <h2 className="font-serif text-black text-4xl md:text-5xl leading-tight">
              L'ERP sait tout.
              <br />
              <em className="text-light-brown">Mais il ne parle pas.</em>
            </h2>
            <p className="text-black text-base leading-relaxed">
              Des années de données opérationnelles dorment dans vos modules Odoo. Ventes,
              achats, stock, comptabilité, RH. Vos équipes passent des heures à extraire des
              rapports, chercher des informations, relancer des processus à la main.
            </p>
            <p className="text-black text-base leading-relaxed">
              L'IA change fondamentalement cette équation. Pas en remplaçant l'ERP, en le
              rendant enfin accessible, conversationnel, autonome.
            </p>
            <p className="text-black text-base leading-relaxed">
              Posez une question en langage naturel. Déclenchez un flux de travail d'une phrase.
              Obtenez une analyse en secondes plutôt qu'en heures.
            </p>

            <div className="pt-6 flex items-center gap-6 text-light-brown">
              <div className="text-center">
                <p className="font-serif text-4xl text-black">2020</p>
                <p className="text-xs uppercase tracking-widest mt-1">L'ERP seul</p>
              </div>
              <div className="flex-1 h-px bg-dark-gray" />
              <div className="text-center">
                <p className="font-serif text-4xl text-black">2026</p>
                <p className="text-xs uppercase tracking-widest mt-1">L'ERP + IA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intervenants ── */}
      <section className="bg-black px-6 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/40 font-medium mb-16">
            Les intervenants
          </p>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="flex flex-col gap-5">
                <div className="w-full aspect-[3/4] bg-white/5 border border-white/10 relative overflow-hidden">
                  <Image
                    src={speaker.photo}
                    alt={speaker.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-white font-medium text-lg leading-tight">{speaker.name}</p>
                  <p className="text-white/50 text-sm mt-0.5">{speaker.role}</p>
                  <p className="text-white/30 text-xs uppercase tracking-widest mt-2 font-medium">
                    {speaker.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programme -- image fond hills ── */}
      <section className="relative px-6 py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/events/conference-erp/bg-hills.png"
            alt=""
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-mid-gray/90" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-light-brown font-medium">
                La matinée
              </p>
              <p className="font-serif text-black text-2xl leading-tight mt-3">
                Mercredi
                <br />
                25 juin 2026
              </p>
              <p className="text-light-brown text-sm mt-5">Lieu à confirmer</p>
            </div>

            <div className="space-y-0 divide-y divide-dark-gray">
              {schedule.map((item) => (
                <div key={item.time} className="flex gap-8 py-7">
                  <div className="w-16 shrink-0">
                    <p className="font-serif text-black text-xl">{item.time}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <p className="text-black font-medium text-base">{item.label}</p>
                      {item.type === "optional" && (
                        <span className="text-[10px] uppercase tracking-widest text-light-brown border border-dark-gray px-2 py-0.5">
                          Libre
                        </span>
                      )}
                      {item.type === "main" && (
                        <span className="text-[10px] uppercase tracking-widest text-black border border-black px-2 py-0.5">
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="text-light-brown text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp" className="bg-black px-6 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-5">
              Accès sur invitation uniquement
            </p>
            <h2
              className="font-serif text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Nous espérons vous voir
              <br />
              <em className="text-white/50">le vingt-cinq.</em>
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
              La liste est intentionnellement courte. Confirmez votre présence avant le 19 juin
              et nous revenons vers vous avec les détails pratiques.
            </p>
          </div>

          <div className="bg-mid-gray p-8 md:p-12 max-w-xl mx-auto">
            <RsvpForm />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black border-t border-white/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Image
              src="/images/brand/wonka-logo-white.svg"
              alt="Wonka AI"
              width={300}
              height={69}
              style={{ height: 19, width: "auto" }}
              className="opacity-50"
            />
            <span className="text-white/20 text-sm select-none">×</span>
            <Image
              src="/events/conference-erp/odovia-logo.webp"
              alt="Odovia Integration"
              width={28}
              height={28}
              style={{ height: 28, width: "auto" }}
              className="brightness-0 invert opacity-40"
            />
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://meetwonka.com"
              className="text-white/30 text-xs hover:text-white/50 transition-colors"
            >
              meetwonka.com
            </Link>
            <span className="text-white/10">·</span>
            <p className="text-white/20 text-xs uppercase tracking-widest">
              © 2026 · Sur invitation uniquement
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
