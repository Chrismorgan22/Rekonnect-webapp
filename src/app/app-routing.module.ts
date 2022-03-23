import { NgModule } from '@angular/core';
import { ApplyForJobComponent } from './layout/dashboard/apply-for-job/apply-for-job.component';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/Admin/sign-in/sign-in.component';
import { NavscreenComponent } from './layout/navscreen/navscreen.component';
import { ApplicantListComponent } from './layout/applicant-list/applicant-list.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent2Component } from './test-component2/test-component2.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { PaymentComponent } from './payment/payment.component';
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
    path: 'test1',
    component: TestComponentComponent,
  },
  {
    path: 'test2',
    component: TestComponent2Component,
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
