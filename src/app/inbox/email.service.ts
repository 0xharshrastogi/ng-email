import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

export type EmailSummery = {
  id: string;
  subject: string;
  from: string;
};

export type Email = {
  id: string;
  subject: string;
  text: string;
  to: string;
  from: string;
  html: string;
};

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  static emailServe = environment.services.emailServer;

  constructor(private readonly http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummery[]>(EmailService.emailServe.listAllEmails);
  }

  getEmailData(id: string) {
    const uri = EmailService.emailServe.baseUri + '/emails/' + id;
    return this.http.get<Email>(uri);
  }
}
