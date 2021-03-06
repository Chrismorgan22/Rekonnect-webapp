import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseModule } from '../base/base.module';
import { PostJobComponent } from './post-job/post-job.component';
import { LayoutComponent } from './layout.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AboutComponent } from './about/about.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { NavscreenComponent } from './navscreen/navscreen.component';
import { BgvlistComponent } from './bgvlist/bgvlist.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    ApplicantListComponent,
    LayoutComponent,
    PostJobComponent,
    UserListComponent,
    AboutComponent,
    NavscreenComponent,
    BgvlistComponent,
  ],
  imports: [
    CommonModule,
    BaseModule,
    MatPaginatorModule,
    LayoutRoutingModule,
    NgxSpinnerModule,
    MatSliderModule,
  ],
  exports: [ApplicantListComponent],
})
export class LayoutModule {}
