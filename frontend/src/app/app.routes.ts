import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/accueil/accueil.component').then((m) => m.AccueilComponent),
    title: 'ToutiPass — Vos services du quotidien à Lubumbashi',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then((m) => m.ServicesComponent),
    title: 'Tous nos services — ToutiPass',
  },
  {
    path: 'recherche',
    loadComponent: () => import('./pages/recherche/recherche.component').then((m) => m.RechercheComponent),
    title: 'Rechercher un service — ToutiPass',
  },
  {
    path: 'univers/:slug',
    loadComponent: () => import('./pages/univers/univers.component').then((m) => m.UniversComponent),
  },
  {
    path: 'service/:slug',
    loadComponent: () => import('./pages/service/service.component').then((m) => m.ServiceComponent),
  },
  {
    path: 'concierge',
    loadComponent: () => import('./pages/service/service.component').then((m) => m.ServiceComponent),
    data: { slug: 'concierge' },
  },
  {
    path: 'devenir-partenaire',
    loadComponent: () => import('./pages/devenir-partenaire/devenir-partenaire.component').then((m) => m.DevenirPartenaireComponent),
    title: 'Devenir partenaire — ToutiPass',
  },
  {
    path: 'etre-rappele',
    loadComponent: () => import('./pages/etre-rappele/etre-rappele.component').then((m) => m.EtreRappeleComponent),
    title: 'Être rappelé — ToutiPass',
  },
  {
    path: 'comment-ca-marche',
    loadComponent: () => import('./pages/comment-ca-marche/comment-ca-marche.component').then((m) => m.CommentCaMarcheComponent),
    title: 'Comment ça marche — ToutiPass',
  },
  {
    path: 'pourquoi',
    loadComponent: () => import('./pages/pourquoi/pourquoi.component').then((m) => m.PourquoiComponent),
    title: 'Pourquoi ToutiPass',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact — ToutiPass',
  },
  {
    path: 'confidentialite',
    loadComponent: () => import('./pages/confidentialite/confidentialite.component').then((m) => m.ConfidentialiteComponent),
    title: 'Confidentialité — ToutiPass',
  },
  { path: '**', redirectTo: '' },
];
