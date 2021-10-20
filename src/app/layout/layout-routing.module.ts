import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../base/home/home.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout.component';
import { PostJobComponent } from './post-job/post-job.component';
import { UserListComponent } from './user-list/user-list.component';
import {
  AuthGuardService as AuthGuard
} from '../services/auth-guard.service'
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'post-job',
        component: PostJobComponent
      },
      {
        path: 'candidate-list',
        component: UserListComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
