# Programme BTP : réservation et qualification

## Parcours à connecter

CTA unique : « Évaluer mes besoins IA ». Actuellement relié au diagnostic France existant tant qu’aucun lien iClosed/Typeform ni calendrier France n’est configuré.

1. Réservation courte : prénom, email professionnel, entreprise, créneau disponible et modalité de rendez-vous.
2. Après confirmation réelle du calendrier : qualification complémentaire dans la même page, avec lien de reprise. Ne pas ouvrir automatiquement un second onglet : risque de blocage et de perte de contexte.
3. Confirmation persistante du rendez-vous même si la qualification est interrompue.

## Questions complémentaires proposées

- Métier : entreprise générale, lots techniques, second œuvre, bureau d’études, autre.
- Effectif : moins de 50, 50–99, 100–249, 250–999, 1 000+.
- Chiffre d’affaires : moins de 10 M€, 10–50 M€, 50–250 M€, 250 M€+, préfère en discuter.
- Fonction : direction, opérations/travaux, administratif/finance, informatique, autre.
- Tâche prioritaire : CCTP, consultation fournisseur, comptes rendus, devis, relances, autre.
- Logiciels utilisés : Outlook, Excel, Sage, Obat, ProGBat, autres (sélection multiple).
- Nombre de collaborateurs concernés au démarrage.
- Personne qui valide le projet, calendrier souhaité, contraintes d’accès aux données.
- Question ouverte facultative : « Quel exemple concret voulez-vous nous montrer ? »

## iClosed : vérifié, pas encore connecté

La documentation indique une capture des prospects « Potential » dès la saisie d’un email ou numéro de téléphone, avant complétion. La cadence exacte de 60 secondes n’a pas été vérifiée.

Sources : https://docs.iclosed.io/en/articles/9825606-lead-statuses-explained et https://docs.iclosed.io/en/articles/9831786-appointment-setting-explained.

Le parcours standard iClosed qualifie avant de présenter les créneaux. Le parcours demandé (réservation puis qualification enrichie) doit être configuré avec une redirection après réservation ou une intégration dédiée. Ne pas supposer qu’un simple embed couvre ce besoin.

Prérequis : lien d’événement, disponibilités, questions configurées, URL de retour et destination CRM. Relier les réponses et la réservation via un identifiant confirmé côté serveur. Vérifier la signature des webhooks, leur idempotence et le traitement des reports/annulations.

Pour une sauvegarde des réponses incomplètes : informer le visiteur de l’enregistrement et de son usage pour préparer/reprendre son rendez-vous. Ne pas annoncer une sauvegarde serveur si seul le navigateur stocke les réponses. Distinguer brouillon, envoyé et rendez-vous confirmé.

## Offres et preuves

- Programme limité à cinq entreprises : capacité déclarée par Gabriel, pas un compteur dynamique ni « cinq places restantes ».
- Cible : entreprises de construction de 100 collaborateurs et plus. Conditions de licences et engagement à définir sur proposition.
- Valeur de l’accompagnement : 10 000 €, déclaration de Gabriel. Présentée comme valeur incluse, pas comme prix SaaS.
- Buildwise : référence client fournie. Le chiffre « 140 entreprises en France » attend confirmation de l’entité et d’une source avant publication.
- Sage, Obat, ProGBat : outils cités par le prospect, compatibilité à étudier ; ne pas afficher « intégrations natives » sans vérification.

## Adaptation de la démo

La landing adapte les structures de apps/wonkachat-lab/src/components/chat/{MessageBubble,Composer,ConnectorIconStack,ModelSelectorPill}. Elle utilise des styles CSS locaux pour éviter d’importer les providers applicatifs et le thème global du lab. Les menus décoratifs du composer ne sont pas de faux boutons interactifs. La sélection de scénario et le rejeu sont fonctionnels. Streaming simulé, aucun document réel ni appel agent.
