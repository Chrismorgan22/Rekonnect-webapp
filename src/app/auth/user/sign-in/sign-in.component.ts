import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  socialUser: SocialUser;
  isLoggedin: boolean;
  userRoleValidation: boolean = false;
  // user_role: any;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    public http: HttpClient,
    private eventService: EventService,
    private _toastrService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    console.log('hello from singin');

    this.socialUser = new SocialUser();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // user_role: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.userRoleValidation = false;
    this.submitted = true;
    console.log(this.form);
    if (this.form.valid) {
      this.SpinnerService.show();
      const json = {};
      json['email'] = this.form.controls.email.value;
      json['password'] = this.form.controls.password.value;
      this.loginAPICall(json, false);
    }
  }
  loginWithGoogle(): void {
    this.userRoleValidation = false;
    // if (this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== '') {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x) => {
      console.log(x);
      this.socialAuthService.authState.subscribe((user) => {
        this.SpinnerService.show();
        this.socialUser = user;
        console.log(this.socialUser);
        if (this.socialUser !== null) {
          const json = {};
          json['email'] = this.socialUser.email;
          this.loginAPICall(json, true);
        } else {
          this.SpinnerService.hide();
        }
      });
    });
    // } else {
    //   this.userRoleValidation = true;
    // }
  }
  loginInWithFB(): void {
    this.userRoleValidation = false;
    // if (this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== '') {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((x) => {
        this.socialAuthService.authState.subscribe((user) => {
          this.SpinnerService.show();
          this.socialUser = user;
          console.log(this.socialUser);
          if (this.socialUser !== null) {
            const json = {};
            json['email'] = this.socialUser.email;
            this.loginAPICall(json, true);
          } else {
            this.SpinnerService.hide();
          }
        });
      });
    // } else {
    //   this.userRoleValidation = true;
    // }
  }
  loginWithLinkedIn(): void {
    this.userRoleValidation = false;
    // if (this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== '') {
    const linkedInCredentials = {
      clientId: '78q6vjqcmmldlg',
      redirectUrl: 'https://rekonnect.in/auth/linkedinLoginResponse',
      scope: 'r_liteprofile%20r_emailaddress', // To read basic user profile data and email
    };
    const newWindow = window.open(
      `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${linkedInCredentials.clientId}&redirect_uri=${linkedInCredentials.redirectUrl}&scope=${linkedInCredentials.scope}`,
      'popup',
      'width=600,height=600'
    );
    const interval = setInterval(() => {
      const url = newWindow.location.href;
      console.log(newWindow.location.href);
      if (url !== undefined) {
        let url1 = new URL(url);
        let params = new URLSearchParams(url1.search);
        let sourceid = params.get('code');
        this.callAuthAPI(sourceid, newWindow);
        clearInterval(interval);
        console.log(sourceid);
      }
    }, 1500);
  }
  callAuthAPI(sourceid, newWindow) {
    this.SpinnerService.show();
    const json = {
      grant_type: 'authorization_code', // value of this field should always be: 'authorization_code'
      code: sourceid,
      redirect_uri: 'https://rekonnect.in/auth/linkedinLoginResponse', // The same redirect_url used in step 2.1 (in login.component.ts)
      client_id: '78q6vjqcmmldlg', // Follow step 1.2
      client_secret: 'vM8eY6XNqyO0rX5I', // Follow step 1.2
    };
    this._authService.linkedInLogin(json).subscribe((res) => {
      this.SpinnerService.hide();
      console.log(res);
      if (res !== null && res !== {}) {
        const json = {};
        // json['first_name'] = res.data.first_name;
        // json['last_name'] = res.data.last_name;
        json['email'] = res.data.email;
        this.loginAPICall(json, true);
        newWindow.close();
      }
    });
  }
  loginAPICall(json, isSocialLogin) {
    this._authService.userLogin(json).subscribe((response) => {
      console.log('***************************');
      this.eventService.updateHeader(true);
      this.SpinnerService.hide();
      if (response.result !== 'fail') {
        this.submitted = false;
        sessionStorage.setItem('_ud', JSON.stringify([response.data]));
        sessionStorage.setItem('firstTime', 'true');
        sessionStorage.setItem('firstTimeDate', 'true');

        this._router.navigate(['/auth/welcome']);
        this.form.reset();
        this._toastrService.success(
          'User LoggedIn successfully',
          response.result,
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      } else {
        this.SpinnerService.hide();
        // newWindow.close();
        if (isSocialLogin) {
          const json = {};
          json['first_name'] = this.socialUser.firstName;
          json['last_name'] = this.socialUser.lastName;
          json['email'] = this.socialUser.email;
          // json['role'] = Number(this.form.controls.user_role.value);
          this.registerAPICall(json);
        } else {
          this._toastrService.error(response.message, response.result);
        }
      }
    });
  }
  registerAPICall(json) {
    const json1 = {
      email: json['email'],
    };
    this._authService.userRegister(json).subscribe((response) => {
      this.SpinnerService.hide();
      if (response.result !== 'fail') {
        this.loginAPICall(json1, false);
      } else {
        this.SpinnerService.hide();
        this._toastrService.error(response.message, response.result);
      }
    });
  }
}
