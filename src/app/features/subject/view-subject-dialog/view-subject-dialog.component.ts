import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SubjectsService } from 'src/app/core/services/subjects/subjects.service';
import { AppState } from 'src/app/store/app.state';
import { SubjectConstants } from '../../../core/constants/Subjects.Layout.constants';
import { getSubjects } from '../subject-store/selectors';

@Component({
  selector: 'app-view-subject-dialog',
  templateUrl: './view-subject-dialog.component.html',
  styleUrls: ['./view-subject-dialog.component.scss']
})
export class ViewSubjectDialogComponent implements OnInit {
  subject: any;
  subjectConstants = SubjectConstants;
  subjectSubscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store<AppState>, private subjectService: SubjectsService) {


    this.subject = { id: 1, departement: '', description: '', niveau: '', proposepar: '', statut: '', sujet: '', technologie: [], type: '' };
  }

  ngOnInit(): void {

    this.subjectSubscription = this.store.select(getSubjects).subscribe(subjects => {

      this.subject = this.subjectService.convertSubject(subjects, this.data);
    });


  }
  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();

  }

}
