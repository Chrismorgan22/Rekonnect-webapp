import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as S3 from 'aws-sdk/clients/s3';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.scss'],
})
export class ApplyForJobComponent implements OnInit {
  userId: any = JSON.parse(sessionStorage.getItem('_ud'))[0]['_id'];
  jobId: string;
  jobDetail: any;
  jobAppliedFlag: boolean = false;
  Resume: string;
  Vesume: string;
  Cover: string;
  isExp: boolean;
  expData: [];
  eduData: [];
  json: {
    job_id: any;
    candidate_id: any;
    resumeLink: any;
    vesumeLink: any;
    coverLetterLink: any;
  };
  constructor(
    private jobApply: JobService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private _toastrService: ToastrService
  ) {}

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.jobId = this.route.snapshot.params.id;
    console.log(this.jobId);
    await this.getJobDetails();
    await this.getJobappliedStatusData();
    this.jobApply.fetchCandidate(this.userId).subscribe((data) => {
      console.log(data);
      if (data.experience_data.experience_type !== 'Experienced')
        this.isExp = false;

      this.expData = data.experience_data.experience_deatils;
      this.eduData = data.education_data.education_details;
    });
  }

  getJobDetails() {
    this.jobApply.getJobDetails(this.jobId).subscribe((data) => {
      console.log('Job applied', data);
      if (data.result === 'success') {
        this.jobDetail = data.data[0];
      }
    });
  }
  applyForjob() {
    this.SpinnerService.show();
    const json = {};
    this.json = {
      job_id: this.jobDetail._id,
      candidate_id: this.userId,
      resumeLink:
        'https://rekonnectfileupload.s3.ap-south-1.amazonaws.com/RekonnectAlroyResume%20%286%29.pdf',
      vesumeLink: this.Vesume,
      coverLetterLink: this.Cover,
    };
    console.log(this.json);

    this.jobApply.applyJob(this.json).subscribe((data) => {
      console.log('Job applied', data);
      this.SpinnerService.hide();
      this._toastrService.success('Job Applied Successfully', 'Success');
      this.getJobappliedStatusData();
    });
  }
  getJobappliedStatusData() {
    const json = {
      job_id: this.jobId,
      candidate_id: this.userId,
    };
    this.jobApply.getJobAppliedStatus(json).subscribe((data) => {
      if (data.data.length !== 0) {
        this.jobAppliedFlag = true;
      } else {
        this.jobAppliedFlag = false;
      }
    });
  }
  body: { id: string; url: string } = {
    id: '',
    url: 'https://rekonnectfileupload.s3.ap-south-1.amazonaws.com/Rekonnectreciept%20for%20sem%20fees.pdf',
  };
  bucket = new S3({
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKey,
    region: environment.region,
  });
  uploadFileResume(file) {
    const contentType = file[0].type;
    if (file[0].size > 2200000) {
      window.alert('file too large');
      return;
    }
    const params = {
      Bucket: environment.Bucket,
      Key: 'Rekonnect' + file[0].name,
      Body: file[0],
      ACL: 'public-read',
      ContentType: contentType,
    };
    this.bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      this.Resume = data.location;
      console.log(this.Resume);
    });
  }
  uploadFilevesume(file) {
    const contentType = file[0].type;
    if (file[0].size > 2200000) {
      window.alert('file too large');
      return;
    }
    const params = {
      Bucket: environment.Bucket,
      Key: 'Rekonnect' + file[0].name,
      Body: file[0],
      ACL: 'public-read',
      ContentType: contentType,
    };
    this.bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
    });
  }
  uploadFileCover(file) {
    const contentType = file[0].type;
    if (file[0].size > 2200000) {
      window.alert('file too large');
      return;
    }
    const params = {
      Bucket: environment.Bucket,
      Key: 'Rekonnect' + file[0].name,
      Body: file[0],
      ACL: 'public-read',
      ContentType: contentType,
    };
    this.bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
    });
  }
}
