import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Révèle l'élément en fondu/translation quand il entre dans le viewport.
 * - Ne s'active que dans le navigateur (SSR/prerender : contenu visible par défaut).
 * - Respecte prefers-reduced-motion (le CSS neutralise l'effet).
 *
 * Usage : <div appReveal [revealDelay]="120" revealFrom="left">…</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  /** Délai d'apparition en ms (pour créer un effet d'escalier). */
  @Input() revealDelay = 0;
  /** Direction d'arrivée : du bas (défaut), de gauche, de droite, ou zoom. */
  @Input() revealFrom: 'up' | 'left' | 'right' | 'zoom' = 'up';

  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private fallback?: ReturnType<typeof setTimeout>;
  private cleanup?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const node = this.el.nativeElement;

    // Pas d'IntersectionObserver (vieux navigateur) → on affiche directement.
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    node.classList.add('reveal');
    if (this.revealFrom !== 'up') {
      node.classList.add(`reveal--${this.revealFrom}`);
    }
    if (this.revealDelay) {
      node.style.transitionDelay = `${this.revealDelay}ms`;
    }

    const reveal = () => {
      node.classList.add('is-visible');
      this.observer?.disconnect();
      if (this.fallback) {
        clearTimeout(this.fallback);
      }
      // Une fois l'animation jouée, on rend l'élément à ses styles normaux
      // (sinon le délai d'escalier ralentirait aussi les effets de survol).
      this.cleanup = setTimeout(() => {
        node.classList.remove('reveal', `reveal--${this.revealFrom}`, 'is-visible');
        node.style.transitionDelay = '';
      }, this.revealDelay + 800);
    };

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );
    this.observer.observe(node);

    // Filet de sécurité : si l'observer ne se déclenche jamais (onglet en
    // arrière-plan, JS bloqué…), le contenu finit par apparaître quand même.
    this.fallback = setTimeout(reveal, 2500);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.cleanup);
    if (this.fallback) {
      clearTimeout(this.fallback);
    }
  }
}
