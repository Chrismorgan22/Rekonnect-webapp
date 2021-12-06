import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  constructor(private applyJob: JobService) {}
  dropdownSettings1 = {};
  current: any[] = ['full-time', 'part-time'];
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
    this.applyJob.postJobs(this.jobDetails).subscribe(() => {
      console.log('Job created!!');
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
  }
}
