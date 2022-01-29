import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/job.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-employer-view-job',
  templateUrl: './employer-view-job.component.html',
  styleUrls: ['./employer-view-job.component.scss'],
})
export class EmployerViewJobComponent implements OnInit {
  jobData: any;
  constructor(
    public jobService: JobService,
    public _toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobListData();
  }
  delJob(id: string) {
    this.jobService.deleteJob(id).subscribe((data) => {
      console.log(data);
    });
  }
  getJobListData() {
    this.jobData = [];
    const sessionData = sessionStorage.getItem('_ud');
    let parsedData: any;
    if (
      sessionData !== null &&
      sessionData !== undefined &&
      sessionData !== ''
    ) {
      parsedData = JSON.parse(sessionData);
    }
    const json = {
      user_id: parsedData?.[0]['_id'],
    };
    this.jobService.getJobs(json).subscribe((response) => {
      if (response.result !== 'fail') {
        console.log(response);
        this.jobData = response.data;
      } else {
        this._toastrService.error(
          'User list is not available',
          'No Data Found'
        );
      }
    });
  }
  viewJob(job) {
    this.router.navigate(['/dashboard/view-job/' + job._id]);
  }
}
