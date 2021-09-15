import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  userToken = sessionStorage.getItem('_ud') !== undefined && sessionStorage.getItem('_ud') !== null && sessionStorage.getItem('_ud') !== '' ? JSON.parse(sessionStorage.getItem('_ud'))[0].token : ''
  constructor(private _httpClient: HttpClient) { }

  getSpecializationList() {
    return this._httpClient.get<any>(`${environment.apiUrl}/specialization`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getLocationList() {
    return this._httpClient.get<any>(`${environment.apiUrl}/location`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getGraduationList() {
    return this._httpClient.get<any>(`${environment.apiUrl}/graduation`).pipe(
      map(response => {
        return response;
      })
    );
  }
  getUserList() {
    return this._httpClient.get<any>(`${environment.apiUrl}/candidate`).pipe(
      map(response => {
        return response;
      })
    );
  }
}
