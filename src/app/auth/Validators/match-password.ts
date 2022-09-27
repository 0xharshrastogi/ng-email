import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class Matcher {
  keyNameA!: string;
  keyNameB!: string;

  match(keyA: string, keyB: string) {
    this.keyNameA = keyA;
    this.keyNameB = keyB;

    return this.validate.bind(this);
  }

  private validate(
    control: AbstractControl<string, any>
  ): ValidationErrors | null {
    const isFormGroup = control instanceof FormGroup;

    if (!isFormGroup) {
      throw new Error('MatchPassword Requires Control Of FormGroup');
    }

    return control.value[this.keyNameA] === control.value[this.keyNameB]
      ? null
      : { ng: true };
  }
}
