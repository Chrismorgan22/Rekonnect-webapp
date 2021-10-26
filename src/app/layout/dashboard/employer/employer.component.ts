import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }
  userProfileData:any;
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
