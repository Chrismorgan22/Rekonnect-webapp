import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignupService } from '../../../services/sign-up.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  password: string;
  cPassword: string;
  loading = false;
  submitted = false;
  specializationData: any;
  socialUser: SocialUser;
  isLoggedin: boolean;
  userRoleValidation: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _layoutService: LayoutService,
    private _toastrService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private socialAuthService: SocialAuthService,
    private signUpService: SignupService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // speacialization: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[789]{1}[0-9]{9}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      // user_role: ['', Validators.required]
      // company_name: ['', Validators.required]
    });
  }
  updateP(event: Event): void {
    this.password = (<HTMLInputElement>event.target).value;
  }
  updateCP(event: Event): void {
    this.cPassword = (<HTMLInputElement>event.target).value;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);
    if (this.password !== this.cPassword) {
      this._toastrService.error('passwords do not match');
      return;
    }
    if (this.form.valid) {
      this.SpinnerService.show();
      const json = {};
      json['first_name'] = this.form.controls.firstName.value;
      json['last_name'] = this.form.controls.lastName.value;
      json['email'] = this.form.controls.email.value;
      json['phone'] = this.form.controls.phone.value;
      // json['company_name'] = this.form.controls.company_name.value;
      // json['specialization'] = this.form.controls.specialization.value;
      json['password'] = this.form.controls.password.value;
      // json['role'] = Number(this.form.controls.user_role.value);

      this.signUpService.updateHeader(json);
      this._router.navigate(['/auth/welcome']);

      this.registerAPICall(json);
    }
  }
  loginWithGoogle(): void {
    this.userRoleValidation = false;
    // if (this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== null && this.form.controls.user_role.value !== '') {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x) => {
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        console.log(typeof user);

        console.log(this.socialUser);
        if (true) {
          console.log('not getting here!');
          const json = {};
          json['first_name'] = user.firstName;
          json['last_name'] = user.lastName;
          json['email'] = user.email;
          console.log(json);

          // json['role'] = Number(this.form.controls.user_role.value);
          // this.SpinnerService.show();
          this.registerAPICall(json);
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
    // if (this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== null && this.form.controls.user_role.value !== '') {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((x) => {
        this.socialAuthService.authState.subscribe((user) => {
          this.socialUser = user;
          console.log(this.socialUser);
          if (this.socialUser !== null) {
            const json = {};
            json['first_name'] = this.socialUser.firstName;
            json['last_name'] = this.socialUser.lastName;
            json['email'] = this.socialUser.email;
            // json['role'] = Number(this.form.controls.user_role.value);
            this.SpinnerService.show();
            this.registerAPICall(json);
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
    // if (this.form.controls.user_role.value !== undefined && this.form.controls.user_role.value !== null && this.form.controls.user_role.value !== '') {
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
    // } else {
    //   this.userRoleValidation = true;
    // }
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
      const json = {};
      json['first_name'] = res.data.first_name;
      json['last_name'] = res.data.last_name;
      json['email'] = res.data.email;
      // json['role'] = Number(this.form.controls.user_role.value);
      this.registerAPICall(json);
    });
  }
  registerAPICall(json) {
    console.log(json);

    this._authService.userRegister(json).subscribe((response) => {
      console.log(response);
      if (response.result !== 'fail') {
        this.SpinnerService.hide();
        this.submitted = false;
        sessionStorage.setItem('_ud', JSON.stringify([response.data]));
        sessionStorage.setItem('firstTime', 'true');

        this._router.navigate(['/auth/welcome']);
        this.form.reset();
        // this._toastrService.success(
        //   'User Registered successfully', response.result,
        //   { toastClass: 'toast ngx-toastr', closeButton: true }
        // );
      } else {
        this.SpinnerService.hide();
        // this._toastrService.error(response.message, response.result);
        sessionStorage.setItem(
          '_ud',
          JSON.stringify({ name: json.first_name })
        );
        sessionStorage.setItem('firstTime', 'true');
        this._router.navigate(['/dashboard/candidate']);
        this._toastrService.success('Loggin you in');

        // this._toastrService.error('directing to login page');
        // this._router.navigate(['/auth/user/signin']);
      }
    });
  }
}
