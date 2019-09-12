import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'common-libs';
import { MasterComponent } from './components/master/master.component';
import { AppResolverService } from './resolvers/app.resolver';
import { NgOidcClientModule } from 'ng-oidc-client';
import { environment } from '../../environments/environment';
import { WebStorageStateStore } from 'oidc-client';
import { AuthPolicyModule, StorageType } from 'auth-policy';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap';
import { RppBackChannelModule } from '@one-rpp/backchannel-gateway-client';
import { CardDataService } from './services/card/card-data.service';
import { FunctionalDataService } from './services/functional-link/functional-data.service';
import { ChannelNotificationService } from './services/channel-notification/channel-notification.service';
import { GuidelinesService } from './services/guidelines/guidelines.service';

export function authorityUserStorage(){
  return new WebStorageStateStore({ store: window.localStorage})
;}
const environmentUrl = {
  url: environment.backchannelUrl,
  schedularInterval: 10000,
  debug: false
};

@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    RouterModule,
    CoreModule.forRoot(environment),
    CoreModule,
    NgOidcClientModule.forRoot({
      oidc_config: {
        client_id: environment.client_id,
        response_type: environment.response_type,
        scope: environment.scope,
        authority: environment.authority,
        redirect_uri: `${environment.redirect_uri}auth-callback`,
        post_logout_redirect_uri: `${environment.redirect_uri}`,
        silent_redirect_uri: `${environment.redirect_uri}silent-renew.html`,
        automaticSilentRenew: true,
        acr_values: environment.acr_values,
        accessTokenExpiringNotificationTime: 10,
        ui_locales: environment.ui_locales,
        userStore: authorityUserStorage
      }
    }),
    AuthPolicyModule.forRoot({
      url: environment.policy_url,
      clientId: environment.client_id,
      policyName: environment.policy_name,
      storageType: StorageType.localStorage
    }),
    TranslateModule.forRoot(),
    TabsModule.forRoot(),
    RppBackChannelModule.forRoot(environmentUrl),
  ],
  providers: [
    CardDataService,
    FunctionalDataService,
    GuidelinesService,
    AppResolverService,
    ChannelNotificationService
  ]
})
export class AppCoreModule { }
