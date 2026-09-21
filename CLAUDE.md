# ToutiPass — contexte projet pour Claude

Conciergerie digitale multiservices, **mobile-first**, pilote **Lubumbashi (RDC)**. Le client décrit un
besoin ; l'équipe ToutiPass qualifie, choisit un partenaire vérifié, l'affecte et suit la prestation.
Interface et échanges avec l'utilisateur : **en français**.

Dépôt : https://github.com/HamzaRabih/ToutiPass (privé, branche `main`).

## Règles non négociables (cahier des charges)

Le cahier des charges est dans `Docs/`, dossier **exclu de Git** (confidentiel). Ses règles clés :

- **Pas une marketplace** : ne jamais afficher de liste, profil, note ou classement de prestataires.
- **Aucun prix public** en V1 : l'estimation est donnée après l'échange.
- **Mobile-first** : zones tactiles ≥ 48 px, une action principale par écran, texte ≥ 16 px sur mobile.
- **WhatsApp et téléphone toujours accessibles** (bouton WhatsApp flottant sur toutes les pages).
- **Pas de compte** pour demander un service.
- **Performance** : pages légères pour Android d'entrée de gamme et connexion instable ; pas de vidéo
  en lecture automatique ; animations discrètes, coupées si `prefers-reduced-motion`.
- **Aucun faux témoignage.**

## Préférences du propriétaire (Hamza)

- **Photos sans visage humain**, surtout pas de femmes. Si une personne est indispensable : homme, ou
  enfant pour l'univers famille. Privilégier objets, outils, scènes, mains.
- **Icônes SVG professionnelles, pas d'emojis** (composant `app-icon`).
- Utiliser les **logos ToutiPass** officiels (`frontend/public/images/logo-*.svg`).
- Veut un site **vivant** (animations, mouvement), pas statique — dans la limite des contraintes de
  performance ci-dessus.
- Catégories **Beauté & Bien-être** et **Loisirs & Événements** supprimées volontairement : ne pas les
  remettre.
- Ne pas commiter ni pousser sans que Hamza le demande.

## Sessions cloud (Claude Code sur le web)

Le dossier `Docs/` étant exclu de Git, **il n'est pas disponible dans une session cloud** : le cahier
des charges, le design handoff et les logos sources n'y sont pas lisibles. Ce `CLAUDE.md` est donc la
**seule source de vérité** en session cloud — le tenir à jour à chaque décision importante. Si une règle
du cahier des charges doit être vérifiée, demander à Hamza de coller l'extrait concerné.

## Stack

- **Angular 19** (composants standalone, control flow `@if/@for`, signals), SCSS.
- **100 % statique, sans backend** (lot 1) : prerendering de chaque route pour le SEO, **PWA**.
- Formulaires envoyés via **Formspree** (service tiers).
- Déploiement prévu : contenu de `frontend/dist/frontend/browser/` sur un hébergement statique.

## Commandes (depuis `frontend/`)

```bash
npm install
npm start          # ng serve, http://localhost:4200 (on utilise souvent --port 4300)
npm run build      # build de prod + prerender ; doit afficher « Prerendered N static routes »
```

Toujours vérifier que le build passe (0 erreur) après une modification.

## Architecture (`frontend/src/app/`)

```
core/
  data/catalogue.data.ts      # catalogue : 6 univers, services, questions de qualification, images, icônes
  models/                     # types partagés = futur contrat de l'API backend
  services/
    catalogue.service.ts      # CatalogueService (abstrait) + StaticCatalogueService
    submission.service.ts     # SubmissionService (abstrait) + FormspreeSubmissionService
    whatsapp.service.ts       # liens wa.me préremplis
    reference.service.ts      # références TP-LUB-AAAA-XXXXXX
    seo.service.ts            # <title> + meta description
pages/                        # accueil, services, univers, service, recherche, devenir-partenaire,
                              # etre-rappele, comment-ca-marche, pourquoi, contact, confidentialite
shared/components/            # header, footer, whatsapp-fab, contact-actions, univers-card,
                              # service-card, question-field, photo, icon
shared/directives/reveal.directive.ts   # apparition au scroll (appReveal)
styles/_tokens.scss           # design tokens
styles.scss                   # styles globaux (boutons, chips, champs, cartes, sections)
```

