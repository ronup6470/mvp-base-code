
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to user.
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// ----------------------------------------------------------------- //
import { UserRoutingModule } from './user-routing.module';
import { UserContainerComponent } from './user-container/user.container';
import { UserService } from './user.service';
import { EmployeeAdapter,
} from './user-adapter/user.adapter';
import { CustomerAdapter,CustomerFilterAdapter,
} from './user-adapter/user.adapter';
import { UserPresentationComponent } from './user-container/user-presentation/user.presentation';        
import { EmployeeFormPresentationComponent } from './user-container/user-presentation/employee-form-presentation/employee-form.presentation';
import { CustomerListPresentationComponent } from './user-container/user-presentation/customer-list-presentation/customer-list.presentation';
import { CustomerListDesktopPresentationComponent } from './user-container/user-presentation/customer-list-presentation/customer-list-desktop-presentation/customer-list-desktop.presentation';            
import { CustomerListMobilePresentationComponent } from './user-container/user-presentation/customer-list-presentation/customer-list-mobile-presentation/customer-list-mobile.presentation';                
import { CustomerFilterPresentationComponent } from './user-container/user-presentation/customer-list-presentation/customer-filter-presentation/customer-filter.presentation';
import { CustomerSortPresentationComponent } from './user-container/user-presentation/customer-list-presentation/customer-list-mobile-presentation/customer-sort-presentation/customer-sort.presentation';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/user/', '.json');
}

@NgModule({
  declarations: [
    UserContainerComponent,
    UserPresentationComponent,
    EmployeeFormPresentationComponent,
    CustomerListDesktopPresentationComponent,
    CustomerListMobilePresentationComponent,
    CustomerFilterPresentationComponent,
    CustomerSortPresentationComponent,    
    CustomerListPresentationComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    NgSelectModule,
    BsDatepickerModule,
    NgbTimepickerModule,
    PortalModule,
    OverlayModule,
    NgbDropdownModule,
    NgbAccordionModule,
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
    UserService,
    EmployeeAdapter,
     
    CustomerAdapter,
     
    CustomerFilterAdapter,

  ],
  entryComponents:[
    CustomerListDesktopPresentationComponent,
    CustomerListMobilePresentationComponent,
    CustomerFilterPresentationComponent,
    CustomerSortPresentationComponent,    

  ],
})
export class UserModule {
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

