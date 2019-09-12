
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to user-info.
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTypeaheadModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap';
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// ----------------------------------------------------------------- //
import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoContainerComponent } from './user-info-container/user-info.container';
import { UserInfoService } from './user-info.service';
import { EmployeeAdapter,
} from './user-info-adapter/user-info.adapter';
import { UserAdapter,
} from './user-info-adapter/user-info.adapter';
import { CustomerAdapter,CustomerFilterAdapter,
} from './user-info-adapter/user-info.adapter';
import { UserInfoPresentationComponent } from './user-info-container/user-info-presentation/user-info.presentation';        
import { EmployeeFormPresentationComponent } from './user-info-container/user-info-presentation/employee-container/employee-form-presentation/employee-form.presentation';
import { EmployeeFormContainerComponent } from './user-info-container/user-info-presentation/employee-container/employee.container';
import { UserFormPresentationComponent } from './user-info-container/user-info-presentation/user-container/user-form-presentation/user-form.presentation';
import { UserFormContainerComponent } from './user-info-container/user-info-presentation/user-container/user.container';
import { CustomerListPresentationComponent } from './user-info-container/user-info-presentation/customer-container/customer-list-presentation/customer-list.presentation';
import { CustomerListContainerComponent } from './user-info-container/user-info-presentation/customer-container/customer.container';
import { CustomerListDesktopPresentationComponent } from './user-info-container/user-info-presentation/customer-container/customer-list-presentation/customer-list-desktop-presentation/customer-list-desktop.presentation';            
import { CustomerListMobilePresentationComponent } from './user-info-container/user-info-presentation/customer-container/customer-list-presentation/customer-list-mobile-presentation/customer-list-mobile.presentation';                
import { CustomerFilterPresentationComponent } from './user-info-container/user-info-presentation/customer-container/customer-list-presentation/customer-filter-presentation/customer-filter.presentation';
import { CustomerSortPresentationComponent } from './user-info-container/user-info-presentation/customer-container/customer-list-presentation/customer-list-mobile-presentation/customer-sort-presentation/customer-sort.presentation';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/user-info/', '.json');
}

@NgModule({
  declarations: [
    UserInfoContainerComponent,
    UserInfoPresentationComponent,
    EmployeeFormPresentationComponent,
    EmployeeFormContainerComponent,
    UserFormPresentationComponent,
    UserFormContainerComponent,
    CustomerListDesktopPresentationComponent,
    CustomerListMobilePresentationComponent,
    CustomerFilterPresentationComponent,
    CustomerSortPresentationComponent,    
    CustomerListPresentationComponent,
    CustomerListContainerComponent,
  ],
  imports: [
    SharedModule,
    UserInfoRoutingModule,
    NgSelectModule,
    BsDatepickerModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    PortalModule,
    OverlayModule,
    NgbDropdownModule,
    TabsModule,
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
    UserInfoService,
    EmployeeAdapter,
     
    UserAdapter,
     
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
export class UserInfoModule {
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