Les composants dépendent des **classes abstraites** `CatalogueService` / `SubmissionService`, branchées
dans `app.config.ts` (`useClass`). C'est ce qui permettra le passage au backend sans toucher aux pages.

## Design system

Issu d'un handoff Claude Design (« Chaleureux, mais tenu »). Ne jamais mettre de couleur en dur dans un
composant : utiliser les variables de `styles/_tokens.scss`.

- Vert marque `--brand #0E6B52` (survol `--brand-hover #0A5140`), vert nuit `--green-night #08372B`.
- Ambre `--amber #E8891B`, texte sur ambre `--amber-ink #20140A`.
- Fonds sable `--sand #FBF8F3` / `--sand-2 #F5F1E9`, encre `--ink #10211C`.
- Polices **Plus Jakarta Sans** (texte) et **IBM Plex Mono** (micro-labels, référence de demande),
  chargées depuis Google Fonts dans `index.html`.
- Cartes : bordure `1px` sans ombre ; survol = bordure plus foncée + `translateY(-2px)`.

## Contenus et médias

- **Photos** : `frontend/public/images/` (univers en 16/10, hero en 5/6, partenaire en 3/2), photos
  Unsplash libres de droits choisies sans visage. `app-photo` affiche l'image si `src` est renseigné,
  sinon un emplacement rayé. Guide : `frontend/public/images/README.md`.
  Pour télécharger via l'API interne d'Unsplash : ne pas envoyer de User-Agent de navigateur (réponse
  « Authorization required »), et **exclure les résultats `premium`/`plus`** (images filigranées).
- **Icônes** : ajouter un `@case` dans `shared/components/icon/icon.component.ts` (tracé SVG 24×24,
  `currentColor`). Existantes : wrench, sparkles, book, users, truck, briefcase, help, shield-check,
  message, activity, life-buoy, target, check-circle, whatsapp (logo, en `fill`).
- **Nouvelle route univers/service** : l'ajouter aussi dans `frontend/routes.txt` (liste des routes
  paramétrées à prérendre).

## Pièges déjà rencontrés

- `main.server.ts` doit passer le `BootstrapContext` à `bootstrapApplication` (exigence d'Angular 19
  pour le prerender), sinon erreur NG0401.
- Dans le header, le bouton « Devenir partenaire » est aussi un `.hd__nav a` : ses règles sont écrites
  `.hd__nav a.hd__cta…` pour battre la spécificité de `.hd__nav a:hover` (sinon texte vert sur vert).
- Les validateurs custom de formulaire prennent un `AbstractControl`, pas un `FormControl`.
- Budget de style par composant relevé à 8 kB (avertissement) / 16 kB (erreur) dans `angular.json`.

## À faire / pistes

- Renseigner dans `frontend/src/environments/environment.ts` : numéro WhatsApp officiel, téléphone,
  URLs Formspree (actuellement des valeurs d'exemple ; l'envoi échoue tant qu'elles ne sont pas réelles).
- Remplacer les photos Unsplash par de vraies photos de Lubumbashi (mêmes noms de fichiers).
- Vérifier visuellement les dernières icônes et animations (hero animé, badge flottant, logo WhatsApp).
- Optionnel : polices auto-hébergées en WOFF2 (performance), favicon à partir de `logo-symbol.svg`.
- **Lot 2** : backend Spring Boot + SQL Server, back-office (dispatch, missions, tarifs, paiements,
  avis). Créer `HttpCatalogueService` / `HttpSubmissionService` et les brancher dans `app.config.ts`.
