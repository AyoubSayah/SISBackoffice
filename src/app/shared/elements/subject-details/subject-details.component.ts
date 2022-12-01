import { Component, Input, OnInit } from '@angular/core';
import { SubjectStatus } from 'src/app/core/services/subjects/subjectEnums/subject.status.enum';
import { SubjectConstants } from '../../../core/constants/Subjects.Layout.constants';
@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  @Input() subjectDetails: any;
  subjectConstants = SubjectConstants;
  constructor() {
    this.subjectDetails = { id: 1, departement: '', description: '', niveau: '', proposepar: '', statut: '', sujet: '', technologie: [], type: '' };
  }

  ngOnInit(): void {

  }
  convertStatus(status: string): string {
    switch (status) {
      case SubjectStatus.CANCELED:
        return 'Annuler';
      case SubjectStatus.VALID:
        return 'Vérifier';
      case SubjectStatus.CONFIRMED:
        return 'Confirmer';
      case SubjectStatus.DRAFT:
        return 'Brouillon';

      default:
        return '';
    }

  }

}
