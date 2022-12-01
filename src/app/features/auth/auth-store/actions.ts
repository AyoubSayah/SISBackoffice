import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/services/auth/models/user.model';
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';
export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout';
export const LOGOUT_ACTION_SUCCESS = '[auth page] logout Success';

export const loginStart = createAction(
  LOGIN_START,
  props<{ username: string; password: string; }>()
);
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User, redirect: boolean; }>());
export const autoLogin = createAction(AUTO_LOGIN_ACTION);

export const autoLogout = createAction(LOGOUT_ACTION);
export const autoLogoutSuccess = createAction(LOGOUT_ACTION_SUCCESS,
  props<{ loggedOut: boolean; }>());
