import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  uploadFileData(file) {
    const contentType = file[0].type;
    const bucket = new S3(
      {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: environment.region
      }
    );
    const params = {
      Bucket: environment.Bucket,
      Key: 'Rekonnect' + file[0].name,
      Body: file[0],
      ACL: 'public-read',
      ContentType: contentType
    };
   return bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return data;
    });
  }
}
