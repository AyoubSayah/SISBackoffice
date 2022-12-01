import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Output, EventEmitter, Component, ViewChild, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { _MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Subject } from 'src/app/core/services/subjects/models/subject.model';
import { SubjectStatus } from 'src/app/core/services/subjects/subjectEnums/subject.status.enum';
import { getSubjects } from 'src/app/features/subject/subject-store/selectors';
import { AppState } from 'src/app/store/app.state';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, AfterViewInit, OnInit, OnDestroy {
  subjectStatus = SubjectStatus;
  @Input() searchData = '';
  displayedColumns: string[] = ['sujet', 'description', 'type', 'technologie', 'proposepar', 'departement', 'niveau', 'statut', 'action'];
  tableDataSubscription$: Subscription = new Subscription();

  dataSource = new _MatTableDataSource<{
    id: number,
    sujet: string,
    description: string,
    type: string,
    technologie: string,
    proposepar: string,
    departement: string,
    niveau: string,
    statut: string;
  }>();
  @Output() subjectEvent = new EventEmitter<{ action: string, subjectID?: number; }>();
  @Input() search: string;
  subjectdatatable: {
    id: number,
    sujet: string,
    description: string,
    type: string,
    technologie: string,
    proposepar: string,
    departement: string,
    niveau: string,
    statut: string;
  }[] = [];
  subjectTable: Subject[] = [];
  constructor(private _liveAnnouncer: LiveAnnouncer, private store: Store<AppState>) {

    this.tableDataSubscription$ = this.store.select(getSubjects).subscribe((subjects) => {
      this.subjectTable = subjects;
      this.dataSource.data = subjects.map(e => {
        return {
          id: e.subjectId,
          sujet: e.title,
          description: e.description,
          type: e.type ? e.type.typeName : '',
          technologie: e.technologies.map(e => e.technologyName).join(','),
          proposepar: e.postedBy ? e.postedBy.fullName : '',
          departement: e.postedBy ? (e.postedBy.department ? e.postedBy.department.departmentName : '') : '',
          niveau: e.level ? e.level.levelName : '',
          statut: e.subjectState
        };
      });
      this.subjectdatatable = this.dataSource.data;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {



    this.dataSource.data = [...this.subjectdatatable.filter(e => e.sujet.toUpperCase().includes(this.search.toUpperCase()) || e.description.toUpperCase().includes(this.search.toUpperCase()) || e.departement.toUpperCase().includes(this.search.toUpperCase()) || e.niveau.toUpperCase().includes(this.search.toUpperCase()) || e.technologie.toUpperCase().includes(this.search.toUpperCase()) || e.type.includes(this.search))];

  }
  ngOnDestroy(): void {
    this.tableDataSubscription$.unsubscribe();
  }
  ngOnInit(): void {




  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  announceSortChange(sortState: any) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  addItem() {
    this.subjectEvent.emit({ action: '[ADD]' });
  }
  verifyItem(id: number) {
    this.subjectEvent.emit({ action: '[VERIFY]', subjectID: id });
  }
  confirmItem(id: number) {
    this.subjectEvent.emit({ action: '[CONFIRM]', subjectID: id });
  }
  editItem(id: number) {
    this.subjectEvent.emit({ action: '[EDIT]', subjectID: id });
  }
  showItem(id: number) {

    this.subjectEvent.emit({ action: '[SHOW]', subjectID: id });
  }
  removeItem(id: number) {
    this.subjectEvent.emit({ action: '[REMOVE]', subjectID: id });
  }
  historyItem(id: number) {
    this.subjectEvent.emit({ action: '[HISTORY]', subjectID: id });
  }
  annulerItem(id: number) {
    this.subjectEvent.emit({ action: '[CANCELED]', subjectID: id });
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
  hasAccess = (id: number): boolean => {
    const [subject] = this.subjectTable.filter(e => e.subjectId === id);
    const userDataString = localStorage.getItem('userData');
    let userData;
    if (userDataString) {
      userData = JSON.parse(userDataString);


    }
    if (userData) {
      let collaborator = userData.collaboratorsIds as number[];
      collaborator = collaborator.filter(e => e === subject.postedBy.personId);
      if (collaborator.length) {
        return false;
      }
      if (subject.postedBy.personId === userData.id) {
        return false;
      }

    }
    return true;
  };
  hasManagerAccess = (id: number): boolean => {
    const [subject] = this.subjectTable.filter(e => e.subjectId === id);
    const userDataString = localStorage.getItem('userData');
    let userData;
    if (userDataString) {
      userData = JSON.parse(userDataString);


    }
    if (userData) {
      let collaborator = userData.collaboratorsIds as number[];
      collaborator = collaborator.filter(e => e === subject.postedBy.personId);


      if (collaborator.length) {
        return false;
      }
    }
    return true;
  };

}
