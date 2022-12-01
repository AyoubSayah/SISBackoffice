import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/shared-store/actions';
import { getErrorMessage, getLoading } from 'src/app/shared/shared-store/selectors';
import { AppState } from 'src/app/store/app.state';
import { LoginConstants } from '../../../core/constants/Login.Layout.Constants';
import { loginStart } from '../auth-store/actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  showLoading$: Observable<boolean> = new Observable<boolean>();
  showErrorMessage$: Observable<string> = new Observable<string>();
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3),]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3),]),
  });
  usernameErrors = {
    required: false,
    maxLength: false,
    minLength: false
  };

  loginConstants = LoginConstants;
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.showErrorMessage$ = this.store.select(getErrorMessage);

  }


  usernameError() {
    const { dirty, touched, errors } = this.authForm.controls['username'];
    if (errors && dirty && touched) {
      if (errors['maxlength']) {
        return 'maxlength';
      }
      if (errors['minlength']) {
        return 'minlength';
      }
      if (errors['required']) {
        return 'required';
      }

    }
    return '';
  }
  passwordError() {
    const { dirty, touched, errors } = this.authForm.controls['password'];
    if (errors && dirty && touched) {
      if (errors['maxlength']) {
        return 'maxlength';
      }
      if (errors['minlength']) {
        return 'minlength';
      }
      if (errors['required']) {
        return 'required';
      }

    }
    return '';
  }
  login = () => {
    this.authForm.controls['password'].markAsTouched({ onlySelf: true });
    this.authForm.controls['password'].markAsDirty({ onlySelf: true });
    this.authForm.controls['username'].markAsTouched({ onlySelf: true });
    this.authForm.controls['username'].markAsDirty({ onlySelf: true });

    if (this.authForm.status === 'VALID') {

      const username: string = this.authForm.controls['username'].value;
      const password: string = this.authForm.controls['password'].value;

      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(loginStart({ username, password }));
    }

  };

}

