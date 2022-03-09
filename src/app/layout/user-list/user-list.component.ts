import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/services/layout.service';
import { JobService } from 'src/app/services/job.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userData: any[];

  userThere: any = false;
  moreInfo: any = {};
  toShowInfo: boolean = false;
  searchTerm: string;
  constructor(
    public _layoutService: LayoutService,
    public _toastrService: ToastrService,
    public jobService: JobService,
    public SpinnerService: NgxSpinnerService
  ) {}
  totalLength: any;
  page: number = 1;

  filterUser: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    // this.getUserListData(1);
    this._layoutService.paginateUsers(1, 10).subscribe((response) => {
      this.userData = response.results;
      this.filterUser = this.userData;
      console.log(response);
      this.userData.map((item, idx) => {
        this.jobService.fetchCandidate(item._id).subscribe((res) => {
          var isThere = false;
          console.log(res);

          if (
            res?.resume_url !== '' &&
            res?.resume_url !== null &&
            res != null
          ) {
            console.log('hoe is true bruh?');

            isThere = true;
          }
          this.userData[idx] = {
            ...this.userData[idx],
            resume_url: res?.resume_url,
            resume_present: isThere,
          };
        });
      });
      console.log(this.userData, 'with reume');

      this.totalLength = response.dataLength;
    });
    console.log(this.userData);

    // this._layoutService
    //   .paginateCandidates({ page: 1, limit: 10 })
    //   .subscribe((res) => {
    //     this.userData = res.results;
    //     res.results.map((item: any, idx: any) => {
    //       this.jobService.getUserById(item.user_id).subscribe((res) => {
    //         console.log(res, 'userid done!');
    //         this.userData[idx] = { ...this.userData[idx], res };
    //       });
    //     });
    //     this.filterUser = this.userData;
    //     console.log(res);
    //     console.log(this.userData);

    //     this.totalLength = res.dataLength;
    //   });
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

  paginateResult(event: PageEvent) {
    console.log(event, 'paginated result');
    //make an api call to paginate
    this._layoutService
      .paginateUsers(event.pageIndex + 1, event.pageSize)
      .subscribe((response) => {
        this.userData = response.results;
        this.userData.map((item, idx) => {
          this.jobService.fetchCandidate(item._id).subscribe((res) => {
            var isThere = false;
            console.log(res);

            if (res?.resume_url !== '' && res.resume_url !== null) {
              isThere = true;
            }
            this.userData[idx] = {
              ...this.userData[idx],
              resume_url: res.resume_url,
              resume_present: isThere,
            };
          });
        });
        this.filterUser = this.userData;
        console.log(this.userData);

        console.log(response.results);
      });
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
  toggleMore(id) {
    console.log('toggle this shit', id);
    this.moreInfo = {};
    this.jobService.fetchCandidate(id).subscribe((res) => {
      console.log(res);
      if (res != null) {
        this.userThere = true;
      }
      var isFresh = false;
      if (res.experience_data.experience_type == 'Fresher') {
        isFresh = true;
      }
      this.moreInfo = { ...res, isFresher: isFresh };
    });
    this.toShowInfo = !this.toShowInfo;
  }
}
