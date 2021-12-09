import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpertComponent } from './expert/expert.component';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard.component';
import { EmployerComponent } from './employer/employer.component';
import { InstituteComponent } from './institute/institute.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { JobListComponent } from './job-list/job-list.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { BgvFormDashboardComponent } from './bgv-form-dashboard/bgv-form-dashboard.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { CandidateJobViewComponent } from './candidate-job-view/candidate-job-view.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { AuthGuard } from 'src/app/services/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'candidate',
        component: CandidateComponent,
        canActivate: [AuthGuard],
        data: {
          role: '1',
        },
      },
      {
        path: 'expert',
        component: ExpertComponent,
      },
      {
        path: 'employer',
        component: EmployerComponent,
        canActivate: [AuthGuard],
        data: {
          role: '2',
        },
      },
      {
        path: 'institute',
        component: InstituteComponent,
      },
      {
        path: 'candidate-profile',
        component: CandidateProfileComponent,
        canActivate: [AuthGuard],
        data: {
          role: '1',
        },
      },
      {
        path: 'job-list',
        component: JobListComponent,
        canActivate: [AuthGuard],
        data: {
          role: '1',
        },
      },
      {
        path: 'view-job',
        component: ViewJobComponent,
        canActivate: [AuthGuard],
        data: {
          role: '2',
        },
      },
      {
        path: 'bgv-form-dashboard',
        component: BgvFormDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          role: '1',
        },
      },
      {
        path: 'create-job',
        component: CreateJobComponent,
        canActivate: [AuthGuard],
        data: {
          role: '2',
        },
      },
      {
        path: 'organisation-view',
        component: CandidateJobViewComponent,
        canActivate: [AuthGuard],
        data: {
          role: '1',
        },
      },
      {
        path: 'apply-for-job/:id',
        component: ApplyForJobComponent,
        canActivate: [AuthGuard],
        data: {
          role: '1',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
