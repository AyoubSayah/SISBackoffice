import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SubjectConstants } from 'src/app/core/constants/Subjects.Layout.constants';
import { SubjectsService } from 'src/app/core/services/subjects/subjects.service';
import { AppState } from 'src/app/store/app.state';
import { canceledSubject, deleteSubject } from '../subject-store/actions';
import { getSubjects } from '../subject-store/selectors';

@Component({
  selector: 'app-cancel-subeject-dialog',
  templateUrl: './cancel-subeject-dialog.component.html',
  styleUrls: ['./cancel-subeject-dialog.component.scss']
})
export class CancelSubejectDialogComponent implements OnInit {

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
  cancelSubject = () => {


    this.store.dispatch(canceledSubject({ Id: this.data }));
  };


}
