import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
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
  jobPoster: any[];
  bookingOpen: boolean = false;
  jobSearch: string;
  jobApplied: number;
  entireJobDetails: any[];
  jobie: {
    id: string;
    created: string;
    description: string;
    category: string;
    city: string;
    name: string;
    profile: string;
  };
  topJobSkills: string[] = [
    'Ownership',
    'Creativity',
    'Client handling',
    'Analyst',
    'HR',
    'Talent Aquisition',
    'Cumminication',
    'IT',
    'Marketing',
  ];
  toShow: boolean;
  toShowDate: boolean;
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
  __DEV__ = document.domain === 'localhost';

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
  // openDialog() {
  //   this.dialog.open(DialogElementsExampleDialog);
  // }
  updateJoining(condition: string) {
    this.toShowDate = false;
    if (condition == 'true') {
      this.jobDetails
        .updateCandidateJoining(this.userId, true)
        .subscribe((data) => {
          console.log(data);
        });
    } else if (condition == 'false') {
      this.jobDetails
        .updateCandidateJoining(this.userId, false)
        .subscribe((data) => {
          console.log(data);
        });
    }
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
        // document.body.style.backgroundColor = '#DCDCDC';
        sessionStorage.removeItem('firstTime');
      }
    }, 3000);
  }

  // toggleShowDate(){

  // }

  toggleModal() {
    console.log('bruhhh??');

    this.bookingOpen = !this.bookingOpen;
  }
  togglePopup() {
    this.toShow = false;
    document.body.style.backgroundColor = 'unset';
  }

  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async displayRazorpay() {
    const res = await this.loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const data = await fetch(`${environment.apiUrl}/api/razorpay`, {
      method: 'POST',
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: this.__DEV__ ? 'rzp_live_Kvzf4vq5RV7FiC' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Meeting Booking',
      description: 'Payment towards your booking',
      image: '',
      handler: async function (response) {
        alert('payment success');
        this.confirmedPay = true;
        console.log(this.confirmedPay);

        this._jobService
          .updateBgv({
            userId: this.userData.userId,
            fname: this.userData.fname,
            lname: this.userData.lname,
            email: this.userData.email,
          })
          .subscribe((data) => {
            console.log(data);
          });
        // const cred = await fetch('https://api.rekonnect.in/report/apply', {
        //   method: 'POST',

        //   body: JSON.stringify({
        //     userId: this.userData.userId,
        //     fname: this.userData.fname,
        //     lname: this.userData.lname,
        //     email: this.userData.email,
        //   }),
        // })
        //   .then((response) => {
        //     response.json();
        //     this.confirmedPay = true;
        //   })
        //   .catch((err) => console.log(err));

        // console.log(cred);
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    // this.setRecord();
    paymentObject.open();
  }

  displayJoiningDate() {
    console.log(sessionStorage.getItem('firstTimeDate'));

    const validate = () => {
      this.jobDetails.fetchCandidate(this.userId).subscribe((data) => {
        console.log(data);
        let notThere: boolean = data.urgentDateInput == null;
        console.log(notThere, 'paile aila');
        const timeGap = 15 * 24 * 60 * 60 * 1000;
        const prevTime = Date.parse(data.urgentDateInput);

        var timestamp = Number(new Date().getTime());

        console.log(prevTime, 'earlierTime');
        console.log(timestamp, 'currentTime');
        console.log(sessionStorage.getItem('firstTimeDate') == 'true');

        if (timestamp - prevTime >= timeGap || notThere)
          console.log('date please!');
        if (sessionStorage.getItem('firstTimeDate') == 'true') {
          if (timestamp - prevTime >= timeGap || notThere) {
            this.toShowDate = true;

            console.log('show that date bruh please');
          } else {
            this.toShowDate = false;
          }
        } else {
          this.toShowDate = false;
        }
      });
    };
    setTimeout(() => {
      validate();

      // document.body.style.backgroundColor = '#DCDCDC';
      if (this.toShowDate) {
        sessionStorage.removeItem('firstTimeDate');
      }
    }, 3000);
  }
  storeSearch(event: Event): void {
    this.jobSearch = (<HTMLInputElement>event.target).value;
  }
  async fetchAppliedJobs() {
    try {
      const data = await (
        await fetch(`${environment.apiUrl}/job/getJobApplied/${this.userId}`)
      ).json();
      console.log(data, 'jobs applied');
      this.jobApplied = data.length;
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit(): void {
    this.displayProp();
    this.displayJoiningDate();
    this.getUserProfileData();
    this.getJobDetails();
    this.fetchAppliedJobs();
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
        console.log(this.entireJobDetails);
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
  directJob() {
    window.location.replace(`/jobPage`);
    // this.router.navigate([`/jobPage`]);
  }
  getUserProfileData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    // console.log(localData?.created_at, 'userInfo');

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

// @Component({
//   selector: 'dialog-elements-example-dialog',
//   templateUrl: 'dialog-elements-example-dialog.html',
// })
// export class DialogElementsExampleDialog {}
