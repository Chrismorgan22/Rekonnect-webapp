import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bgv-form-dashboard',
  templateUrl: './bgv-form-dashboard.component.html',
  styleUrls: ['./bgv-form-dashboard.component.scss'],
})
export class BgvFormDashboardComponent implements OnInit {
  name: String = '';
  email: String = '';
  user = JSON.parse(sessionStorage.getItem('_ud'));
  confirmedPay: boolean;
  hasApplied: boolean;
  userData: {
    userId: String;
    fname: String;
    lname: String;
    email: String;
  } = {
    userId: '',
    fname: '',
    lname: '',
    email: '',
  };
  __DEV__ = document.domain === 'localhost';

  constructor(private _jobService: JobService, private router: Router) {}
  setRecord() {
    console.log('called');

    this._jobService.postBgv(this.userData).subscribe((data) => {
      console.log(data);
    });
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

    const data = await fetch('http://localhost:8080/api/razorpay', {
      method: 'POST',
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: this.__DEV__ ? 'rzp_live_Kvzf4vq5RV7FiC' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'BGV report',
      description: 'Payment towards BGV report!',
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
    this.setRecord();
    paymentObject.open();
  }

  openConfirm() {
    this.confirmedPay = true;
  }
  handleModal() {
    this.confirmedPay = false;
    // this.router.navigate(['/dashboard/candidate']);
  }
  handleName(event: Event) {
    this.name = (<HTMLInputElement>event.target).value;
  }
  handleEmail(event: Event) {
    this.email = (<HTMLInputElement>event.target).value;
    this.userData.email = this.email;
  }
  bgvStatus() {
    this._jobService.getBgvStatus(this.user[0]._id).subscribe((data) => {
      console.log(data);
      if (data.length != 0) {
        this.hasApplied = true;
      } else {
        this.hasApplied = false;
      }
    });
  }
  getUdates() {
    this.userData.userId = this.user[0]._id;
    this.userData.fname = this.user[0].first_name;
    this.userData.lname = this.user[0].last_name;

    console.log(this.userData);
  }
  ngOnInit(): void {
    // console.log(this.user);
    // console.log(this.user[0]);
    this.getUdates();
    this.bgvStatus();
  }
}
