import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: string = JSON.parse(sessionStorage.getItem('_ud'))[0]._id;
  professionalData: {};
  userData: any = JSON.parse(sessionStorage.getItem('_ud'))[0];

  constructor() {
    console.log(this.userData);
  }

  updateField() {}
  ngOnInit(): void {}
}
