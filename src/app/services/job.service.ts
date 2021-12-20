import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private http: HttpClient) {}

  getJobs(json: any = null) {
    return this.http.post<any>(`${environment.apiUrl}/job/list`, json).pipe(
      map((response) => {
        return response;
      })
    );
  }
  applyJob(jobData) {
    return this.http
      .post<any>(`${environment.apiUrl}/job/application/apply`, jobData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  postJobs(job: any) {
    return this.http.post<any>(`${environment.apiUrl}/job/save`, job).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getJobDetails(id) {
    return this.http.get<any>(`${environment.apiUrl}/job/details/` + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getJobAppliedStatus(body) {
    return this.http
      .post<any>(`${environment.apiUrl}/job/application/applied/status`, body)
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

  getUserById(id: String) {
    return this.http
      .get<any>(`http://localhost:8000/user/applicant/` + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  postBgv(body: any) {
    return this.http.post<any>(`http://localhost:8000/report/apply`, body).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getBgv() {
    return this.http.get<any>(`http://localhost:8000/report/users`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
