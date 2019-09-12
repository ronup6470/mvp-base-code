import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppCoreModule } from './core/app-core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule,  NgbTimeStringAdapter, AuthGuard } from 'common-libs';
import { AppSharedModule } from './shared/app-shared.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SiteDataAdapter } from './core/adapter/site-data-adapter';
import { GuideLineDataAdapter } from './core/adapter/guidelines-adapter';
import { TagFamilyService } from './core/services/tag-family/tag-family.service';
import { TagFamilyAdapter } from './core/services/tag-family/tag-family-adapter';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCoreModule,
    AppSharedModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ApolloModule,
    HttpLinkModule

  ],
  providers: [
    { provide: 'Window', useValue: window },
    {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter},
    { provide: AuthGuard, useClass: AuthGuard },
    SiteDataAdapter,
    GuideLineDataAdapter,
    TagFamilyService,
    TagFamilyAdapter
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    this.configApolloClient();
  }

  private configApolloClient() {
    this.apollo.create({
      link: this.httpLink.create({ uri: environment.cmsUrl }),
      cache: new InMemoryCache(
        {
          addTypename: false
        }
      ),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        },
        watchQuery: {
          fetchPolicy: 'cache-first'
        }
      }
    });
  }


}
