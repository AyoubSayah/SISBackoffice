import { createAction, props } from "@ngrx/store";
import { Department } from "src/app/core/services/subjects/models/department.model";
import { Level } from "src/app/core/services/subjects/models/level.model";
import { PostedBy } from "src/app/core/services/subjects/models/postedBy.model";
import { ISubject } from "src/app/core/services/subjects/models/subject";
import { Technology } from "src/app/core/services/subjects/models/technologie.model";
import { Type } from "src/app/core/services/subjects/models/type.model";
import { Subject } from '../../../core/services/subjects/models/subject.model';

export const LOAD_SUBJECTS = '[subects page] load subjects';
export const LOAD_SUBJECTS_SUCCESS = '[subects page] load subjects success';


export const loadSubjects = createAction(LOAD_SUBJECTS);
export const loadSubjectsSucess = createAction(LOAD_SUBJECTS_SUCCESS, props<{ subjects: Subject[]; }>());
export const LOAD_SUBJECTS_FILTER = '[subects page] load filter subjects';


export const loadSubjectsWithFilter = createAction(LOAD_SUBJECTS_FILTER, props<{ subject: any; }>());

export const LOAD_TYPES = '[types page] load types';
export const LOAD_TYPES_SUCCESS = '[types page] load types success';


export const loadTypes = createAction(LOAD_TYPES);
export const loadTypesSucess = createAction(LOAD_TYPES_SUCCESS, props<{ types: Type[]; }>());


export const LOAD_LEVELS = '[levels page] load levels';
export const LOAD_LEVELS_SUCCESS = '[levels page] load levels success';


export const loadLevels = createAction(LOAD_LEVELS);
export const loadLevelsSucess = createAction(LOAD_LEVELS_SUCCESS, props<{ levels: Level[]; }>());

export const LOAD_DEPARTMENTS = '[departments page] load departments';
export const LOAD_DEPARTMENTS_SUCCESS = '[departments page] load departments success';


export const loadDepartments = createAction(LOAD_DEPARTMENTS);
export const loadDepartmentsSucess = createAction(LOAD_DEPARTMENTS_SUCCESS, props<{ departments: Department[]; }>());

export const LOAD_PERSONS = '[persons page] load persons';
export const LOAD_PERSONS_SUCCESS = '[persons page] load persons success';


export const loadPersons = createAction(LOAD_PERSONS);
export const loadPersonsSucess = createAction(LOAD_PERSONS_SUCCESS, props<{ persons: PostedBy[]; }>());

export const LOAD_TECHNOLOGYS = '[technolys page] load technologys';
export const LOAD_TECHNOLOGYS_SUCCESS = '[technolys page] load technologys success';


export const loadTechnologys = createAction(LOAD_TECHNOLOGYS);
export const loadTechnologysSucess = createAction(LOAD_TECHNOLOGYS_SUCCESS, props<{ technologys: Technology[]; }>());


export const ADD_SUBJECT = '[add subject page] add subject';
export const addSubject = createAction(
  ADD_SUBJECT,
  props<{ subject: ISubject; }>()
);


export const EDIT_SUBJECT = '[edit subject page] edit subject';
export const editSubject = createAction(
  EDIT_SUBJECT,
  props<{ subject: ISubject; }>()
);

export const REMOVE_SUBJECT = '[delete subject page] delete subject';
export const deleteSubject = createAction(
  REMOVE_SUBJECT,
  props<{ Id: number; }>()
);
export const VERIFY_SUBJECT = '[verify subject page] verify subject';
export const verifySubject = createAction(
  VERIFY_SUBJECT,
  props<{ Id: number; }>()
);
export const CONFIRM_SUBJECT = '[confirm subject page] confirm subject';
export const confirmSubject = createAction(
  CONFIRM_SUBJECT,
  props<{ Id: number; }>()
);
export const CANCELED_SUBJECT = '[canceled subject page] canceled subject';
export const canceledSubject = createAction(
  CANCELED_SUBJECT,
  props<{ Id: number; }>()
);


