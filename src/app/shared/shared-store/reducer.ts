import { setLoadingSpinner, setErrorMessage } from './actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import { autoLogout } from 'src/app/features/auth/auth-store/actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }), on(autoLogout, (state, action) => {
    return { ...initialState };
  })
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
