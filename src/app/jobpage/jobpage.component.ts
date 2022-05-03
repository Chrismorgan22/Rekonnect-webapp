import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-jobpage',
  templateUrl: './jobpage.component.html',
  styleUrls: ['./jobpage.component.scss'],
})
export class JobpageComponent implements OnInit {
  constructor() {}

  jobData: Array<any> = [];

  ngOnInit(): void {
    // fetch(`${environment.apiUrl}/job/searchJob`)

    var term =
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ];

    const updated = term.split('%2520');

    if (updated.length == 1) {
      term = updated[0];
    } else {
      term = '';
      updated.forEach((item) => {
        term += item + ' ';
      });
      console.log(term);
    }
    this.fetchData(term);
  }
  async fetchData(term: string) {
    const data = await (
      await fetch(`${environment.apiUrl}/job/searchJob?search=${term}`)
    ).json();

    console.log(data);
    this.jobData = data;
  }
}
