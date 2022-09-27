import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { EmailCreateOrReply } from 'src/app/inbox/email-form/email-form.component';

import { environment } from 'src/environments/environment';

export type Credential = {
  username: string;
  password: string;
};

interface SignupCredentials extends Credential {
  passwordConfirmation: string;
}

class AuthContext {
  constructor(public username: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public context?: AuthContext;
  private readonly emailServerUri = environment.services.emailServer;
  private readonly serviceConfiguration = environment.config.authService;
  private readonly _authStatus$ = new BehaviorSubject(this.serviceConfiguration.initialAuthStatus);

  get authStatus$() {
    return this._authStatus$.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  validateUsername(username: string) {
    const uri = this.emailServerUri.validateUsername;

    return this.http.post<{ available: boolean }>(uri, { username });
  }

  signin(credential: Credential) {
    const uri = this.emailServerUri.signin;

    return this.http.post<{ username: string }>(uri, credential).pipe(
      tap((userData) => this.saveToContext(userData)),
      tap(() => this._authStatus$.next(true))
    );
  }

  private saveToContext(userData: { username: string }): void {
    this.context = new AuthContext(userData.username);
  }

  signup(userData: SignupCredentials) {
    const uri = this.emailServerUri.signup;

    return this.http.post<Pick<Credential, 'username'>>(uri, userData).pipe(
      tap((userData) => this.saveToContext(userData)),
      tap(() => this._authStatus$.next(true))
    );
  }

  checkIsAuthenticated() {
    const uri = this.emailServerUri.signedin;

    return this.http.get<{ authenticated: boolean; username: string }>(uri).pipe(
      tap((userData) => userData.authenticated && this.saveToContext(userData)),
      tap((value) => this._authStatus$.next(value.authenticated))
    );
  }

  signout() {
    const uri = this.emailServerUri.signout;
    return this.http.post(uri, {}).pipe(
      tap(() => (this.context = undefined)),
      tap(() => this._authStatus$.next(false))
    );
  }

  sendEmail(email: EmailCreateOrReply) {
    const uri = this.emailServerUri.listAllEmails;
    return this.http.post<unknown>(uri, email);
  }
}
