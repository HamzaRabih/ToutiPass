import { Component, ElementRef, NgZone, OnDestroy, ViewChild, afterNextRender, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CatalogueService } from '../../core/services/catalogue.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { UniversCardComponent } from '../../shared/components/univers-card/univers-card.component';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    RouterLink,
    UniversCardComponent,
    ContactActionsComponent,
    PhotoComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent implements OnDestroy {
  private catalogue = inject(CatalogueService);
  private router = inject(Router);

  readonly univers$ = this.catalogue.getUnivers();
  /** Bandeau défilant : tous les services, avec l'icône de leur univers. */
  readonly bandeau$ = this.univers$.pipe(
    map((us) => us.flatMap((u) => u.services.filter((s) => s.visible !== false).map((s) => ({ nom: s.nom, ic: u.iconName ?? 'help' })))),
  );
  readonly concierge$ = this.catalogue.getConcierge();
  readonly lienWhatsapp = inject(WhatsappService).lienAccueil();

  terme = '';

  @ViewChild('champ') private champ?: ElementRef<HTMLInputElement>;
  private zone = inject(NgZone);
  private timer?: ReturnType<typeof setTimeout>;

  /** Exemples tapés un à un dans le champ de recherche (effet machine à écrire). */
  private readonly exemples = [
    "fuite sous l'évier",
    'cours de maths pour mon fils',
    'ménage complet de la maison',
    'déménagement ce samedi',
    'installer une prise électrique',
    'déclaration fiscale',
  ];

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      // Hors zone Angular : l'animation ne déclenche aucune détection de changement.
      this.zone.runOutsideAngular(() => this.ecrire(0, 0, false));
    });
  }

  private ecrire(i: number, n: number, efface: boolean): void {
    const input = this.champ?.nativeElement;
    if (!input) {
      return;
    }
    const texte = this.exemples[i];
    let delai = efface ? 28 : 65;
    if (!efface && n > texte.length) {
      efface = true;
      delai = 1700;
    } else if (efface && n < 0) {
      efface = false;
      i = (i + 1) % this.exemples.length;
      n = 0;
      delai = 350;
    } else {
      input.placeholder = `Ex. « ${texte.slice(0, n)} »`;
      n += efface ? -1 : 1;
    }
    this.timer = setTimeout(() => this.ecrire(i, n, efface), delai);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  readonly etapes = [
    { n: '01', titre: 'Vous décrivez', desc: 'Par le site ou directement sur WhatsApp, en deux phrases.' },
    { n: '02', titre: 'On qualifie', desc: 'Un conseiller vous rappelle pour préciser le besoin et le créneau.' },
    { n: '03', titre: 'On affecte', desc: "Nous choisissons le partenaire vérifié adapté. Vous n'avez rien à comparer." },
    { n: '04', titre: 'La prestation', desc: 'Le partenaire intervient au créneau convenu, sous notre suivi.' },
    { n: '05', titre: 'On vérifie', desc: 'Un retour après intervention. En cas de souci, on reprend la main.' },
  ];

  readonly engagements = [
    { ic: 'shield-check', t: 'Partenaires vérifiés', d: 'Identité, compétence et références contrôlées avant toute mission.' },
    { ic: 'message', t: 'Un contact humain', d: 'Une personne vous répond, en français, swahili ou lingala.' },
    { ic: 'activity', t: 'Suivi de bout en bout', d: "Une référence unique par demande, de l'appel à la fin du chantier." },
    { ic: 'life-buoy', t: 'Une solution en cas de souci', d: 'Travail non conforme : on fait reprendre, sans vous renvoyer ailleurs.' },
  ];

  rechercher(): void {
    const q = this.terme.trim();
    this.router.navigate(['/recherche'], { queryParams: q ? { q } : {} });
  }
}
