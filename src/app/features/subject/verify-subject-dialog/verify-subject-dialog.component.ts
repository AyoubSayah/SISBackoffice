import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectConstants } from 'src/app/core/constants/Subjects.Layout.constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Subscription } from 'rxjs';
import { getSubjects } from '../subject-store/selectors';
import { SubjectsService } from 'src/app/core/services/subjects/subjects.service';
import { verifySubject } from '../subject-store/actions';

@Component({
  selector: 'app-verify-subject-dialog',
  templateUrl: './verify-subject-dialog.component.html',
  styleUrls: ['./verify-subject-dialog.component.scss']
})
export class VerifySubjectDialogComponent implements OnInit {
  subjectConstants = SubjectConstants;
  subjectSubscription = new Subscription();
  subject: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store<AppState>,
    private subjectService: SubjectsService
  ) {


    this.subject = { id: 1, departement: '', description: '', niveau: '', proposepar: '', statut: '', sujet: '', technologie: [], type: '' };
  }

  ngOnInit(): void {
    this.subjectSubscription = this.store.select(getSubjects).subscribe(subjects => {

      this.subject = this.subjectService.convertSubject(subjects, this.data);
    });

  }
  verify() {
    this.store.dispatch(verifySubject({ Id: this.data }));
  }

}
