import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddSubjectConstants } from 'src/app/core/constants/AddSubjectErrorMessage.constants';
import { Level } from 'src/app/core/services/subjects/models/level.model';
import { PostedBy } from 'src/app/core/services/subjects/models/postedBy.model';
import { Technology } from 'src/app/core/services/subjects/models/technologie.model';
import { Type } from 'src/app/core/services/subjects/models/type.model';
import { DialogComponent } from 'src/app/shared/elements/dialog/dialog.component';
import { setLoadingSpinner } from 'src/app/shared/shared-store/actions';
import { AppState } from 'src/app/store/app.state';
import { SubjectConstants } from '../../../core/constants/Subjects.Layout.constants';
import { addSubject, loadLevels, loadPersons, loadSubjects, loadTechnologys, loadTypes } from '../subject-store/actions';
import { getLevels, getPersons, getSubjects, getTechnologys, getTypes } from '../subject-store/selectors';





@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent implements OnInit {
  isClose: boolean = false;
  types$ = new Observable<Type[]>();
  level$ = new Observable<Level[]>();
  persons$ = new Observable<PostedBy[]>();
  technologys$ = new Observable<Technology[]>();
  addSubjectForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
    type: new FormControl(''),
    level: new FormControl(''),
    technology: new FormControl(''),
  });
  subjectConstants = SubjectConstants;
  addsubjectErrors = AddSubjectConstants;





  constructor(private store: Store<AppState>, private dialogRef: MatDialogRef<DialogComponent>) {

  }


  ngOnInit() {
    this.types$ = this.store.select(getTypes);
    this.level$ = this.store.select(getLevels);
    this.technologys$ = this.store.select(getTechnologys);
    this.persons$ = this.store.select(getPersons);

  }





  comboChange(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
    }

  }
  titleError() {
    const { dirty, touched, errors } = this.addSubjectForm.controls['title'];
    if (errors && dirty && touched) {
      if (errors['maxlength']) {
        return 'maxlength';
      }
      if (errors['minlength']) {
        return 'minlength';
      }
      if (errors['required']) {
        return 'required';
      }

    }
    return '';
  }
  descriptionError() {
    const { dirty, touched, errors } = this.addSubjectForm.controls['description'];
    if (errors && dirty && touched) {
      if (errors['maxlength']) {
        return 'maxlength';
      }
      if (errors['minlength']) {
        return 'minlength';
      }
      if (errors['required']) {
        return 'required';
      }

    }
    return '';
  }

  ajouter = (e: SubmitEvent) => {
    e.preventDefault();


    this.addSubjectForm.controls['title'].markAsTouched({ onlySelf: true });
    this.addSubjectForm.controls['title'].markAsDirty({ onlySelf: true });
    this.addSubjectForm.controls['description'].markAsTouched({ onlySelf: true });
    this.addSubjectForm.controls['description'].markAsDirty({ onlySelf: true });

    if (this.addSubjectForm.status === 'VALID') {

      const title: string = this.addSubjectForm.controls['title'].value;
      const description: string = this.addSubjectForm.controls['description'].value;
      const type: number = this.addSubjectForm.controls['type'].value;
      const level: number = this.addSubjectForm.controls['level'].value;
      const technology: number[] = this.addSubjectForm.controls['technology'].value;

      this.store.dispatch(setLoadingSpinner({ status: true }));
      const subject = {

        title: title,
        description: description,
        technologies: technology ? technology.map(e => { return { technologyId: e, technologyName: '' }; }) : [],
        level: level ? new Level(level, '') : null,
        type: type ? new Type(type, '') : null
      };
      this.store.dispatch(addSubject({ subject }));

      this.dialogRef.close();

    }



  };

}
