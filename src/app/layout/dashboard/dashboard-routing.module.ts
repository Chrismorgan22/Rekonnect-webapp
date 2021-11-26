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
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'candidate',
        component: CandidateComponent,
      },
      {
        path: 'expert',
        component: ExpertComponent,
      },
      {
        path: 'employer',
        component: EmployerComponent,
      },
      {
        path: 'institute',
        component: InstituteComponent,
      },
      {
        path: 'candidate-profile',
        component: CandidateProfileComponent,
      },
      {
        path: 'job-list',
        component: JobListComponent,
      },
      {
        path: 'view-job',
        component: ViewJobComponent,
      },
      {
        path: 'bgv-form-dashboard',
        component: BgvFormDashboardComponent,
      },
      {
        path: 'create-job',
        component: CreateJobComponent,
      },
      {
        path: 'candidate-job-view',
        component: CandidateJobViewComponent,
      },
      {
        path: 'apply-for-job',
        component: ApplyForJobComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
