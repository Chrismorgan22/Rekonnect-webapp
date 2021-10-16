import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalizationComponent } from '../personalization/personalization.component';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public socialAuthService: SocialAuthService, public modalService: NgbModal) { }
  userData: any;
  ngOnInit(): void {
    const welcomDetails = sessionStorage.getItem('_ud');
    if (welcomDetails !== null && welcomDetails !== undefined && welcomDetails !== '') {
      this.userData = JSON.parse(welcomDetails)[0];
    }
    // const modalRef = this.modalService.open(PersonalizationComponent, {
    //   size: 'xl',
    //   backdrop: 'static', // disable modal from closing on click outside
    //   keyboard: false, // disable modal closing by keyboard esc
    // });
    // // modalRef.componentInstance.id = 10;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }
  signOut() {
    sessionStorage.clear();
    // this.socialAuthService.signOut();
  }
}
