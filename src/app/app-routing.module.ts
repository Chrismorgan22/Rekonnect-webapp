import { NgModule } from '@angular/core';
import { ApplyForJobComponent } from './layout/dashboard/apply-for-job/apply-for-job.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'base',
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule),
    // canActivate: [AuthGuard]
    // component:BaseComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
    //canActivate: [AuthGuard]
    // component:BaseComponent
  },
  {
    path: 'dashboard/apply-for-job/:id',
    component: ApplyForJobComponent,
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
