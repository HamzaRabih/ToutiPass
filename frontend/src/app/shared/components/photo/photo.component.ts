import { Component, Input } from '@angular/core';

/**
 * Emplacement / photo.
 *
 * - Sans `src` : affiche l'emplacement rayé beige + un label mono décrivant la
 *   photo attendue (comportement du handoff, aucune image fournie).
 * - Avec `src` : affiche la vraie image (WebP recommandé), en `object-fit: cover`,
 *   `loading="lazy"`, avec `srcset`/`sizes` optionnels. Le fond rayé reste visible
 *   le temps du chargement.
 *
 * Pour intégrer une photo : déposer le fichier dans `public/images/…`, puis passer
 * son chemin en `src` (ex. depuis la donnée catalogue `univers.image`).
 */
@Component({
  selector: 'app-photo',
  standalone: true,
  template: `
    <div class="photo" [class.photo--kenburns]="effet === 'kenburns'" [style.aspectRatio]="ratio" [style.borderRadius]="radius">
      @if (src) {
        <img
          class="photo__img"
          [src]="src"
          [attr.srcset]="srcset || null"
          [attr.sizes]="sizes || null"
          [alt]="alt"
          loading="lazy"
          decoding="async"
        />
      } @else if (label) {
        <span class="photo__label" [class.photo__label--plain]="plain">{{ label }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .photo { position: relative; width: 100%; height: 100%; }
      .photo__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
      .photo__label--plain { background: transparent; border: 0; padding: 0; }

      /* Ken Burns : zoom/panoramique très lent. L'image « respire » sans un octet
         de plus (transform seul = composité par le GPU, aucun repaint).
         Neutralisé globalement par prefers-reduced-motion dans styles.scss. */
      .photo--kenburns { overflow: hidden; }
      .photo--kenburns .photo__img {
        animation: tp-kenburns 24s ease-in-out infinite alternate;
        will-change: transform;
      }
      @keyframes tp-kenburns {
        from { transform: scale(1) translate3d(0, 0, 0); }
        to   { transform: scale(1.08) translate3d(-1.5%, -1.5%, 0); }
      }
    `,
  ],
})
export class PhotoComponent {
  @Input() ratio = '16 / 10';
  @Input() radius = '0';
  @Input() label = '';
  /** Chemin de l'image réelle (ex. 'images/univers/maison.webp'). Vide = emplacement. */
  @Input() src = '';
  @Input() srcset = '';
  @Input() sizes = '';
  @Input() alt = '';
  /** true : label discret sans encadré (cartes univers). */
  @Input() plain = false;
  /** 'kenburns' : zoom lent et continu sur l'image (hero). Vide = image fixe. */
  @Input() effet: '' | 'kenburns' = '';
}
