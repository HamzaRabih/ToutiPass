import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, Univers } from '../models/catalogue.model';
import { CATALOGUE, DEFAULT_QUESTIONS } from '../data/catalogue.data';

/**
 * Contrat d'accès au catalogue.
 *
 * L'implémentation actuelle (StaticCatalogueService) lit des données locales.
 * Au lot 2, une HttpCatalogueService appellera GET /api/catalogue — les composants
 * n'ont pas à changer car ils dépendent de cette classe abstraite et d'Observables.
 */
export abstract class CatalogueService {
  /** Univers visibles, hors Concierge, triés. */
  abstract getUnivers(): Observable<Univers[]>;
  /** L'entrée Concierge (« Je ne trouve pas mon besoin »). */
  abstract getConcierge(): Observable<Univers | undefined>;
  abstract getUniversBySlug(slug: string): Observable<Univers | undefined>;
  /** Un service par son slug, questions par défaut appliquées si nécessaire. */
  abstract getService(slug: string): Observable<Service | undefined>;
  /** Tous les services visibles (pour la recherche et les pages SEO). */
  abstract getAllServices(): Observable<Service[]>;
  /** Recherche plein-texte simple sur les libellés. */
  abstract search(terme: string): Observable<Service[]>;
}

@Injectable()
export class StaticCatalogueService extends CatalogueService {
  private readonly univers = CATALOGUE.filter((u) => u.visible !== false);

  getUnivers(): Observable<Univers[]> {
    return of(
      this.univers
        .filter((u) => !u.isConcierge)
        .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0)),
    );
  }

  getConcierge(): Observable<Univers | undefined> {
    return of(this.univers.find((u) => u.isConcierge));
  }

  getUniversBySlug(slug: string): Observable<Univers | undefined> {
    return of(this.univers.find((u) => u.slug === slug));
  }

  getService(slug: string): Observable<Service | undefined> {
    // Cherche dans tous les univers (Concierge inclus).
    const service = this.univers.flatMap((u) => u.services).find((s) => s.slug === slug);
    if (service && (!service.questions || service.questions.length === 0)) {
      return of({ ...service, questions: DEFAULT_QUESTIONS });
    }
    return of(service);
  }

  getAllServices(): Observable<Service[]> {
    return of(this.allVisibleServices());
  }

  search(terme: string): Observable<Service[]> {
    const q = terme.trim().toLowerCase();
    if (!q) {
      return of([]);
    }
    return of(
      this.allVisibleServices().filter(
        (s) =>
          s.nom.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      ),
    );
  }

  private allVisibleServices(): Service[] {
    return this.univers
      .filter((u) => !u.isConcierge)
      .flatMap((u) => u.services)
      .filter((s) => s.visible !== false);
  }
}
