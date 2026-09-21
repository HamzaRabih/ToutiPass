import { Component } from '@angular/core';

@Component({
  selector: 'app-confidentialite',
  standalone: true,
  template: `
    <section class="page-head">
      <div class="tp-container">
        <h1>Confidentialité &amp; consentement</h1>
        <p class="lead">Nous ne collectons que les données nécessaires pour traiter votre demande.</p>
      </div>
    </section>

    <section class="tp-section">
      <div class="tp-container prose">
        <h2>Données collectées</h2>
        <p>
          Lorsque vous soumettez une demande de service, une candidature partenaire ou une demande
          de rappel, nous recueillons les informations que vous saisissez (nom, téléphone, nature
          du besoin, etc.) afin de vous recontacter et d'organiser la prestation.
        </p>

        <h2>Traitement des formulaires</h2>
        <p>
          Dans cette version, l'envoi des formulaires est assuré par un prestataire technique tiers
          (service de transmission de formulaires) qui achemine votre message à l'équipe ToutiPass.
          Vos informations ne sont utilisées que pour le traitement de votre demande.
        </p>

        <h2>Consentement</h2>
        <p>
          En envoyant un formulaire, vous autorisez ToutiPass à vous recontacter et à traiter les
          informations fournies. Vous pouvez à tout moment demander l'accès, la correction ou la
          suppression de vos données en nous contactant.
        </p>

        <h2>Conservation</h2>
        <p>
          Les données sont conservées le temps nécessaire au traitement de votre demande et au suivi
          de la relation, puis supprimées ou anonymisées.
        </p>

        <p class="note">
          Ce texte est un modèle de base à faire valider et compléter selon la réglementation
          applicable avant la mise en production.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .note { color: var(--muted-line); font-size: 0.9rem; font-style: italic; }
    `,
  ],
})
export class ConfidentialiteComponent {}
