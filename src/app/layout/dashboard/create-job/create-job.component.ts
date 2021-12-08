import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../../services/job.service';
declare var $: any;
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  constructor(private applyJob: JobService, private fb: FormBuilder) { }
  dropdownSettings1 = {};
  current: any[] = ['full-time', 'part-time'];
  jobCategory: any;
  education: any;
  jobType: any;
  remote: any;
  postVacancy: any;
  jobPostForm: FormGroup;
  stateDrp: any = [];
  jobCategoryArray: any = [];
  remoteArray: any = [];
  educationLevelArray: any = [];
  postVacancyArray: any = [];
  submitted: boolean = false;

  handleSubmit = () => {
    // console.log(this.jobDetails);
    // this.jobDetails['Category'] = this.jobCategory;
    // this.jobDetails['Type'] = this.jobType;
    // this.applyJob.postJobs(this.jobDetails).subscribe(() => {
    //   console.log('Job created!!');
    //   $('.nav-link').removeClass('active');
    //   $('.tab-pane').removeClass('active');
    //   $('#pills-profile-tab').addClass('active');
    //   // $('#pills-profile-tab').addClass('fade');
    //   $('#pills-profile').removeClass('fade')
    //   $('#pills-profile').addClass('active')
    // });
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
    this.jobPostForm = this.fb.group({
      title: ['', Validators.required],
      job_type: ['', Validators.required],
      job_category: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      min_salary: ['', Validators.required],
      max_salary: ['', Validators.required],
      is_remote: ['', Validators.required],
      education_level: ['', Validators.required],
      min_experience: ['', Validators.required],
      max_experience: ['', Validators.required],
      post_vacancy: ['', Validators.required],
      isVisume: [''],
      is_candidate_report: [''],
      job_description: ['', Validators.required]
    })
  }
  get f() { return this.jobPostForm.controls; }
  submitData() {
    console.log(this.jobPostForm)
    this.submitted = true;
    if (this.jobPostForm.valid) {

    }
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
