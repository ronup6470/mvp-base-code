import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------------------------------------ //
import { BsDatepickerModule, TimepickerModule, TooltipModule } from 'ngx-bootstrap';
import { AuthGuard } from './services/guard/auth.guard';
import { AuthCallbackComponent } from './component/auth-callback/auth-callback.component';
import { interceptorProviders } from './services/interceptor/interceptors';
import { ConfirmationModalService } from './services/confirmation-modal/confirmation-modal.service';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { PageTitleComponent } from './component/page-title/page-title.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './services/loader/loader.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HttpClientModule } from '@angular/common/http';
import { NgbTimeStringAdapter } from './adapter/timepicker.adapter';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {
  NotificationDropdownPresentationComponent
} from './component/topbar/notification-dropdown-container/notification-dropdown-presentation/notification-dropdown-presentation.component';
import { NotificationDropdownContainerComponent } from './component/topbar/notification-dropdown-container/notification-dropdown-container.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationService } from './services/notifications/notification.service';
import { TopbarService } from './services/topbar/topbar.service';

import { NotificationAdapter } from './adapter/notification-adapter';
import { AuthService } from './services/auth/auth.service';
import { BreakPointObserverService } from './services/break-point-observer/break-point-observer.service';
import { UpdatedNotificationService } from './services/notifications/updated-notification.service';
import { HelpContentDataService } from './services/help-content/help-content-data.service';
import { MenuDataService } from './services/menu/menu-data.service';
import { SiteDataService } from './services/site/site-data.service';
import { LanguageDataService } from './services/language/language-data.service';
import { ApolloModule } from 'apollo-angular';
import { HttpService } from './services/http/http.service';
import { LayoutModule } from '@angular/cdk/layout';
import { LogoutComponent } from './component/logout/logout.component';
import { TopbarPresentationComponent } from './component/topbar/topbar-presentation/topbar.presentation';

/**
 * CoreModule
 */
@NgModule({
  declarations: [
    AuthCallbackComponent,
    PageTitleComponent,
    BreadcrumbComponent,
    TopbarPresentationComponent,
    SidebarComponent,
    NotificationDropdownContainerComponent,
    NotificationDropdownPresentationComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ToastrModule.forRoot(),
    OverlayModule,
    LayoutModule,
    NgSelectModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    TooltipModule.forRoot(),
    TranslateModule,
    SharedModule,
    ApolloModule
  ],
  providers: [],
  exports: [
    CommonModule,
    RouterModule,
    BsDatepickerModule,
    TimepickerModule,
    NgSelectModule,
    BreadcrumbComponent,
    PageTitleComponent,
    TopbarPresentationComponent,
    SidebarComponent,
    LogoutComponent
  ],
  entryComponents: [NotificationDropdownContainerComponent]

})
export class CoreModule {

  /**
   * For root
   * @param environment 
   * @returns root 
   */
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        interceptorProviders,
        LoaderService,
        HelpContentDataService,
        MenuDataService,
        SiteDataService,
        TopbarService,
        HttpService,
        LanguageDataService,
        NotificationService,
        UpdatedNotificationService,
        ConfirmationModalService,
        AuthService,
        BreakPointObserverService,
        NgbTimeStringAdapter,
        NotificationAdapter,
        {
          provide: 'environment',
          useValue: environment
        }
      ],
    };
  }

}
