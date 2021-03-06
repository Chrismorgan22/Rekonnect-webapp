import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SignInComponent } from './sign-in/sign-in.component';
import { CandidateComponent } from './candidate.component';

@NgModule({
  declarations: [CandidateComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '221831887863-smioflkrsmtc8fmveqm0mn99iuivois9.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1025684304911505'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class CandidateModule { }
