import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CandidateComponent } from './candidate.component';

@NgModule({
  declarations: [CandidateComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class CandidateModule { }
