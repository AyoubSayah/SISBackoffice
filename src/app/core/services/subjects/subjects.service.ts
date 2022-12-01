import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from './models/department.model';
import { Level } from './models/level.model';
import { PostedBy } from './models/postedBy.model';
import { ISubject } from './models/subject';
import { Subject } from './models/subject.model';
import { Technology } from './models/technologie.model';
import { Type } from './models/type.model';
import { ADD_SUBJECTS_ROUTE, DEPARTMENTS_ROUTE, EDIT_SUBJECTS_ROUTE, LEVELS_ROUTE, PERSONS_ROUTE, REMOVE_SUBJECTS_ROUTE, STATUS_SUBJECTS_ROUTE, SUBJECTS_ROUTE, TECHNOLOYS_ROUTE, TYPES_ROUTE } from './RoutesApi/subject.routes';
import {Role} from "./models/role.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }
  getSubjects = () => {
    return of([{
      subjectId: 0,
      title: 'subject 1',
      description: 'subject description 1',
      technologies: [{
        technologyId: 1,
        technologyName: 'tech 1'
      }],
      level: {
        levelId: 1,
        levelName: 'level 1'
      },
      type: {
        typeId: 1,
        typeName: 'type 1'
      },
      postedBy: {
        personId: 1,
        username: 'user 1',
        firstName: 'user firstName',
        lastName: 'user lastName',
        fullName: 'user fullName',
        gender: 'M',
        hasPermission: true,
        role: {
          roleId: 1,
          roleName: 'role 1'
        },
        department: {
          departmentId: 1,
          departmentName: 'departmentName'
        }
      },
      subjectState: 'subjectState',
    },
      {
        subjectId: 1,
        title: 'subject 2',
        description: 'subject description 2',
        technologies: [{
          technologyId: 2,
          technologyName: 'tech 2'
        }],
        level: {
          levelId: 2,
          levelName: 'level 2'
        },
        type: {
          typeId: 2,
          typeName: 'type 2'
        },
        postedBy: {
          personId: 2,
          username: 'user 2',
          firstName: 'user firstName',
          lastName: 'user lastName',
          fullName: 'user fullName',
          gender: 'M',
          hasPermission: true,
          role: {
            roleId: 2,
            roleName: 'role 2'
          },
          department: {
            departmentId: 2,
            departmentName: 'departmentName'
          }
        },
        subjectState: 'subjectState',
      },
      {
        subjectId: 2,
        title: 'subject 3',
        description: 'subject description 3',
        technologies: [{
          technologyId: 3,
          technologyName: 'tech 3'
        }],
        level: {
          levelId: 3,
          levelName: 'level 3'
        },
        type: {
          typeId: 3,
          typeName: 'type 3'
        },
        postedBy: {
          personId: 3,
          username: 'user 3',
          firstName: 'user firstName',
          lastName: 'user lastName',
          fullName: 'user fullName',
          gender: 'M',
          hasPermission: true,
          role: {
            roleId: 3,
            roleName: 'role 3'
          },
          department: {
            departmentId: 3,
            departmentName: 'departmentName'
          }
        },
        subjectState: 'subjectState',
      },
      {
        subjectId: 3,
        title: 'subject 4',
        description: 'subject description 4',
        technologies: [{
          technologyId: 4,
          technologyName: 'tech 4'
        }],
        level: {
          levelId: 4,
          levelName: 'level 4'
        },
        type: {
          typeId: 4,
          typeName: 'type 4'
        },
        postedBy: {
          personId: 4,
          username: 'user 4',
          firstName: 'user firstName',
          lastName: 'user lastName',
          fullName: 'user fullName',
          gender: 'M',
          hasPermission: true,
          role: {
            roleId: 4,
            roleName: 'role 4'
          },
          department: {
            departmentId: 4,
            departmentName: 'departmentName'
          }
        },
        subjectState: 'subjectState',
      },]).pipe(
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
