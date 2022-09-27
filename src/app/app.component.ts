import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.auth.checkIsAuthenticated().subscribe();
  }
}
