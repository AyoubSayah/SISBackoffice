import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { exhaustMap, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getToken } from "src/app/features/auth/auth-store/selectors";
import { autoLogin } from 'src/app/features/auth/auth-store/actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>,
    private router: Router) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(modifiedReq);
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('userData');
          this.store.dispatch(autoLogin());
          this.router.navigate(['']);
          return throwError(error);
        } else {

          // ken 3andek tostr or modal ta33 error

        }
        return throwError(error);
      })
    );



  }

}



