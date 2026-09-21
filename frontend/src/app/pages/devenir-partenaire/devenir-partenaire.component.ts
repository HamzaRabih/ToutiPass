import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { CatalogueService } from '../../core/services/catalogue.service';
import { SubmissionService } from '../../core/services/submission.service';
import { ReferenceService } from '../../core/services/reference.service';
import { ServiceQuestion } from '../../core/models/catalogue.model';
import { CandidaturePayload } from '../../core/models/submission.model';

import { QuestionFieldComponent } from '../../shared/components/question-field/question-field.component';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';

@Component({
  selector: 'app-devenir-partenaire',
  standalone: true,
  imports: [ReactiveFormsModule, QuestionFieldComponent, ContactActionsComponent, PhotoComponent],
  templateUrl: './devenir-partenaire.component.html',
  styleUrl: './devenir-partenaire.component.scss',
})
export class DevenirPartenaireComponent {
  private catalogue = inject(CatalogueService);
  private submissions = inject(SubmissionService);
  private references = inject(ReferenceService);

  /** Champs à choix rendus via QuestionField (chips). */
  competencesQ?: ServiceQuestion;
  languesQ: ServiceQuestion = {
    id: 'langues', label: 'Langues parlées', type: 'multi', required: true,
    options: [
      { value: 'francais', label: 'Français' },
      { value: 'swahili', label: 'Swahili' },
      { value: 'lingala', label: 'Lingala' },
    ],
  };
  experienceQ: ServiceQuestion = {
    id: 'experience', label: 'Expérience', type: 'single', required: true,
    options: [
      { value: '<2', label: '< 2 ans' },
      { value: '2-5', label: '2 à 5 ans' },
      { value: '5+', label: '5 ans +' },
    ],
  };
  moyensQ: ServiceQuestion = {
    id: 'moyens', label: 'Vos moyens', type: 'multi', required: false,
    options: [
      { value: 'outillage', label: 'Outillage personnel' },
      { value: 'moto', label: 'Moto' },
      { value: 'vehicule', label: 'Véhicule' },
      { value: 'equipe', label: 'Équipe' },
    ],
  };

  readonly envoiEnCours = signal(false);
  readonly envoye = signal(false);
  readonly erreur = signal('');

  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    whatsapp: new FormControl(''),
    villeQuartier: new FormControl('', Validators.required),
    competences: new FormControl<string[]>([], this.nonVide),
    langues: new FormControl<string[]>([], this.nonVide),
    experience: new FormControl('', Validators.required),
    moyens: new FormControl<string[]>([]),
    consentement: new FormControl(false, Validators.requiredTrue),
  });

  constructor() {
    this.catalogue.getUnivers().subscribe((univers) => {
      this.competencesQ = {
        id: 'competences',
        label: 'Vos compétences',
        type: 'multi',
        required: true,
        options: univers.map((u) => ({ value: u.slug, label: u.nom })),
      };
    });
  }

  private nonVide(control: AbstractControl): ValidationErrors | null {
    return Array.isArray(control.value) && control.value.length > 0 ? null : { required: true };
  }

  ctrl(id: string): FormControl {
    return this.form.get(id) as FormControl;
  }

  soumettre(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erreur.set('Merci de compléter les champs obligatoires (marqués d’un point) et le consentement.');
      return;
    }
    this.erreur.set('');
    const v = this.form.getRawValue();
    const payload: CandidaturePayload = {
      reference: this.references.generate(),
      nom: v.nom ?? '',
      telephone: v.telephone ?? '',
      whatsapp: v.whatsapp?.trim() ? v.whatsapp : 'Identique au téléphone',
      villeQuartier: v.villeQuartier ?? '',
      competences: v.competences ?? [],
      langues: v.langues ?? [],
      experience: v.experience ?? '',
      moyens: v.moyens ?? [],
      preferenceContact: '',
      consentement: v.consentement ?? false,
    };

    this.envoiEnCours.set(true);
    this.submissions.submitCandidature(payload).subscribe((res) => {
      this.envoiEnCours.set(false);
      if (res.success) {
        this.envoye.set(true);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        this.erreur.set(res.message);
      }
    });
  }
}
