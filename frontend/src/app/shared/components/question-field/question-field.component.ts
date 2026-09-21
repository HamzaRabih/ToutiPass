import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ServiceQuestion } from '../../../core/models/catalogue.model';

/**
 * Rend dynamiquement une question de qualification (§5.1) reliée à un FormControl.
 * - single  : boutons radio (choix visuel)
 * - multi   : cases à cocher (valeur = string[])
 * - text    : champ texte
 * - textarea: zone de texte
 */
@Component({
  selector: 'app-question-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-field.component.html',
  styleUrl: './question-field.component.scss',
})
export class QuestionFieldComponent {
  @Input({ required: true }) question!: ServiceQuestion;
  @Input({ required: true }) control!: FormControl;

  get invalide(): boolean {
    return this.control.invalid && this.control.touched;
  }

  estCoche(value: string): boolean {
    const val = this.control.value as string[] | null;
    return Array.isArray(val) && val.includes(value);
  }

  toggleMulti(value: string): void {
    const current = Array.isArray(this.control.value) ? [...(this.control.value as string[])] : [];
    const idx = current.indexOf(value);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(value);
    }
    this.control.setValue(current);
    this.control.markAsTouched();
  }

  choisirSingle(value: string): void {
    this.control.setValue(value);
    this.control.markAsTouched();
  }
}
