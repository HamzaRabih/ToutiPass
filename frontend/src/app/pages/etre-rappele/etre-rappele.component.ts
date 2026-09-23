import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmissionService } from '../../core/services/submission.service';
import { ReferenceService } from '../../core/services/reference.service';
import { RappelPayload } from '../../core/models/submission.model';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-etre-rappele',
  standalone: true,
  imports: [ReactiveFormsModule, ContactActionsComponent, RevealDirective],
  templateUrl: './etre-rappele.component.html',
})
export class EtreRappeleComponent {
  private submissions = inject(SubmissionService);
  private references = inject(ReferenceService);

  readonly envoiEnCours = signal(false);
  readonly envoye = signal(false);
  readonly erreur = signal('');

  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    langue: new FormControl('Français'),
    creneau: new FormControl(''),
  });

  soumettre(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erreur.set('Merci d’indiquer au moins votre nom et votre téléphone.');
      return;
    }
    this.erreur.set('');
    const v = this.form.getRawValue();
    const payload: RappelPayload = {
      reference: this.references.generate(),
      nom: v.nom ?? '',
      telephone: v.telephone ?? '',
      langue: v.langue ?? '',
      creneau: v.creneau ?? '',
    };
    this.envoiEnCours.set(true);
    this.submissions.submitRappel(payload).subscribe((res) => {
      this.envoiEnCours.set(false);
      if (res.success) {
        this.envoye.set(true);
      } else {
        this.erreur.set(res.message);
      }
    });
  }
}
