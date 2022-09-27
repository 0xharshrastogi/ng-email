import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  isAuthenticated$: Observable<boolean | null> = this.auth.authStatus$;

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canLoad(
    _route: Route,
    _segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isAuthenticated$.pipe(
      skipWhile((status: any) => status === null),
      take(1),
      tap((status) => {
        const ROOT_ROUTE = '/';
        if (status === false) this.router.navigate([ROOT_ROUTE]);
      })
    );
  }
}
