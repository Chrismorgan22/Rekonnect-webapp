import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [BrowserModule, UserListComponent],
  imports: [NgxPaginationModule],
  providers: [],
  bootstrap: [UserListComponent],
})
export class UserListModule {}
