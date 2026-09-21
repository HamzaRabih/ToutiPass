import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Génère les références de demande (§5.3).
 *
 * Format : TP-{VILLE}-{ANNEE}-{CODE}.  En MVP statique, le CODE est généré
 * côté client (base36 du temps + aléatoire) car aucune séquence serveur n'existe.
 * Au lot 2, le backend produira la numérotation séquentielle officielle (000127).
 */
@Injectable({ providedIn: 'root' })
export class ReferenceService {
  generate(): string {
    const annee = new Date().getFullYear();
    const code = this.randomCode();
    return `TP-${environment.villeCode}-${annee}-${code}`;
  }

  private randomCode(): string {
    const base = Date.now().toString(36).slice(-4).toUpperCase();
    const rand = Math.floor(Math.random() * 36 * 36)
      .toString(36)
      .padStart(2, '0')
      .toUpperCase();
    return `${base}${rand}`;
  }
}
