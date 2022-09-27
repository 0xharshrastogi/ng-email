import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService, Credential } from '../Services/auth.service';

type SigninHttpError = {
  username: string;
  password: string;
};

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
    }),
  });

  isSubmitting = false;

  error?: Error | null;

  constructor(private readonly auth: AuthService, private readonly router: Router) {
    this.form.valueChanges.subscribe(() => {
      if (!this.error) return;
      this.error = null;
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.form.invalid) return;
    const { value: credential } = this.form;

    this.isSubmitting = true;

    this.auth
      .signin(<Credential>credential)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => this.handleSuccessSignin(),
        error: (error) => this.handleSigninError(error),
      });
  }

  handleSuccessSignin(): void {
    const ROOT_ROUTE = 'inbox';
    this.router.navigate([ROOT_ROUTE]);
  }

  handleSigninError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      const signinError: SigninHttpError = error.error;
      this.error = new Error('Username not found or password is incorrect');
    }
  }
}
