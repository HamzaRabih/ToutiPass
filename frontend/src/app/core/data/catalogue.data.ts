import { ServiceQuestion, Univers } from '../models/catalogue.model';

/**
 * Catalogue ToutiPass — données locales (MVP statique).
 *
 * Source : §4.1 du cahier des charges. Modifiable ici sans recoder les composants.
 * Au lot 2, ces données seront servies par l'API (GET /api/catalogue) via HttpCatalogueService.
 */

/** Questions appliquées par défaut à un service qui n'en définit pas. */
export const DEFAULT_QUESTIONS: ServiceQuestion[] = [
  {
    id: 'quartier',
    label: 'Dans quel quartier de Lubumbashi ?',
    type: 'text',
    required: true,
    placeholder: 'Ex. Golf, Kenya, Bel-Air…',
  },
  {
    id: 'delai',
    label: 'Quand souhaitez-vous l’intervention ?',
    type: 'single',
    required: true,
    options: [
      { value: 'urgent', label: 'Le plus tôt possible' },
      { value: 'semaine', label: 'Cette semaine' },
      { value: 'flexible', label: 'Je suis flexible' },
    ],
  },
  {
    id: 'details',
    label: 'Décrivez brièvement votre besoin',
    type: 'textarea',
    required: false,
    placeholder: 'Quelques mots suffisent, vous pourrez préciser sur WhatsApp.',
  },
];

const Q_QUARTIER: ServiceQuestion = DEFAULT_QUESTIONS[0];
const Q_DELAI: ServiceQuestion = DEFAULT_QUESTIONS[1];
const Q_DETAILS: ServiceQuestion = DEFAULT_QUESTIONS[2];

