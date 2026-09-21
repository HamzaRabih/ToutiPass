import { Component } from '@angular/core';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactActionsComponent],
  template: `
    <section class="page-head">
      <div class="tp-container">
        <span class="pill">On répond de 7 h à 21 h · 7j/7</span>
        <h1>Contact</h1>
        <p class="lead">Un humain reste joignable à tout moment. Écrivez, appelez, ou demandez à être rappelé.</p>
      </div>
    </section>

    <section class="tp-section">
      <div class="tp-container">
        <div class="form-card tp-card">
          <app-contact-actions layout="stack" />

          <div class="infos">
            <p><strong>Téléphone :</strong> <a [href]="'tel:' + telLien">{{ tel }}</a></p>
            <p><strong>Zone :</strong> {{ ville }}, République Démocratique du Congo</p>
          </div>

          <div class="tp-alert tp-alert--info">
            ToutiPass vous accueille en français et, selon les besoins et disponibilités, dans les
            langues nationales et locales pratiquées en RDC ainsi que dans plusieurs langues
            internationales. Indiquez-nous la langue dans laquelle vous souhaitez échanger.
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .infos { margin: 18px 0; }
      .infos p { margin: 4px 0; }
    `,
  ],
})
export class ContactComponent {
  readonly ville = environment.ville;
  readonly tel = environment.telAffiche;
  readonly telLien = environment.telLien;
}
