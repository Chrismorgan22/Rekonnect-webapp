import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rekonnect-webapp';
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
    }else{
      router.navigate(['/'])
    }
  }
  ngOnInit(): void {
  }
}
