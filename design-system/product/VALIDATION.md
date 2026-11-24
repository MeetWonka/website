# Vérification — 24 septembre 2026

Branche intégrée sans conflit sur `origin/main` (`e45b5c7`). Les contrôles ci-dessous ont réussi sur cette base. Le préchargement de `next-intl` évite une invalidation de cache Vite observée lors du premier test après rebase.

- `bun run ds:check` : 95 tokens, 58 composants, 4 assets canoniques, 7 règles, 6 patterns ; aucune dérive générée.
- `bun run typecheck` : réussi.
- `bun run test:storybook` : 200 tests réussis, 44 fichiers ; tests d’interaction et accessibilité dans les thèmes clair et sombre.
- `bun test packages/product-ui/tests/motion.test.mjs` : 3 tests réussis ; timeline déterministe et mapping des outils/instructions des 70 templates.
- `bun run storybook:build` : réussi.
- `bun run --cwd apps/wonkachat-lab build` : réussi.
- `bun run --cwd apps/wonkachat-lab build-storybook` : réussi ; 70 nouvelles stories Product et anciennes stories du lab indexées.
- gstack browse : 12 assertions de parcours réussies (recherche template, instructions, builder, validation outils, connexion/déconnexion, invitation locale, composer et livrable). Aucune erreur console observée pendant ce parcours.
- Mobile 390×844 : largeur du document 390 px, aucun débordement horizontal ni logo manquant sur le catalogue de connecteurs ; dialogue de connexion vérifié et fermeture par Échap.
- Reproductibilité : la frame `execution/light/150` a été recapturée ; les deux PNG ont le même SHA-256.
- 16 PNG de référence : chacun à 3840×2160 ; vues claires et sombres. Cadrage du builder ajusté pour isoler une section sans couper les contrôles.

Correction de classement : les huit familles Product sont désormais détenues par `apps/wonkachat-lab/src/product/stories` et visibles dans la section composée **WonkaChat Product**. Le Storybook central ne contient plus de doublon Product (0 entrée dans son index local). Les liens du catalogue utilisent le préfixe de composition `wonkachat-product_`. Les 200 tests restent couverts par une configuration de validation séparée. Affichage des cartes de connexion vérifié dans la section composée locale.

Ces résultats valident les présentations et interactions locales. Ils ne constituent pas un test des API WonkaChat, OAuth, invitations, facturation ou opérations d’outils en production. Les contrôles du backend ne sont pas branchés dans ce lab.

Avertissements non bloquants des outils existants : taille de certains chunks Storybook, classes de durée Tailwind 3 ambiguës et migration future du chargement de configuration Vite. Aucun n’empêche les builds.
