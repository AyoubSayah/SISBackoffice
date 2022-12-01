import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EMAIL_OR_PASSWORD } from '../../constants/Login.Error.Messages';
import { IAuthResponse } from './models/AuthResponseData.model';
import { User } from './models/user.model';
import { LOGIN_ROUTE } from './RoutesApi/auth.routes.api';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  login = (username: string, password: string): Observable<IAuthResponse> => {
    return this.http.post<IAuthResponse>(`${environment.baseUrl}${LOGIN_ROUTE}`, { username, password });
  };
  formatUser(data: IAuthResponse) {
    const user = new User(
      data.token,
      data.userDto.personId,
      data.userDto.firstName,
      data.userDto.lastName,
      data.userDto.username,
      data.userDto.roleName,
      data.userDto.hasPermission,
      data.userDto.departmentName,
      data.userDto.gender,
      data.userDto.collaboratorsIds
    );
    return user;
  }
  getErrorMessage = () => {
    return EMAIL_OR_PASSWORD;
  };

  setUserInLocalStorage = (user: User) => {
    localStorage.setItem('userData', JSON.stringify(user));
  };
  getUserFromLocalStorage = () => {


    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;

    }
    return null;
  };

  logout = () => {
    console.log('test logout');

    localStorage.clear();
  };

}
