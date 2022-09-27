import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

import { AuthService } from '../Services/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private readonly auth: AuthService) {}

  validate = (
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const username = control.value as string;

    return this.auth.validateUsername(username).pipe(
      map(() => null),
      catchError((responseError: unknown) => {
        if (
          responseError instanceof HttpErrorResponse &&
          'username' in responseError.error
        )
          return of({
            uniqueUsername: true,
            message: responseError.error['username'],
          });

        return of({ noConnection: true, message: 'Something went wrong' });
      })
    );
  };
}
