import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { CatalogueService } from '../../core/services/catalogue.service';
import { SeoService } from '../../core/services/seo.service';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-univers',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ServiceCardComponent, ContactActionsComponent, IconComponent],
  templateUrl: './univers.component.html',
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
