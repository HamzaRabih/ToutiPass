import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly menuOuvert = signal(false);
  /** Vrai dès que la page a défilé : en-tête compacté avec une ombre. */
  readonly defile = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    const v = window.scrollY > 12;
    if (v !== this.defile()) {
      this.defile.set(v);
    }
  }

  toggle(): void {
    this.menuOuvert.update((v) => !v);
  }

  fermer(): void {
    this.menuOuvert.set(false);
  }
}
