import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/shared-store/actions';
import { getLoading } from 'src/app/shared/shared-store/selectors';
import { AppState } from 'src/app/store/app.state';
import { SubjectConstants } from '../../core/constants/Subjects.Layout.constants';
import { AddSubjectDialogComponent } from './add-subject-dialog/add-subject-dialog.component';
import { CancelSubejectDialogComponent } from './cancel-subeject-dialog/cancel-subeject-dialog.component';
import { ConfirmSubjectDialogComponent } from './confirm-subject-dialog/confirm-subject-dialog.component';
import { EditSubjectDialogComponent } from './edit-subject-dialog/edit-subject-dialog.component';
import { RemoveSubjectDialogComponent } from './remove-subject-dialog/remove-subject-dialog.component';
import { SubjectHistoryDialogComponent } from './subject-history-dialog/subject-history-dialog.component';
import { loadLevels, loadSubjects, loadTechnologys, loadTypes } from './subject-store/actions';
import { VerifySubjectDialogComponent } from './verify-subject-dialog/verify-subject-dialog.component';
import { ViewSubjectDialogComponent } from './view-subject-dialog/view-subject-dialog.component';








@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  showLoading$: Observable<boolean> = new Observable<boolean>();
  panelOpenState = false;
  subjectConstants = SubjectConstants;
  search: string = '';
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadTypes());
    this.store.dispatch(loadLevels());
    this.store.dispatch(loadTechnologys());
  }



  ngOnInit() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loadSubjects());
    this.showLoading$ = this.store.select(getLoading);
  }
  openDialog = (e: { action: string, subjectID?: number; }): void => {


    switch (e.action) {
      case '[EDIT]':
        this.dialog.open(EditSubjectDialogComponent, { data: e.subjectID, minWidth: '300px', maxWidth: '500px' });
        break;
      case '[SHOW]':
        this.dialog.open(ViewSubjectDialogComponent, { data: e.subjectID, minWidth: '300px', maxWidth: '500px' });
        break;
      case '[VERIFY]':
        this.dialog.open(VerifySubjectDialogComponent, { data: e.subjectID, minWidth: '300px', maxWidth: '500px' });
        break;
      case '[REMOVE]':
        this.dialog.open(RemoveSubjectDialogComponent, { data: e.subjectID, minWidth: '300px', maxWidth: '500px' });
        break;
      case '[HISTORY]':
        this.dialog.open(SubjectHistoryDialogComponent, { data: e.subjectID });
        break;
      case '[CONFIRM]':
        this.dialog.open(ConfirmSubjectDialogComponent, { data: e.subjectID, minWidth: '300px', maxWidth: '500px' });
        break;
      case '[CANCELED]':
        this.dialog.open(CancelSubejectDialogComponent, { data: e.subjectID, minWidth: '300px', maxWidth: '500px' });
        break;


    }

  };

  addSubject = () => {
    this.dialog.open(AddSubjectDialogComponent, { minWidth: '300px', maxWidth: '500px' });
  };
  change(e: any) {
    console.log(e.target.value);

  }
}
