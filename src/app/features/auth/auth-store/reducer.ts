import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { autoLogout, autoLogoutSuccess, loginSuccess } from './actions';
import { initialState, AuthState } from './state';

const _authReducer = createReducer(initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state, user: action.user, isConnected: true
    };
  }),
  on(autoLogout, (state, action) => {
    return {
      ...state,
      isConnected: false
    };
  }),
  on(autoLogoutSuccess, () => {
    return { ...initialState };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
