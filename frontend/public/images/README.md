# Photos ToutiPass

Photos actuelles : **Unsplash** (licence Unsplash, usage commercial libre, attribution non
obligatoire), choisies **sans visage** (mains, dos, objets, silhouettes lointaines).
À remplacer à terme par de vraies photos de Lubumbashi, **en gardant les mêmes noms de fichiers**.

Ne jamais utiliser d'image **Unsplash+** (filigrane « Unsplash+ », payante) ni d'image trouvée
sur Google / banques payantes sans licence.

## Fichiers et crédits

| Fichier | Format | Sujet | Auteur Unsplash (id) |
|---|---|---|---|
| `hero.jpg` | 1000×1200 (5/6) | Artisan, ceinture à outils et visseuse | James Kovin (`YQGPSblLPz0`) |
| `partenaire.jpg` | 1080×720 (3/2) | Mains avec clé, mur d'outils | Anton Savinov (`Cx5Lk7Rv-vE`) |
| `univers/maison-travaux.jpg` | 960×600 (16/10) | Électricien de dos, tableau électrique | Raze Solar (`S5uFiFBeq4s`) |
| `univers/menage-entretien.jpg` | 960×600 | Nettoyage de sol professionnel | Toon Lambrechts (`0FTI9ceTUOc`) |
| `univers/cours-education.jpg` | 960×600 | Élève de dos, cahier d'exercices | Annie Spratt (`JexAuNCfefs`) |
| `univers/enfants-famille.jpg` | 960×600 | Mains d'enfant qui colorient | Lucas Alexander (`sJuDgtkUyYs`) |
| `univers/transport-logistique.jpg` | 960×600 | Livraison de cartons, camionnette | Richard Stachmann (`GgmZ23grWNY`) |
| `univers/services-professionnels.jpg` | 960×600 | Mains, calculatrice et documents | Jakub Żerdzicki (`LNnmSumlwO4`) |

Page d'une photo : `https://unsplash.com/photos/<id>`.

## Remplacer une photo

1. Recadrer au format indiqué (même ratio), JPEG qualité ~78 ou WebP, **< 150 Ko** si possible.
2. Écraser le fichier du même nom. Rien d'autre à modifier.
3. Pour un nouvel univers : déposer `univers/<slug>.jpg` et renseigner `image` dans
   `src/app/core/data/catalogue.data.ts`.

Le composant `app-photo` affiche un emplacement rayé tant qu'aucune image n'est fournie
(`src` vide). `[kenBurns]="true"` ajoute un zoom lent en boucle (hero, en-têtes, partenaire).
