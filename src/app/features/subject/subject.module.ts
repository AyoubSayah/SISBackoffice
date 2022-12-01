import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from 'src/app/shared/elements/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewSubjectDialogComponent } from './view-subject-dialog/view-subject-dialog.component';
import { EditSubjectDialogComponent } from './edit-subject-dialog/edit-subject-dialog.component';
import { RemoveSubjectDialogComponent } from './remove-subject-dialog/remove-subject-dialog.component';
import { AddSubjectDialogComponent } from './add-subject-dialog/add-subject-dialog.component';
import { VerifySubjectDialogComponent } from './verify-subject-dialog/verify-subject-dialog.component';
import { ConfirmSubjectDialogComponent } from './confirm-subject-dialog/confirm-subject-dialog.component';
import { SubjectHistoryDialogComponent } from './subject-history-dialog/subject-history-dialog.component';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { subjectsEffects } from './subject-store/effects';
import { SUBJECT_STATE_NAME } from './subject-store/selectors';
import { subjectsReducer } from './subject-store/reducer';
import { CancelSubejectDialogComponent } from './cancel-subeject-dialog/cancel-subeject-dialog.component';
@NgModule({
  declarations: [SubjectComponent,
    ViewSubjectDialogComponent, EditSubjectDialogComponent,
    RemoveSubjectDialogComponent, AddSubjectDialogComponent,
    VerifySubjectDialogComponent, ConfirmSubjectDialogComponent,
    SubjectHistoryDialogComponent,
    CancelSubejectDialogComponent],
  imports: [SharedModule,
    CommonModule, MatDialogModule, SubjectsRoutingModule,
    StoreModule.forFeature(SUBJECT_STATE_NAME, subjectsReducer),
    EffectsModule.forFeature([subjectsEffects]),
  ],
  entryComponents: [DialogComponent],

})
export class SubjectModule { }
