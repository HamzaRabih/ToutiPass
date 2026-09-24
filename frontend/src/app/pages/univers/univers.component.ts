import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { CatalogueService } from '../../core/services/catalogue.service';
import { SeoService } from '../../core/services/seo.service';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-univers',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ServiceCardComponent, ContactActionsComponent, IconComponent, PhotoComponent, RevealDirective],
  templateUrl: './univers.component.html',
  styles: [
    `
      .uh { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; }
      .uh__photo { animation: tp-rise-right 0.9s 0.1s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
      .uh__photo app-photo { display: block; box-shadow: var(--sh-float); border-radius: 18px; }
      @media (max-width: 820px) { .uh { grid-template-columns: 1fr; gap: 22px; } }
    `,
  ],
})
export class UniversComponent {
  private route = inject(ActivatedRoute);
  private catalogue = inject(CatalogueService);
  private seo = inject(SeoService);

  readonly univers$ = this.route.paramMap.pipe(
    map((p) => p.get('slug') ?? ''),
    switchMap((slug) => this.catalogue.getUniversBySlug(slug)),
    tap((u) => {
      if (u) {
        this.seo.set(
          `${u.nom} à Lubumbashi — ToutiPass`,
          `${u.nom} : ${u.tagline ?? ''} ToutiPass sélectionne un partenaire vérifié pour votre besoin à Lubumbashi.`,
        );
      }
    }),
  );
}
