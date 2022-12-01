import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { SubjectConstants } from "src/app/core/constants/Subjects.Layout.constants";
import { Department } from "src/app/core/services/subjects/models/department.model";
import { Level } from "src/app/core/services/subjects/models/level.model";
import { PostedBy } from "src/app/core/services/subjects/models/postedBy.model";
import { Technology } from "src/app/core/services/subjects/models/technologie.model";
import { Type } from "src/app/core/services/subjects/models/type.model";
import { loadDepartments, loadPersons, loadSubjects, loadSubjectsSucess, loadSubjectsWithFilter } from "src/app/features/subject/subject-store/actions";
import { getDepartments, getLevels, getPersons, getSubjects, getTechnologys, getTypes } from "src/app/features/subject/subject-store/selectors";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "../shared-store/actions";



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  isClose: boolean = false;
  persons: Subscription;
  subjectConstants = SubjectConstants;
  personsTab: PostedBy[] = [];
  filterForm = new FormGroup({
    person: new FormControl(''),
    department: new FormControl(''),
    type: new FormControl(''),
    level: new FormControl(''),
    technology: new FormControl(''),
  });

  types$ = new Observable<Type[]>();
  level$ = new Observable<Level[]>();
  persons$ = new Observable<PostedBy[]>();
  technologys$ = new Observable<Technology[]>();
  departments$ = new Observable<Department[]>();


  constructor(private store: Store<AppState>) {
  }
  ngOnDestroy(): void {
    this.persons.unsubscribe();
  }


  ngOnInit() {
    this.store.dispatch(loadDepartments());
    this.store.dispatch(loadPersons());
    this.types$ = this.store.select(getTypes);
    this.level$ = this.store.select(getLevels);
    this.technologys$ = this.store.select(getTechnologys);
    this.persons$ = this.store.select(getPersons);
    this.departments$ = this.store.select(getDepartments);
    this.persons = this.persons$.subscribe(e => {


      this.personsTab = e.map(e => e);
    });



  }
  comboChange(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
    }

  }

  displayFn(person: PostedBy): string {


    return person ? person.fullName : '';
  }
  cancel() {
    this.filterForm.get('level')?.setValue('');
    this.filterForm.get('technology')?.setValue('');
    this.filterForm.get('type')?.setValue('');
    this.filterForm.get('person')?.setValue('');
    this.filterForm.get('department')?.setValue('');


    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loadSubjects());
  }
  filter = (e: SubmitEvent) => {
    e.preventDefault();
    const level = this.filterForm.get('level')?.value;
    const technology = this.filterForm.get('technology')?.value as number[];
    const type = this.filterForm.get('type')?.value;
    const person = this.filterForm.get('person')?.value;
    const department = this.filterForm.get('department')?.value;


    let subject: any = {};
    if (level) {
      subject.levelId = level;
    }
    if (technology.length) {

      subject.technologiesIds = technology;
    }
    if (type) {
      subject.typeId = type;
    }
    if (person) {
      subject.postedById = person.personId;
    }
    if (department) {
      subject.departmentId = department;
    }

    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loadSubjectsWithFilter({ subject }));


  };

}
