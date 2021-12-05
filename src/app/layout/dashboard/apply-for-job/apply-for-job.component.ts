import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.scss'],
})
export class ApplyForJobComponent implements OnInit {
  userId: any = sessionStorage.getItem('_ud').substring(9, 33);
  jobId: string;
  constructor(private jobApply: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.jobId = this.route.snapshot.params.id;
    console.log(this.jobId);
  }

  handleApply = () => {
    this.jobApply.applyJob(this.userId, this.jobId).subscribe((data) => {
      console.log('Job applied', data);
    });
  };
}
