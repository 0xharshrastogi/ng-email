import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { UniqueUsernameValidator } from '../Validators/unique-username-validator';

import { Matcher } from './../Validators/match-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form = new FormGroup(
    {
      username: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        asyncValidators: [this.uniqueUsernameValidator.validate],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      }),
      passwordConfirmation: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      }),
    },
    { validators: [this.matcher.match('password', 'passwordConfirmation')] }
  );

  constructor(
    private readonly matcher: Matcher,
    private readonly uniqueUsernameValidator: UniqueUsernameValidator,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.invalid) return;
    const { value } = this.form;

    this.auth.signup(<any>value).subscribe({
      next: (response) => console.log(response.username),
      error: (error) => this.handleSignupError(error),
    });
  }

  handleSignupError(error: unknown) {
    if (error instanceof HttpErrorResponse && !error.status) {
      this.form.setErrors({ noConnection: true });
      return;
    }

    this.form.setErrors({ unknown: true });
  }
}
