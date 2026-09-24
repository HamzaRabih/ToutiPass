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
      :host { display: block; }
      .sc {
        display: flex; align-items: center; gap: 14px; height: 100%;
        padding: 20px 22px; color: var(--ink);
        background: var(--white); border: 1px solid var(--line-card); border-radius: var(--r-card);
        transition: border-color 0.2s ease-out, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s ease-out;
      }
      .sc:hover { text-decoration: none; border-color: var(--brand); transform: translateY(-4px); box-shadow: 0 14px 30px rgba(16, 33, 28, 0.09); }
      .sc__body { flex: 1 1 auto; }
      .sc__nom { display: block; font-size: 16.5px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
      .sc__desc { display: block; font-size: 14px; color: var(--muted-2); line-height: 1.5; }
      .sc__arrow {
        display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%;
        background: var(--green-pale); color: var(--brand); font-weight: 700; font-size: 17px; flex: 0 0 auto;
        transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), background 0.2s ease-out, color 0.2s ease-out;
      }
      .sc:hover .sc__arrow { transform: translateX(4px); background: var(--brand); color: #fff; }
    `,
  ],
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: Service;
}
