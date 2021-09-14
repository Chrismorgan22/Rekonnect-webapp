import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent,
  children: [
    { 
      path:'',
      component:HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
