import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly annee = new Date().getFullYear();
  readonly ville = environment.ville;
  readonly tel = environment.telAffiche;
  readonly telLien = environment.telLien;
}
