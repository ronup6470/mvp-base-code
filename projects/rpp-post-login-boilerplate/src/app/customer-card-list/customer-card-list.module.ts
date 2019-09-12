
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to customer.
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// ----------------------------------------------------------------- //
import { CustomerCardListRoutingModule } from './customer-card-list-routing.module';
import { CustomerCardListViewContainerComponent } from './customer-card-list-view.container';
import { CustomerService } from './customer.service';
import { CustomerAdapter,CustomerListAdapter} from './customer-adapter/customer.adapter';
import { CustomerCardListContainerComponent } from './customer-card-list-container/customer-card-list.container';
import { CustomerCardListPresentationComponent } from './customer-card-list-container/customer-card-list-presentation/customer-card-list.presentation';
import { CustomerViewContainerComponent } from './customer-view-container/customer-view.container';
import { CustomerViewPresentationComponent } from './customer-view-container/customer-view-presentation/customer-view.presentation';
import { CustomerFormPresentationComponent } from './customer-form-container/customer-form-presentation/customer-form.presentation';
import { CustomerFormContainerComponent } from './customer-form-container/customer-form.container';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/customer/', '.json');
}

@NgModule({
  declarations: [
    CustomerFormContainerComponent,
    CustomerCardListViewContainerComponent, 
    CustomerCardListContainerComponent, 
    CustomerCardListPresentationComponent,
    CustomerViewContainerComponent,
    CustomerViewPresentationComponent,
    CustomerFormPresentationComponent,
    CustomerFormContainerComponent,
  ],
  imports: [
    SharedModule,
    CustomerCardListRoutingModule,
    BsDatepickerModule,
    PortalModule,
    OverlayModule,
    NgbDropdownModule,
    InfiniteScrollModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers: [
    CustomerListAdapter,
    CustomerService,
    CustomerAdapter,

  ],
  entryComponents:[

  ],
})
export class CustomerCardListModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
     this.languageService.languageChange$.subscribe((lang: string) => {
         if(lang !== null)
         {
             this.translate.use(lang);
         }
    });
  }
}

