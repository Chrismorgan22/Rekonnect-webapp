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
  }
}
