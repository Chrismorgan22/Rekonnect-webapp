import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkedinResponseComponent } from './linkedin-response/linkedin-response.component';
import { PersonalizationComponent } from './personalization/personalization.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {
  AuthGuardService as AuthGuard
} from '../services/auth-guard.service'
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
  {
    path: 'personalization',
    component: PersonalizationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'linkedinLoginResponse',
    component: LinkedinResponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
