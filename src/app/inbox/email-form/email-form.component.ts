import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type FormGroupSchema<TFormGroup> = TFormGroup extends FormGroup<infer TFormSchema>
  ? { [key in keyof TFormSchema]: TFormSchema[key] extends FormControl<infer TValue> ? TValue : never }
  : never;

export type EmailCreateOrReply = Pick<FormGroupSchema<EmailFormComponent['form']>, 'to' | 'subject' | 'text'>;

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Input() email?: Partial<FormGroupSchema<typeof this.form>>;

  @Output('formSubmit') formSubmitEmitter = new EventEmitter<EmailCreateOrReply>();

  form = new FormGroup({
    to: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    from: new FormControl(
      { value: '', disabled: true },
      { nonNullable: true, validators: [Validators.required, Validators.email] }
    ),
    subject: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    text: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(5000)] }),
  });

  constructor() {}

  ngOnInit(): void {
    if (this.email) this.form.patchValue(this.email);
  }

  submit() {
    if (this.form.valid) this.formSubmitEmitter.emit(<EmailCreateOrReply>this.form.value);
  }
}
