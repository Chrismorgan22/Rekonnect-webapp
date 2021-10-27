import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {
  events1: any = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
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
  }

  ngOnInit(): void {
  }

}
