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
      .post<any>(`${environment.apiUrl}/job/application/applyForJob`, jobData)
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
  getAllJobs() {
    return this.http.get<any>(`${environment.apiUrl}/job/getAll`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getApplicants() {
    return this.http.get<any>(`${environment.apiUrl}/job/application/`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getUserById(id: String) {
    return this.http
      .get<any>(`${environment.apiUrl}/user/applicant/` + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  fetchSkills(type: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/lookup/`, { lookup_type: type })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  postBgv(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/report/apply`, body).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getBgv() {
    return this.http.get<any>(`${environment.apiUrl}/report/users`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  postPdf(body: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/report/addPdf`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  fetchSingle(id: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/report/single/`, { id })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  fetchJobs() {
    return this.http.get<any>(`${environment.apiUrl}/job/getALL`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  checkJobApplications(id: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/job/application/getApplicant`, {
        userId: id,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  fetchCandidate(id: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/candidate/findById/${id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  updateCandidate(id: string, body: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/candidate/update/${id}`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  updateUserData(id: string, body: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/update/${id}`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  fetchJobsPosted(id: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/job/getJobsPosted/${id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
