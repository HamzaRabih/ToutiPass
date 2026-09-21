import { Component, Input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { IconComponent } from '../icon/icon.component';
import { environment } from '../../../../environments/environment';

/**
 * Trois accès humains (§5.2 CDC) : WhatsApp / Être rappelé / Appeler.
 * Décliné selon le contexte du design (hero, carte contact, panneau sombre…).
 */
@Component({
  selector: 'app-contact-actions',
  standalone: true,
  imports: [NgClass, RouterLink, IconComponent],
  template: `
    <div class="ca" [class.ca--stack]="layout === 'stack'">
      <a
        class="tp-btn ca__primary"
        [ngClass]="'tp-btn--' + primaryVariant"
        [href]="lienWhatsapp"
        target="_blank"
        rel="noopener"
      >
        <app-icon name="whatsapp" [size]="20" />
        {{ primaryLabel }}
      </a>
      <div class="ca__secondary">
        <a class="tp-btn" [ngClass]="onDark ? 'tp-btn--outline-light' : 'tp-btn--outline'" routerLink="/etre-rappele">Être rappelé</a>
        <a class="tp-btn" [ngClass]="onDark ? 'tp-btn--outline-light' : 'tp-btn--outline'" [href]="'tel:' + telLien">Appeler</a>
      </div>
    </div>
  `,
  styles: [
    `
      .ca { display: flex; flex-wrap: wrap; gap: 10px; }
      .ca .tp-btn { flex: 1 1 auto; }
      .ca__secondary { display: contents; }

      .ca--stack { flex-direction: column; }
      .ca--stack .ca__primary { width: 100%; }
      .ca--stack .ca__secondary { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .ca--stack .ca__secondary .tp-btn { width: 100%; }
    `,
  ],
})
export class ContactActionsComponent {
  /** 'row' : trois boutons alignés (hero). 'stack' : primaire pleine largeur + 2 colonnes. */
  @Input() layout: 'row' | 'stack' = 'row';
  @Input() primaryLabel = 'Écrire sur WhatsApp';
  @Input() primaryVariant: 'brand' | 'dark' | 'amber' = 'brand';
  /** true dans un panneau sombre (boutons secondaires en contour clair). */
  @Input() onDark = false;
  @Input() lienWhatsapp: string = inject(WhatsappService).lienAccueil();

  readonly telLien = environment.telLien;
}
