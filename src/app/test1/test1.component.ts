import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],
})
export class Test1Component implements OnInit {
  userData: any = JSON.parse(sessionStorage.getItem('_ud'));
  mentorData: any;
  constructor() {}

  ngOnInit(): void {
    if (this.userData == null) {
      window.location.replace('/');
      alert('You are not logged in!');
    }
    this.fetchData();
  }
  async fetchData() {
    const res = await (
      await fetch(`${environment.apiUrl}/mentor/fetch/${this.userData[0]._id}`)
    ).json();
    this.mentorData = res;
  }
}
