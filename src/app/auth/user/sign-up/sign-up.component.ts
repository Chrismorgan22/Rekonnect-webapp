import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company_name: ['', Validators.required],
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
      json['first_name'] = this.form.controls.firstName.value;
      json['last_name'] = this.form.controls.lastName.value;
      json['email'] = this.form.controls.email.value;
      json['company_name'] = this.form.controls.company_name.value;
      json['password'] = this.form.controls.password.value;
      this._authService.userRegister(json).subscribe(response => {
        if (response.result !== 'fail') {
          this.submitted = false;
          // sessionStorage.setItem('_ud', JSON.stringify(response.data))
          this._router.navigate(['/auth/user/signin'])
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
    }
  }
}
