import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  listEmails$ = this.email.getEmails();

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly email: EmailService) {}

  ngOnInit(): void {
    this.listEmails$.subscribe();
  }

  displayEmail(emailId: string) {
    this.router.navigate([emailId], { relativeTo: this.route });
  }
}
