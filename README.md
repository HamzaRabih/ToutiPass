# ToutiPass — Vitrine (MVP statique)

Conciergerie digitale multiservices, **mobile-first**, pilote **Lubumbashi (RDC)**.
Le client décrit un besoin ; l'équipe ToutiPass qualifie, affecte un partenaire et suit la
mission **en interne**. Ce n'est **pas** une marketplace : aucun prix ni profil de partenaire
public en V1.

Ce dépôt contient le **lot 1 : la vitrine publique, 100 % statique (sans backend)**.
Les formulaires sont envoyés via **Formspree**. Le code est organisé pour une migration
dynamique ultérieure (lot 2 : backend Spring Boot + SQL Server).

## Stack

- **Angular 19** (standalone, control flow), prerendering pour le SEO, **PWA**.
- SCSS avec design tokens (thème vert/ambre + Segoe UI).
- Aucune dépendance serveur en production : on déploie le dossier statique prérendu.

> Note : le projet a été scaffoldé avec le CLI Angular mais les paquets installés sont en
> Angular 19.x. Tout le code est compatible.

## Démarrer

```bash
cd frontend
npm install        # si nécessaire
npm start          # dev server : http://localhost:4200
```

## Build statique (livrable)

```bash
cd frontend
npm run build      # génère dist/frontend/browser (HTML prérendu par route)
```

Déployer le contenu de `dist/frontend/browser/` sur n'importe quel hébergement statique
(Nginx, Netlify, GitHub Pages…). Configurer un **fallback SPA** vers `index.html` pour les
routes non prérendues (recherche avec paramètres, etc.).

Les routes univers/service à prérendre pour le SEO sont listées dans `frontend/routes.txt`.

## Configuration (à renseigner par le client)

Tout est centralisé dans `frontend/src/environments/environment.ts` :

- `whatsappNumber` / `telAffiche` / `telLien` : numéro WhatsApp et téléphone officiels.
- `formspree.demande` / `formspree.partenaire` / `formspree.rappel` : endpoints Formspree
  (créer les formulaires sur https://formspree.io et coller les URLs).
- `ville` / `villeCode` : ville pilote (utilisée dans les références et messages).

## Structure

```
frontend/src/app/
  core/
    data/catalogue.data.ts        # catalogue (univers/services/questions) — éditable sans recoder
    models/                       # types partagés (réutilisés par le futur backend)
    services/
      catalogue.service.ts        # CatalogueService (abstrait) + StaticCatalogueService
      submission.service.ts       # SubmissionService (abstrait) + FormspreeSubmissionService
      whatsapp.service.ts         # liens wa.me préremplis
      reference.service.ts        # génération des références TP-LUB-AAAA-XXXXXX
      seo.service.ts              # <title> + meta description
  pages/                          # accueil, univers, service, recherche, devenir-partenaire, …
  shared/components/              # header, footer, cartes, whatsapp-fab, question-field, …
  styles/_tokens.scss             # design tokens (couleurs/typo du thème)
```

## Migration vers le backend (lot 2)

L'accès aux données et l'envoi des formulaires passent par des **classes abstraites**
(`CatalogueService`, `SubmissionService`). Pour brancher un backend :

1. Créer `HttpCatalogueService` (GET `/api/catalogue`) et `HttpSubmissionService`
   (POST `/api/demandes`, `/api/partenaires/candidatures`, `/api/rappels`).
2. Remplacer les `useClass` dans `frontend/src/app/app.config.ts`.

Les composants restent inchangés (ils dépendent des classes abstraites et d'`Observable`).
Les modèles de `core/models/` définissent le contrat que le backend devra respecter.

## Périmètre

- **Inclus (lot 1)** : accueil, catalogue hiérarchique (univers → services), recherche,
  qualification (2–5 questions), référence unique, bascule WhatsApp/appel/rappel préremplie,
  formulaire « Devenir partenaire », pages éditoriales, SEO local, PWA.
- **Reporté (lot 2)** : back-office/CMS, dispatch, missions, tarifs, paiements, avis &
  réclamations, notifications, API WhatsApp Business.
