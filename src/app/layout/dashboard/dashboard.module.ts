import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard.component';
import { ExpertComponent } from './expert/expert.component';
import { EmployerComponent } from './employer/employer.component';
import { InstituteComponent } from './institute/institute.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { ProfileComponent } from './profile/profile.component';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { JobListComponent } from './job-list/job-list.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { BgvFormDashboardComponent } from './bgv-form-dashboard/bgv-form-dashboard.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { CandidateJobViewComponent } from './candidate-job-view/candidate-job-view.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerViewJobComponent } from './employer-view-job/employer-view-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
@NgModule({
  declarations: [
    DashboardComponent,
    CandidateComponent,
    ExpertComponent,
    ProfileComponent,
    EmployerComponent,
    InstituteComponent,
    CandidateProfileComponent,
    JobListComponent,
    ViewJobComponent,
    BgvFormDashboardComponent,
    CreateJobComponent,
    CandidateJobViewComponent,
    ApplyForJobComponent,
    EmployerViewJobComponent,
    UpdateJobComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    TimelineModule,
    AvatarModule,
    AvatarGroupModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
