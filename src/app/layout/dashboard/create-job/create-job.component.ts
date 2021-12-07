import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
declare var $: any;
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  constructor(private applyJob: JobService) { }
  dropdownSettings1 = {};
  current: any[] = ['full-time', 'part-time'];
  jobCategory: any;
  education: any;
  jobType: any;
  remote: any;
  postVacancy: any;
  jobDetails: {
    Title: string;
    Type: string;
    Category: string;
    City: string;
    Country: string;
    minSalary: string;
    maxSalary: string;
    minExp: string;
    maxExp: string;
  } = {
      Title: '',
      Type: '',
      Category: '',
      City: '',
      Country: '',
      minSalary: '',
      maxSalary: '',
      minExp: '',
      maxExp: '',
    };
  stateDrp: any = [];
  jobCategoryArray: any = [];
  remoteArray: any = [];
  educationLevelArray: any = [];
  postVacancyArray: any = [];
  handleTitle = (event: Event) => {
    this.jobDetails.Title = (<HTMLInputElement>event.target).value;
  };
  handleType = (value: string) => {
    console.log(value);

    this.jobDetails.Type = value;
  };
  handleCat = (event: Event) => {
    this.jobDetails.Category = (<HTMLInputElement>event.target).value;
  };
  handleCity = (event: Event) => {
    this.jobDetails.City = (<HTMLInputElement>event.target).value;
  };
  handleCountry = (event: Event) => {
    this.jobDetails.Country = (<HTMLInputElement>event.target).value;
  };
  handleMinS = (event: Event) => {
    this.jobDetails.minSalary = (<HTMLInputElement>event.target).value;
  };
  handleMaxS = (event: Event) => {
    this.jobDetails.maxSalary = (<HTMLInputElement>event.target).value;
  };
  handleMaxE = (event: Event) => {
    this.jobDetails.maxExp = (<HTMLInputElement>event.target).value;
  };
  handleMinE = (event: Event) => {
    this.jobDetails.minExp = (<HTMLInputElement>event.target).value;
  };

  handleSubmit = () => {
    console.log(this.jobDetails);
    this.jobDetails['Category'] = this.jobCategory;
    this.jobDetails['Type'] = this.jobType;
    this.applyJob.postJobs(this.jobDetails).subscribe(() => {
      console.log('Job created!!');
      $('.nav-link').removeClass('active');
      $('.tab-pane').removeClass('active');
      $('#pills-profile-tab').addClass('active');
      // $('#pills-profile-tab').addClass('fade');
      $('#pills-profile').removeClass('fade')
      $('#pills-profile').addClass('active')
    });
  };
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.stateDrp = ['Full-time', 'Part-time', 'Internship']
    this.jobCategoryArray = ['Remote', 'On-site'];
    this.remoteArray = ['Full Time Remote', 'Part Time Remote'];
    this.educationLevelArray = ['High', 'Medium', 'Low'];
    this.postVacancyArray = [1, 2, 3, 4, 5];
  }
  onItemSelect(item: any) {
    console.log(item);
    this.jobType = item;
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onJobCategoryItemSelect(item: any) {
    console.log(item);
    this.jobCategory = item;
  }
  onJobCategorySelectAll(items: any) {
    console.log(items);
  }
  onRemoteItemSelect(item: any) {
    console.log(item);
    this.remote = item;
  }
  onRemoteSelectAll(items: any) {
    console.log(items);
  }
  onEducationSelect(item: any) {
    console.log(item);
    this.education = item;
  }
  onEducationSelectAll(items: any) {
    console.log(items);
  }
  onPostVacancySelect(item: any) {
    console.log(item);
    this.postVacancy = item;
  }
  onPostVacancySelectAll(items: any) {
    console.log(items);
  }
}
