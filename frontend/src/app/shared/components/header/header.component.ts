import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly menuOuvert = signal(false);
  /** true dès que la page est défilée : le header se condense. */
  readonly condense = signal(false);

  private platformId = inject(PLATFORM_ID);
  private onScroll?: () => void;
  private ticking = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // Écouteur passif + throttle rAF : le signal n'est écrit qu'au basculement,
    // donc la détection de changements ne tourne pas à chaque pixel défilé.
    this.onScroll = () => {
      if (this.ticking) {
        return;
      }
      this.ticking = true;
      requestAnimationFrame(() => {
        const doit = window.scrollY > 8;
        if (doit !== this.condense()) {
          this.condense.set(doit);
        }
        this.ticking = false;
      });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    if (this.onScroll) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  toggle(): void {
    this.menuOuvert.update((v) => !v);
  }

  fermer(): void {
    this.menuOuvert.set(false);
  }
}
