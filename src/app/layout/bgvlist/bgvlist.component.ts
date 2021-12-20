import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
@Component({
  selector: 'app-bgvlist',
  templateUrl: './bgvlist.component.html',
  styleUrls: ['./bgvlist.component.scss'],
})
export class BgvlistComponent implements OnInit {
  constructor(private _bgvList: JobService) {}
  totalApp: any[] = [];
  ngOnInit(): void {
    this._bgvList.getBgv().subscribe((data: any) => {
      this.totalApp = data;
    });
  }
}
