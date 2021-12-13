import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { JobApplicationService} from 'src/app/services/job-application.service';
declare var $:any;
@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  jobId: any;
  jobDetail: any;
  constructor(private jobApply: JobService, private route: ActivatedRoute, private jobApplicationService:JobApplicationService) { }

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.getJobDetails();
      this.getUserByJob();
    }
  }
  getJobDetails() {
    this.jobApply.getJobDetails(this.jobId).subscribe((data) => {
      console.log('Job applied', data);
      if (data.result === 'success') {
        this.jobDetail = data.data[0];
        console.log(this.jobDetail)
        this.jobDetail["skills"] = this.jobDetail.top_skills.split(',')
      }
    });
  }
  editJob(){
    $('.view-job-section').removeClass('not-edit-mode');
    $('.form-control').removeAttr('readonly');
  }
  getUserByJob(){
    this.jobApplicationService.getUserByJob(this.jobId).subscribe((data) => {
      console.log(data);
      
      if (data.result === 'success') {
        // this.jobDetail = data.data[0];
        // console.log(this.jobDetail)
        // this.jobDetail["skills"] = this.jobDetail.top_skills.split(',')
        console.log(data)
      }
    });
  }
}
