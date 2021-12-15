import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(location: Location, router: Router) {
    const userData = sessionStorage.getItem('_ud');
    if (userData !== undefined && userData !== null && userData !== '') {
      const parsedData = JSON.parse(userData)[0].role;
      if (location.path() != '') {
        router.navigate([location.path()]);
      } else {
        if (parsedData === '1' || parsedData === 1) {
          router.navigate(['/dashboard/candidate'])
        } else if (parsedData === '2' || parsedData === 2) {
          router.navigate(['/dashboard/employer'])
        }
      }
    } else {
      router.navigate(['/'])
    }
  }
  ngOnInit(): void {
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
