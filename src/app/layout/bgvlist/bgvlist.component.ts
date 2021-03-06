import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { environment } from '../../../environments/environment';
import * as S3 from 'aws-sdk/clients/s3';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-bgvlist',
  templateUrl: './bgvlist.component.html',
  styleUrls: ['./bgvlist.component.scss'],
})
export class BgvlistComponent implements OnInit {
  isSubmit: boolean = false;
  constructor(
    private _bgvList: JobService,
    private _fileService: FileUploadService
  ) {}
  body: { id: string; url: string } = {
    id: '',
    url: 'https://rekonnectfileupload.s3.ap-south-1.amazonaws.com/Rekonnectreciept%20for%20sem%20fees.pdf',
  };
  bucket = new S3({
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKey,
    region: environment.region,
  });
  totalApp: any[] = [];
  ngOnInit(): void {
    this._bgvList.getBgv().subscribe((data: any) => {
      this.totalApp = data;
    });
  }

  uploadFile(file, type) {
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

      this.body.url = data.Location;
    });
    console.log(this.body);
    this.body.id = type;
    this._bgvList.postPdf(this.body).subscribe((data) => {
      return data;
    });
  }

  //   this._fileService.uploadFileData(file).send(function (err, data) {
  //     this.body.id = type;
  //     this.body.url = data.Location;
  // }

  postPdf(): any {
    this._bgvList.postPdf(this.body).subscribe((data) => {
      return data;
    });
  }
}
