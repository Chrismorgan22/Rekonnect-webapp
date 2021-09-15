import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service';
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
  specializationData: any;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _layoutService: LayoutService,
    private _toastrService: ToastrService, private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // speacialization: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[789]{1}[0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.getSpecializationData();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  getSpecializationData() {
    this._layoutService.getSpecializationList().subscribe(response => {
      if (response.result !== 'fail') {
        this.specializationData = response.data;
      } else {
        this._toastrService.error(
          response.message, response.result
        )
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.form)
    if (this.form.valid) {
      const json = {};
      json['first_name'] = this.form.controls.firstName.value;
      json['last_name'] = this.form.controls.lastName.value;
      json['email'] = this.form.controls.email.value;
      json['phone'] = this.form.controls.phone.value;
      // json['specialization'] = this.form.controls.specialization.value;
      json['password'] = this.form.controls.password.value;
      this._authService.candidateRegister(json).subscribe(response => {
        if (response.result !== 'fail') {
          this.submitted = false;
          sessionStorage.setItem('_wd', JSON.stringify(response.data))
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
    }
  }
}
