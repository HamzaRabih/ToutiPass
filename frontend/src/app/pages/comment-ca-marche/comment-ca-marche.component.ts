import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-comment-ca-marche',
  standalone: true,
  imports: [RouterLink, ContactActionsComponent, RevealDirective],
  template: `
    <section class="page-head">
      <div class="tp-container">
        <span class="pill">Simple &amp; rapide</span>
        <h1>Comment ça marche</h1>
        <p class="lead">Un besoin ? ToutiPass s'en occupe, du premier contact au suivi de la prestation. Cinq étapes, un seul interlocuteur.</p>
      </div>
    </section>

    <section class="tp-section">
      <div class="tp-container">
        <div class="etapes">
          @for (s of etapes; track s.n; let i = $index) {
            <div class="etape" [class.etape--first]="i === 0" appReveal revealFrom="left" [revealDelay]="i * 120">
              <div class="etape__n">{{ s.n }}</div>
              <div>
                <div class="etape__t">{{ s.titre }}</div>
                <div class="etape__d">{{ s.desc }}</div>
              </div>
            </div>
          }
        </div>

        <div class="aide" appReveal>
          <p><strong>Prêt à commencer ?</strong> Décrivez votre besoin, on prend le relais.</p>
          <div class="aide__btns">
            <a class="tp-btn tp-btn--primary" routerLink="/services">Voir les services</a>
          </div>
          <app-contact-actions />
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .etapes { display: flex; flex-direction: column; gap: 4px; margin-bottom: 32px; }
      .etape { display: flex; gap: 20px; align-items: flex-start; padding: 22px 0; border-top: 1px solid var(--line-2); }
      .etape:first-child { border-top: 0; }
      .etape__n {
        font-family: var(--mono); font-size: 22px; font-weight: 500; color: var(--muted-3);
        min-width: 48px; flex: 0 0 auto;
      }
      .etape--first .etape__n { color: var(--brand); }
      .etape__n { transition: color 0.3s ease-out, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1); }
      .etape:hover .etape__n { color: var(--amber); transform: translateX(6px) scale(1.1); }
      .etape__t { font-size: 19px; font-weight: 700; margin-bottom: 6px; }
      .etape__d { font-size: 15.5px; color: var(--muted); line-height: 1.6; max-width: 60ch; }
      .aide__btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
    `,
  ],
})
export class CommentCaMarcheComponent {
  readonly etapes = [
    { n: '01', titre: 'Vous décrivez', desc: 'Choisissez le service et expliquez votre besoin en deux phrases, sur le site ou directement sur WhatsApp.' },
    { n: '02', titre: 'On qualifie', desc: 'Un conseiller vous rappelle pour préciser le besoin, le quartier et le créneau.' },
    { n: '03', titre: 'On affecte', desc: "Nous choisissons le partenaire vérifié adapté. Vous n'avez rien à comparer." },
    { n: '04', titre: 'La prestation', desc: 'Le partenaire intervient au créneau convenu, sous le suivi de ToutiPass.' },
    { n: '05', titre: 'On vérifie', desc: 'Un retour après intervention. En cas de souci, nous reprenons la main.' },
  ];
}
