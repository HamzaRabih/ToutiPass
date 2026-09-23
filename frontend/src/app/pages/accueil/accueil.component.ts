import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
export class AccueilComponent implements OnInit, OnDestroy {
  private catalogue = inject(CatalogueService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  readonly univers$ = this.catalogue.getUnivers();
  readonly concierge$ = this.catalogue.getConcierge();
  readonly lienWhatsapp = inject(WhatsappService).lienAccueil();

  terme = '';

  /**
   * Exemples qui défilent dans le champ de recherche : le hero « vit » et
   * l'utilisateur comprend en deux secondes ce qu'il peut demander.
   * Le premier sert de valeur rendue au prerender (SSR) puis en cas de
   * prefers-reduced-motion, où la rotation ne démarre pas.
   */
  private readonly exemples = [
    'Ex. « fuite sous l’évier »…',
    'Ex. « cours de maths en 3e »…',
    'Ex. « ménage hebdomadaire »…',
    'Ex. « déménagement samedi »…',
    'Ex. « panne de climatiseur »…',
    'Ex. « garde d’enfants le soir »…',
  ];
  readonly placeholder = signal(this.exemples[0]);
  private rotation?: ReturnType<typeof setInterval>;
  private indexExemple = 0;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // Respecte le choix système : pas de rotation si l'utilisateur a demandé
    // moins d'animations (le CSS ne peut pas neutraliser un texte qui change).
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.rotation = setInterval(() => {
      this.indexExemple = (this.indexExemple + 1) % this.exemples.length;
      this.placeholder.set(this.exemples[this.indexExemple]);
    }, 3200);
  }

  ngOnDestroy(): void {
    if (this.rotation) {
      clearInterval(this.rotation);
    }
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
