/**
 * @author Bhumi Desai.
 * @description This is data table desktop presentation component.To represent data in the desktop view.
 */
import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChildren, QueryList, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { SortingOrderDirective, SortingOrder } from 'common-libs';
//-----------------------------------------------------------------------------------------------------//
import { CustomerListPresentationBase } from '../../customer-list-presentation-base/customer-list.presentation.base';
import { CustomerListPresenter } from '../../customer-list-presenter/customer-list.presenter';

/**
 * Component
 */
@Component({
  selector: 'app-customer-list-desktop-presentation',
  templateUrl: './customer-list-desktop.presentation.html',
  styleUrls: ['./customer-list-desktop.presentation.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListDesktopPresentationComponent extends CustomerListPresentationBase implements OnInit, OnDestroy {

  /** This property is used to store QueryList of SortingOrderDirective */
  @ViewChildren(SortingOrderDirective) public sortingColumns: QueryList<SortingOrderDirective>;

  /**
   * Destroy  of customer list desktop presentation component
   */
  private destroy: Subject<boolean>;
  constructor(
    public customerPresenter: CustomerListPresenter,
    public changeDetection: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef

  ) {
    super(customerPresenter, changeDetection);
    this.destroy = new Subject();
  }

  public ngOnInit(): void {
    this.customerPresenter.isCheckAll$.pipe(takeUntil(this.destroy)).subscribe((isCheckAll: boolean) => { this.isCheckAll = isCheckAll });
  }

  /**
   * This method is invoked when the user clicks on sorting icons. It sets the sort related criteria and queries the server
   * to get the updated list of customers.
   * @param column The column on which sorting needs to be performed. 
   * @param sortingOrder The sort order by which the column needs to be sorted.
   */
  public onSortOrder(column: string, sortingOrder: SortingOrder): void {
    this.customerPresenter.onSortOrder(column, sortingOrder, this.sortingColumns);
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
