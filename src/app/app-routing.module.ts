import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service'
const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'base', loadChildren: () => import('./base/base.module').then(m => m.BaseModule),
    canActivate: [AuthGuard]
    // component:BaseComponent
  },
  {
    path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
    // component:BaseComponent
  },
  {
    path: '',
    redirectTo: '/auth/user/signin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/user/signin'
  }
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
