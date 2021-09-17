import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }
  userData: any;
  ngOnInit(): void {
    const welcomDetails = sessionStorage.getItem('_ud');
    if (welcomDetails !== null && welcomDetails !== undefined && welcomDetails !== '') {
      this.userData = JSON.parse(welcomDetails)[0];
    }
  }
  signOut(){
    sessionStorage.clear();
  }
}
