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
  userData: any = JSON.parse(sessionStorage.getItem('_ud'))[0];
  isfirst: boolean = false;
  personalData: any = {};
  constructor(private _jobService: JobService) {
    console.log(this.userData);
  }

  toggleFirstEdit() {
    this.isfirst = !this.isfirst;
  }
  updateField() {}
  ngOnInit(): void {
    this._jobService.fetchCandidate(this.userId).subscribe((data) => {
      this.personalData = data;
      console.log(data);
    });
  }
}
