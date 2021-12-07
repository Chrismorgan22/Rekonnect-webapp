import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JobService {
  private _url: string = 'http://api.rekonnect.in';
  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get<any>(`${this._url}/JobCopy/getAll`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  applyJob(userId: string, jobId: any) {
    return this.http
      .post<any>(`${this._url}/JobCopy/applyJob/${jobId}`, { userId: userId })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  postJobs(job: any) {
    return this.http.post<any>(`${this._url}/JobCopy/createOne`, job).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
