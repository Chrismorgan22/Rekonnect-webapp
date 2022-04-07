import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  constructor(private http: HttpClient) {}
  getUserByJob(job_id: any) {
    const params = new HttpParams().set('job_id', job_id);
    return this.http
      .post<any>(`${environment.apiUrl}/job/application/getUserByJob`, {
        job_id: job_id,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
