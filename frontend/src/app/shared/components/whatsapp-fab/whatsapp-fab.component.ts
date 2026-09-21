import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [IconComponent],
  template: `
    <a class="fab" [href]="lien" target="_blank" rel="noopener" aria-label="Écrire à ToutiPass sur WhatsApp">
      <app-icon class="fab__glyph" name="whatsapp" [size]="26" />
      <span class="fab__label">WhatsApp</span>
    </a>
  `,
  styles: [
    `
      .fab {
        position: fixed; right: 28px; bottom: 28px; z-index: 50;
        display: inline-flex; align-items: center; gap: 12px;
        height: 60px; padding: 0 24px 0 20px;
        background: var(--brand); color: #fff;
        border-radius: 999px; box-shadow: var(--sh-fab);
        font-weight: 700; font-size: 16px;
        transition: background 0.15s ease-out;
      }
      .fab:hover { background: var(--brand-hover); color: #fff; }
      .fab__glyph { color: #fff; display: inline-flex; }
      @media (max-width: 520px) {
        .fab { right: 18px; bottom: 18px; height: 56px; padding: 0; width: 56px; justify-content: center; box-shadow: 0 8px 22px rgba(8, 55, 43, 0.32); }
        .fab__label { display: none; }
      }
    `,
  ],
})
export class WhatsappFabComponent {
  readonly lien = inject(WhatsappService).lienAccueil();
}
