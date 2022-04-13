import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
@Component({
  selector: 'app-newhome',
  templateUrl: './newhome.component.html',
  styleUrls: ['./newhome.component.scss'],
})
export class NewhomeComponent implements OnInit {
  entireJobDetails: any[];
  constructor(private _jobService: JobService) {}

  ngOnInit(): void {
    this._jobService.getAllJobs().subscribe((res) => {
      console.log(res);

      this.entireJobDetails = res;
    });
  }
}
