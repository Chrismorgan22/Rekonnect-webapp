import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { LayoutService } from '../services/layout.service';
// import { JobService } from 'src/app/services/job.service';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-public-jobs',
  templateUrl: './view-public-jobs.component.html',
  styleUrls: ['./view-public-jobs.component.scss'],
})
export class ViewPublicJobsComponent implements OnInit {
  entireJobDetails: any[];




  jobDetails: any;
  jobId = window.location.pathname.split('/')[3];
  companyData: any;
  showModal: boolean = false;
  softdropdownList: any[];
  technicaldropdownList: any[];
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
  json2 = {
    user_id: '',
    address_details: {
      street: '',
      zip_code: '',
      state: {
        id: '',
        name: '',
      },
    },
    education_data: {
      education_type: 'Non-Educated',
      education_details: [
        {
          school_name: '',
          start_date: '',
          end_date: '',
          description: '',
        },
      ],
    },
    experience_data: {
      experience_type: '',
      experience_details: [
        {
          designation: '',
          company: '',
          start_date: '',
          end_date: '',
          job_description: '',
        },
      ],
    },
    soft_skills: [{ id: '', name: '' }],
    technical_skills: [{ id: '', name: '' }],
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
    private _authService: AuthService,
    private _toastrService: ToastrService
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
    this.getSoftSkillsList('Soft_skills');
    this.getTechnicalList('Technical_skills');


    this._jobService.getAllJobs().subscribe((data)=>{
      console.log("entire jobs");
      this.entireJobDetails = data;
      console.log(this.entireJobDetails)
    })
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  applyJob() {
    if (this.userData == null) {
      // alert('ypou are not logged in');
      // window.location.replace('/');
      this.showModal = true;
      return;
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
        this.json2.user_id = res.data._id;
      });
    }
  }
  handleAddress(event: any, type: string): void {
    if (type == 'state') {
      this.json2.address_details[type] = event;
      return;
    }
    this.json2.address_details[type] = (<HTMLInputElement>event.target).value;
    console.log(this.json2.address_details);
  }
  handleEducation(event: any, type: string): void {
    console.log(<HTMLInputElement>event.target.value);

    this.json2.education_data.education_type = 'Educated';
    this.json2.education_data.education_details[0][type] = (<HTMLInputElement>(
      event.target
    )).value;
    console.log(this.json2.education_data);
  }
  async getSoftSkillsList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.softdropdownList = drpJson;
    });
  }
  async getTechnicalList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.technicaldropdownList = drpJson;
    });
  }
  handleExp(event: any, type: string): void {
    console.log(<HTMLInputElement>event.target.value);

    this.json2.experience_data.experience_type = 'Experienced';
    this.json2.experience_data.experience_details[0][type] = (<
      HTMLInputElement
    >event.target).value;
    console.log(this.json2.experience_data);
  }
  handleSubmit() {
    console.log(this.json2);
    this._authService.candidateRegister(this.json2).subscribe((data) => {
      console.log(data);
      if (data.status == 200) {
        this.showModal = false;

        this._jobService
          .applyJob({
            job_id: this.jobDetails?._id,
            candidate_id: data.data.user_id,
            resumeLink: '',
            vesumeLink: '',
            coverLetterLink: '',
          })
          .subscribe((data) => {
            console.log(data);

            this._toastrService.success('job applied successfully', 'success');
          });
      }
    });
  }
}
