import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DemandePayload } from '../models/submission.model';

/**
 * Construit les liens WhatsApp (wa.me) avec message prérempli (§5.2, §15.3).
 * Aucun appel réseau : WhatsApp reste le canal conversationnel (pas d'API en V1).
 */
@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly numero = environment.whatsappNumber;

  /** Lien WhatsApp générique (message d'accueil, §15.3). */
  lienAccueil(): string {
    const message =
      'Bonjour ToutiPass. Je souhaite parler de mon besoin avec un conseiller.';
    return this.build(message);
  }

  /** Lien WhatsApp prérempli à partir d'une demande qualifiée. */
  lienDemande(demande: DemandePayload): string {
    const resume = demande.reponses
      .map((r) => `${r.question} : ${Array.isArray(r.valeur) ? r.valeur.join(', ') : r.valeur}`)
      .filter((l) => l.trim().length > 0)
      .join('\n');

    const message = [
      `Bonjour ToutiPass. Ma demande ${demande.reference} concerne « ${demande.serviceNom} » à ${demande.ville}.`,
      resume,
      'Je souhaite continuer avec un conseiller.',
    ]
      .filter(Boolean)
      .join('\n');

    return this.build(message);
  }

  private build(message: string): string {
    return `https://wa.me/${this.numero}?text=${encodeURIComponent(message)}`;
  }
}
