import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogueService } from '../../core/services/catalogue.service';
import { Service } from '../../core/models/catalogue.model';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [FormsModule, RouterLink, ServiceCardComponent, ContactActionsComponent],
  templateUrl: './recherche.component.html',
})
export class RechercheComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogue = inject(CatalogueService);

  terme = '';
  readonly resultats = signal<Service[]>([]);
  readonly rechercheFaite = signal(false);

  constructor() {
    this.route.queryParamMap.subscribe((p) => {
      this.terme = p.get('q') ?? '';
      this.lancer();
    });
  }

  soumettre(): void {
    this.router.navigate([], { queryParams: { q: this.terme.trim() || null } });
  }

  private lancer(): void {
    const q = this.terme.trim();
    if (!q) {
      this.resultats.set([]);
      this.rechercheFaite.set(false);
      return;
    }
    this.catalogue.search(q).subscribe((r) => {
      this.resultats.set(r);
      this.rechercheFaite.set(true);
    });
  }
}
