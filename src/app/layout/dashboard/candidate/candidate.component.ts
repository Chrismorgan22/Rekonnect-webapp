import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  userProfileData: any = '';
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.getUserProfileData();
  }
  getUserProfileData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    this.layoutService.getUserProfile(localData._id).subscribe(res => {
      console.log(res)
      this.userProfileData = res.data[0];
    })
  }
}
