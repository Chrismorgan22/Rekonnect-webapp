import { NgModule } from '@angular/core';
import { ApplyForJobComponent } from './layout/dashboard/apply-for-job/apply-for-job.component';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/Admin/sign-in/sign-in.component';
import { JobpageComponent } from './jobpage/jobpage.component';
import { NavscreenComponent } from './layout/navscreen/navscreen.component';
import { ApplicantListComponent } from './layout/applicant-list/applicant-list.component';
import { PublicJobsComponent } from './public-jobs/public-jobs.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { ViewPublicJobsComponent } from './view-public-jobs/view-public-jobs.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { NewhomeComponent } from './newhome/newhome.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'base',
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'dashboard/apply-for-job/:id',
    component: ApplyForJobComponent,
  },
  {
    path: 'job/public/:id',
    component: ViewPublicJobsComponent,
  },
  {
    path: 'admin',
    component: SignInComponent,
  },
  {
    path: 'navigate',
    component: NavscreenComponent,
  },
  {
    path: 'applicant-list',
    component: ApplicantListComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },

  {
    path: 'test1',
    component: Test1Component,
  },
  { path: 'alljobs', component: PublicJobsComponent },
  {
    path: 'test2',
    component: Test2Component,
  },
  {
    path: 'jobPage/:search',
    component: JobpageComponent,
  },
  {
    path: 'newhome',
    component: NewhomeComponent,
  },
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: '/',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
