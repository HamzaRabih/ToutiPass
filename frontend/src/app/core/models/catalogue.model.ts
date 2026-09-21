/**
 * Modèles du catalogue ToutiPass.
 *
 * Ces types sont partagés entre la vitrine statique (données locales) et
 * la future API dynamique (lot 2) : le backend devra exposer les mêmes formes.
 */

export type QuestionType = 'single' | 'multi' | 'text' | 'textarea';

export interface QuestionOption {
  value: string;
  label: string;
}

/** Question de qualification affichée sur la page service (2 à 5 par service, §5.1). */
export interface ServiceQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  /** Pour les types 'single' et 'multi'. */
  options?: QuestionOption[];
  placeholder?: string;
}

/** Un sous-service concret que le client peut demander. */
export interface Service {
  slug: string;
  nom: string;
  universSlug: string;
  description: string;
  /** Emoji illustratif (MVP sans assets images). */
  icon?: string;
  visible?: boolean;
  ordre?: number;

  /** Questions de qualification ; si absentes, des questions par défaut sont appliquées. */
  questions?: ServiceQuestion[];

  /** SEO local (§12.1). */
  seoTitle?: string;
  seoDescription?: string;
  /** Paragraphe explicatif pour la page SEO indexable. */
  seoIntro?: string;
}

/** Un grand univers de services (Maison & Travaux, Ménage, etc.). */
export interface Univers {
  slug: string;
  nom: string;
  tagline?: string;
  icon?: string;
  /** Nom d'icône SVG (voir IconComponent), ex. 'wrench'. */
  iconName?: string;
  /** Chemin de la photo (ex. 'images/univers/maison-travaux.webp'). Vide = emplacement rayé. */
  image?: string;
  imageAlt?: string;
  ordre?: number;
  visible?: boolean;
  /** true pour l'entrée « ToutiPass Concierge » (affichée à part sur l'accueil). */
  isConcierge?: boolean;
  services: Service[];
}
