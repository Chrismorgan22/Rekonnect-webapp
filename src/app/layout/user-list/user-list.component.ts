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
    this.getUserListData();
  }
  getUserListData() {
    this.SpinnerService.show();
    this._layoutService.getUserList().subscribe(response => {
      this.SpinnerService.hide();
      if (response.result !== 'fail') {
        this.userData = response.data;
      } else {
        this._toastrService.error(
          response.message, response.result
        )
      }
    })
  }
}
