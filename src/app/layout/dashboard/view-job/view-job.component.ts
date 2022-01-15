import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
declare var $: any;
@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss'],
})
export class ViewJobComponent implements OnInit {
  jobId: any;
  jobDetail: any;
  appliedUserList: any = [];
  isModal: boolean = false;
  candidateDetails: {
    name: string;
    exp: any[];
    edu: any[];
  };
  expe: {}[] = null;
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private jobApplicationService: JobApplicationService
  ) {}

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.getJobDetails();
      this.getUserByJob();
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
        this.jobDetail['skills'] = this.jobDetail.top_skills.split(',');
      }
    });
  }
  manageUser(userId: string) {
    this.isModal = true;
    console.log(this.appliedUserList);

    this.jobService.fetchCandidate(userId).subscribe((data) => {
      console.log(data, data.experience_data.experience_details);

      this.expe = data.experience_data.experience_details;
      this.candidateDetails.edu = data.education_data.education_details;
    });
    console.log(this.expe);
  }
  toggleIt() {
    this.isModal = !this.isModal;
  }
  editJob() {
    $('.view-job-section').removeClass('not-edit-mode');
    $('.form-control').removeAttr('readonly');
  }
  getUserByJob() {
    this.jobApplicationService.getUserByJob(this.jobId).subscribe((data) => {
      console.log(data);
      this.appliedUserList = data;

      console.log(this.appliedUserList);
    });
  }
}
