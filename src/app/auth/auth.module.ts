import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { WelcomeComponent } from './welcome/welcome.component';
import { LinkedinResponseComponent } from './linkedin-response/linkedin-response.component';
import { PersonalizationComponent } from './personalization/personalization.component';

@NgModule({
  declarations: [WelcomeComponent, LinkedinResponseComponent, PersonalizationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SocialLoginModule
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
export class AuthModule { }
