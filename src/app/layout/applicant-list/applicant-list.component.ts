import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/services/layout.service';
import { JobService } from 'src/app/services/job.service';
@Component({
  selector: 'app-applicant-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class ApplicantListComponent implements OnInit {
  userData: any[];
  searchTerm: string;
  constructor(
    public _layoutService: LayoutService,
    public _toastrService: ToastrService,
    public SpinnerService: NgxSpinnerService,
    private _jobService: JobService
  ) {}
  totalLength: any;
  page: number = 1;

  filterUser: string[];
  applicants: any[];
  ngOnInit(): void {
    this.getUserListData(1);
    this.totalLength = this.userData.length;
    this._jobService.getApplicants().subscribe((response) => {
      this.applicants = response;
      console.log(this.applicants);
    });
  }

  filterUsers(event: Event): void {
    this.searchTerm = (<HTMLInputElement>event.target).value;
    console.log(this.searchTerm);
    console.log(typeof this.searchTerm);
    console.log(this.userData[0]);

    this.filterUser = this.userData.filter((user) => {
      return user.user_details.first_name.search(this.searchTerm) != -1;
    });
  }
  getUserListData(userRole) {
    this.userData = [];
    this.SpinnerService.show();
    this._layoutService.getUserList(userRole).subscribe((response) => {
      this.SpinnerService.hide();
      if (response.result !== 'fail') {
        this.userData = response.data;
        this.filterUser = this.userData;
      } else {
        this._toastrService.error(
          'User list is not available',
          'No Data Found'
        );
      }
    });
  }
  changeUserRoleSwitch(event) {
    console.log(event, event.target.checked);
    if (event.target.checked) {
      this.getUserListData(1);
    } else {
      this.getUserListData(2);
    }
  }
}
