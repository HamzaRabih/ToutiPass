import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-pourquoi',
  standalone: true,
  imports: [RouterLink, RevealDirective, IconComponent],
  template: `
    <section class="page-head">
      <div class="tp-container">
        <span class="pill">Nos engagements</span>
        <h1>Pourquoi ToutiPass</h1>
        <p class="lead">Vos services du quotidien, un seul contact. Pas de liste à éplucher, pas de profils à comparer : une équipe qui connaît ses partenaires et répond de leur travail.</p>
      </div>
    </section>

    <section class="tp-section">
      <div class="tp-container">
        <div class="grid">
          @for (e of engagements; track e.t; let i = $index) {
            <div class="eng tp-card" appReveal [revealDelay]="i * 60">
              <span class="eng__ic" [class.eng__ic--amber]="i === 3"><app-icon [name]="e.ic" [size]="20" /></span>
              <div class="eng__t">{{ e.t }}</div>
              <div class="eng__d">{{ e.d }}</div>
            </div>
          }
        </div>
        <div class="cta" appReveal>
          <a class="tp-btn tp-btn--primary tp-btn--lg" routerLink="/services">Découvrir nos services</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      @media (max-width: 820px) { .grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 460px) { .grid { grid-template-columns: 1fr; } }
      .eng { padding: 24px; }
      .eng__ic {
        display: inline-flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 11px; background: var(--green-pale); color: var(--brand); margin-bottom: 14px;
      }
      .eng__ic--amber { background: var(--amber-pale); color: #9a6a08; }
      .eng__t { font-size: 16.5px; font-weight: 700; margin-bottom: 6px; }
      .eng__d { font-size: 14px; color: var(--muted-2); line-height: 1.5; }
      .cta { text-align: center; margin-top: 28px; }
    `,
  ],
})
export class PourquoiComponent {
  readonly engagements = [
    { ic: 'shield-check', t: 'Partenaires vérifiés', d: 'Identité, compétence et références contrôlées avant toute mission.' },
    { ic: 'message', t: 'Un contact humain', d: 'Une personne vous répond, en français, swahili ou lingala.' },
    { ic: 'activity', t: 'Suivi de bout en bout', d: "Une référence unique par demande, de l'appel à la fin du chantier." },
    { ic: 'life-buoy', t: 'Une solution en cas de souci', d: 'Travail non conforme : on fait reprendre, sans vous renvoyer ailleurs.' },
    { ic: 'target', t: 'Un seul contact', d: 'Un interlocuteur pour de nombreux besoins du quotidien.' },
    { ic: 'check-circle', t: 'Sans engagement', d: "L'estimation est donnée après l'échange, vous décidez ensuite." },
  ];
}
