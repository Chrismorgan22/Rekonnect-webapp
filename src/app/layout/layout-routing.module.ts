import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../base/home/home.component';
import { LayoutComponent } from './layout.component';
import { PostJobComponent } from './post-job/post-job.component';
import { UserListComponent } from './user-list/user-list.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
