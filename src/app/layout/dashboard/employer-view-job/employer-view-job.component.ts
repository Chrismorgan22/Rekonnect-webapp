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
  employerInfo: any;
  jobData: any;

  empID: string = JSON.parse(sessionStorage.getItem('_ud'))[0]._id;
  userProfileData: { first_name: ''; last_name: ''; employer_details: any[] };

  constructor(
    public jobService: JobService,
    private layoutService: LayoutService,
    public _toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobListData();
    this.getUserProfileData();
    this.getEmployerData();
  }
  delJob(id: string) {
    this.jobService.deleteJob(id).subscribe((data) => {
      console.log(data);
    });
  }

  getEmployerData() {
    this.jobService.fetchEmployer(this.empID).subscribe((data) => {
      console.log(data);
      this.employerInfo = data[0];
    });
  }

  getUserProfileData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    this.layoutService.getUserProfile(localData._id).subscribe((res) => {
      console.log(res);
      this.userProfileData = res.data[0];
      // this.empID = this.userProfileData;
      this.empID = this.userProfileData.employer_details[0]._id;
      console.log(this.userProfileData);
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

  postJob() {
    this.router.navigate(['/dashboard/create-job']);
  }

  handleSubmit = (): void => {
    console.log(this.jobData);
    this.jobService.postJobs(this.jobData).subscribe(() => {
      console.log('Job created!!');
    });
  };
}
