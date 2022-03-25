import { NgModule } from '@angular/core';
import { ApplyForJobComponent } from './layout/dashboard/apply-for-job/apply-for-job.component';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/Admin/sign-in/sign-in.component';
import { NavscreenComponent } from './layout/navscreen/navscreen.component';
import { ApplicantListComponent } from './layout/applicant-list/applicant-list.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PaymentComponent } from './payment/payment.component';
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
    path:'test1',
    component:Test1Component
  },
  {
    path:'test2',
    component:Test2Component
  },
  {
    path:'newhome',
    component:NewhomeComponent
  }
  

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
