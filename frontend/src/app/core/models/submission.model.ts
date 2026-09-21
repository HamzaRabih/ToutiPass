/**
 * Formes des soumissions envoyées via SubmissionService.
 * Réutilisables telles quelles par le backend au lot 2.
 */

export type CanalContact = 'whatsapp' | 'rappel' | 'appel';

/** Réponse à une question de qualification. */
export interface ReponseQualification {
  questionId: string;
  question: string;
  valeur: string | string[];
}

/** Demande de service soumise depuis une page service. */
export interface DemandePayload {
  reference: string;
  universSlug: string;
  universNom: string;
  serviceSlug: string;
  serviceNom: string;
  ville: string;
  reponses: ReponseQualification[];
  canalSouhaite?: CanalContact;
  /** Coordonnées optionnelles si le client ne passe pas par WhatsApp. */
  nom?: string;
  telephone?: string;
}

/** Candidature « Devenir partenaire » (§6.2). */
export interface CandidaturePayload {
  reference: string;
  nom: string;
  telephone: string;
  whatsapp: string;
  villeQuartier: string;
  competences: string[];
  langues: string[];
  experience: string;
  moyens: string[];
  preferenceContact: string;
  consentement: boolean;
}

/** Demande de rappel (§5.2). */
export interface RappelPayload {
  reference: string;
  nom: string;
  telephone: string;
  langue: string;
  creneau: string;
  /** Référence de demande liée, si le rappel part d'une page service. */
  demandeReference?: string;
}

/** Résultat d'une soumission (succès ou erreur). */
export interface SubmissionResult {
  success: boolean;
  message: string;
}
