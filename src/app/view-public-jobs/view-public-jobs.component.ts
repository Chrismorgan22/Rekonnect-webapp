import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { LayoutService } from '../services/layout.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-view-public-jobs',
  templateUrl: './view-public-jobs.component.html',
  styleUrls: ['./view-public-jobs.component.scss'],
})
export class ViewPublicJobsComponent implements OnInit {
  jobDetails: any;
  jobId = window.location.pathname.split('/')[3];
  companyData: any;
  json: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
  } = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '8904344828',
    password: '',
  };
  dropdownList = [];
  stateDrop: any[];
  dropdownSettings1 = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  userData: any = JSON.parse(sessionStorage.getItem('_ud'));
  constructor(
    private _jobService: JobService,
    private layoutService: LayoutService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._jobService.getJobDetails(this.jobId).subscribe((data) => {
      console.log(data);
      this.jobDetails = data.data;
      this.companyData = { logo: data.company_logo, name: data.company_name };
    });
    this.layoutService.getStateList().subscribe((res) => {
      var drpJson = [];
      res.data.states?.map((ele) => {
        const json = {
          id: ele.state_code,
          name: ele.name,
        };
        drpJson.push(json);
      });
      console.log(drpJson);

      this.stateDrop = drpJson;
    });
  }
  applyJob() {
    if (this.userData == null) {
      alert('ypou are not logged in');
      window.location.replace('/');
    }
    console.log(this.jobDetails._id);

    window.location.replace(`/dashboard/apply-for-job/${this.jobDetails._id}`);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  async handleField(event: Event, type: string) {
    this.json[type] = (<HTMLInputElement>event.target).value;
    console.log(this.json);
    if (type == 'password') {
      //make an api call for add new user
      console.log(JSON.stringify(this.json));

      this._authService.userRegister(this.json).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
