
/**
 * @author Bhumi Desai.
 * @description This is base class to represent the common members of desktop and mobile component.
 */

import { ChangeDetectorRef } from '@angular/core';
import { TableProperty } from 'common-libs';
// ------------------------------------------------------ //
import { CustomerListPresenter } from '../customer-list-presenter/customer-list.presenter';
import { Customer, CustomerFilterRecord } from '../../customer.model';

/**
 * Customer list presentation base
 */
export class CustomerListPresentationBase {

  /** This property is used to store the customers that has been retrieved from the API. */
  public set customers(value: Customer[]) {
    this._customers = value;
    this.changeDetection.detectChanges();
  };

  public get customers(): Customer[] {
    return this._customers;
  }

  /** This boolean is used to indicate whether all rows are selected or not  */
  public isCheckAll: boolean;

  /** This property is used for filter apply or not. */
  public isFilterApply: boolean;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<CustomerFilterRecord>;

  /** Customers  of customer list presentation base */
  private _customers: Customer[];

  constructor(public customerPresenter: CustomerListPresenter, public changeDetection: ChangeDetectorRef) { }

  /**
   * This method is invoked when the user changes the current page size.
   * @param pageSize The page number that needs to be set.
   */
  public onPageSizeChange(pageSize: number): void {
    this.customerPresenter.onPageSizeChange(pageSize);
  }

  /**
   * This method is invoked when the user changes the page number from the pagination toolbar.
   * @param pageNumber The number to which the table should switch to
   */
  public onPageChange(pageNumber: number): void {
    this.customerPresenter.onPageChange(pageNumber);
  }

  /** This method is invoked when the user click on filter button. */
  public openFilter(): void {
    this.customerPresenter.openFilter();
  }

  /** create for open modal when action perform */
  public clearFilter(): void {
    this.isFilterApply = false;
    this.customerPresenter.setTableProperty(new TableProperty());
  }

  /**
   * This method is invoked when the user performs a global search. It resets the selected rows, updates the criteria
   * and then gets the new list of Customer based on updated criteria.
   * @param searchTerm The search string that has been searched by the user
   */
  public onSearch(searchTerm: string): void {
    this.customerPresenter.onSearch(searchTerm);
  }


  /** create for check single record and store check id in selectedCustomersId   */
  public onCheck(Customer: Customer): void {
    Customer = this.customerPresenter.onCheck(Customer);
  }

  /** create for check all record and unCheck all record base on condition add and remove from this.selectedCustomersId */
  public onCheckAll(): void {
    this.customers = this.customerPresenter.onCheckAll(this.customers, this.isCheckAll);
  }

  /** create for open modal when action perform */
  public openModal(customer: Customer): void {
    this.customerPresenter.openModal(customer);
  }

  /**
   * Used for performance optimization.
   */
  public trackBy(index: number, customer: Customer): Customer {
    return customer;
  }
}
