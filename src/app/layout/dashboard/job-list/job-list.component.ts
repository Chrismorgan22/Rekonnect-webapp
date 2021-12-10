import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobListData: any = [];
  constructor(private jobService: JobService, private route: Router) { }

  ngOnInit(): void {
    this.getJobList();
  }
  getJobList() {
    this.jobService.getJobs().subscribe((result: any) => {
      if (result.result === 'success') {
        console.log(result)
        result?.data.map((ele) => {
          ele['created_at'] = moment(ele.created_at).fromNow();
        })
        this.jobListData = result.data;
        console.log(this.jobListData)
      }
    });
  }
  viewJob(job) {
    this.route.navigate(['/dashboard/apply-for-job/' + job._id])
  }
}
