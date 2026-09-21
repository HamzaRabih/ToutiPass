import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogueService } from '../../core/services/catalogue.service';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ServiceCardComponent, IconComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private catalogue = inject(CatalogueService);
  readonly univers$ = this.catalogue.getUnivers();
  readonly concierge$ = this.catalogue.getConcierge();
}
