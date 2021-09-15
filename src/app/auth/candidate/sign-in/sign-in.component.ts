import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  socialUser: SocialUser;
  isLoggedin: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService, private SpinnerService: NgxSpinnerService, private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
      const json = {};
      json['first_name'] = this.socialUser.firstName;
      json['last_name'] = this.socialUser.lastName;
      json['email'] = this.socialUser.email;
      // json['phone'] = this.form.controls.phone.value;
      // json['specialization'] = this.form.controls.specialization.value;
      // json['password'] = this.form.controls.password.value;
      this._authService.candidateRegister(json).subscribe(response => {
        if (response.result !== 'fail') {
          this.submitted = false;
          // sessionStorage.setItem('_ud', JSON.stringify(response.data))
          sessionStorage.setItem('_ud', JSON.stringify([response.data]))
          this._router.navigate(['/auth/welcome'])
          this.form.reset();
          this._toastrService.success(
            'User Registered successfully', response.result,
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
        } else {
          this._toastrService.error(
            response.message, response.result
          )
        }
      })
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.form)
    if (this.form.valid) {
      const json = {};
      json['email'] = this.form.controls.email.value;
      json['password'] = this.form.controls.password.value;
      this._authService.candidateLogin(json).subscribe(response => {
        if (response.result !== 'fail') {
          this.submitted = false;
          sessionStorage.setItem('_ud', JSON.stringify(response.data))
          this._router.navigate(['/auth/welcome'])
          this.form.reset();
          this._toastrService.success(
            'User LoggedIn successfully', response.result,
            { toastClass: 'toast ngx-toastr', closeButton: true }
          );
        } else {
          this._toastrService.error(
            response.message, response.result
          )
        }
      })
    }
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  // signInWithLinkedIn(): void {
  //   this.socialAuthService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }
}
