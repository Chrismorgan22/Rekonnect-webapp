import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/services/layout.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userData: any[];
  searchTerm: string;
  constructor(
    public _layoutService: LayoutService,
    public _toastrService: ToastrService,
    public SpinnerService: NgxSpinnerService
  ) {}
  totalLength: any;
  page: number = 1;

  filterUser: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    // this.getUserListData(1);
    this._layoutService.paginateUsers('1', '10').subscribe((response) => {
      this.userData = response.results;
      this.filterUser = this.userData;
      console.log(response.results);
    });
    console.log(this.userData);

    this.totalLength = this.userData.length;
  }

  filterUsers(event: Event): void {
    this.searchTerm = (<HTMLInputElement>event.target).value;
    // console.log(this.searchTerm);
    // console.log(typeof this.searchTerm);
    // console.log(this.userData[0]);

    // this.filterUser = this.userData.filter((user) => {
    //   return user.user_details.first_name.search(this.searchTerm) != -1;
    // });
    console.log(this.filterUser);

    this._layoutService.filterUser(this.searchTerm).subscribe((response) => {
      console.log(response);

      this.filterUser = response;
    });
    console.log(this.filterUser);
  }

  paginateResult(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
  }
  getUserListData(userRole) {
    // console.log(userRole);

    this.userData = [];
    this.SpinnerService.show();
    this._layoutService.getUserList(userRole).subscribe((response) => {
      this.SpinnerService.hide();
      if (response.result !== 'fail') {
        console.log(response.data);
        response.data.map((res: any) => {
          this.userData.push(res.user_details);
        });
        // this.userData = response.data;
        console.log(this.userData);

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
