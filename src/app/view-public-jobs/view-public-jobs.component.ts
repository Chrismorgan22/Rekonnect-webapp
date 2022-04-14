import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
@Component({
  selector: 'app-view-public-jobs',
  templateUrl: './view-public-jobs.component.html',
  styleUrls: ['./view-public-jobs.component.scss'],
})
export class ViewPublicJobsComponent implements OnInit {
  jobDetails: any;
  jobId = window.location.pathname.split('/')[3];
  companyData: any;
  constructor(private _jobService: JobService) {}

  ngOnInit(): void {
    this._jobService.getJobDetails(this.jobId).subscribe((data) => {
      console.log(data);
      this.jobDetails = data.data;
      this.companyData = { logo: data.company_logo, name: data.company_name };
    });
  }
}
