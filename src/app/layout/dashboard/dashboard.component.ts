import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    // const userData = sessionStorage.getItem('_ud');
    // let userRole;
    // if (userData !== undefined && userData !== null && userData !== '') {
    //   const parsedData = JSON.parse(userData)[0].role;
    //   if (parsedData === '1' || parsedData === 1) {
    //     this.route.navigate(['/dashboard/candidate'])
    //   } else if (parsedData === '2' || parsedData === 2) {
    //     this.route.navigate(['/dashboard/employer'])
    //   }
    // }
  }

}
