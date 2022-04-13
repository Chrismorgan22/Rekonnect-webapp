import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
@Component({
  selector: 'app-public-jobs',
  templateUrl: './public-jobs.component.html',
  styleUrls: ['./public-jobs.component.scss'],
})
export class PublicJobsComponent implements OnInit {
  entireJobDetails: any[];
  constructor(private _jobService: JobService) {}

  ngOnInit(): void {
    this._jobService.getAllJobs().subscribe((res) => {
      console.log(res);

      this.entireJobDetails = res;
    });
  }

  applyJob(jobId: any) {
    if (sessionStorage.getItem('_ud') == null) {
      alert('You are not logged in,Please Login in to apply for a job');
      return;
    }
    window.location.replace(`/dashboard/apply-for-job/${jobId}`);
  }
}
