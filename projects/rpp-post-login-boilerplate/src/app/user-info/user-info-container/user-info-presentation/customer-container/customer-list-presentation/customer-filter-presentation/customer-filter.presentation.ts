/**
 * @author Ronak Patel.
 * @description This is data filter presentation component. Used for filter data base on field.
 */

import { Component, ChangeDetectionStrategy, Inject,  Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
// ---------------------------------------------------------- //
import { CUSTOMER_FILTER } from '../../../../../user-info.model';
import { CustomerFilterPresenter } from '../customer-filter-presenter/customer-filter.presenter';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.presentation.html',
  styleUrls: ['./customer-filter.presentation.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [CustomerFilterPresenter]
})
export class CustomerFilterPresentationComponent {

  /** This property is used to create for filter Form. */
  public customerFormGroup: FormGroup;
  /** This property is used for date picker. */
  public bsConfig: any;
  /** This property is used for emit when filter apply. */
  public filterData: Subject<FormGroup>;
  /** This property is used for emit when filter close. */
  public closeFilter: Subject<boolean>;
  /** This property is used for emit when filter data cleared. */
  public clearFilter: Subject<boolean>;
  public isFilterApply: boolean;
  public isFormSubmitted: boolean;

  constructor(
    private presenter: CustomerFilterPresenter,
    @Optional() @Inject(CUSTOMER_FILTER) private data: any,
  ) {
    this.customerFormGroup = this.presenter.buildForm();
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
      this.customerFormGroup.patchValue(data);
      this.customerFormGroup.markAsDirty();
    }
  }


  /**
   * This method is invoke when user click on Reset button.
   * Use for reset from value.
   */
  public onReset(): void {
    this.customerFormGroup.reset();
  }

  /**
   * This method is invoke when user click on apply button.
   * Use for emit form value to parent.
   */
  public onApplyFilter(): void {
    this.filterData.next(this.customerFormGroup.value);
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

  /**
   * This method is invoke when user click clear filter button.
   */
  public onClearFilter(): void {
    this.customerFormGroup.reset();
    this.clearFilter.next(true);
    this.clearFilter.complete();
  }
}
