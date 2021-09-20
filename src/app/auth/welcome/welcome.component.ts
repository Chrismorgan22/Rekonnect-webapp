import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public socialAuthService: SocialAuthService) { }
  userData: any;
  ngOnInit(): void {
    const welcomDetails = sessionStorage.getItem('_ud');
    if (welcomDetails !== null && welcomDetails !== undefined && welcomDetails !== '') {
      this.userData = JSON.parse(welcomDetails)[0];
    }
  }
  signOut() {
    sessionStorage.clear();
    // this.socialAuthService.signOut();
  }
}
