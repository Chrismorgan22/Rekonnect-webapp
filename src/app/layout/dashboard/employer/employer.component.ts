import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
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
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend
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
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  userProfileData: any;
  events1: any = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1>;
  constructor(private layoutService: LayoutService) {
    this.events1 = [
      { designation: 'HR', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'CEO', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'Developer', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'BDE', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
      { designation: 'Sr. Developer', year: moment(new Date()).format('MMM YYYY'), company_name: 'IIS' },
    ];
    this.chartOptions = {
      series: [44, 55],
      chart: {
        height: 350,
        type: "radialBar",

      },
      legend: {
        position: "right",
        offsetY: 40
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
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '14px',
              fontFamily: undefined,
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val + '%'
              }
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

      labels: ["Apples", "Oranges"]
    };
    this.chartOptions1 = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27]
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        },

      },
      xaxis: {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011"
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      },

    };
  }
  ngOnInit(): void {
    this.getUserProfileData()
  }
  getUserProfileData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    this.layoutService.getUserProfile(localData._id).subscribe(res => {
      console.log(res)
      this.userProfileData = res.data[0];
      console.log(this.userProfileData);
    })
  }
}
