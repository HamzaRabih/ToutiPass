import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Définit le <title> et la meta description (rendus au prerender pour le SEO, §12.1). */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  set(titre: string, description?: string): void {
    this.title.setTitle(titre);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }
}
