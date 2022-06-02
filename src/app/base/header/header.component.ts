import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { LayoutService } from '../../services/layout.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginFlag: boolean = false;
  searchDrop = false;
  userList: Array<any> = [];
  // logoutFlag:boolean = false;
  constructor(
    private router: Router,
    private eventService: EventService,
    private _layoutService: LayoutService
  ) {}
  toggleSearch() {
    this.searchDrop = !this.searchDrop;
  }
  ngOnInit(): void {
    this.eventService.tokenSubObservable$.subscribe((muted: boolean) => {
      const localData = JSON.parse(sessionStorage.getItem('_ud'));
      console.log(localData);

      if (localData[0] != null) {
        this.loginFlag = true;
      } else {
        this.loginFlag = false;
      }
      // console.log(muted)
      // if (muted) {}
    });
  }
  searchUser(event: Event) {
    const searchTerm = (<HTMLInputElement>event.target).value;
    this._layoutService.filterUser(searchTerm).subscribe((res) => {
      console.log(res);
      this.userList = res;
    });
  }
  openLogoutModal() {
    $('#logoutmodal').modal('show');
  }
  logout() {
    this.eventService.updateHeader(false);
    sessionStorage.clear();
    this.router.navigate(['/']);
    $('#logoutmodal').modal('hide');
  }
  dismiss() {
    $('#logoutmodal').modal('hide');
  }
  btnClick= function () {
    this.router.navigateByUrl('/list-jobs');
};
}
