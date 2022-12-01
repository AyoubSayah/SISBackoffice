import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AddSubjectConstants } from 'src/app/core/constants/AddSubjectErrorMessage.constants';
import { Level } from 'src/app/core/services/subjects/models/level.model';
import { PostedBy } from 'src/app/core/services/subjects/models/postedBy.model';
import { Subject } from 'src/app/core/services/subjects/models/subject.model';
import { Technology } from 'src/app/core/services/subjects/models/technologie.model';
import { Type } from 'src/app/core/services/subjects/models/type.model';
import { SubjectsService } from 'src/app/core/services/subjects/subjects.service';
import { DialogComponent } from 'src/app/shared/elements/dialog/dialog.component';
import { setLoadingSpinner } from 'src/app/shared/shared-store/actions';
import { AppState } from 'src/app/store/app.state';
import { SubjectConstants } from '../../../core/constants/Subjects.Layout.constants';
import { addSubject, editSubject, loadSubjects } from '../subject-store/actions';
import { getLevels, getPersons, getSubjects, getTechnologys, getTypes } from '../subject-store/selectors';


@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrls: ['./edit-subject-dialog.component.scss']
})
export class EditSubjectDialogComponent implements OnInit, OnDestroy {
  isClose: boolean = false;
  subjectSubscription = new Subscription();
  subject: Subject;
  types$ = new Observable<Type[]>();
  level$ = new Observable<Level[]>();
  persons$ = new Observable<PostedBy[]>();
  technologys$ = new Observable<Technology[]>();
  editSubjectForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
    type: new FormControl(''),
    level: new FormControl(''),
    technology: new FormControl(''),
  });
  subjectConstants = SubjectConstants;
  addsubjectErrors = AddSubjectConstants;





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<DialogComponent>,
    private subjectService: SubjectsService) { }
  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  }


  ngOnInit() {
    this.types$ = this.store.select(getTypes);
    this.level$ = this.store.select(getLevels);
    this.technologys$ = this.store.select(getTechnologys);
    this.persons$ = this.store.select(getPersons);
    this.subjectSubscription = this.store.select(getSubjects).subscribe(subjects => {

      [this.subject] = subjects.filter(e => e.subjectId === this.data);
      this.editSubjectForm.get('title')?.setValue(this.subject.title);
      this.editSubjectForm.get('description')?.setValue(this.subject.description);
      if (this.subject.type) {
        this.editSubjectForm.get('type')?.setValue(this.subject.type.typeId);
      }

      if (this.subject.level) {
        this.editSubjectForm.get('level')?.setValue(this.subject.level.levelId);
      }
      if (this.subject.technologies.length > 0) {
        const technologys = this.subject.technologies.map(e => e.technologyId);
        this.editSubjectForm.get('technology')?.setValue(technologys);
      }


    });

  }





  comboChange(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
    }

  }
  titleError() {
    const { dirty, touched, errors } = this.editSubjectForm.controls['title'];
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
    const { dirty, touched, errors } = this.editSubjectForm.controls['description'];
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


    this.editSubjectForm.controls['title'].markAsTouched({ onlySelf: true });
    this.editSubjectForm.controls['title'].markAsDirty({ onlySelf: true });
    this.editSubjectForm.controls['description'].markAsTouched({ onlySelf: true });
    this.editSubjectForm.controls['description'].markAsDirty({ onlySelf: true });

    if (this.editSubjectForm.status === 'VALID') {

      const title: string = this.editSubjectForm.controls['title'].value;
      const description: string = this.editSubjectForm.controls['description'].value;
      const type: number = this.editSubjectForm.controls['type'].value;
      const level: number = this.editSubjectForm.controls['level'].value;
      const technology: number[] = this.editSubjectForm.controls['technology'].value;

      this.store.dispatch(setLoadingSpinner({ status: false }));
      const subject = {
        subjectId: this.subject.subjectId,
        title: title,
        description: description,
        technologies: technology ? technology.map(e => { return { technologyId: e, technologyName: '' }; }) : [],
        level: level ? new Level(level, '') : null,
        type: type ? new Type(type, '') : null
      };
      console.log(subject);

      this.store.dispatch(editSubject({ subject }));


      this.dialogRef.close();

    }



  };


}
