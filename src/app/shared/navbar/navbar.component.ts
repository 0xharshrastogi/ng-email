import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  isAuthenticated$ = this.auth.authStatus$;

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  signout() {
    const ROOT_ROUTE = '/';
    this.auth.signout().subscribe();
    this.router.navigate([ROOT_ROUTE]);
  }
}
