import { AuthService } from '../../../core/services/auth/auth.service';
import { exhaustMap, map } from 'rxjs/operators';
import { autoLogin, autoLogout, loginStart, loginSuccess } from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { setErrorMessage, setLoadingSpinner } from 'src/app/shared/shared-store/actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { of, catchError, tap, mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage();
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          if (action.redirect) {

            this.router.navigate(['/subjects']);
          }
        })
      );
    },
    { dispatch: false }
  );
  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        mergeMap((action) => {
          const user = this.authService.getUserFromLocalStorage();
          return of(loginSuccess({ user, redirect: true }));
        })
      );
    }
  );

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogout),
      tap(actions => {
        this.authService.logout();
        this.router.navigateByUrl('');
      })
    );
  }, { dispatch: false });


}
