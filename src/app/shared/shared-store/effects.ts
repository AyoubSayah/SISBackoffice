import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { autoLogout } from "src/app/features/auth/auth-store/actions";


@Injectable()
export class sharedEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogout),
      map(actions => {
        this.authService.logout();
      })
    );
  }, { dispatch: false });
}
