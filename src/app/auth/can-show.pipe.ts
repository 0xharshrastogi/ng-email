import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'canShow',
  pure: false,
})
export class CanShowPipe implements PipeTransform {
  transform(control: AbstractControl<unknown>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }
}
