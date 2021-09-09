import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  specializationData: any;
  locationData: any;
  graduationData: any;
  constructor(private _layoutService: LayoutService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getLocationData();
    this.getGraduationData();
    this.getSpecializationData();
  }
  getLocationData() {
    this._layoutService.getLocationList().subscribe(response => {
      if (response.result !== 'fail') {
        this.locationData = response.data;
      } else {
        this._toastrService.error(
          response.message, response.result
        )
      }
    })
  }
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
  getGraduationData() {
    this._layoutService.getGraduationList().subscribe(response => {
      if (response.result !== 'fail') {
        this.graduationData = response.data;
      } else {
        this._toastrService.error(
          response.message, response.result
        )
      }
    })
  }
}
