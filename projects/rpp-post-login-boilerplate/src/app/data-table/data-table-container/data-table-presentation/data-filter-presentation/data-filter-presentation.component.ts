/**
 * @author Ronak Patel.
 * @description This is data filter presentation component. Used for filter data base on field.
 */

import { Component, ChangeDetectionStrategy, Inject,  Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
// ---------------------------------------------------------- //
import { Company, Group, FILTER_DATA } from '../../../data-table.model';
import { DataFilterPresenterService } from '../data-filter-presenter/data-filter-presenter.service';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter-presentation.component.html',
  styleUrls: ['./data-filter-presentation.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [DataFilterPresenterService]
})
export class DataFilterPresentationComponent {

  /** This property is used to create for filter Form. */
  public filterForm: FormGroup;
  /** This property is used to create for store company []. */
  public companies: Company[];
  /** This property is used to create for store group []. */
  public groups: Group[];
  /** This property is used for date picker. */
  public bsConfig: any;
  /** This property is used for emit when filter apply. */
  public filterData: Subject<FormGroup>;
  /** This property is used for emit when filter close. */
  public closeFilter: Subject<boolean>;
    /** This property is used for emit when filter clear. */
    public clearFilter: Subject<boolean>;
    public isFilterApply: boolean;

  constructor(
    private presenter: DataFilterPresenterService,
    @Optional() @Inject(FILTER_DATA) private data: any,
  ) {
    this.filterForm = this.presenter.buildForm();
    this.filterData = new Subject();
    this.closeFilter = new Subject();
    this.clearFilter = new Subject();
    this.bsConfig = {
      containerClass: 'theme-primary',
      adaptivePosition: false,
    };
    this.isFilterApply = false;
    if (this.data) {
      this.isFilterApply = true;
      this.filterForm.patchValue(data);
      this.filterForm.markAsDirty();
    }
  }


  /**
   * This method is invoke when user click on Reset button.
   * Use for reset from value.
   */
  public onReset(): void {
    this.filterForm.reset();
  }

  /**
   * This method is invoke when user click on apply button.
   * Use for emit form value to parent.
   */
  public onApplyFilter(): void {
    this.filterData.next(this.filterForm.value);
    this.filterData.complete();
    this.dismiss();
  }

  /**
   * This method is invoke when user click dismiss button.
   */
  public dismiss(): void {
    this.closeFilter.next(true);
    this.closeFilter.complete();
  }

  public onClearFilter(): void {
    this.filterForm.reset();
    this.clearFilter.next(true);
    this.clearFilter.complete();
  }

}
