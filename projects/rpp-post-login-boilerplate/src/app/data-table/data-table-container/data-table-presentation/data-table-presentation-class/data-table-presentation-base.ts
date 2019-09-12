/**
 * @author Bhumi Desai.
 * @description This is base class to represent the common members of desktop and mobile component.
 */

import { ChangeDetectorRef } from '@angular/core';
import { DataTablePresenterService } from '../../data-table-presenter/data-table-presenter.service';
import { TableProperty } from 'common-libs';
import { Customer, FilterRecord } from '../../../data-table.model';
/**
 * Data table presentation base class
 */
export class DataTablePresentationBase {

  /** This property is used to store the Customers that has been retrieved from the API. */
  public set customers(customer: Customer[]) {
    this._customers = customer;
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
  public tableProperty: TableProperty<FilterRecord>;
  
  /** This property is used to store customer records */
  private _customers: Customer[];

  constructor(public dataTablePresenter: DataTablePresenterService, public changeDetection: ChangeDetectorRef) { }

  /**
   * This method is invoked when the user changes the current page size.
   * @param pageSize The page number that needs to be set.
   */
  public onPageSizeChange(pageSize: number): void {
    this.dataTablePresenter.onPageSizeChange(pageSize);
  }

  /** This method is invoked when the user click on filter button. */
  public openFilter(): void {
    this.dataTablePresenter.openFilter();
  }

  /**
   * This method is invoked when the user changes the page number from the pagination toolbar.
   * @param pageNumber The number to which the table should switch to
   */
  public onPageChange(pageNumber: number): void {
    this.dataTablePresenter.onPageChange(pageNumber);
  }

  /**
   * This method is invoked when the user performs a global search. It resets the selected rows, updates the criteria
   * and then gets the new list of customer based on updated criteria.
   * @param searchTerm The search string that has been searched by the user
   */
  public onSearch(searchTerm: string): void {
    this.dataTablePresenter.onSearch(searchTerm);
  }

  /** create for check single record and store check id in selectedCustomersId   */
  public onCheck(customer: Customer): void {
    customer = this.dataTablePresenter.onCheck(customer);
  }

  /** create for check all record and unCheck all record base on condition add and remove from this.selectedCustomersId */
  public onCheckAll(): void {
    this.customers = this.dataTablePresenter.onCheckAll(this.customers, this.isCheckAll);
  }

  /** create for open modal when action perform */
  public openModal(id: number): void {
    this.dataTablePresenter.openModal(id);
  }

  /** create for open modal when action perform */
  public clearFilter(): void {
    this.isFilterApply = false;
    this.dataTablePresenter.setTableProperty(new TableProperty(), true);
  }

  /** Used for performance optimization. */
  public trackBy(index: number, customer: any): number {
    return customer.id;
  }

}







