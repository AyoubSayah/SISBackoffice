import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from './models/department.model';
import { Level } from './models/level.model';
import { PostedBy } from './models/postedBy.model';
import { ISubject } from './models/subject';
import { Subject } from './models/subject.model';
import { Technology } from './models/technologie.model';
import { Type } from './models/type.model';
import { ADD_SUBJECTS_ROUTE, DEPARTMENTS_ROUTE, EDIT_SUBJECTS_ROUTE, LEVELS_ROUTE, PERSONS_ROUTE, REMOVE_SUBJECTS_ROUTE, STATUS_SUBJECTS_ROUTE, SUBJECTS_ROUTE, TECHNOLOYS_ROUTE, TYPES_ROUTE } from './RoutesApi/subject.routes';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }
  getSubjects = () => {
    return this.http.post<Subject[]>(`${environment.baseUrl}${SUBJECTS_ROUTE}`, {}).pipe(
      map((data) => {
        const subjects: Subject[] = [];
        for (let key in data) {
          subjects.push({ ...data[key] });
        }
        return subjects;
      })
    );
  };
  getSubjectsWithFilter = (subject: any) => {
    return this.http.post<Subject[]>(`${environment.baseUrl}${SUBJECTS_ROUTE}`, subject).pipe(
      map((data) => {
        const subjects: Subject[] = [];
        for (let key in data) {
          subjects.push({ ...data[key] });
        }
        return subjects;
      })
    );
  };

  getTypes = () => {
    return this.http.get<Type[]>(`${environment.baseUrl}${TYPES_ROUTE}`).pipe(
      map((data) => {
        const types: Type[] = [];
        for (let key in data) {
          types.push({ ...data[key] });
        }
        return types;
      })
    );
  };
  getLevels = () => {
    return this.http.get<Level[]>(`${environment.baseUrl}${LEVELS_ROUTE}`).pipe(
      map((data) => {
        const levels: Level[] = [];
        for (let key in data) {
          levels.push({ ...data[key] });
        }
        return levels;
      })
    );
  };
  getDepartments = () => {
    return this.http.get<Department[]>(`${environment.baseUrl}${DEPARTMENTS_ROUTE}`).pipe(
      map((data) => {
        const departments: Department[] = [];
        for (let key in data) {
          departments.push({ ...data[key] });
        }
        return departments;
      })
    );
  };
  getPersons = () => {
    return this.http.get<PostedBy[]>(`${environment.baseUrl}${PERSONS_ROUTE}`).pipe(
      map((data) => {
        const personnes: PostedBy[] = [];
        for (let key in data) {
          personnes.push({ ...data[key] });
        }
        return personnes;
      })
    );
  };
  getTechnologys = () => {
    return this.http.get<Technology[]>(`${environment.baseUrl}${TECHNOLOYS_ROUTE}`).pipe(
      map((data) => {
        const technologys: Technology[] = [];
        for (let key in data) {
          technologys.push({ ...data[key] });
        }
        return technologys;
      })
    );
  };
  addSubject = (subject: ISubject): Observable<Subject> => {
    return this.http.post<Subject>(`${environment.baseUrl}${ADD_SUBJECTS_ROUTE}`, subject);
  };
  convertSubject = (subjects: Subject[], data: number) => {
    const [sujet] = subjects.filter(e => e.subjectId === data);
    return {
      id: sujet.subjectId,
      department: sujet.postedBy ? (sujet.postedBy.department ? sujet.postedBy.department.departmentName : '') : '',
      description: sujet.description,
      niveau: sujet.level ? sujet.level.levelName : '',
      proposepar: sujet.postedBy ? sujet.postedBy.fullName : '',
      statut: sujet.subjectState,
      technologie: sujet.technologies.filter(e => e.technologyName),
      sujet: sujet.title,
      type: sujet.type ? sujet.type.typeName : ''
    };
  };


  editSubject = (subject: ISubject): Observable<ISubject> => {
    return this.http.put<ISubject>(`${environment.baseUrl}${EDIT_SUBJECTS_ROUTE}${subject.subjectId}`, subject);
  };


  removeSubject = (Id: number) => {
    return this.http.delete(`${environment.baseUrl}${REMOVE_SUBJECTS_ROUTE}${Id}`);
  };


  statusSubject = (Id: number, status: string) => {
    return this.http.put(`${environment.baseUrl}${STATUS_SUBJECTS_ROUTE}${Id}`, {
      subjectState: status
    });
  };

}
