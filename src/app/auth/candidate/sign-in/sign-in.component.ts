import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService, private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
          this._router.navigate(['/layout/post-job'])
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
}
