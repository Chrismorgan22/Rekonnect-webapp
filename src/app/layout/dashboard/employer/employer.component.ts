import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { JobService } from 'src/app/services/job.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

import { Router } from '@angular/router';

import * as moment from 'moment';
import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { log } from 'console';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};
export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent implements OnInit {
  appliedUserList: any = [];
  listOfJobs: any = [];
  totalJobs: any[] = [];
  apppliedUserData: any[] = [];
  empID: string = JSON.parse(sessionStorage.getItem('_ud'))[0]._id;
  jobData: {
    title: string;
    company: string;
    details: string;
    pincode: string;
    location: string;
    graduate: any;
    specializationData: string;
    skills: any;
    workExp: number;
    minExp: number;
  } = {
    title: '',
    company: '',
    details: '',
    pincode: '',
    location: '',
    graduate: '',
    specializationData: '',
    skills: '',
    workExp: 0,
    minExp: 0,
  };
  userProfileData: { first_name: ''; last_name: ''; employer_details: any[] };
  events1: any = [];

  handleTitle = (event: Event) => {
    this.jobData.title = (<HTMLInputElement>event.target).value;
  };
  handleCompany = (event: Event) => {
    this.jobData.company = (<HTMLInputElement>event.target).value;
  };
  handleDescription = (event: Event) => {
    this.jobData.details = (<HTMLInputElement>event.target).value;
  };

  handlePin = (event: Event) => {
    this.jobData.pincode = (<HTMLInputElement>event.target).value;
  };

  handleLocation = (event: Event) => {
    this.jobData.location = (<HTMLInputElement>event.target).value;
  };
  handleGrad = (event: Event) => {
    this.jobData.graduate = (<HTMLInputElement>event.target).value;
  };
  handleSpec = (event: Event) => {
    this.jobData.specializationData = (<HTMLInputElement>event.target).value;
  };
  handleSkill = (event: Event) => {
    this.jobData.skills = (<HTMLInputElement>event.target).value;
  };
  // handleWorkexp = (event: Event) => {
  //   this.jobData.workExp = (<HTMLInputElement>event.target).value;
  // };

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild('chart1') chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1>;
  constructor(
    private layoutService: LayoutService,
    private jobService: JobService,
    private router: Router,
    private jobApplicationService: JobApplicationService
  ) {
    this.events1 = [
      {
        designation: 'HR',
        year: moment(new Date()).format('MMM YYYY'),
        company_name: 'IIS',
      },
      {
        designation: 'CEO',
        year: moment(new Date()).format('MMM YYYY'),
        company_name: 'IIS',
      },
      {
        designation: 'Developer',
        year: moment(new Date()).format('MMM YYYY'),
        company_name: 'IIS',
      },
      {
        designation: 'BDE',
        year: moment(new Date()).format('MMM YYYY'),
        company_name: 'IIS',
      },
      {
        designation: 'Sr. Developer',
        year: moment(new Date()).format('MMM YYYY'),
        company_name: 'IIS',
      },
    ];
    this.chartOptions = {
      series: [44, 55],
      chart: {
        height: 350,
        type: 'radialBar',
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: undefined,
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '14px',
              fontFamily: undefined,
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val + '%';
              },
            },

            // total: {
            //   show: true,
            //   label: "Total",
            //   formatter: function (w) {
            //     return "249";
            //   }
            // }
          },
        },
      },

      labels: ['Apples', 'Oranges'],
    };
    this.chartOptions1 = {
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          '01/2011',
          '02/2011',
          '03/2011',
          '04/2011',
          '05/2011',
          '06/2011',
        ],
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
  }

  ngOnInit() {
    this.getUserByJob();

    this.getUserProfileData();
    this.getTotalJobs();
    // console.log(this.empID);
    // console.log(this.listOfJobs);
  }

  getUserProfileData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    this.layoutService.getUserProfile(localData._id).subscribe((res) => {
      console.log(res);
      this.userProfileData = res.data[0];
      // this.empID = this.userProfileData;
      this.empID = this.userProfileData.employer_details[0]._id;
      console.log(this.userProfileData);
    });
  }
  async getTotalJobs() {
    try {
      this.jobService.getAllJobs().subscribe((data) => {
        console.log(data);
        this.totalJobs = data;
        this.getApplicants();
      });
    } catch (error) {}
  }
  getApplicants() {
    for (let i = 0; i < this.listOfJobs.length; i++) {
      let jobId = this.listOfJobs[i]._id;
      this.jobApplicationService.getUserByJob(jobId).subscribe((data) => {
        console.log(data);
        this.appliedUserList.push(data[0]);
        this.fetchProperUser();
        console.log(this.appliedUserList);
      });
    }
  }
  fetchProperUser() {
    for (let i = 0; i < this.appliedUserList.length; i++) {
      this.jobService
        .getUserById(this.appliedUserList[i].candidate_id)
        .subscribe((data) => {
          console.log(data);
          this.apppliedUserData.push(data);
        });
    }
  }
  getUserByJob() {
    console.log(this.empID);

    this.jobService.fetchJobsPosted(this.empID).subscribe((data) => {
      this.listOfJobs = data;
      console.log(data);
    });

    console.log('done');
  }
  postJob() {
    this.router.navigate(['/dashboard/create-job']);
  }

  handleSubmit = (): void => {
    console.log(this.jobData);
    this.jobService.postJobs(this.jobData).subscribe(() => {
      console.log('Job created!!');
    });
  };
}
