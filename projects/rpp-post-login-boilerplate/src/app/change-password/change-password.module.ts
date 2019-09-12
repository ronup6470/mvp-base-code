
/**
 * @author Bhumi Desai.
 * @description The module that handles components and services related to change-password.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule, NgbTimepickerModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap';
// ----------------------------------------------------------------- //
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { PasswordFormContainerComponent } from './change-password-form-container/change-password-form.container';
import { PasswordService } from './change-password.service';
import { PasswordAdapter } from './change-password-adapter/change-password-adapter';
// tslint:disable-next-line: max-line-length
import { PasswordFormPresentationComponent } from './change-password-form-container/change-password-form-presentation/change-password-form.presentation';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/change-password/', '.json');
}

/**
 * Ng module
 */
@NgModule({
  declarations: [
    PasswordFormContainerComponent,
    PasswordFormPresentationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ChangePasswordRoutingModule,
    NgbDropdownModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgbAccordionModule,
    OverlayModule,
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
    PasswordService,

    PasswordAdapter,


  ],
  entryComponents: [
  ],
})
export class ChangePasswordModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
    this.languageService.languageChange$.subscribe((lang: string) => {
      this.translate.use(lang);
    });
  }
}

