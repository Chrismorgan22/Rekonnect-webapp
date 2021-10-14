import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, CandidateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
