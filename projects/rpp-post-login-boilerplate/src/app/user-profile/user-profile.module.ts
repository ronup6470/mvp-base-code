
/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to user-profile.
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
import { SharedModule, LanguageDataService } from 'common-libs';
import { OverlayModule } from '@angular/cdk/overlay';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileFormContainerComponent } from './user-profile-form-container/user-profile-form-container.component';
import { UserProfileService } from './user-profile.service';
import { UserProfileAdapter } from './user-profile-adapter/user-profile-adapter';
import { UserProfileFormPresentationComponent } from './user-profile-form-container/user-profile-form-presentation/user-profile-form-presentation.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user-profile/', '.json');
}

@NgModule({
  declarations: [
    UserProfileFormContainerComponent,
    UserProfileFormPresentationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    UserProfileRoutingModule,
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
    UserProfileService,

    UserProfileAdapter,


  ],
  entryComponents: [
    // DataFilterPresentationComponent,
  ],
})
export class UserProfileModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
    this.languageService.languageChange$.subscribe((lang: string) => {
      this.translate.use(lang);
    });
  }
}

