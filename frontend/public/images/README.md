# Photos ToutiPass — où les déposer

Le site affiche des **emplacements rayés** tant qu'aucune photo n'est fournie.
Pour afficher une vraie photo : déposez le fichier ici puis renseignez son chemin
dans la donnée correspondante (voir plus bas). Aucune image cassée ne s'affiche
si le fichier est absent.

## Style attendu (cahier des charges)
Intérieurs et rues d'aujourd'hui à Lubumbashi, lumière naturelle, gestes de métier
cadrés serré. **Pas** de motif folklorique, pas de drapeau, pas de banque d'images
générique.

## Format
- **WebP** de préférence, `loading="lazy"` (déjà géré par le composant `app-photo`).
- Fournir idéalement plusieurs largeurs (400 / 800 / 1200 px) pour `srcset`.

## Images attendues

### Univers (cartes de l'accueil) — ratio 16/10, ~800×500
Déposer dans `images/univers/` avec le nom du slug, puis, dans
`src/app/core/data/catalogue.data.ts`, ajouter `image: 'images/univers/<slug>.webp'`
à l'univers concerné.

| Fichier | Univers |
|---|---|
| `images/univers/maison-travaux.webp` | Maison & Travaux |
| `images/univers/menage-entretien.webp` | Ménage & Entretien |
| `images/univers/cours-education.webp` | Cours & Éducation |
| `images/univers/enfants-famille.webp` | Enfants & Famille |
| `images/univers/beaute-bien-etre.webp` | Beauté & Bien-être |
| `images/univers/transport-logistique.webp` | Transport & Logistique |
| `images/univers/loisirs-evenements.webp` | Loisirs & Événements |
| `images/univers/services-professionnels.webp` | Services professionnels |

### Hero (accueil) — ratio 5/6, ~1000×1200
`images/hero.webp` — artisan chez un client. À référencer dans
`accueil.component.html` (`<app-photo … [src]="'images/hero.webp'">`).

### Partenaire — ratio 3/2, ~900×600
`images/partenaire.webp` — partenaire au travail. À référencer dans
`devenir-partenaire.component.html`.
