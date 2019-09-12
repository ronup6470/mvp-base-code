
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to employee.
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule, LanguageDataService } from 'common-libs';
// ----------------------------------------------------------------- //
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormContainerComponent } from './employee-form-container/employee-form.container';
import { EmployeeService } from './employee.service';
import { EmployeeAdapter,} from './employee-adapter/employee.adapter';
import { EmployeeFormPresentationComponent } from './employee-form-container/employee-form-presentation/employee-form.presentation';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/employee/', '.json');
}

@NgModule({
  declarations: [
    EmployeeFormContainerComponent,
    EmployeeFormPresentationComponent,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    NgSelectModule,
    BsDatepickerModule,
    NgbTimepickerModule,
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
    EmployeeService,
    EmployeeAdapter,

  ],
  entryComponents:[

  ],
})
export class EmployeeModule {
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

