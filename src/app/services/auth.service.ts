import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userToken = sessionStorage.getItem('_ud') !== undefined && sessionStorage.getItem('_ud') !== null && sessionStorage.getItem('_ud') !== '' ? JSON.parse(sessionStorage.getItem('_ud'))[0].token : ''
  constructor(private _httpClient: HttpClient) { }

  userLogin(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/user/login`, body).pipe(
      map(response => {
        return response;
      })
    );
  }
  userRegister(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/user/registration`, body).pipe(
      map(response => {
        return response;
      })
    );
  }
  candidateLogin(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/candidate/login`, body).pipe(
      map(response => {
        return response;
      })
    );
  }
  candidateRegister(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/candidate/registration`, body).pipe(
      map(response => {
        return response;
      })
    );
  }
  expertLogin(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/expert/login`, body).pipe(
      map(response => {
        return response;
      })
    );
  }
  expertRegister(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/expert/registration`, body).pipe(
      map(response => {
        return response;
      })
    );
  }
}
