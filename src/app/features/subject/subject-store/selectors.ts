import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubjectsState } from "./state";

export const SUBJECT_STATE_NAME = 'subjects';
const getSubjectsState = createFeatureSelector<SubjectsState>(SUBJECT_STATE_NAME);

export const getSubjects = createSelector(getSubjectsState, (state) => {
  return state.subjects;
});
export const getPersons = createSelector(getSubjectsState, (state) => {
  return state.persons;
});
export const getTypes = createSelector(getSubjectsState, (state) => {
  return state.types;
});
export const getDepartments = createSelector(getSubjectsState, (state) => {
  return state.departments;
});
export const getLevels = createSelector(getSubjectsState, (state) => {
  return state.levels;
});
export const getTechnologys = createSelector(getSubjectsState, (state) => {
  return state.technologys;
});

