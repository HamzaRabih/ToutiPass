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
        transition: background 0.15s ease-out, transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
        animation: tp-rise 0.6s 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
      }
      .fab:hover { background: var(--brand-hover); color: #fff; transform: translateY(-3px) scale(1.03); }
      /* Onde qui pulse autour du bouton pour attirer l'œil sans gêner. */
      .fab::before {
        content: ''; position: absolute; inset: 0; border-radius: inherit;
        border: 2px solid var(--brand); pointer-events: none;
        animation: tp-ping 2.8s 2s ease-out infinite;
      }
      .fab__glyph { transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1); }
      .fab:hover .fab__glyph { transform: rotate(-12deg) scale(1.1); }
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
