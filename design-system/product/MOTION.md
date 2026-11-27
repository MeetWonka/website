# Capture et animation — After Effects / Higgsfield

## Format de référence

Canvas 1920×1080, 25 fps, RGB/sRGB. Chaque scène indépendante compte 150 intervalles de frame (6 secondes), poses 0 à 150 incluses. Capturer à facteur 2 pour un PNG 3840×2160. La durée et le texte sont des choix de démonstration, pas une mesure de latence réelle du produit. Ne pas afficher une promesse « agent créé en trois secondes » comme un benchmark.

Ouvrir le lab à `http://127.0.0.1:5187`, puis utiliser `?mode=capture&scenario=SCENE&frame=N&theme=light&clean=1`. Le mode propre retire la barre du lab et fixe la taille. Attendre `document.fonts.ready`, puis capturer `.lab-capture`. Ne pas filmer la barre de contrôle. Les interactions de ces scènes sont volontairement figées : modifier `frame` pour une pose exacte.

## Plans prêts à composer

| Scène / URL | Cadre, texte, contenu | Poses / animation |
|---|---|---|
| `creation` | Fond clair Wonka ; titre Sectra à gauche « Votre savoir-faire devient un agent. » ; composer en dessous. Builder à droite, une section mise en avant à la fois parmi les huit du produit. | 0 : identité ; 10–80 : écriture du prompt ; 35–74 : instructions ; 75–99 : outils/sauvegarde ; 100–150 : enregistré. Maintenir le builder à l’échelle, animer chaque panneau sur son axe vertical. |
| `connection` | « Vos outils. Connectés. » ; trois cartes Outlook/Odoo/SharePoint, logos source, badges et actions. | 0–34 : Outlook non connecté ; 35–64 : autorisation ; 65–99 : connexion ; 100–150 : connecté. Les deux autres cartes restent stables. Le dialogue ne représente pas l’interface du fournisseur OAuth. |
| `execution` | « Le contexte se rassemble. » ; demande à gauche ; trace CRM, emails, méthode. À droite, document final. | Étape 1 finie à 50 ; étape 2 à 85 ; étape 3 et document à 115. Séparer fond, titre, composer/message, trace et résultat pour créer le montage. |
| `sharing` | « Le savoir-faire se partage. » ; panneau de permissions à droite. | 0–35 : aucune équipe sélectionnée ; 36 : équipe commerciale cochée ; 75–99 : sauvegarde ; 100–150 : accès accordé. Alex reste non sélectionné. |

Le `manifest.json` décrit les URLs, calques et valeurs. Le package expose `resolveCaptureFrame` pour piloter une autre surface React avec la même timeline. Les états sont strictement déterministes et sans requête réseau. Les animations CSS et le curseur texte sont gelés dans les captures.

## Texte exact

**Composer de création** : « Crée un agent qui prépare mes rendez-vous clients avec Outlook, Odoo et notre méthode commerciale. »

**Identité** : Brief client. Description : « Prépare les rendez-vous clients. Contexte, écarts, prochaines actions. »

**Instructions** : « Tu prépares les rendez-vous commerciaux à partir des sources autorisées. Compare les demandes du client avec le périmètre indiqué dans le CRM. Signale les écarts et les informations manquantes. Ne complète jamais un fait absent. Structure la réponse en Situation, Points à vérifier, Prochaines actions. Ne contacte personne et ne modifie aucun système externe. »

**Demande dans le chat** : « Prépare mon rendez-vous avec Northstar. Compare la demande reçue avec le périmètre prévu dans le CRM. »

**Sortie** : titre « Le périmètre est à confirmer. » Situation : « Le client demande d’inclure trois sites dans la proposition. Le CRM indique que la proposition actuelle couvre un site. » Point à vérifier : « Le périmètre n’est pas aligné. Les sites supplémentaires et leurs besoins restent à confirmer. » Prochaines actions : « 1. Confirmer les sites à couvrir. 2. Ajuster le périmètre de la proposition. 3. Valider les prochaines étapes pendant le rendez-vous. » Sources : Email client et CRM.

La mention « Données de démonstration » reste sur les poses. Les données du chat sont des fixtures, distinctes des instructions réelles du catalogue public.

## Direction visuelle

La référence OnMoon sert à guider la hiérarchie éditoriale, le rythme et la mise en scène des interfaces. Garder la signature Wonka : Sectra pour le récit, Inter Display pour l’UI, boutons et courbes du système, fonds issus des tokens. Un geste visuel et une preuve produit par plan. Plans larges pour comprendre ; recadrages ciblés pour lire. Éviter le zoom permanent, les particules décoratives et les panels illisibles.

Après validation du storyboard, utiliser des translations courtes (24–48 px), entrées masquées et coupes par alignement. Référence d’easing du système : `cubic-bezier(.22,1,.36,1)`. Micro-interactions 150–200 ms, changement de composition environ 450 ms ; conserver au moins 1,5 s pour lire un résultat. Les keyframes de la présente bibliothèque sont les poses de référence, pas un film monté final.

## Générer les 16 références PNG

Avec le lab démarré et gstack installé :

```sh
BROWSE_BIN=/chemin/vers/gstack/browse/dist/browse node scripts/design-system/capture-product.mjs
```

Le script ne visite que le serveur local. Il attend les polices et produit trois poses claires plus une pose finale sombre par scène dans `design-system/product/previews/`. Les PNG sont des références compositées 4K.

## After Effects

1. Importer les PNG de référence du dossier `previews/` et créer une composition 1920×1080 à 25 fps ; les PNG 4K sont réduits à 50 %.
2. Conserver le layout exact et reconstruire les calques animés à partir des composants, des SVG source et des textes ci-dessus. Le DOM expose `data-motion-id` pour repérer les éléments.
3. Noms recommandés : `BG`, `TITLE`, `COMPOSER`, `BUILDER/header`, `BUILDER/behavior`, `BUILDER/tools`, `CONNECTOR/outlook`, `TRACE/crm`, `TRACE/emails`, `TRACE/method`, `RESULT`, `SHARING`.
4. Garder le texte en calques éditables, logos en SVG/AI, panneau/fond en formes vectorielles. Les PNG composites sont des références de fidélité, pas des fichiers AE natifs ni des exports vectoriels par calque.
5. Exporter un master propre et une version sous-titrée séparée après validation du montage. Ce dépôt ne contient pas de `.aep` automatiquement généré.

## Higgsfield

Utiliser les keyframes pour cadrage et mouvement de caméra, et les exports exacts d’UI pour la composition finale. Une génération vidéo ne garantit pas les lettres, logos et chiffres exacts : conserver/recomposer ces éléments depuis les sources.

Prompt de mouvement (en anglais) :

> Restrained editorial product launch. Locked orthographic interface, slow deliberate camera push, generous negative space. Preserve the exact layout, typography, logo, component edges and all written content from the reference frame. One clear focal movement. No added UI, no particles, no neon, no invented text, no warped panels.

Pour `creation`, ajouter « focus transfers from the typed request to the agent configuration ». Pour `connection`, « focus transfers to the Outlook connection status ». Pour `execution`, « reveal the final document after the tool activity completes ». Pour `sharing`, « settle on the selected team and confirmed access ». Composer les textes et badges exacts dans After Effects si le générateur les altère.
