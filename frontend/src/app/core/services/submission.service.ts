import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CandidaturePayload,
  DemandePayload,
  RappelPayload,
  SubmissionResult,
} from '../models/submission.model';

/**
 * Contrat d'envoi des soumissions (demandes, candidatures, rappels).
 *
 * Implémentation actuelle : FormspreeSubmissionService (POST vers Formspree).
 * Au lot 2 : HttpSubmissionService (POST /api/demandes, etc.) — même contrat,
 * les composants ne changent pas.
 */
export abstract class SubmissionService {
  abstract submitDemande(payload: DemandePayload): Observable<SubmissionResult>;
  abstract submitCandidature(payload: CandidaturePayload): Observable<SubmissionResult>;
  abstract submitRappel(payload: RappelPayload): Observable<SubmissionResult>;
}

@Injectable()
export class FormspreeSubmissionService extends SubmissionService {
  constructor(private http: HttpClient) {
    super();
  }

  submitDemande(payload: DemandePayload): Observable<SubmissionResult> {
    return this.post(environment.formspree.demande, {
      _subject: `Nouvelle demande ${payload.reference}`,
      ...payload,
      // Formspree n'aplatit pas les objets : on envoie aussi une version lisible.
      resume: this.resumeReponses(payload),
    });
  }

  submitCandidature(payload: CandidaturePayload): Observable<SubmissionResult> {
    return this.post(environment.formspree.partenaire, {
      _subject: `Nouvelle candidature partenaire ${payload.reference}`,
      ...payload,
      competences: payload.competences.join(', '),
      langues: payload.langues.join(', '),
      moyens: payload.moyens.join(', '),
    });
  }

  submitRappel(payload: RappelPayload): Observable<SubmissionResult> {
    return this.post(environment.formspree.rappel, {
      _subject: `Demande de rappel ${payload.reference}`,
      ...payload,
    });
  }

  private post(url: string, body: Record<string, unknown>): Observable<SubmissionResult> {
    return this.http
      .post(url, body, { headers: { Accept: 'application/json' } })
      .pipe(
        map(
          (): SubmissionResult => ({
            success: true,
            message: 'Votre demande a bien été envoyée. Un conseiller vous recontacte.',
          }),
        ),
        catchError(() =>
          of<SubmissionResult>({
            success: false,
            message:
              'L’envoi a échoué. Vous pouvez réessayer ou nous contacter directement sur WhatsApp.',
          }),
        ),
      );
  }

  private resumeReponses(payload: DemandePayload): string {
    return payload.reponses
      .map((r) => `${r.question}: ${Array.isArray(r.valeur) ? r.valeur.join(', ') : r.valeur}`)
      .join(' | ');
  }
}
