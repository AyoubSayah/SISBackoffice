import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./state";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return localStorage.getItem('userData') ? true : false;
});
export const getToken = createSelector(getAuthState, state => {
  return state.user ? state.user.token : null;
});

export const getLoogedOutState = createSelector(getAuthState, state => {
  return state.loggedOut ? state.loggedOut : null;
});

export const getConnectedStatus = createSelector(getAuthState, state => {
  return state.isConnected;
});
