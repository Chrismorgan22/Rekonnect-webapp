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
  userProfileData: any;
  events1: any[];
  designation: any = '';

  constructor(
    private layoutService: LayoutService,
    private jobDetails: JobService,
    private router : Router
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

  ngOnInit(): void {
    this.getUserProfileData();

    this.jobDetails.getJobs().subscribe((data) => {
      this.jobs = data;
      console.log(data);
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



  applyJob(){

    this.router.navigate(['/dashboard/apply-for-job']);


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
