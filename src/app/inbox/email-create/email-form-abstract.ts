import { FormControl, FormGroup, Validators } from '@angular/forms';

export abstract class EmailFormAbstract {
  form = new FormGroup({
    to: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    from: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    subject: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    content: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(5000)] }),
  });
}
