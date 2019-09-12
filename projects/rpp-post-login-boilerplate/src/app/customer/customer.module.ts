
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to customer.
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// ----------------------------------------------------------------- //
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListContainerComponent } from './customer-list-container/customer-list.container';
import { CustomerService } from './customer.service';
import { CustomerAdapter,CustomerFilterAdapter,} from './customer-adapter/customer.adapter';
import { CustomerListDesktopPresentationComponent } from './customer-list-container/customer-list-presentation/customer-list-desktop-presentation/customer-list-desktop.presentation';
import { CustomerListMobilePresentationComponent } from './customer-list-container/customer-list-presentation/customer-list-mobile-presentation/customer-list-mobile.presentation';
import { CustomerFilterPresentationComponent } from './customer-list-container/customer-list-presentation/customer-filter-presentation/customer-filter.presentation';
import { CustomerSortPresentationComponent } from './customer-list-container/customer-list-presentation/customer-list-mobile-presentation/customer-sort-presentation/customer-sort.presentation';
import { CustomerListPresentationComponent } from './customer-list-container/customer-list-presentation/customer-list.presentation';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomerFormContainerComponent } from './customer-form-container/customer-form.container';
import { CustomerFormPresentationComponent } from './customer-form-container/customer-form-presentation/customer-form.presentation';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/customer/', '.json');
}

@NgModule({
  declarations: [CustomerFormContainerComponent,
CustomerFormPresentationComponent,

    CustomerListContainerComponent,
    CustomerListMobilePresentationComponent,
    CustomerListDesktopPresentationComponent,
    CustomerFilterPresentationComponent,
    CustomerSortPresentationComponent,    
    CustomerListPresentationComponent,
  ],
  imports: [BsDatepickerModule,

    SharedModule,
    CustomerRoutingModule,
    NgSelectModule,
    PortalModule,
    OverlayModule,
    NgbDropdownModule,
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
    CustomerService,
    CustomerAdapter, CustomerFilterAdapter,

  ],
  entryComponents:[
    CustomerListMobilePresentationComponent,
    CustomerListDesktopPresentationComponent,
    CustomerFilterPresentationComponent,
    CustomerSortPresentationComponent,    

  ],
})
export class CustomerModule {
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

