import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs";
import { SubjectStatus } from "src/app/core/services/subjects/subjectEnums/subject.status.enum";
import { SubjectsService } from "src/app/core/services/subjects/subjects.service";
import { setLoadingSpinner } from "src/app/shared/shared-store/actions";
import { AppState } from "src/app/store/app.state";
import { addSubject, canceledSubject, confirmSubject, deleteSubject, editSubject, loadDepartments, loadDepartmentsSucess, loadLevels, loadLevelsSucess, loadPersons, loadPersonsSucess, loadSubjects, loadSubjectsSucess, loadSubjectsWithFilter, loadTechnologys, loadTechnologysSucess, loadTypes, loadTypesSucess, REMOVE_SUBJECT, verifySubject } from "./actions";


@Injectable()
export class subjectsEffects {
  constructor(private actions$: Actions,
    private subjectsService: SubjectsService,
    private store: Store<AppState>
  ) { }
  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadSubjects),
      mergeMap((action) => {

        return this.subjectsService.getSubjects().pipe(
          map((subjects) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loadSubjectsSucess({ subjects });

          })
        );
      }));
  });

  loadSubjectsFilter$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadSubjectsWithFilter),
      mergeMap((action) => {

        return this.subjectsService.getSubjectsWithFilter(action.subject).pipe(
          map((subjects) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loadSubjectsSucess({ subjects });

          })
        );
      }));
  });



  loadTypes$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadTypes),
      mergeMap((action) => {
        return this.subjectsService.getTypes().pipe(
          map((types) => {
            return loadTypesSucess({ types });

          })
        );
      }));
  });

  loadDepartments$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadDepartments),
      mergeMap((action) => {
        return this.subjectsService.getDepartments().pipe(
          map((departments) => {
            return loadDepartmentsSucess({ departments });

          })
        );
      }));
  });


  loadLevels$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadLevels),
      mergeMap((action) => {
        return this.subjectsService.getLevels().pipe(
          map((levels) => {
            return loadLevelsSucess({ levels });

          })
        );
      }));
  });

  loadPersons$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadPersons),
      mergeMap((action) => {
        return this.subjectsService.getPersons().pipe(
          map((persons) => {
            return loadPersonsSucess({ persons });

          })
        );
      }));
  });

  loadTechnologys$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadTechnologys),
      mergeMap((action) => {
        return this.subjectsService.getTechnologys().pipe(
          map((technologys) => {
            return loadTechnologysSucess({ technologys });

          })
        );
      }));
  });
  addSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addSubject),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.subjectsService.addSubject(action.subject);
      }),


    ).pipe(map(e => {
      this.store.dispatch(loadSubjects());
      return e;
    }));
  }, { dispatch: false });


  editSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editSubject),
      mergeMap((action) => {
        return this.subjectsService.editSubject(action.subject);
      }),


    ).pipe(map(e => {
      this.store.dispatch(loadSubjects());
      return e;
    }));
  }, { dispatch: false });


  removeSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteSubject),
      mergeMap((action) => {

        return this.subjectsService.removeSubject(action.Id);
      }),


    ).pipe(map(e => {
      this.store.dispatch(loadSubjects());
      return e;
    }));
  }, { dispatch: false });
  verifySubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(verifySubject),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.subjectsService.statusSubject(action.Id, SubjectStatus.VALID);
      }),


    ).pipe(map(e => {
      this.store.dispatch(loadSubjects());
      return e;
    }));
  }, { dispatch: false });
  confirmSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(confirmSubject),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.subjectsService.statusSubject(action.Id, SubjectStatus.CONFIRMED);
      }),


    ).pipe(map(e => {
      this.store.dispatch(loadSubjects());
      return e;
    }));
  }, { dispatch: false });

  cancelSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canceledSubject),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return this.subjectsService.statusSubject(action.Id, SubjectStatus.CANCELED);
      }),


    ).pipe(map(e => {
      this.store.dispatch(loadSubjects());
      return e;
    }));
  }, { dispatch: false });

}
