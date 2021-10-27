import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  events1: any = [];
  constructor() {
    this.events1 = [
      { designation: 'HR', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'CEO', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'Developer', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'BDE', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'Sr. Developer', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
    ];
  }

  ngOnInit(): void {
  }

}
