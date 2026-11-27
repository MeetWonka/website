# WonkaChat Product — couverture et livraison

Ajout du 24 septembre 2026 sur Website, dans `packages/product-ui` et `apps/wonkachat-lab`. **51 composants React ajoutés au catalogue central**, qui passe de 7 à 58 entrées. Statut `draft` : utilisables pour la revue et les captures, sans modifier l’approbation de la marque ni publier un package.

## Examiner le résultat

```sh
bun install --frozen-lockfile
bun run --cwd apps/wonkachat-lab dev --host 127.0.0.1 --port 5187
```

- `/` : catalogue public et navigation produit.
- `/?page=connectors` : cartes, recherche, catégories, favoris, configuration et connexion simulée.
- `/?page=agents&builder=1` : builder complet en huit sections.
- `/?page=settings` : réglages personnels, activité, organisation et administration.
- `/?mode=components` : specimens et états.
- `/?mode=capture&scenario=execution&frame=150&clean=1` : plan de capture 1920×1080.
- `&theme=dark` : thème sombre canonique.

`bun run storybook` regroupe le produit dans la section composée **WonkaChat Product** existante. Les huit familles **Product** appartiennent au Storybook du lab, avec ses composants historiques ; elles ne sont pas dupliquées dans la navigation principale. En local, lancer le Storybook du lab sur 6007 puis définir `WONKACHAT_STORYBOOK_URL=http://127.0.0.1:6007` pour le Storybook central. Aucun déploiement public automatique n’est supposé.

## Ce qui existait et ce qui est ajouté

| Famille | Avant | Ajout |
|---|---|---|
| Fondations Website | Tokens, boutons, surfaces, badges, logo, typo, illustrations | Réutilisation des 95 tokens et génération CSS standard à portée locale ; aucune deuxième charte |
| Navigation / chat | Lab : navigation redimensionnable, composer, model selector, message bubble, menus | Shell contrôlé, bibliothèque d’agents, composer simplifié pour les captures, traces d’outils, résultat documentaire et partage |
| Connecteurs | Menu de connexion et indicateur MCP | Cartes avec sept états, favoris, gestion organisation, lecture seule, recherche/catégories, formulaire de configuration, retour d’autorisation |
| Templates | Pas de galerie complète dans le lab | 70 templates publics réels : titres, descriptions, catégories, outils, modèle et instructions ; galerie, détail, duplication locale vers le builder |
| Builder | Carte agent et navigation partielle | Identité, modèle, comportement/skills, starters, connaissances, outils, planification, capacités et historique ; erreurs, sauvegarde et lecture seule |
| Settings | Table de membres et menu compte | 20 panneaux et navigation selon rôle ; compte, voix, données, mémoire, API, fichiers, onboarding, activité, organisation, membres, sécurité, instructions, groupes, politiques, tags, abonnement et organisations |
| Méthodes et opérations | Sections séparées du produit source | Skill library/detail, prompt library, approbation d’action, exécutions planifiées, onboarding, notifications |
| Motion | Pas de timeline déterministe pour ces écrans | Quatre scènes, frame 0–150 à 25 fps, URL de pose, mode propre 1920×1080, hooks de calques et états avant/action/après |

## Sources vérifiées

- Website : commit de base `5c6442b`, catalogue et tokens locaux. Bouton source canonique préservé, logos/typographies repris dans `public`.
- WonkaChat : commit local `c662d033d87b647d37385ed34f4fa372b67537c5`. Références principales : `Templates/{TemplateCard,TemplateGallery,TemplateDetail}.tsx`, `Nav/settingsNavConfig.ts`, `Nav/SettingsTabs/Connectors/`, `SidePanel/Agents/AgentConfig.tsx`, `SidePanel/Agents/Builder/`, `Nav/SettingsTabs/`, `Skills/`, `Chat/`.
- Templates : [liste publique](https://wonka.chat/api/agents/templates) et détails publics `/api/agents/templates/{id}`. 70 entrées au moment de la capture ; le fichier local de traductions contenait 50 entrées d’une autre version, dont un wizard interne. Il n’a pas été mélangé au catalogue courant. Voir `template-provenance.json`.
- `source-inventory.json` recense les fichiers Website, WonkaChat et lab inspectés par famille. Il distingue un fichier d’implémentation d’un composant exporté : les centaines de fichiers du produit ne sont pas présentés comme autant de composants portés.

## Niveau de fidélité et limites explicites

Les composants sont des **adaptations de présentation sur la charte Website**. Ils reprennent les structures et familles d’états du produit, sans promettre une reproduction pixel pour pixel de chaque écran. Les cartes de templates emploient trois fonds dérivés des tokens Wonka ; le produit source avait six palettes. Les noms et instructions du snapshot restent dans leur langue publique originale lorsque la traduction manque.

Les réglages présentent les principales structures de formulaire et les vingt destinations de navigation. Ils ne reproduisent pas tous les sous-dialogues internes (enrôlement MFA, fédération SAML/OIDC, facturation réelle, coût détaillé par modèle, audit exhaustif). Les éditeurs de code, diagrammes, rendu Markdown complet, administration avancée, authentification et toutes les variantes métier du produit ne sont pas migrés ici. Les éléments existants du lab restent disponibles.

Les scénarios Northstar, personnes, permissions et chiffres sont fictifs. Les connexions, invitations, sauvegardes et partages du lab sont locaux ; rien n’est envoyé à un outil ou à une personne. Le snapshot public est figé et ne se rafraîchit pas pendant une capture. Pour migrer WonkaChat, brancher les composants contrôlés à ses stores/API, compléter les sous-dialogues utilisés et effectuer les tests d’intégration du produit. Cette PR ne prétend pas effectuer cette migration.

## Qualité et maintenance

- Contrôles de type, builds lab/Storybook et validation du catalogue.
- Tests d’interaction et axe en thèmes clair et sombre, sans désactivation des règles d’accessibilité.
- Tests de pureté/progression de la timeline et intégrité du mapping de tous les templates.
- Vérification visuelle desktop, mobile et plans de capture avec gstack browse.
- Deux erreurs de types déjà présentes dans le lab corrigées pour permettre son build (ref nullable, état inutilisé) ; contraste de deux stories existantes corrigé en thème sombre.

Voir `VALIDATION.md` pour les résultats finaux et `MOTION.md` pour le protocole studio.
