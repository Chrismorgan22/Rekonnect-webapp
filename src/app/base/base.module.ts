import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from '../auth/welcome/welcome.component';


@NgModule({
  declarations: [BaseComponent, HeaderComponent, HomeComponent],
  imports: [
    CommonModule,
    BaseRoutingModule
  ],
  exports: [BaseComponent, HeaderComponent, HomeComponent]
})
export class BaseModule { }
