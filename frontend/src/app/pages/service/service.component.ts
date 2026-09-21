import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';

import { CatalogueService } from '../../core/services/catalogue.service';
import { SubmissionService } from '../../core/services/submission.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { ReferenceService } from '../../core/services/reference.service';
import { SeoService } from '../../core/services/seo.service';
import { Service } from '../../core/models/catalogue.model';
import { DemandePayload, ReponseQualification } from '../../core/models/submission.model';
import { environment } from '../../../environments/environment';

import { QuestionFieldComponent } from '../../shared/components/question-field/question-field.component';
import { ContactActionsComponent } from '../../shared/components/contact-actions/contact-actions.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ReactiveFormsModule, QuestionFieldComponent, ContactActionsComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  private route = inject(ActivatedRoute);
  private catalogue = inject(CatalogueService);
  private submissions = inject(SubmissionService);
  private whatsapp = inject(WhatsappService);
  private references = inject(ReferenceService);
  private seo = inject(SeoService);

  form?: FormGroup;
  service?: Service;

  readonly ville = environment.ville;
  readonly telLien = environment.telLien;

  /** État après soumission : demande construite + lien WhatsApp. */
  readonly demandeEnvoyee = signal<DemandePayload | null>(null);
  readonly lienWhatsapp = signal<string>('');
  readonly envoiEnCours = signal(false);
  /** Message de journalisation Formspree (secondaire). */
  readonly statutEnvoi = signal<string>('');

  readonly service$ = this.route.paramMap.pipe(
    map((p) => p.get('slug') ?? (this.route.snapshot.data['slug'] as string) ?? ''),
    switchMap((slug) => this.catalogue.getService(slug)),
    tap((service) => this.initForm(service)),
  );

  private initForm(service?: Service): void {
    this.service = service;
    this.demandeEnvoyee.set(null);
    this.statutEnvoi.set('');
    if (!service) {
      return;
    }
    this.seo.set(
      service.seoTitle ?? `${service.nom} à ${environment.ville} — ToutiPass`,
      service.seoDescription ?? service.description,
    );

    const controls: Record<string, FormControl> = {};
    for (const q of service.questions ?? []) {
      const initial = q.type === 'multi' ? [] : '';
      const validators = q.required
        ? q.type === 'multi'
          ? [this.nonVide]
          : [Validators.required]
        : [];
      controls[q.id] = new FormControl(initial, validators);
    }
    this.form = new FormGroup(controls);
  }

  /** Validateur : un multi-select requis doit contenir au moins une valeur. */
  private nonVide(control: AbstractControl): ValidationErrors | null {
    return Array.isArray(control.value) && control.value.length > 0 ? null : { required: true };
  }

  ctrl(id: string): FormControl {
    return this.form!.get(id) as FormControl;
  }

  get nbQuestions(): number {
    return this.service?.questions?.length ?? 0;
  }

  get nbRepondues(): number {
    if (!this.form) {
      return 0;
    }
    return (this.service?.questions ?? []).filter((q) => {
      const v = this.form!.get(q.id)?.value;
      return Array.isArray(v) ? v.length > 0 : `${v ?? ''}`.trim().length > 0;
    }).length;
  }

  get progressPct(): number {
    return this.nbQuestions ? Math.round((this.nbRepondues / this.nbQuestions) * 100) : 0;
  }

  /** Convertit une (ou des) valeur(s) d'option en libellé(s) lisible(s). */
  private enLibelle(
    options: { value: string; label: string }[] | undefined,
    valeur: string | string[],
  ): string | string[] {
    if (!options) {
      return valeur;
    }
    const label = (v: string) => options.find((o) => o.value === v)?.label ?? v;
    return Array.isArray(valeur) ? valeur.map(label) : label(valeur);
  }

  soumettre(): void {
    if (!this.service || !this.form) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const reponses: ReponseQualification[] = (this.service.questions ?? [])
      .map((q) => {
        const brut = this.form!.get(q.id)!.value as string | string[];
        return {
          questionId: q.id,
          question: q.label,
          valeur: this.enLibelle(q.options, brut),
        };
      })
      .filter((r) => (Array.isArray(r.valeur) ? r.valeur.length > 0 : `${r.valeur}`.trim().length > 0));

    const payload: DemandePayload = {
      reference: this.references.generate(),
      universSlug: this.service.universSlug,
      universNom: this.service.universSlug,
      serviceSlug: this.service.slug,
      serviceNom: this.service.nom,
      ville: environment.ville,
      reponses,
    };

    this.demandeEnvoyee.set(payload);
    this.lienWhatsapp.set(this.whatsapp.lienDemande(payload));

    // Journalisation côté ToutiPass via Formspree (n'empêche pas le parcours WhatsApp).
    this.envoiEnCours.set(true);
    this.submissions.submitDemande(payload).subscribe((res) => {
      this.envoiEnCours.set(false);
      this.statutEnvoi.set(res.message);
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
