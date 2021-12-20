import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bgv-form-dashboard',
  templateUrl: './bgv-form-dashboard.component.html',
  styleUrls: ['./bgv-form-dashboard.component.scss'],
})
export class BgvFormDashboardComponent implements OnInit {
  name: String = '';
  email: String = '';
  __DEV__ = document.domain === 'localhost';
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

    const data = await fetch('http://localhost:8000/api/razorpay', {
      method: 'POST',
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: this.__DEV__ ? 'rzp_test_nBBe0QbVWt2oIh' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'BGV report',
      description: 'Payment towards BGV report!',
      image: '',
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        alert('payment success');
      },
      prefill: {
        name: 'alroy fernandes',
        email: 'alroyfernandes07518@gmail.com@gmail.com',
        phone_number: '9899999999',
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }
  constructor() {}

  handleName(event: Event) {
    this.name = (<HTMLInputElement>event.target).value;
  }
  handleEmail(event: Event) {
    this.email = (<HTMLInputElement>event.target).value;
  }

  ngOnInit(): void {}
}
