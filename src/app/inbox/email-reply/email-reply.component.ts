import { Component, Input, OnInit } from '@angular/core';
import { Email } from './../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
  @Input() email!: Email;

  constructor() {}

  ngOnInit(): void {}
}
