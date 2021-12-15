import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JobService {
  private _url: string = 'https://api.rekonnect.in';
  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.post<any>(`${this._url}/job/list`, null).pipe(
      map((response) => {
        return response;
      })
    );
  }
  applyJob(jobData) {
    return this.http
      .post<any>(`${this._url}/job/application/apply`, jobData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  postJobs(job: any) {
    return this.http.post<any>(`${this._url}/job/save`, job).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getJobDetails(id) {
    return this.http.get<any>(`${this._url}/job/details/` + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getJobAppliedStatus(body) {
    return this.http
      .post<any>(`${this._url}/job/application/applied/status`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getApplicants() {
    return this.http.get<any>(`http://localhost:8000/job/application/`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
