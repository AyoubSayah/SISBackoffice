import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectConstants } from 'src/app/core/constants/Subjects.Layout.constants';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { SubjectsService } from 'src/app/core/services/subjects/subjects.service';
import { getSubjects } from '../subject-store/selectors';
import { canceledSubject, confirmSubject } from '../subject-store/actions';

@Component({
  selector: 'app-confirm-subject-dialog',
  templateUrl: './confirm-subject-dialog.component.html',
  styleUrls: ['./confirm-subject-dialog.component.scss']
})
export class ConfirmSubjectDialogComponent implements OnInit, OnDestroy {
  subjectConstants = SubjectConstants;
  subjectSubscription = new Subscription();
  subject: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store<AppState>,
    private subjectService: SubjectsService
  ) {


    this.subject = { id: 1, departement: '', description: '', niveau: '', proposepar: '', statut: '', sujet: '', technologie: [], type: '' };
  }
  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subjectSubscription = this.store.select(getSubjects).subscribe(subjects => {

      this.subject = this.subjectService.convertSubject(subjects, this.data);
    });

  }
  confirmSubject = () => {
    this.store.dispatch(confirmSubject({ Id: this.data }));
  };

  cancelSubject = () => {


    this.store.dispatch(canceledSubject({ Id: this.data }));
  };
}
