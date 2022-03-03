import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../../services/job.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  constructor(
    private applyJob: JobService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  dropdownSettings1 = {};
  current: any[] = ['full-time', 'part-time'];
  jobCategory: any;
  education: any;
  topSkills: [];
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
    this.getSkills();
    this.stateDrp = ['Full-time', 'Part-time', 'Internship'];
    this.jobCategoryArray = ['Remote', 'On-site'];
    this.remoteArray = [
      'Full Time Remote',
      'Part Time Remote',
      'No remote work',
    ];
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
      isVisume: [false],
      is_candidate_report: [false],
      job_description: ['', Validators.required],
    });
  }
  get f() {
    return this.jobPostForm.controls;
  }
  submitData() {
    console.log(this.jobPostForm);
    this.submitted = true;
    if (this.jobPostForm.valid) {
      const json = {
        user_id: JSON.parse(sessionStorage.getItem('_ud'))[0]['_id'],
        job_title: this.jobPostForm.controls.title.value,
        job_type: this.jobPostForm.controls.job_type.value.toString(),
        job_category: this.jobPostForm.controls.job_category.value.toString(),
        city: this.jobPostForm.controls.city.value,
        country: this.jobPostForm.controls.country.value,
        salary_range: {
          min: this.jobPostForm.controls.min_salary.value,
          max: this.jobPostForm.controls.max_salary.value,
        },
        remote_type: this.jobPostForm.controls.is_remote.value.toString(),
        education_level:
          this.jobPostForm.controls.education_level.value.toString(),
        minimum_experience_required:
          this.jobPostForm.controls.min_experience.value,
        maximum_experience_required:
          this.jobPostForm.controls.max_experience.value,
        top_skills: 'LeaderShip',
        post_vacancies: this.jobPostForm.controls.post_vacancy.value.toString(),
        is_visume: this.jobPostForm.controls.isVisume.value,
        is_scandidate: this.jobPostForm.controls.is_candidate_report.value,
        job_description: this.jobPostForm.controls.job_description.value,
      };
      this.applyJob.postJobs(json).subscribe((result: any) => {
        if (result.result === 'success') {
          this.router.navigate(['/dashboard/employer-view-job']);
          this.submitted = false;
          console.log('Job created!!');
          $('.nav-link').removeClass('active');
          $('.tab-pane').removeClass('active');
          $('#pills-profile-tab').addClass('active');
          // $('#pills-profile-tab').addClass('fade');
          $('#pills-profile').removeClass('fade');
          $('#pills-profile').addClass('active');
        }
      });
    }
  }
  getSkills() {
    this.applyJob.fetchSkills('Soft_skills').subscribe((data) => {
      console.log(data.data);

      this.topSkills = data.data;
    });
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
