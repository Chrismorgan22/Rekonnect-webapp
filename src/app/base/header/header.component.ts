import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginFlag:boolean = false;
  // logoutFlag:boolean = false;
  constructor(private router: Router,private eventService:EventService) { }

  ngOnInit(): void {
    this.eventService.tokenSubObservable$.subscribe((muted: boolean) => {
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      if(localData){
        this.loginFlag= true
      }else{
        this.loginFlag= false
      }
      // console.log(muted)
      // if (muted) {}
})
      
  }
  openLogoutModal(){
    $('#logoutmodal').modal('show')
  }
  logout(){
    this.eventService.updateHeader(false)
    sessionStorage.clear();
    this.router.navigate(['/'])
    $('#logoutmodal').modal('hide')
  }
  dismiss(){
    $('#logoutmodal').modal('hide')
  }
}
