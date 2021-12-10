import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;

  roleAs: any;

  // userToken = sessionStorage.getItem('_ud') !== undefined && sessionStorage.getItem('_ud') !== null && sessionStorage.getItem('_ud') !== '' ? JSON.parse(sessionStorage.getItem('_ud'))[0].token : ''
  constructor(private _httpClient: HttpClient) {}

  userLogin(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/user/login`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  userRegister(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/user/registration`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  candidateLogin(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/candidate/login`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  candidateRegister(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/candidate/registration`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  employerRegister(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/employer/registration`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  expertLogin(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/expert/login`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  expertRegister(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/expert/registration`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  linkedInLogin(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/candidate/linkedin`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getTempUser(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/user/temp/data`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  saveTempUser(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/user/temp/register`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  saveCandidateRegistration(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/candidate/registration`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  updateCandidateStatus(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/user/update/status`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  adminLogin(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/admin/`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  isLoggedIn() {
    console.log('sssssssssss')
    const loggedIn = sessionStorage.getItem('_ud');
    if (loggedIn !== undefined && loggedIn !== '' && loggedIn !== null) {
      this.isLogin = true;
      return this.isLogin;
    }
    else {
      this.isLogin = false;
      return this.isLogin;
    }
    console.log(this.isLogin)
  }

  getRole() {
    console.log('dssdsdsds')
    this.roleAs = sessionStorage.getItem('_ud');
    console.log(this.roleAs)
    return JSON.parse(this.roleAs)[0].role;
  }
}
