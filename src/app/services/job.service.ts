import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JobService {
  private _url: string = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get<any>(`${this._url}/JobCopy/getAll`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  postJobs(job) {
    return this.http.post<any>(`${this._url}/JobCopy/addOne`, job).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
