import { useState, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Composer from './components/chat/Composer';
import EmptyStateLanding from './components/chat/EmptyStateLanding';
import MessageBubble from './components/chat/MessageBubble';
import { Button } from './components/primitives/Button';
import './index.css';
import './landing-preview.css';

// Only scenario data and the page-level arrangement live here. Product UI
// is imported from the lab, without copied markup or replacement styles.
const examples = [
  {
    id: 'chantier',
    title: 'Préparer mon compte rendu de chantier',
    prompt: 'Chantier Les Tilleuls : tester l’étanchéité avant de fermer les gaines, confirmer les prises avec le client et valider la prochaine intervention. Prépare mon compte rendu par lot.',
    answer: 'Compte rendu — Résidence Les Tilleuls\n\nPlomberie : tester l’étanchéité avant fermeture des gaines.\n\nÉlectricité : confirmer l’emplacement des prises avec le client.\n\nCoordination : valider la date de la prochaine intervention.\n\nÀ compléter avant diffusion : responsables, échéances et date de visite.',
    apps: [{ id: 'word', icon: '/images/solution/card-3/logos/word.svg' }],
  },
  {
    id: 'cctp',
    title: 'Structurer les points à vérifier dans mon CCTP',
    prompt: 'Prépare une grille de lecture du CCTP pour le lot plomberie avant notre chiffrage.',
    answer: 'Voici une grille à compléter avec votre dossier.\n\nPérimètre : réseaux d’alimentation et d’évacuation concernés.\n\nPrescriptions : matériaux, performances et essais demandés.\n\nInterfaces : limites de prestation avec les autres lots.\n\nChiffrage : quantités, variantes et informations manquantes.\n\nAucun CCTP n’est joint à cet exemple : ces points ne constituent pas une analyse de votre dossier.',
    apps: [{ id: 'word', icon: '/images/solution/card-3/logos/word.svg' }],
  },
  {
    id: 'fournisseur',
    title: 'Préparer une relance fournisseur',
    prompt: 'Rédige une relance pour la commande 4582. Il me faut une date de livraison confirmée pour planifier l’intervention.',
    answer: 'Objet : Commande 4582 — confirmation de livraison\n\nBonjour,\n\nPouvez-vous nous confirmer la date de livraison de la commande 4582 ? Cette information nous permettra de planifier l’intervention de notre équipe.\n\nMerci de nous signaler tout décalage ou toute livraison partielle à prévoir.\n\nBien cordialement\n\nBrouillon à relire et à signer. Aucun email n’a été envoyé.',
    apps: [{ id: 'outlook', icon: '/images/solution/card-3/logos/outlook.svg' }],
  },
];

function Preview() {
  const [active, setActive] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const reduced = useReducedMotion();
  const example = examples.find((item) => item.id === active);
  const reset = () => { setActive(null); setCustomPrompt(''); };

  function previewSubmit(event: FormEvent<HTMLDivElement>) {
    const input = event.currentTarget.querySelector('textarea');
    if (!input?.value.trim()) return;
    setCustomPrompt(input.value.trim());
    setActive(null);
    setRun((value) => value + 1);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="preview-shell">
        <main className="preview-main">
          <div className="preview-toolbar">
            <span>Exemples construction</span>
            {(example || customPrompt) && <Button variant="ghost" size="sm" onClick={reset}>Autres exemples</Button>}
            {example && <Button variant="ghost" size="sm" onClick={() => setRun((value) => value + 1)}>Rejouer</Button>}
          </div>
          <div className="preview-content">
            {example || customPrompt ? (
              <div className="preview-messages" key={`${active}-${run}`}>
                <MessageBubble role="user" fullText={example?.prompt ?? customPrompt} />
                <MessageBubble role="assistant" streaming={!reduced} fullText={example?.answer ?? 'Cette interface est une démonstration locale, sans modèle IA connecté. Utilisez « Autres exemples » pour découvrir un scénario construction préparé.'} />
              </div>
            ) : (
              <EmptyStateLanding
                headline="Que souhaitez-vous déléguer aujourd’hui ?"
                suggestions={examples}
                onSelectSuggestion={(item) => { setActive(item.id); setRun((value) => value + 1); }}
              />
            )}
          </div>
          <div className="preview-composer" onSubmitCapture={previewSubmit}>
            <Composer placeholder="Demandez à Wonka" />
          </div>
          <p className="preview-disclosure">Démonstration · réponses préparées · aucune connexion à vos outils</p>
        </main>
      </div>
    </MotionConfig>
  );
}

createRoot(document.getElementById('root')!).render(<Preview />);
