import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData: any;
  constructor(public _layoutService: LayoutService, public _toastrService: ToastrService, public SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUserListData(1);
  }
  getUserListData(userRole) {
    this.userData = [];
    this.SpinnerService.show();
    this._layoutService.getUserList(userRole).subscribe(response => {
      this.SpinnerService.hide();
      if (response.result !== 'fail') {
        this.userData = response.data;
      } else {
        this._toastrService.error(
          'User list is not available', 'No Data Found'
        )
      }
    })
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