export const CATALOGUE: Univers[] = [
  {
    slug: 'maison-travaux',
    image: 'images/univers/maison-travaux.jpg',
    nom: 'Maison & Travaux',
    iconName: 'wrench',
    tagline: 'Plomberie, électricité, réparations…',
    icon: '🔧',
    ordre: 1,
    visible: true,
    services: [
      {
        slug: 'plomberie', nom: 'Plomberie', universSlug: 'maison-travaux', icon: '🚰',
        description: 'Fuite, robinet, WC, évier, canalisation ou pompe : un plombier vérifié intervient.',
        seoTitle: 'Plombier à Lubumbashi — ToutiPass',
        seoDescription: 'Besoin d’un plombier à Lubumbashi ? ToutiPass sélectionne un partenaire vérifié pour votre fuite, robinet, WC ou canalisation.',
        seoIntro: 'Une fuite d’eau, un robinet qui goutte, des WC bouchés ou une pompe en panne ? Décrivez votre besoin à ToutiPass : nous confions votre intervention à un plombier de notre réseau, vérifié et suivi.',
        questions: [
          {
            id: 'type', label: 'De quoi s’agit-il ?', type: 'single', required: true,
            options: [
              { value: 'fuite', label: 'Fuite d’eau' },
              { value: 'robinet', label: 'Robinet' },
              { value: 'wc', label: 'WC' },
              { value: 'evier', label: 'Évier' },
              { value: 'canalisation', label: 'Canalisation bouchée' },
              { value: 'pompe', label: 'Pompe' },
              { value: 'autre', label: 'Autre' },
            ],
          },
          Q_QUARTIER, Q_DELAI, Q_DETAILS,
        ],
      },
      {
        slug: 'electricite', nom: 'Électricité', universSlug: 'maison-travaux', icon: '💡',
        description: 'Panne, installation, tableau électrique, éclairage ou prise : un électricien qualifié.',
        seoTitle: 'Électricien à Lubumbashi — ToutiPass',
        seoDescription: 'Un électricien vérifié à Lubumbashi pour vos pannes, installations et dépannages. Décrivez votre besoin à ToutiPass.',
      },
      { slug: 'maconnerie', nom: 'Maçonnerie', universSlug: 'maison-travaux', icon: '🧱', description: 'Construction, réparation de murs, dalles et petits ouvrages.' },
      { slug: 'carrelage', nom: 'Carrelage', universSlug: 'maison-travaux', icon: '◻️', description: 'Pose et réparation de carrelage, sols et faïence.',
        seoTitle: 'Carreleur à Lubumbashi — ToutiPass', seoDescription: 'Un carreleur vérifié à Lubumbashi pour la pose et la réparation de vos sols et murs.' },
      { slug: 'peinture', nom: 'Peinture', universSlug: 'maison-travaux', icon: '🎨', description: 'Peinture intérieure et extérieure, finitions et rafraîchissement.' },
      { slug: 'menuiserie', nom: 'Menuiserie', universSlug: 'maison-travaux', icon: '🪚', description: 'Portes, fenêtres, meubles et réparations en bois.' },
      { slug: 'serrurerie', nom: 'Serrurerie', universSlug: 'maison-travaux', icon: '🔑', description: 'Ouverture, changement de serrure et sécurisation.' },
      { slug: 'climatisation', nom: 'Climatisation', universSlug: 'maison-travaux', icon: '❄️', description: 'Installation, entretien et réparation de climatiseurs.' },
      { slug: 'jardinage', nom: 'Jardinage & entretien extérieur', universSlug: 'maison-travaux', icon: '🌿', description: 'Entretien de jardin, tonte, taille et nettoyage extérieur.',
        seoTitle: 'Jardinier à Lubumbashi — ToutiPass', seoDescription: 'Un jardinier vérifié à Lubumbashi pour l’entretien de vos espaces verts.' },
      { slug: 'bricolage', nom: 'Bricolage & diagnostic', universSlug: 'maison-travaux', icon: '🛠️', description: 'Petits travaux, montage, fixations et diagnostic de panne.' },
    ],
  },
  {
    slug: 'menage-entretien',
    image: 'images/univers/menage-entretien.jpg',
    nom: 'Ménage & Entretien',
    iconName: 'sparkles',
    tagline: 'Ménage, repassage, grand nettoyage…',
    icon: '🧽',
    ordre: 2,
    visible: true,
    services: [
      {
        slug: 'menage-regulier', nom: 'Ménage régulier', universSlug: 'menage-entretien', icon: '🧹',
        description: 'Un ménage à domicile régulier, réalisé par une personne de confiance.',
        seoTitle: 'Femme de ménage à Lubumbashi — ToutiPass',
        seoDescription: 'ToutiPass organise un ménage régulier ou ponctuel à domicile à Lubumbashi avec des intervenants vérifiés.',
        questions: [
          {
            id: 'frequence', label: 'À quelle fréquence ?', type: 'single', required: true,
            options: [
              { value: 'ponctuel', label: 'Une fois' },
              { value: 'hebdo', label: 'Chaque semaine' },
              { value: 'bimensuel', label: 'Deux fois par mois' },
              { value: 'quotidien', label: 'Plusieurs fois par semaine' },
            ],
          },
          {
            id: 'surface', label: 'Taille du logement', type: 'single', required: false,
            options: [
              { value: 'studio', label: 'Studio / 1 pièce' },
              { value: 'moyen', label: '2 à 3 pièces' },
              { value: 'grand', label: '4 pièces et +' },
            ],
          },
          Q_QUARTIER, Q_DETAILS,
        ],
      },
      { slug: 'menage-ponctuel', nom: 'Ménage ponctuel', universSlug: 'menage-entretien', icon: '🫧', description: 'Un nettoyage ponctuel pour une occasion précise.' },
      { slug: 'grand-nettoyage', nom: 'Grand nettoyage', universSlug: 'menage-entretien', icon: '✨', description: 'Nettoyage en profondeur, après travaux ou déménagement.' },
      { slug: 'repassage', nom: 'Repassage & lessive', universSlug: 'menage-entretien', icon: '👔', description: 'Repassage, lessive et entretien du linge.' },
      { slug: 'vitres', nom: 'Vitres', universSlug: 'menage-entretien', icon: '🪟', description: 'Nettoyage de vitres et surfaces vitrées.' },
      { slug: 'canape-tapis', nom: 'Canapé, tapis & matelas', universSlug: 'menage-entretien', icon: '🛋️', description: 'Nettoyage en profondeur des textiles d’ameublement.' },
      { slug: 'bureaux-commerces', nom: 'Bureaux & commerces', universSlug: 'menage-entretien', icon: '🏢', description: 'Entretien régulier de locaux professionnels.' },
    ],
  },
  {
    slug: 'cours-education',
    image: 'images/univers/cours-education.jpg',
    nom: 'Cours & Éducation',
    iconName: 'book',
    tagline: 'Soutien scolaire, langues, examens…',
    icon: '📚',
    ordre: 3,
    visible: true,
    services: [
      {
        slug: 'soutien-scolaire', nom: 'Soutien scolaire', universSlug: 'cours-education', icon: '✏️',
        description: 'Accompagnement primaire et secondaire dans toutes les matières.',
        questions: [
          {
            id: 'niveau', label: 'Quel niveau ?', type: 'single', required: true,
            options: [
              { value: 'primaire', label: 'Primaire' },
              { value: 'secondaire', label: 'Secondaire' },
              { value: 'bac', label: 'Préparation Bac / examens' },
              { value: 'adulte', label: 'Adulte' },
            ],
          },
          {
            id: 'matiere', label: 'Quelle(s) matière(s) ?', type: 'multi', required: true,
            options: [
              { value: 'maths', label: 'Maths' },
              { value: 'francais', label: 'Français' },
              { value: 'anglais', label: 'Anglais' },
              { value: 'sciences', label: 'Sciences' },
              { value: 'informatique', label: 'Informatique' },
              { value: 'autre', label: 'Autre' },
            ],
          },
          Q_QUARTIER, Q_DETAILS,
        ],
      },
      {
        slug: 'cours-anglais', nom: 'Cours d’anglais', universSlug: 'cours-education', icon: '🗣️',
        description: 'Cours d’anglais tous niveaux, enfants et adultes.',
        seoTitle: 'Professeur d’anglais à Lubumbashi — ToutiPass',
        seoDescription: 'ToutiPass vous met en relation avec un professeur d’anglais vérifié à Lubumbashi, à domicile ou en ligne.',
      },
      { slug: 'cours-musique', nom: 'Cours de musique', universSlug: 'cours-education', icon: '🎹', description: 'Piano, guitare, chant et autres instruments.' },
      { slug: 'natation', nom: 'Cours de natation', universSlug: 'cours-education', icon: '🏊', description: 'Apprentissage et perfectionnement en natation.' },
      { slug: 'informatique-cours', nom: 'Cours d’informatique', universSlug: 'cours-education', icon: '💻', description: 'Bureautique, initiation et outils numériques.' },
      { slug: 'prepa-examens', nom: 'Préparation aux examens', universSlug: 'cours-education', icon: '🎓', description: 'Préparation intensive Bac et concours.' },
    ],
  },
  {
    slug: 'enfants-famille',
    image: 'images/univers/enfants-famille.jpg',
    nom: 'Enfants & Famille',
    iconName: 'users',
    tagline: 'Garde d’enfants, nounou, activités…',
    icon: '👨‍👩‍👧',
    ordre: 4,
    visible: true,
    services: [
      {
        slug: 'garde-enfants', nom: 'Garde d’enfants', universSlug: 'enfants-famille', icon: '🧸',
        description: 'Garde ponctuelle ou régulière par une personne de confiance.',
        questions: [
          { id: 'nombre', label: 'Combien d’enfants ?', type: 'single', required: true,
            options: [ { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3+', label: '3 et +' } ] },
          { id: 'ages', label: 'Âges des enfants', type: 'text', required: false, placeholder: 'Ex. 2 ans et 5 ans' },
          Q_QUARTIER, Q_DELAI,
        ],
      },
      { slug: 'nounou', nom: 'Nounou', universSlug: 'enfants-famille', icon: '👶', description: 'Nounou régulière à domicile.' },
      { slug: 'aide-devoirs', nom: 'Aide aux devoirs', universSlug: 'enfants-famille', icon: '📖', description: 'Accompagnement quotidien des devoirs.' },
      { slug: 'activites-enfants', nom: 'Activités enfants', universSlug: 'enfants-famille', icon: '🎨', description: 'Animation et activités pour les enfants.' },
    ],
  },
  {
    slug: 'transport-logistique',
    image: 'images/univers/transport-logistique.jpg',
    nom: 'Transport & Logistique',
    iconName: 'truck',
    tagline: 'Chauffeur, déménagement, livraison…',
    icon: '🚚',
    ordre: 6,
    visible: true,
    services: [
      {
        slug: 'demenagement', nom: 'Déménagement', universSlug: 'transport-logistique', icon: '📦',
        description: 'Déménagement, manutention et transport d’objets.',
        questions: [
          { id: 'volume', label: 'Quel volume ?', type: 'single', required: true,
            options: [
              { value: 'quelques', label: 'Quelques objets' },
              { value: 'studio', label: 'Studio / 1 pièce' },
              { value: 'appartement', label: 'Appartement' },
              { value: 'maison', label: 'Maison' },
            ] },
          { id: 'depart', label: 'Quartier de départ', type: 'text', required: true, placeholder: 'Ex. Kampemba' },
          { id: 'arrivee', label: 'Quartier d’arrivée', type: 'text', required: true, placeholder: 'Ex. Golf' },
          Q_DELAI,
        ],
      },
      { slug: 'chauffeur', nom: 'Chauffeur', universSlug: 'transport-logistique', icon: '🚗', description: 'Chauffeur pour vos déplacements.' },
      { slug: 'livraison', nom: 'Livraison & courses', universSlug: 'transport-logistique', icon: '🛵', description: 'Livraison, courses et transport de colis.' },
    ],
  },
  {
    slug: 'services-professionnels',
    image: 'images/univers/services-professionnels.jpg',
    nom: 'Services professionnels',
    iconName: 'briefcase',
    tagline: 'Informatique, graphisme, administratif…',
    icon: '💼',
    ordre: 8,
    visible: true,
    services: [
      {
        slug: 'informatique-pro', nom: 'Informatique', universSlug: 'services-professionnels', icon: '🖥️',
        description: 'Dépannage, installation, réseaux et assistance informatique.',
        questions: [
          { id: 'besoin', label: 'Quel besoin ?', type: 'text', required: true, placeholder: 'Ex. Ordinateur lent, installation réseau…' },
          Q_DELAI, Q_DETAILS,
        ],
      },
      { slug: 'graphisme', nom: 'Graphisme', universSlug: 'services-professionnels', icon: '🎨', description: 'Logos, visuels et supports de communication.' },
      { slug: 'traduction', nom: 'Traduction', universSlug: 'services-professionnels', icon: '🌍', description: 'Traduction et interprétation.' },
      { slug: 'secretariat', nom: 'Secrétariat & administratif', universSlug: 'services-professionnels', icon: '📄', description: 'Assistance administrative et secrétariat.' },
      { slug: 'comptabilite', nom: 'Comptabilité', universSlug: 'services-professionnels', icon: '🧮', description: 'Assistance comptable ponctuelle.' },
    ],
  },
  {
    slug: 'concierge',
    nom: 'ToutiPass Concierge',
    iconName: 'help',
    tagline: 'Je ne trouve pas mon besoin',
    icon: '🙋',
    ordre: 99,
    visible: true,
    isConcierge: true,
    services: [
      {
        slug: 'concierge', nom: 'ToutiPass Concierge', universSlug: 'concierge', icon: '🙋',
        description: 'Votre besoin ne correspond à aucune catégorie ? Expliquez-nous : notre équipe cherche une solution adaptée.',
        questions: [
          { id: 'besoin', label: 'Décrivez votre besoin', type: 'textarea', required: true, placeholder: 'Dites-nous simplement ce dont vous avez besoin.' },
          Q_QUARTIER, Q_DELAI,
        ],
      },
    ],
  },
];
