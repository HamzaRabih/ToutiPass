/**
 * Configuration ToutiPass — MVP statique.
 *
 * NOTE : ces valeurs sont des placeholders à renseigner par le client.
 * - Créez vos formulaires sur https://formspree.io et remplacez les URLs.
 * - Renseignez le numéro WhatsApp officiel (format international, sans « + » ni espaces).
 *
 * Lors de la migration dynamique (lot 2), il suffira de remplacer les URLs
 * Formspree par les endpoints du backend (/api/...) — voir SubmissionService.
 */
export const environment = {
  production: false,

  /** Ville pilote (utilisée dans les références et messages). */
  ville: 'Lubumbashi',
  villeCode: 'LUB',

  /** Numéro WhatsApp officiel ToutiPass (format wa.me : indicatif + numéro, sans +). */
  whatsappNumber: '243000000000',

  /** Numéro d'appel affiché (format lisible) et lien tel:. */
  telAffiche: '+243 000 000 000',
  telLien: '+243000000000',

  /** Endpoints Formspree (un par type de soumission). */
  formspree: {
    demande: 'https://formspree.io/f/xxxxdemande',
    partenaire: 'https://formspree.io/f/xxxxpartenaire',
    rappel: 'https://formspree.io/f/xxxxrappel',
  },
};
