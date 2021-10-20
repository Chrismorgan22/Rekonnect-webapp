import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from '../auth/welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import {SliderModule} from 'primeng/slider';

@NgModule({
  declarations: [BaseComponent, HeaderComponent, HomeComponent, FooterComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SliderModule
  ],
  exports: [BaseComponent, HeaderComponent, HomeComponent, FooterComponent]
})
export class BaseModule { }
