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
 * Usage : <div appReveal [revealDelay]="120">…</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  /** Délai d'apparition en ms (pour créer un effet d'escalier). */
  @Input() revealDelay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private fallback?: ReturnType<typeof setTimeout>;

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
    if (this.revealDelay) {
      node.style.transitionDelay = `${this.revealDelay}ms`;
    }

    const reveal = () => {
      node.classList.add('is-visible');
      this.observer?.disconnect();
      if (this.fallback) {
        clearTimeout(this.fallback);
      }
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
    if (this.fallback) {
      clearTimeout(this.fallback);
    }
  }
}
