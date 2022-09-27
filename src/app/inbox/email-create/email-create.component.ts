import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { EmailCreateOrReply } from '../email-form/email-form.component';
import { Email } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  @Input() mode: 'create' | 'reply' = 'create';
  @Input() email?: Email;

  isModalActive = false;
  username: string = this.auth.context!.username;

  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {}

  handleModalClose() {
    this.isModalActive = false;
  }

  submit(email: EmailCreateOrReply) {
    this.auth.sendEmail(email).subscribe((value) => {
      console.log(value);
      this.isModalActive = false;
    });
  }
}
