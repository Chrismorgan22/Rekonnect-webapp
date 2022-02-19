import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from '../auth/welcome/welcome.component';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'candidateinfo',
      component: CandidateInfoComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
