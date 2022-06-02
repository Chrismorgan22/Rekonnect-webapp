import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss']
})
export class ListJobsComponent implements OnInit {

  constructor(
    private jobDetails: JobService
  ) { }

  entireJobDetails: any[];
  jobs: any[];

  jobPoster

  entireJob: {
    name: string;
    profile: string;
    created: string;
    id: string;
    description: string;
    category: string;
    city: string;
  }



  ngOnInit(): void {
    this.getJobDetails();



  }

  getJobDetails() {
    this.jobDetails.getJobs().subscribe((result: any) => {
      console.log(result);
      this.jobs = result.data;
      this.fetchOwner();
      if (result.result === 'success') {
        // result?.data.map((ele) => {
        //   ele['created_at'] = moment(ele.created_at).fromNow();
        // });
        // this.jobs.map((job: any) => {
        //   this.jobie.id = job._id;
        //   this.jobie.created = job.created_at;
        //   this.jobie.description = job.job_description;
        //   this.jobie.category = job.job_category;
        //   this.jobie.city = job.city + ' ' + job.country;
        //   console.log('Bruh  what');
        //   this.entireJob.push(this.jobie);
        // });
        // console.log(this.entireJob);
      }
    });
    console.log(this.jobs);
  }



  fetchOwner() {
    var jobGivers: Array<any> = [];
    var idx = 0;
    for (let i = 0; i < this.jobs.length; i++) {
      this.jobDetails.getUserById(this.jobs[i].user_id).subscribe((data) => {
        console.log('Test1', data);
        const prevTime = Date.parse(data[0]?.created_at);
        var timestamp = Number(new Date().getTime()) + 15 * 24 * 60 * 60 * 1000;
        console.log(prevTime, 'earlierTime');
        console.log(timestamp, 'currentTime');

        if (timestamp > prevTime) {
          console.log('above 15days');
        } else {
          console.log('below 15days');
        }
        // console.log(newDate, 'is time??');

        // console.log(typeof data[0].updated_at, 'typeof time');

        this.jobPoster = data;

        console.log('Test2', this.jobs);

        var detail = {
          ...data[0],
          ...this.jobs[i],
        };
        // console.log('Test 3 ', JSON.stringify(detail));

        jobGivers.push(detail);

        console.log('bruhhh');

        console.log(jobGivers);
        this.entireJobDetails = jobGivers;
        console.log("amogh"+this.entireJobDetails);
        this.fetchPhoto();
      });
    }
  }
  fetchPhoto() {
    console.log('bruh');

    for (let i = 0; i < this.entireJobDetails.length; i++) {
      console.log('calling bruhh');

      this.jobDetails
        .fetchEmployer(this.entireJobDetails[i].user_id)
        .subscribe((data) => {
          console.log(data);
          this.entireJobDetails[i] = {
            ...this.entireJobDetails[i],
            company_logo: data[0].company_logo,
          };

          console.log(this.entireJobDetails);
        });
    }
  }





}

