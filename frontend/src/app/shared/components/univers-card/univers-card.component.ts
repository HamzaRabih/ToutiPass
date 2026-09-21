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
      .uc__media { position: relative; display: block; }
      .uc__media app-photo { display: block; }
      .uc__badge {
        position: absolute; left: 14px; bottom: 14px;
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
