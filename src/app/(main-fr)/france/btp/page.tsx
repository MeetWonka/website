import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { AgentExplorer, BtpVideo } from "./btp-interactive";
import {
  btpComparison,
  btpFaqs,
  btpLibrary,
  btpPains,
  btpTeams,
} from "./btp-content";
import { btpIntegrations } from "./mcp-integrations";
import styles from "./btp.module.css";

export const metadata: Metadata = {
  title: "Wonka Chat pour la construction | Agents IA pour le BTP",
  description:
    "CCTP, comptes rendus, comparatifs fournisseurs, DOE : les agents Wonka Chat préparent le travail de vos équipes travaux. Sources vérifiables, validation humaine, données hébergées en Europe.",
  alternates: { canonical: "/france/btp" },
};

const contactHref =
  "/france/diagnostic?secteur=btp&utm_source=btp&utm_campaign=construction";

const btpSoftware = btpIntegrations.filter((tool) => tool.wordmark);

const teamPhotos = [
  { src: "/images/france/team/chantier-terrain.jpg", alt: "Gabriel sur un chantier de gros œuvre" },
  { src: "/images/france/team/wonka-picture-day.jpg", alt: "Gabriel, équipe Wonka France" },
  { src: "/images/france/team/chantier-plans.jpg", alt: "Gabriel relisant des plans sur chantier" },
];

function ToolTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className={styles.toolTrack} aria-hidden={duplicate || undefined}>
      {btpIntegrations.filter((tool) => !tool.wordmark).map((tool) => (
        <li className={styles.toolMark} key={tool.name}>
          {tool.src ? (
            <Image
              className={tool.wordmark ? styles.toolLogo : undefined}
              src={tool.src}
              alt={tool.wordmark ? tool.name : ""}
              width={tool.wordmark ? 130 : 34}
              height={tool.wordmark ? 48 : 34}
              loading="eager"
            />
          ) : null}
          {!tool.wordmark ? <span>{tool.name}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function Mark({ value }: { value: string }) {
  if (value === "yes") return <span className={styles.markYes}>Oui</span>;
  if (value === "partial") return <span className={styles.markPartial}>En partie</span>;
  return <span className={styles.markNo}>Non</span>;
}

export default function BtpLandingPage() {
  return (
    <div className={styles.page} lang="fr">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.pill}>
              <span /> Wonka Chat pour la construction
            </p>
            <h1 className="type-h3">
              Moins de paperasse.
              <br />
              Plus de chantier.
            </h1>
            <p className={styles.lead}>
              L’administratif dévore le temps de vos équipes. Les agents Wonka
              Chat le préparent, vos équipes valident.
            </p>
            <div className={styles.actions}>
              <ButtonLink href={contactHref}>Évaluer mes besoins IA</ButtonLink>
              <a href="#agents" className={styles.watch}>
                Voir les agents BTP <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className={styles.heroTrust}>
              <li>Certifié ISO 27001</li>
              <li>Conforme RGPD</li>
              <li>Hébergé en Europe</li>
            </ul>
          </div>
          <div className={styles.videoWrap} id="demonstration">
            <BtpVideo
              slug="btp-01-cctp"
              title="Un agent Wonka Chat analyse un CCTP, signale les points à vérifier et attend votre validation."
              priority
            />
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-label="Nos références">
        <a
          className={styles.proofCard + " " + styles.proofLink}
          href="https://tooli.be"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={styles.proofKicker}>Construction · Belgique</p>
          <span className={styles.proofBrand}>
            <Image
              src="/images/france/logos/tooli.png"
              alt=""
              width={40}
              height={36}
            />
            Tooli
          </span>
          <p className={styles.proofStatement}>
            <strong>Tooli</strong> est l’assistant IA de la construction en
            Belgique, conçu avec les fédérations et les centres techniques du
            secteur pour leurs membres. Il fonctionne avec Wonka : analyse
            d’appels d’offres, comptes rendus, aide aux offres.
          </p>
          <span className={styles.proofMore}>
            Découvrir Tooli <span aria-hidden="true">↗</span>
          </span>
        </a>
        <article className={styles.proofCard}>
          <p className={styles.proofKicker}>Groupe ENGIE</p>
          <Image
            className={styles.proofLogo}
            src="/images/france/logos/engie.svg"
            alt="ENGIE"
            width={132}
            height={48}
          />
          <p className={styles.proofStatement}>
            Au sein du groupe ENGIE, une équipe support de plus de 70
            personnes gère les mails de ses clients. Des agents Wonka prennent
            désormais en charge ce traitement :
            <strong> le temps passé sur ces mails a été divisé par deux.</strong>
          </p>
        </article>
        <article className={styles.proofCard}>
          <p className={styles.proofKicker}>Notre équipe France</p>
          <p className={styles.proofYears}>10+ ans</p>
          <p className={styles.proofStatement}>
            dans le BTP, des Compagnons du Devoir jusqu’au pilotage de
            chantiers de plus de 10 M€.
          </p>
          <ul className={styles.teamPhotos} aria-label="Notre équipe sur le terrain">
            {teamPhotos.map((photo) => (
              <li key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={64} height={64} />
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.painSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.label}>Même semaine, mêmes équipes.</p>
          <h2 className="type-h4">
            Ce qui vous prend du temps
            <br />
            devient un brouillon à relire.
          </h2>
        </div>
        <ol className={styles.painList}>
          {btpPains.map(([before, after]) => (
            <li key={before}>
              <p className={styles.painBefore}>
                <span>Aujourd’hui</span>
                {before}
              </p>
              <span className={styles.painArrow} aria-hidden="true">→</span>
              <p className={styles.painAfter}>
                <span>Avec Wonka</span>
                {after}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.agentsSection} id="agents">
        <div className={styles.sectionHeading}>
          <p className={styles.label}>De l’appel d’offres à la réception.</p>
          <h2 className="type-h4">
            Un agent pour chaque étape
            <br />
            de vos chantiers.
          </h2>
          <p className={styles.sectionSubhead}>
            Les agents partent de vos pièces et de vos règles métier. Chacun
            prépare un livrable précis, et chaque livrable attend votre
            validation.
          </p>
        </div>
        <AgentExplorer />
      </section>

      <section className={styles.librarySection} aria-label="Bibliothèque d’agents">
        <div className={styles.libraryCopy}>
          <p className={styles.label}>Ce n’est qu’un début.</p>
          <h2 className="type-h4">
            Des dizaines d’agents prêts.
            <br />
            Et tous ceux que vous créerez.
          </h2>
          <p>
            Partez des agents prêts à l’emploi, adaptez-les à vos règles, ou
            créez les vôtres en quelques minutes. Chaque nouvel agent se
            partage avec toute l’équipe.
          </p>
          <ol className={styles.buildSteps}>
            <li>
              <b>01</b>
              <span>Décrivez la tâche, avec vos mots</span>
            </li>
            <li>
              <b>02</b>
              <span>Ajoutez vos documents et vos règles métier</span>
            </li>
            <li>
              <b>03</b>
              <span>Partagez l’agent avec votre équipe</span>
            </li>
          </ol>
        </div>
        <ul className={styles.libraryCloud}>
          {btpLibrary.map((name) => (
            <li key={name}>{name}</li>
          ))}
          <li className={styles.libraryCustom}>+ Votre agent sur mesure</li>
        </ul>
      </section>

      <section className={styles.section + " " + styles.storySection}>
        <div className={styles.sectionCopy}>
          <p className={styles.label}>Vous connaissez la scène.</p>
          <h2 className="type-h4">
            Le chantier est fini.
            <br />
            Votre journée, pas encore.
          </h2>
          <p className={styles.shortCopy}>
            Devis, planning, compte rendu : les tâches de bureau s’ajoutent au
            terrain. Wonka prépare la suite dans un seul espace ; vos équipes
            gardent le dernier mot.
          </p>
        </div>
        <BtpVideo
          slug="btp-02-journee"
          title="Après une visite de chantier, Wonka Chat prépare la réponse au devis, les points à confirmer et le compte rendu à relire."
        />
      </section>

      <section className={styles.section + " " + styles.controlSection}>
        <BtpVideo
          slug="btp-03-action"
          title="Des notes, un planning et un compte rendu deviennent des actions classées par lot, validées par le conducteur de travaux."
        />
        <div className={styles.sectionCopy}>
          <p className={styles.label}>L’humain valide, toujours.</p>
          <h2 className="type-h4">
            Une préparation claire.
            <br />
            La décision reste à vous.
          </h2>
          <ol className={styles.controlSteps}>
            <li>
              <b>01</b>
              <span>
                <strong>Brouillon sourcé</strong>
                Chaque point renvoie à la pièce et à l’article d’origine.
              </span>
            </li>
            <li>
              <b>02</b>
              <span>
                <strong>Manques signalés</strong>
                Ce qui n’est pas dans vos pièces reste marqué « à confirmer ».
              </span>
            </li>
            <li>
              <b>03</b>
              <span>
                <strong>Validation humaine</strong>
                Rien ne part, rien n’est modifié sans l’accord d’une personne
                habilitée.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className={styles.personaSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.label}>Pour toute l’entreprise.</p>
          <h2 className="type-h4">
            Chaque équipe
            <br />
            a ses agents.
          </h2>
          <p className={styles.sectionSubhead}>
            Le chantier est au cœur, mais l’IA sert aussi tous les services qui
            le font tourner.
          </p>
        </div>
        <ul className={styles.personaGrid}>
          {btpTeams.map(([team, promise]) => (
            <li key={team}>
              <h3 className="type-h6">{team}</h3>
              <p>{promise}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.compareSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.label}>Pourquoi pas un simple chatbot ?</p>
          <h2 className="type-h4">
            Une IA de chantier,
            <br />
            pas une IA de passage.
          </h2>
          <p className={styles.sectionSubhead}>
            Wonka ne remplace pas votre logiciel de gestion : il prépare le
            travail autour, avec vos documents et vos outils.
          </p>
        </div>
        <div className={styles.compareWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Critère</span>
                </th>
                {btpComparison.columns.map((column, index) => (
                  <th scope="col" key={column} data-highlight={index === 0 || undefined}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {btpComparison.rows.map(([label, ...values]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {values.map((value, index) => (
                    <td key={index} data-highlight={index === 0 || undefined}>
                      <Mark value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className={styles.toolSection}
        aria-label="Connecteurs et outils compatibles"
      >
        <div className={styles.toolCopy}>
          <p className={styles.label}>Pas besoin de changer d’outils.</p>
          <h2 className="type-h5">
            Wonka s’intègre à votre environnement de travail.
          </h2>
          <p>
            Plus de cent connecteurs pour vos mails, documents, tableurs et
            logiciels métier. Vos équipes gardent leurs outils ; s’il en manque
            un, nous l’ajoutons ou cadrons l’intégration avec vous.
          </p>
        </div>
        <div className={styles.toolMarquee}>
          <div className={styles.toolRail}>
            <ToolTrack />
            <ToolTrack duplicate />
          </div>
        </div>
        <div className={styles.toolSoon}>
          <span>Logiciels BTP</span>
          <ul>
            {btpSoftware.map((tool) => (
              <li key={tool.name}>
                {tool.src ? (
                  <Image src={tool.src} alt={tool.name} width={100} height={36} />
                ) : (
                  tool.name
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.securitySection} aria-label="Sécurité et conformité">
        <div className={styles.securityCopy}>
          <p className={styles.label}>Sécurité et conformité.</p>
          <h2 className="type-h4">Vos données de chantier restent les vôtres.</h2>
          <p>
            Wonka est certifié ISO 27001, conforme au RGPD et à NIS 2. Vos
            données sont hébergées en Europe, sur Microsoft Azure. Vous décidez
            qui accède à quoi.
          </p>
        </div>
        <ul className={styles.securityBadges}>
          <li>
            <BadgeIso className={styles.badge} />
            <span>ISO 27001</span>
          </li>
          <li>
            <BadgeGdpr className={styles.badge} />
            <span>RGPD</span>
          </li>
        </ul>
      </section>

      <section className={styles.offer} id="offre">
        <div className={styles.pricingHeading}>
          <p className={styles.label}>À chaque étape, le bon niveau d’accompagnement.</p>
          <h2 className="type-h4">
            Commencez par un usage.
            <br />
            Faites-en une méthode d’équipe.
          </h2>
          <p>
            De votre premier agent au déploiement accompagné, faites évoluer
            Wonka avec les besoins de vos équipes.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          <article className={styles.planCard}>
            <div className={styles.planTop}>
              <span>01 · INDIVIDUEL</span>
              <span>Pour commencer</span>
            </div>
            <h3 className="type-h5">Wonka Chat</h3>
            <p className={styles.planDescription}>
              Votre espace IA pour les tâches du quotidien.
            </p>
            <div className={styles.planValue}>
              <strong>Vous pouvez déjà…</strong>
              <ul>
                <li>Analyser vos documents et en faire la synthèse</li>
                <li>Choisir le modèle adapté à chaque tâche</li>
                <li>Créer vos premiers agents de travail</li>
                <li>Préparer comptes rendus et tableaux</li>
              </ul>
            </div>
            <a className={styles.planCtaSecondary} href="https://wonka.chat/register">
              Découvrir Wonka Chat <span aria-hidden="true">↗</span>
            </a>
            <small>Tarifs et conditions présentés à l’inscription.</small>
          </article>

          <article className={styles.planCard + " " + styles.planRecommended}>
            <div className={styles.planTop}>
              <span>02 · ÉQUIPE</span>
            </div>
            <h3 className="type-h5">Wonka Chat pour vos équipes</h3>
            <p className={styles.planDescription}>
              Le bon point de départ pour faire passer les usages à l’échelle.
            </p>
            <div className={styles.planValue}>
              <strong>Tout ce qu’il faut pour avancer ensemble.</strong>
              <ul>
                <li>Un espace IA pour les équipes concernées</li>
                <li>Des agents adaptés aux tâches du métier</li>
                <li>Des méthodes et agents partageables</li>
                <li>Vos outils existants, selon le périmètre convenu</li>
              </ul>
            </div>
            <div className={styles.valueStack}>
              <span>DE L’USAGE À L’ADOPTION</span>
              <ol>
                <li><b>01</b><span>Identifier les tâches répétitives</span></li>
                <li><b>02</b><span>Prioriser le premier cas utile</span></li>
                <li><b>03</b><span>Préparer un agent vérifiable</span></li>
                <li><b>04</b><span>Faire grandir les usages en équipe</span></li>
              </ol>
            </div>
            <ButtonLink href={contactHref}>Évaluer mes besoins IA</ButtonLink>
            <small>Licences et périmètre définis avec votre entreprise.</small>
          </article>

          <article className={styles.planCard}>
            <div className={styles.planTop}>
              <span>03 · DÉPLOIEMENT</span>
              <span>100+ collaborateurs</span>
            </div>
            <p className={styles.planScarcity}>
              <span aria-hidden="true" />
              5 places par mois, pas une de plus
            </p>
            <h3 className="type-h5">Un déploiement IA accompagné</h3>
            <p className={styles.planDescription}>
              Pour coordonner les usages, les métiers et les outils à l’échelle
              de l’entreprise.
            </p>
            <div className={styles.planValue}>
              <strong>Votre accompagnement inclus · valeur 10 000 €</strong>
              <ul>
                <li>Pré-kick-off et échanges avec vos services</li>
                <li>Cartographie et priorisation des cas d’usage</li>
                <li>Audit et feuille de route opérationnelle</li>
                <li>Accompagnement au déploiement convenu</li>
              </ul>
            </div>
            <a className={styles.planCtaSecondary} href={contactHref}>
              Évaluer mon déploiement <span aria-hidden="true">↗</span>
            </a>
            <small>
              Nous accompagnons 5 entreprises par mois. Une fois les places
              prises, les nouvelles demandes passent au mois suivant.
            </small>
          </article>
        </div>
      </section>

      <section className={styles.section + " " + styles.faq}>
        <div className={styles.sectionCopy}>
          <h2 className="type-h4">FAQ</h2>
        </div>
        <div className={styles.faqList}>
          {btpFaqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.final}>
        <Image
          src="/images/CTA/cta-bg.avif"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className={styles.landscape}
        />
        <div className={styles.heroShade} />
        <div>
          <p>Wonka Chat pour la construction</p>
          <h2 className="type-h3">
            Par des gens de la construction,
            <br />
            pour les gens de la construction.
          </h2>
          <p className={styles.finalSub}>
            Identifions ensemble vos premiers agents, à partir de vos propres
            pièces.
          </p>
          <ButtonLink href={contactHref}>Évaluer mes besoins IA</ButtonLink>
        </div>
      </section>
    </div>
  );
}
