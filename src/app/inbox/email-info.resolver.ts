import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { Email, EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class EmailInfoResolver implements Resolve<Email> {
  cache: Map<Email['id'], Email> = new Map();

  constructor(private readonly email: EmailService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> {
    const emailId = route.params['id'];
    const email = this.retrieveEmail(emailId);

    return email ? of(email) : this.fetchEmailData(emailId);
  }

  private fetchEmailData(emailId: any): Observable<Email> {
    return this.email.getEmailData(emailId).pipe(tap((email) => this.cacheEmail(email)));
  }

  private retrieveEmail(id: Email['id']): Email | undefined {
    return this.cache.get(id);
  }

  private cacheEmail(email: Email): void {
    this.cache.set(email.id, email);
  }

  private handleError(err: any): Observable<Error> {
    const isNotFoundError = err instanceof HttpErrorResponse && err.error.error;
    if (isNotFoundError) {
      return of(new Error('Email Not Found'));
    }

    if (!environment.production) {
      console.error(err);
    }
    return of(new Error('Unknown Error'));
  }
}
