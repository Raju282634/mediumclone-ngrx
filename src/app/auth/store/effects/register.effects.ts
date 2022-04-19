import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from './../actions/register.actions';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';

@Injectable()

export class RegisterEffect{
  constructor(private actions$: Actions,
              private authService: AuthService){}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({currentUser}); }),
          catchError(() => of(registerFailureAction()))
          ); }
      )));
}
