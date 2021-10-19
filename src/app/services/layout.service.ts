import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private _httpClient: HttpClient) {
    if (sessionStorage.getItem('_ud') !== undefined && sessionStorage.getItem('_ud') !== null && sessionStorage.getItem('_ud') !== '') {
      // userToken = JSON.parse(sessionStorage.getItem('_ud'))[0].token
    }
  }

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
  getUserList(userRole) {
    return this._httpClient.get<any>(`${environment.apiUrl}/user/` + userRole).pipe(
      map(response => {
        return response;
      })
    );
  }
  getLookupList(body) {
    return this._httpClient.post<any>(`${environment.apiUrl}/lookup`,body).pipe(
      map(response => {
        return response;
      })
    );
  }

}
