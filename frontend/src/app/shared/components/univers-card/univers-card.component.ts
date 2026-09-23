import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Univers } from '../../../core/models/catalogue.model';
import { PhotoComponent } from '../photo/photo.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-univers-card',
  standalone: true,
  imports: [RouterLink, PhotoComponent, IconComponent],
  template: `
    <a class="uc" [routerLink]="['/univers', univers.slug]">
      <span class="uc__media">
        <app-photo
          ratio="16 / 10"
          [src]="univers.image || ''"
          [alt]="univers.imageAlt || univers.nom"
          [label]="'photo · ' + court"
          [plain]="true"
        />
        @if (univers.iconName) {
          <span class="uc__badge"><app-icon [name]="univers.iconName" [size]="22" /></span>
        }
      </span>
      <span class="uc__body">
        <span class="uc__nom">{{ univers.nom }}</span>
        @if (univers.tagline) { <span class="uc__desc">{{ univers.tagline }}</span> }
      </span>
    </a>
  `,
  styles: [
    `
      .uc {
        display: block; overflow: hidden; color: var(--ink);
        background: var(--white); border: 1px solid var(--line-card); border-radius: var(--r-card);
        transition: border-color 0.15s ease-out, transform 0.15s ease-out;
      }
      .uc:hover { text-decoration: none; border-color: var(--line-field); transform: translateY(-2px); }
      /* overflow:hidden indispensable : sans lui, l'image zoomée déborde sur le texte. */
      .uc__media { position: relative; display: block; overflow: hidden; }
      .uc__media app-photo { display: block; }

      /* Zoom lent de la photo au survol. transform seul => animé par le GPU.
         La carte garde bordure + translateY(-2px) sans ombre (design system). */
      .uc ::ng-deep .photo__img {
        transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
      }
      .uc:hover ::ng-deep .photo__img { transform: scale(1.07); }

      /* Voile dégradé qui monte au survol : ancre le badge et donne du relief. */
      .uc__media::after {
        content: ''; position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(to top, rgba(8, 55, 43, 0.38), rgba(8, 55, 43, 0) 55%);
        opacity: 0; transition: opacity 0.35s ease-out;
      }
      .uc:hover .uc__media::after { opacity: 1; }
      .uc__badge {
        position: absolute; left: 14px; bottom: 14px; z-index: 1;
        display: inline-flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 12px;
        background: var(--white); color: var(--brand);
        box-shadow: var(--sh-search);
      }
      .uc__body { display: block; padding: 18px 20px 20px; }
      .uc__nom { display: block; font-size: 17px; font-weight: 700; margin-bottom: 6px; color: var(--ink); }
      .uc__desc { display: block; font-size: 14px; color: var(--muted-2); line-height: 1.5; }
    `,
  ],
})
export class UniversCardComponent {
  @Input({ required: true }) univers!: Univers;

  get court(): string {
    return this.univers.nom.split(/\s|&/)[0].toLowerCase();
  }
}
