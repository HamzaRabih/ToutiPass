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
        transition: border-color 0.2s ease-out, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s ease-out;
      }
      .uc:hover { text-decoration: none; border-color: var(--line-field); transform: translateY(-6px); box-shadow: 0 20px 40px rgba(16, 33, 28, 0.12); }
      .uc__media { position: relative; display: block; overflow: hidden; }
      /* Voile dégradé en bas de photo : lisibilité du badge, s'accentue au survol. */
      .uc__media::after {
        content: ''; position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(to top, rgba(8, 55, 43, 0.35), transparent 55%);
        opacity: 0.6; transition: opacity 0.3s ease-out;
      }
      .uc:hover .uc__media::after { opacity: 1; }
      .uc__media app-photo { display: block; }
      .uc__badge {
        position: absolute; left: 14px; bottom: 14px;
        display: inline-flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 12px;
        background: var(--white); color: var(--brand);
        box-shadow: var(--sh-search); z-index: 1;
        transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), background 0.25s ease-out, color 0.25s ease-out;
      }
      .uc:hover .uc__badge { transform: translateY(-4px) rotate(-6deg); background: var(--brand); color: #fff; }
      .uc__nom { transition: color 0.2s ease-out; }
      .uc:hover .uc__nom { color: var(--brand); }
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
