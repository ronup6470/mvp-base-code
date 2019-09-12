/**
 * @author Bhumi Desai.
 * @description This is sort presentation component, used for sorting the data.
 */
import { Component, ChangeDetectionStrategy, Optional, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
//--------------------------------------------------------------------------------------------------//
import { CUSTOMER_SORT, CustomerSortRecord } from '../../../../customer.model';
import { CustomerSortPresenter } from '../customer-sort-presenter/customer-sort.presenter';

/**
 * Component
 */
@Component({
  selector: 'app-customer-sort-presentation',
  templateUrl: './customer-sort.presentation.html',
  styleUrls: ['./customer-sort.presentation.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [CustomerSortPresenter]
})
export class CustomerSortPresentationComponent {

  /** This property is used to create for sort Form. */
  public sortForm: FormGroup;
  /** This property is used for emit when sort apply. */
  public sortData: Subject<CustomerSortRecord>;
  /** This property is used for emit when sort close. */
  public closeSort: Subject<boolean>;
  /** Sort array of customer sort presentation component */
  public sortArray: string[];

  constructor(private presenter: CustomerSortPresenter, @Optional() @Inject(CUSTOMER_SORT) private data: CustomerSortRecord) {
    this.sortForm = this.presenter.buildForm();
    this.sortData = new Subject();
    this.closeSort = new Subject();
    this.sortArray = ['company', 'group', 'createdAt'];

    if (this.data) {
      this.sortForm.patchValue(data);
      this.sortForm.markAsDirty();
    }
  }

  /**
   * This method is invoke when user click on Reset button.
   * Use for reset from value.
   */
  public onReset(): void {
    this.sortForm.reset();
  }

  /**
   * This method is invoke when user click on apply button.
   * Use for emit form value to parent.
   */
  public onApplySort(): void {
    this.sortData.next(this.sortForm.value);
    this.sortData.complete();
    this.dismiss();
  }

  /**
   * This method is invoke when user click dismiss button.
   */
  public dismiss(): void {
    this.closeSort.next(true);
    this.closeSort.complete();
  }
}