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
        transition: background 0.15s ease-out, transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
      }
      .fab:hover { background: var(--brand-hover); color: #fff; transform: translateY(-2px) scale(1.03); }
      .fab:active { transform: translateY(0) scale(0.98); }

      /* Onde de pulsation : rappelle le bouton sans l'agiter en continu.
         Le cycle de 8 s laisse ~7 s de calme entre deux ondes. */
      .fab::before {
        content: ''; position: absolute; inset: 0; z-index: -1;
        border-radius: inherit; background: var(--brand);
        animation: tp-fab-pulse 8s ease-out infinite;
      }
      @keyframes tp-fab-pulse {
        0%        { transform: scale(1);    opacity: 0.55; }
        12%, 100% { transform: scale(1.38); opacity: 0; }
      }
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
