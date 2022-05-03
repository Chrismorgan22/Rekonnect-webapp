import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  userToken: any = '';
  constructor(private _httpClient: HttpClient) {
    if (
      sessionStorage.getItem('_ud') !== undefined &&
      sessionStorage.getItem('_ud') !== null &&
      sessionStorage.getItem('_ud') !== ''
    ) {
      this.userToken = JSON.parse(sessionStorage.getItem('_ud'))[0].token;
    }
  }

  getUserList(userRole) {
    return this._httpClient
      .get<any>(`${environment.apiUrl}/user/` + userRole)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getLookupList(body) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/lookup`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getUserProfile(userId) {
    const httpOptions = {
      headers: new HttpHeaders().set('token', `${this.userToken}`),
    };
    return this._httpClient
      .get<any>(`${environment.apiUrl}/user/profile/` + userId, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getStateList() {
    const body = {
      country: 'India',
    };
    return this._httpClient
      .post<any>('https://countriesnow.space/api/v0.1/countries/states', body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  filterUser(search: string) {
    return this._httpClient
      .post<any>(`${environment.apiUrl}/user/filter`, {
        search,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  paginateUsers(page: any, limit: any) {
    return this._httpClient
      .post<any>(
        `${environment.apiUrl}/user/paginate?page=${page}&limit=${limit}`,
        {
          null: '',
        }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  paginateCandidates(json: any) {
    return this._httpClient
      .get<any>(
        `${environment.apiUrl}/candidate/fetch/paginate?page=${json.page}&limit=${json.limit}`
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
