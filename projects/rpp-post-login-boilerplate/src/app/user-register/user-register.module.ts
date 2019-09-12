
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to user-register.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

// ----------------------------------------------------------------- //
import { SharedModule, Language, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';

import { UserRegisterRoutingModule } from './user-register-routing.module';
import { UserRegisterFormContainerComponent } from './user-register-form-container/user-register-form-container.component';
import { UserRegisterService } from './user-register.service';
import { UserRegisterAdapter } from './user-register-adapter/user-register-adapter';
import { UserRegisterFormPresentationComponent } from './user-register-form-container/user-register-form-presentation/user-register-form-presentation.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user-register/', '.json');
}

@NgModule({
  declarations: [
    UserRegisterFormContainerComponent,
    UserRegisterFormPresentationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    UserRegisterRoutingModule,
    NgbDropdownModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgbAccordionModule,
    OverlayModule,
    TabsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  providers: [
    UserRegisterService,

    UserRegisterAdapter,


  ],
  entryComponents: [
    // DataFilterPresentationComponent,
  ],
})
export class UserRegisterModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
    // this.translate.use('en-us');
    this.languageService.languageChange$.subscribe((lang: string) => {
      if(lang != null){
        this.translate.use(lang);
      }
    });
  }
}

