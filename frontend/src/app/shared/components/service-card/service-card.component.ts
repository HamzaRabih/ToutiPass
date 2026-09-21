import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../../core/models/catalogue.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="sc" [routerLink]="['/service', service.slug]">
      <span class="sc__body">
        <span class="sc__nom">{{ service.nom }}</span>
        <span class="sc__desc">{{ service.description }}</span>
      </span>
      <span class="sc__arrow" aria-hidden="true">→</span>
    </a>
  `,
  styles: [
    `
      .sc {
        display: flex; align-items: center; gap: 14px; height: 100%;
        padding: 20px 22px; color: var(--ink);
        background: var(--white); border: 1px solid var(--line-card); border-radius: var(--r-card);
        transition: border-color 0.15s ease-out, transform 0.15s ease-out;
      }
      .sc:hover { text-decoration: none; border-color: var(--line-field); transform: translateY(-2px); }
      .sc__body { flex: 1 1 auto; }
      .sc__nom { display: block; font-size: 16.5px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
      .sc__desc { display: block; font-size: 14px; color: var(--muted-2); line-height: 1.5; }
      .sc__arrow { color: var(--brand); font-weight: 700; font-size: 18px; flex: 0 0 auto; transition: transform 0.15s ease-out; }
      .sc:hover .sc__arrow { transform: translateX(3px); }
    `,
  ],
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: Service;
}
