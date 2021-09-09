import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base.component';


@NgModule({
  declarations: [BaseComponent, HeaderComponent],
  imports: [
    CommonModule,
    BaseRoutingModule
  ],
  exports: [BaseComponent,HeaderComponent]
})
export class BaseModule { }
