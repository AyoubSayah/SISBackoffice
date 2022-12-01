import { AuthReducer } from "../features/auth/auth-store/reducer";
import { AUTH_STATE_NAME } from "../features/auth/auth-store/selectors";
import { AuthState } from "../features/auth/auth-store/state";
import { subjectsReducer } from "../features/subject/subject-store/reducer";
import { SUBJECT_STATE_NAME } from "../features/subject/subject-store/selectors";
import { SubjectsState } from "../features/subject/subject-store/state";
import { SharedReducer } from "../shared/shared-store/reducer";
import { SHARED_STATE_NAME } from "../shared/shared-store/selectors";
import { SharedState } from "../shared/shared-store/state";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [SUBJECT_STATE_NAME]: SubjectsState;


}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [SUBJECT_STATE_NAME]: subjectsReducer,
};
