import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'candidate',
    loadChildren: () => import('./candidate/candidate.module').then((m) => m.CandidateModule)
  },
  {
    path: 'expert',
    loadChildren: () => import('./expert/expert.module').then((m) => m.ExpertModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
