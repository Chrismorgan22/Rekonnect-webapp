import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  baseFlag: boolean = true;
  constructor(private route: Router) { 
    if (this.route.url.indexOf('dashboard') > -1) {
      this.baseFlag = false;
    }
  }

  ngOnInit(): void {
    if (this.route.url.indexOf('dashboard') > -1) {
      this.baseFlag = false;
    }
  }

}
