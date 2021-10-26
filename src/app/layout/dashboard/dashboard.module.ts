import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard.component';
import { ExpertComponent } from './expert/expert.component';
import { EmployerComponent } from './employer/employer.component';
import { InstituteComponent } from './institute/institute.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {TimelineModule} from 'primeng/timeline';
@NgModule({
  declarations: [DashboardComponent, CandidateComponent, ExpertComponent, EmployerComponent, InstituteComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    TimelineModule
  ]
})
export class DashboardModule { }
