import { NgModule } from '@angular/core';
import { ApplyForJobComponent } from './layout/dashboard/apply-for-job/apply-for-job.component';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/Admin/sign-in/sign-in.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },

  {
    path: 'base',
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'dashboard/apply-for-job/:id',
    component: ApplyForJobComponent,
  },
  {
    path: 'admin',
    component: SignInComponent,
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
export class AppRoutingModule { }
