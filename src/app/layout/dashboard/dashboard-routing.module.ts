import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'candidate',
        component: CandidateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
