import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';
import { ViewChild } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import * as moment from 'moment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  jobs: any[];
  jobie: {
    id: string;
    created: string;
    description: string;
    category: string;
    city: string;
    name: string;
    profile: string;
  };

  toShow: boolean;
  userProfileData: any;
  events1: any[];
  entireJob: {
    name: string;
    profile: string;
    created: string;
    id: string;
    description: string;
    category: string;
    city: string;
  }[] = [];
  designation: any = '';
  isBgv: boolean = false;
  fileUrl: string;
  numberOfJobs: any;
  appliedJobs: any;
  userId: any = sessionStorage.getItem('_ud').substring(9, 33);
  constructor(
    private layoutService: LayoutService,
    private jobDetails: JobService,
    private router: Router
  ) {
    // this.events1 = [
    //   { status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
    //   { status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7' },
    //   { status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
    //   { status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' }
    // ];
    this.chartOptions = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 200,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }
  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.fileUrl);
    link.setAttribute('download', this.fileUrl);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  displayProp() {
    console.log('bruh');
    console.log(sessionStorage.getItem('firstTime'));

    const validate = () => {
      if (sessionStorage.getItem('firstTime') == 'true') {
        this.toShow = true;
      } else {
        this.toShow = false;
      }
    };
    setTimeout(() => {
      validate();
      if (this.toShow) {
        document.body.style.backgroundColor = '#DCDCDC';
        sessionStorage.removeItem('firstTime');
      }
    }, 3000);
  }
  togglePopup() {
    this.toShow = false;
    document.body.style.backgroundColor = 'unset';
  }
  ngOnInit(): void {
    this.displayProp();
    this.getUserProfileData();
    this.getJobDetails();
    this.jobDetails.fetchJobs().subscribe((data) => {
      console.log(data);

      this.numberOfJobs = data.length;
    });

    this.jobDetails.checkJobApplications(this.userId).subscribe((data) => {
      console.log(data);
      this.appliedJobs = data.length;
    });

    const bgvModel = this.jobDetails
      .fetchSingle(this.userId)
      .subscribe((data) => {
        console.log(data[0]);

        if (data[0].pdf !== '') {
          this.isBgv = true;
          this.fileUrl = data[0].pdf;
        }
      });

    // this.jobDetails.getJobs().subscribe((data) => {
    //   data?.data.map((ele) => {
    //     ele['created_at'] = moment(ele.created_at).fromNow();
    //   })
    //   this.jobs = data;
    //   console.log(data);
    // });
    // console.log(this.jobs);
  }

  getJobDetails() {
    this.jobDetails.getJobs().subscribe((result: any) => {
      console.log(result);

      if (result.result === 'success') {
        result?.data.map((ele) => {
          ele['created_at'] = moment(ele.created_at).fromNow();
        });
        this.jobs = result.data;
        this.jobs.map((job: any) => {
          this.jobie.id = job._id;
          this.jobie.created = job.created_at;
          this.jobie.description = job.job_description;
          this.jobie.category = job.job_category;
          this.jobie.city = job.city + ' ' + job.country;

          this.entireJob.push(this.jobie);
        });

        console.log(this.entireJob);
      }
    });
    console.log(this.jobs);
  }
  getUserProfileData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    this.layoutService.getUserProfile(localData._id).subscribe((res) => {
      console.log(res);
      this.userProfileData = res.data[0];
      if (
        this.userProfileData.candidate_details[0].experience_data
          .experience_type === 'Experienced'
      ) {
        this.getTimelineData();
      } else {
        this.events1 = [];
        this.designation = 'Fresher';
      }
    });
  }

  applyJob(jobId: String) {
    console.log(this.userId);
    console.log(jobId);
    this.router.navigate([`/dashboard/apply-for-job/${jobId}`]);
  }

  getTimelineData() {
    const timelineArray = [];
    const designationArr: any = [];
    this.userProfileData.candidate_details[0].experience_data.experience_details.map(
      (ele) => {
        const json = {};
        designationArr.push(ele.designation);
        json['designation'] = ele.designation;
        json['company_name'] = ele.company;
        json['year'] = moment(ele.start_date).format('MMM YYYY');
        timelineArray.push(json);
      }
    );
    this.events1 = timelineArray;
    this.designation = _.uniq(designationArr).join(', ');
  }
}
