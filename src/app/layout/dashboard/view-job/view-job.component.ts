import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JobApplicationService } from 'src/app/services/job-application.service';
declare var $: any;
@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss'],
})
export class ViewJobComponent implements OnInit {
  jobId: any;
  dropdownSettings1 = {};
  jobDetail: any;
  entireUser: any[];
  toggleModal: boolean = false;
  image: string;
  current_job: any;

  name: string;
  TS: any[] = [];
  SS: any[] = [];
  appliedUserList: any[] = [];
  appliedUser: { name: string; id: string; image: string };
  isModal: boolean = false;
  candidateDetails: {
    id: string;
    name: string;
    skills: any[];
    exp: any[];
    edu: any[];
  }[];
  expe: {}[] = null;
  educ: {}[] = null;
  jobStatus: string = 'Active';
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
  constructor(
    private _toastService: ToastrService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private jobApplicationService: JobApplicationService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.jobService.getUserById;
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.getJobDetails();
      this.getUserByJob();
      this.fetchProper();
    } else {
      this.jobService.getJobs().subscribe((result: any) => {
        if (result.result === 'success') {
          console.log(result);
          // result?.data.map((ele) => {
          //   ele['created_at'] = moment(ele.created_at).fromNow();
          // })
          // this.jobListData = result.data;
          // console.log(this.jobListData)
        }
      });
    }
  }
  getJobDetails() {
    this.jobService.getJobDetails(this.jobId).subscribe((data) => {
      console.log('Job applied', data);
      if (data.result === 'success') {
        this.jobDetail = data.data[0];
        console.log(this.jobDetail);
        this.jobStatus = this.jobDetail.status ? 'Active' : 'In-Active';
        this.dropdownSettings1 = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
        };

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
          title: [this.jobDetail.job_title, Validators.required],
          job_type: [this.jobDetail.job_type, Validators.required],
          job_category: [this.jobDetail.job_category, Validators.required],
          city: [this.jobDetail.city, Validators.required],
          country: [this.jobDetail.country, Validators.required],
          min_salary: [this.jobDetail.salary_range.min, Validators.required],
          max_salary: [this.jobDetail.salary_range.max, Validators.required],
          is_remote: [this.jobDetail.remote_type, Validators.required],
          education_level: [
            this.jobDetail.education_level,
            Validators.required,
          ],
          min_experience: [
            this.jobDetail.minimum_experience_required,
            Validators.required,
          ],
          max_experience: [
            this.jobDetail.maximum_experience_required,
            Validators.required,
          ],
          post_vacancy: [this.jobDetail.post_vacancies, Validators.required],
          isVisume: [false],
          is_candidate_report: [false],
          job_description: [
            this.jobDetail.job_description,
            Validators.required,
          ],
        });
        this.jobDetail['skills'] = this.jobDetail.top_skills.split(',');
      }
    });
  }
  showModal() {
    this.toggleModal = !this.toggleModal;
  }
  toggleStatus(type: string): void {
    this.jobStatus = type;
    console.log(this.jobStatus);
    this.handleUpdate();
  }
  handleUpdate() {
    const json = {
      user_id: JSON.parse(sessionStorage.getItem('_ud'))[0]['_id'],
      job_title: this.jobPostForm.controls.title.value,
      job_type: this.jobPostForm.controls.job_type.value.toString(),
      job_category: this.jobPostForm.controls.job_category.value.toString(),
      city: this.jobPostForm.controls.city.value,
      status: this.jobStatus == 'Active' ? true : false,
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
    console.log(json);
    this.jobService.updateJob(this.jobDetail._id, json).subscribe((res) => {
      console.log(res);
      if (this.jobStatus == 'Active')
        this._toastService.success(
          `Job status changed to ${this.jobStatus} `,
          res.result,
          {
            toastClass: 'toast ngx-toastr',
            closeButton: true,
          }
        );
      else {
        this._toastService.error(
          `Job status changed to ${this.jobStatus} `,
          res.result,
          {
            toastClass: 'toast ngx-toastr',
            closeButton: true,
          }
        );
      }
    });
    this.toggleModal = false;
  }
  manageUser(userId: string) {
    this.isModal = true;
    console.log(this.appliedUserList);

    this.jobService.fetchCandidate(userId).subscribe((data) => {
      this.image = data.profile_url;
      console.log(data, data.experience_data.experience_details);
      this.TS = data.technical_skills;
      this.SS = data.soft_skills;
      this.expe = data.experience_data.experience_details;
      this.educ = data.education_data.education_details;

      console.log(this.SS, this.TS);
    });
    console.log(this.expe);
    console.log(this.SS, this.TS);
  }
  toggleIt() {
    this.isModal = !this.isModal;
  }
  editJob() {
    $('.view-job-section').removeClass('not-edit-mode');
    $('.form-control').removeAttr('readonly');
  }
  async getUserByJob() {
    try {
      this.jobApplicationService.getUserByJob(this.jobId).subscribe((data) => {
        console.log(data);
        this.appliedUserList = data;

        console.log(this.appliedUserList);
      });
    } catch (error) {}
  }

  fetchProper() {
    for (let i = 0; i < this.appliedUserList.length; i++) {
      this.jobService
        .getUserById(this.appliedUserList[i].candidate_id)
        .subscribe((data) => {
          console.log(data);
        });
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
