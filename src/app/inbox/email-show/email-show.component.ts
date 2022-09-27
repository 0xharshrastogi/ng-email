import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map } from 'rxjs';

import { Email, EmailService } from '../email.service';

interface T {
  error: Error | null;
  email: T['error'] extends null ? null : Email;
}

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  error: Error | null = null;
  email: Email | null = null;

  constructor(private readonly route: ActivatedRoute, private readonly emailService: EmailService) {}

  ngOnInit(): void {
    // const emailResponse = this.route.data.pipe(map((data) => <EmailInfo | Error>data['email']));

    this.route.data.pipe(map((data) => <Email>data['email'])).subscribe({
      next: (email) => (this.email = email),
    });

    // this.fetchEmail$.subscribe((email) => (this.emailInfo = email));
  }

  private handleEmailFetchError(error: unknown) {
    const isNotFoundError = error instanceof HttpErrorResponse && !!error.error.error;
    switch (true) {
      case isNotFoundError:
        const httpErrorResponse = error as HttpErrorResponse;
        this.error = new Error(httpErrorResponse.error.error);
        break;
      default:
        this.error = new Error('Something went wrong while fetching email');
    }
    return EMPTY;
  }
}
