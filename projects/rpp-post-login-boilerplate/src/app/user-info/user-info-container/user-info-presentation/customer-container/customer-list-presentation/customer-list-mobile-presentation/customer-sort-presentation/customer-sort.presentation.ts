/**
 * @author Bhumi Desai.
 * @description This is sort presentation component, used for sorting the data.
 */
import { Component, ChangeDetectionStrategy, Optional, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
//--------------------------------------------------------------------------------------------------//
import { CUSTOMER_SORTDATA } from '../../../../../../user-info.model';
import { CustomerSortPresenter } from '../customer-sort-presenter/customer-sort.presenter';

@Component({
  selector: 'app-customer-sort-presentation',
  templateUrl: './customer-sort.presentation.html',
  styleUrls: ['./customer-sort.presentation.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [CustomerSortPresenter]
})
export class CustomerSortPresentationComponent {

  /** This property is used to create for sort Form. */
  public sortForm: FormGroup;
  /** This property is used for date picker. */
  public bsConfig: any;
  /** This property is used for emit when sort apply. */
  public sortData: Subject<FormGroup>;
  /** This property is used for emit when sort close. */
  public closeSort: Subject<boolean>;
  public sortArray : string[];

  constructor(private presenter: CustomerSortPresenter, @Optional() @Inject(CUSTOMER_SORTDATA) private data: any) {
    this.sortForm = this.presenter.buildForm();
    this.sortData = new Subject();
    this.closeSort = new Subject();
    this.bsConfig = {
      containerClass: 'theme-primary',
      adaptivePosition: false
    };
     this.sortArray = ['company','group','createdAt'];

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