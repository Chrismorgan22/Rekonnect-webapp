import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: string = JSON.parse(sessionStorage.getItem('_ud'))[0]._id;
  professionalData: {};
  bruh: boolean;
  userData: any = JSON.parse(sessionStorage.getItem('_ud'))[0];
  isfirst: boolean = false;
  isthird: boolean = false;
  personalData: any = {};
  expDetail: {
    designation: string;
    company: string;
    state: string;
    city: string;
    other_city: string;
    start_date: string;
    end_date: string;
    currently_working: boolean;
    job_description: string;
  };
  isFresher: boolean = false;
  isUneducated: boolean = false;
  issecond: boolean = false;
  constructor(private _jobService: JobService) {
    console.log(this.userData);
  }

  toggleEdit(term: string) {
    switch (term) {
      case 'first': {
        this.isfirst = !this.isfirst;
        break;
      }
      case 'second': {
        this.issecond = !this.issecond;
        break;
      }
      case 'third': {
        this.isthird = !this.isthird;
        break;
      }
    }
  }
  updateUserField(event: Event, term: string) {
    console.log('entered');

    switch (term) {
      case 'email': {
        console.log('hello from email');
        this.userData.email = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'phone': {
        this.userData.phone = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'schoolName': {
        this.personalData.education_data.education_type = 'Educated';
        this.personalData.education_data.education_details[0].school_name = (<
          HTMLInputElement
        >event.target).value;
        console.log('school');
        break;
      }
      case 'schoolGrade': {
        this.personalData.education_data.education_details[0].grade = (<
          HTMLInputElement
        >event.target).value;

        console.log('school');
        break;
      }
      case 'endDate': {
        const month = (<HTMLInputElement>event.target).value.substring(5, 7);
        const year = (<HTMLInputElement>event.target).value.substring(8, 10);
        this.personalData.education_data.education_details[0].end_date.year =
          year;
        this.personalData.education_data.education_details[0].end_date.month =
          month;
        break;
      }
      case 'startDate': {
        const month = (<HTMLInputElement>event.target).value.substring(5, 7);
        const year = (<HTMLInputElement>event.target).value.substring(8, 10);
        this.personalData.education_data.education_details[0].start_date.year =
          year;
        this.personalData.education_data.education_details[0].start_date.month =
          month;
        console.log((<HTMLInputElement>event.target).value);
        break;
      }
      case 'schoolDesc': {
        this.personalData.education_data.education_details[0].description = (<
          HTMLInputElement
        >event.target).value;
        break;
      }
      case 'workDesig': {
        this.expDetail.designation = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'workCompany': {
        this.personalData.experience_data.experience_type = 'Experienced';
        this.expDetail.company = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'state': {
        this.expDetail.state = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'city': {
        this.expDetail.city = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'startWork': {
        this.expDetail.start_date = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'endWork': {
        this.expDetail.end_date = (<HTMLInputElement>event.target).value;
        break;
      }
      case 'stillThere': {
        this.expDetail.currently_working = true;
        break;
      }
      case 'workDesc': {
        this.expDetail.job_description = (<HTMLInputElement>event.target).value;
        break;
      }
      default: {
        this.expDetail.currently_working = false;
      }
    }
  }

  updateField() {
    this._jobService
      .updateUserData(this.userId, this.userData)
      .subscribe((data) => {
        console.log(data);
      });
    if (this.expDetail !== null)
      this.personalData.experience_data.experience_details.push(this.expDetail);
    this._jobService
      .updateCandidate(this.userId, this.personalData)
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit(): void {
    this._jobService.fetchCandidate(this.userId).subscribe((data) => {
      this.personalData = data;
      console.log(data);
      if (data.education_data.education_type === 'Non-Educated')
        this.isUneducated = true;

      if (data.experience_data.experience_type === 'Fresher')
        this.isFresher = true;
    });
    console.log(this.isUneducated);
  }
}
