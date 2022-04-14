import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';

import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { NewhomeComponent } from './newhome/newhome.component';
import { PublicJobsComponent } from './public-jobs/public-jobs.component';
import { ViewPublicJobsComponent } from './view-public-jobs/view-public-jobs.component';
@NgModule({
  declarations: [AppComponent, PaymentComponent, Test1Component, Test2Component, NewhomeComponent, PublicJobsComponent, ViewPublicJobsComponent],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BaseModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
