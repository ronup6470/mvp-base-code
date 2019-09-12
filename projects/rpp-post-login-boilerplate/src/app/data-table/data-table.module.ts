/**
 * @author Ronak Patel.
 * @description The module that handles components and services related to data-table.
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule,  MultiTranslateHttpLoader, LanguageDataService } from 'common-libs';
// ----------------------------------------------------------------- //
import { DataTableRoutingModule } from './data-table-routing.module';
import { DataTableService } from './data-table.service';
import { DataTableContainerComponent } from './data-table-container/data-table-container.component';
import { DataTablePresentationComponent } from './data-table-container/data-table-presentation/data-table-presentation.component';
import { CustomerAdapter, FilterAdapter } from './data-table-adapter/data-table.adapter';
import { DataTableMobilePresentationComponent } from './data-table-container/data-table-presentation/data-table-mobile-presentation/data-table-mobile-presentation.component';
import { DataTableDesktopPresentationComponent } from './data-table-container/data-table-presentation/data-table-desktop-presentation/data-table-desktop-presentation.component';
import { DataSortPresentationComponent } from './data-table-container/data-table-presentation/data-table-mobile-presentation/data-sort-presentation/data-sort-presentation.component';
import { CollapsibleDetailComponent } from './data-table-container/data-table-presentation/data-table-mobile-presentation/collapsible-detail/collapsible-detail.component';
import { DataFilterPresentationComponent } from './data-table-container/data-table-presentation/data-filter-presentation/data-filter-presentation.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(
    [
      { prefix: 'assets/i18n/data-table/', suffix: '.json' },
       { prefix: 'assets/i18n/shared/', suffix: '.json' }
    ],
    http);
}

@NgModule({
  declarations: [
    DataTableContainerComponent,
    DataTablePresentationComponent,
    DataTableMobilePresentationComponent,
    DataTableDesktopPresentationComponent,
    DataFilterPresentationComponent,
    CollapsibleDetailComponent,
    DataSortPresentationComponent
  ],
  imports: [
    SharedModule,
    NgSelectModule,
    DataTableRoutingModule,
    NgbDropdownModule,
    BsDatepickerModule,
    PortalModule,
    OverlayModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    })
  ],
  entryComponents: [
    DataTableDesktopPresentationComponent, 
    DataTableMobilePresentationComponent,
    DataFilterPresentationComponent,
    DataSortPresentationComponent],
  providers: [
    DataTableService,
    CustomerAdapter,
    FilterAdapter
  ],
  // entryComponents:[DataFilterPresentationComponent],
  // exports:[DataFilterPresentationComponent]
})
export class DataTableModule {
  constructor(private readonly translate: TranslateService, private languageService: LanguageDataService) {
    this.translate.use(this.languageService.defaultLanguage);
    this.languageService.languageChange$.subscribe((lang: string) => {
      this.translate.use(lang);
    });
  }
}
