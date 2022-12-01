import { createReducer, on } from "@ngrx/store";
import { autoLogout } from "../../auth/auth-store/actions";
import { loadDepartmentsSucess, loadLevelsSucess, loadPersonsSucess, loadSubjectsSucess, loadTechnologysSucess, loadTypesSucess } from "./actions";
import { initialState } from "./state";

const _subjectReducer = createReducer(
  initialState, on(loadSubjectsSucess, (state, action) => {
    return {
      ...state,
      subjects: action.subjects,
    };
  }),
  on(loadTypesSucess, (state, action) => {
    return {
      ...state,
      types: action.types,
    };
  }),
  on(loadLevelsSucess, (state, action) => {
    return {
      ...state,
      levels: action.levels,
    };
  }),
  on(loadDepartmentsSucess, (state, action) => {
    return {
      ...state,
      departments: action.departments,
    };
  }),
  on(loadTechnologysSucess, (state, action) => {
    return {
      ...state,
      technologys: action.technologys,
    };
  }),
  on(loadPersonsSucess, (state, action) => {
    return {
      ...state,
      persons: action.persons,
    };
  }), on(autoLogout, (state, action) => {
    return { ...initialState };
  })
);
export function subjectsReducer(state: any, action: any) {
  return _subjectReducer(state, action);
}
