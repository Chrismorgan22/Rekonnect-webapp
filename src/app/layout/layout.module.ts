import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseModule } from '../base/base.module';
import { PostJobComponent } from './post-job/post-job.component';
import { LayoutComponent } from './layout.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [LayoutComponent, PostJobComponent, UserListComponent],
  imports: [
    CommonModule,
    BaseModule,
    LayoutRoutingModule,
    NgxSpinnerModule
  ]
})
export class LayoutModule { }
