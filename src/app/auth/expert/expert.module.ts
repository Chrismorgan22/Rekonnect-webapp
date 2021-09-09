import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertRoutingModule } from './expert-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ExpertComponent } from './expert.component';

@NgModule({
  declarations: [ExpertComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    ExpertRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ExpertModule { }
