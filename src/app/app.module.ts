import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { MfeServiceService } from './mfe/mfe-service.service';
import { LoadFragmentsComponent } from './mfe/load-fragments/load-fragments.component';
import { ShareLibModule } from 'share-lib';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    LoadFragmentsComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    ShareLibModule.forRoot(),
  ],
  providers: [                            // Add APP_INITIALIZER
    {
      provide: APP_INITIALIZER,
      useFactory: (mfeService: MfeServiceService) => () =>
      mfeService.init(),
      deps: [MfeServiceService],
      multi: true,
    },
  ],
  bootstrap: [LandingPageComponent]
})
export class AppModule { }
