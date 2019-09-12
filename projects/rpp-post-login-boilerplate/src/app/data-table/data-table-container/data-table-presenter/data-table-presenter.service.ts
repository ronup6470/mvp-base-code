/** 
 * @author Ronak Patel.
 * @description Data table presenter service for dataTable presentation component.
 */

import { Injectable, QueryList, Renderer2, Injector, NgZone, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
// ---------------------------------------------- //
import { Customer, Group, Company, FILTER_DATA, FilterRecord, SORT_DATA, SortRecord } from '../../data-table.model';
import { DataFilterPresentationComponent } from '../data-table-presentation/data-filter-presentation/data-filter-presentation.component';

import { BehaviorSubject } from 'rxjs';
import { DataSortPresentationComponent } from '../data-table-presentation/data-table-mobile-presentation/data-sort-presentation/data-sort-presentation.component';
import { TableProperty, ConfirmationModalService, SortingOrder, ConfirmationModalComponent, SortingOrderDirective } from 'common-libs';


@Injectable()
export class DataTablePresenterService {

  /** This property is used for subscribing the value of subject setTableProp */
  public setTableProp$: Observable<TableProperty<FilterRecord>>;

  /** This property is used for subscribe the value of subject deleteCustomer */
  public deleteCustomer$: Observable<number>;

  /** This property is used for subscribe the value of subject  isCheckAll */
  public isCheckAll$: Observable<boolean>;

  /** This property is used to store the Customers that has been retrieved from the API. */
  public customers: Customer[];

  /** This property is used to store the unique ID's of the selected customers */
  public selectedCustomersId: Set<number>;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<FilterRecord>;

  /** This boolean is used to indicate whether all rows are selected or not  */
  public isCheckAll: Subject<boolean> = new Subject();

  /** Stores the current sorting order */
  public isAscending: boolean;

  /** The message that will be shown in template when no record found */
  public message: string;

  /** Stores the ID of the customer that needs to be deleted */
  public customerId: number;

  /** This property is sue to store selected items. */
  public selectedItems: string[];

  /** This property is used to store searchText . */
  public searchText: string;

  /** This property is used to store company array . */
  public companies: Company[];

  /** This property is used to store group array . */
  public groups: Group[];

  /** This is used for user info object */
  // private setTableProp: Subject<TableProperty> = new Subject();
  public setTableProp: BehaviorSubject<TableProperty<FilterRecord>> = new BehaviorSubject(new TableProperty());

  /** This property is used for emit when delete customer.  */
  private deleteCustomer: Subject<number> = new Subject();

  /** This property is used to store filterData.  */
  private filterData: FilterRecord;

  /** This property is used to store filterData.  */
  private sortData: SortRecord;

  /** This property is used to store overlayRef. */
  private overlayRef: OverlayRef;
  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private overlay: Overlay,
    private injector: Injector,
    private ngZone: NgZone,
    private modalService: ConfirmationModalService
  ) {
    this.initProperty();
    this.setTableProp$ = this.setTableProp.asObservable();
    this.deleteCustomer$ = this.deleteCustomer.asObservable();
    this.isCheckAll$ = this.isCheckAll.asObservable();
  }

  /** This method is invoke when table property change. */
  public setTableProperty(tableProperty: TableProperty<FilterRecord>, filterApply?: boolean): void {
    // if (filterApply) { this.filterData = new FilterRecord() };
    this.tableProperty = tableProperty;
    this.setTableProp.next(this.tableProperty);
  }

  /** This method is invoke when data successfully get */
  public getTableProperty(tableProperty: TableProperty<FilterRecord>, length: number): TableProperty<FilterRecord> {
    this.tableProperty = tableProperty;
    this.tableProperty.start = (this.tableProperty.pageLimit * (this.tableProperty.pageNumber)) + 1;
    // this.tableProperty.end = (this.tableProperty.pageLimit * (this.tableProperty.pageNumber ? (this.tableProperty.pageNumber + 1) : 1)) - (tableProperty.pageLimit - length);
    this.tableProperty.end = this.tableProperty.start + length -1;
    return this.tableProperty;
  }

  /**
   * This method is invoked when the user changes the current page size.
   * @param pageSize The page number that needs to be set.
   */
  public onPageSizeChange(pageSize: number): void {
    this.tableProperty.pageNumber = 0;
    this.tableProperty.pageLimit = pageSize;
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    this.setTableProperty(this.tableProperty);
  }

  /**
   * This method is invoked when the user changes the page number from the pagination toolbar.
   * @param pageNumber The number to which the table should switch to
   */
  public onPageChange(pageNumber: number): void {
    this.tableProperty.pageNumber = pageNumber;
    // Move it to common method
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    this.setTableProperty(this.tableProperty);
  }

  /**
   * This method is invoked when the user performs a global search. It resets the selected rows, updates the criteria
   * and then gets the new list of customer based on updated criteria.
   * @param searchTerm The search string that has been searched by the user
   */
  public onSearch(searchTerm: string): void {
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    if (searchTerm) {
      let filter = this.tableProperty.filter;
      this.tableProperty = new TableProperty();
      this.tableProperty.search = searchTerm;
      this.tableProperty.filter = filter;
    } else {
      this.tableProperty = new TableProperty();
    }
    if (this.searchText === searchTerm) { return; }
    this.searchText = searchTerm;
    this.setTableProperty(this.tableProperty);
  }

  /**
   * This method is invoked when the user clicks on sorting icons. It sets the sort related criteria and queries the server
   * to get the updated list of customers.
   * @param column The column on which sorting needs to be performed. 
   * @param sortingOrder The sort order by which the column needs to be sorted.
   */
  public onSortOrder(column: string, sortingOrder: SortingOrder, sortingColumns: QueryList<SortingOrderDirective>): void {
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    let filter = this.tableProperty.filter;
    this.tableProperty = new TableProperty();
    this.tableProperty.sort = column;
    this.tableProperty.order = sortingOrder;
    this.tableProperty.filter = filter;
    this.ngZone.runOutsideAngular(() => {
      sortingColumns.forEach((sortingColumn: any) => {
        if (sortingColumn.column !== column) {
          this.renderer.removeClass(sortingColumn.elementRef.nativeElement, 'sort-asc');
          this.renderer.removeClass(sortingColumn.elementRef.nativeElement, 'sort-desc');
        }
      });
    })
    this.setTableProperty(this.tableProperty);
  }

  /** create for check single record and store check id in selectedCustomersId. */
  public onCheck(customer: Customer): Customer {
    customer.isChecked = !customer.isChecked;
    // used ternary operator for selected item add or delete in selectedCustomersId.
    (customer.isChecked) ? this.selectedCustomersId.add(customer.id) : this.selectedCustomersId.delete(customer.id);
    // used ternary operator for is all check or not and base on condition emit true or false.
    (this.selectedCustomersId.size === +((this.tableProperty.end + 1) - this.tableProperty.start)) ? this.isCheckAll.next(true)
      : this.isCheckAll.next(false);
    return customer;
  }

  /** create for check all record and unCheck all record base on condition add and remove from this.selectedCustomersId. */
  public onCheckAll(customers: Customer[], isCheckAll: boolean): Customer[] {
    isCheckAll = !isCheckAll;
    this.isCheckAll.next(isCheckAll);

    (isCheckAll) ?
      customers.forEach((customer: Customer) => { customer.isChecked = isCheckAll; this.selectedCustomersId.add(customer.id); })
      : customers.forEach((customer: Customer) => { customer.isChecked = isCheckAll; this.selectedCustomersId.delete(customer.id); });
    return customers;
  }

  /**
   * Used for performance optimization.
   */
  public trackBy(index: number, customer: any): number {
    return customer.id;
  }

  /**
   * This method is invoked when the user click on filter button.
   */
  public openFilter(): void {
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = '';
    this.overlayRef = this.overlay.create(overlayConfig);
    const injectionTokens: WeakMap<any, any> = new WeakMap<any, any>([
      [FILTER_DATA, this.filterData]
    ]);
    // use injection token for passing value.
    const injector2: PortalInjector = new PortalInjector(this.injector, injectionTokens);
    const portal: ComponentPortal<DataFilterPresentationComponent>
      = new ComponentPortal<DataFilterPresentationComponent>(DataFilterPresentationComponent, null, injector2);
    const componentRef: ComponentRef<DataFilterPresentationComponent> = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
    componentRef.instance.filterData.subscribe((data: any) => {
      this.filterData = data;
      Object.keys(data).forEach(key => { if (!data[key]) { delete data[key]; } });
      
      data.sort = this.tableProperty.sort;
      data.order = this.tableProperty.order;
      this.tableProperty = new TableProperty();
      this.tableProperty.filter = data;
      this.tableProperty.sort = data.sort;
      this.tableProperty.order = data.order;

      this.setTableProperty(this.tableProperty);
    });
    componentRef.instance.clearFilter.subscribe(() => {
      this.filterData = null;
      this.overlayRef.detach();
     // this.tableProperty = new TableProperty();
      this.tableProperty.filter = undefined;
      this.setTableProperty(this.tableProperty);
    });
    componentRef.instance.companies = this.companies;
    componentRef.instance.groups = this.groups;
    componentRef.instance.closeFilter.subscribe(() => { this.overlayRef.detach() })
  }

  /**
   * This method is invoked when the user click on filter button.
   */
  public openSort(): void {
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = '';
    this.overlayRef = this.overlay.create(overlayConfig);
    const injectionTokens: WeakMap<any, any> = new WeakMap<any, any>([
      [SORT_DATA, this.sortData]
    ]);
    // use injection token for passing value.
    const injector2: PortalInjector = new PortalInjector(this.injector, injectionTokens);
    const portal: ComponentPortal<DataSortPresentationComponent>
      = new ComponentPortal<DataSortPresentationComponent>(DataSortPresentationComponent, null, injector2);
    const componentRef: ComponentRef<DataSortPresentationComponent> = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
    componentRef.instance.sortData.subscribe((data: any) => {
      this.sortData = data;
      let filter = this.tableProperty.filter;
      this.tableProperty = new TableProperty();
      this.tableProperty.sort = data.sortColumn;
      this.tableProperty.order = data.sortBy;
      this.tableProperty.filter = filter;
      this.setTableProperty(this.tableProperty);
    });
    componentRef.instance.companies = this.companies;
    componentRef.instance.groups = this.groups;
    componentRef.instance.closeSort.subscribe(() => { this.overlayRef.detach() });
  }


  /** create for open modal when action perform */
  public openModal(id: number): void {
    const modalInstance: ConfirmationModalComponent = this.modalService.openModal();
    // modalInstance.confirmationMessage = this.translate.instant('confirmationMessage');
    // modalInstance.positiveAction = this.translate.instant('positiveAction');
    // modalInstance.negativeAction = this.translate.instant('negativeAction');
    modalInstance.confirmModal.subscribe((value: boolean) => {
      (value) ? this.onDelete(id) : console.log('decline conformations');
      this.modalService.closeModal();
    });
  }

  /**
   * create for delete record base on id.
   */
  public onDelete(id: number): void {
    this.selectedCustomersId = new Set()
    this.isCheckAll.next(false);
    this.deleteCustomer.next(id);

  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.customers = [];
    this.selectedCustomersId = new Set();
    this.isAscending = false;
    this.tableProperty = new TableProperty();
    this.selectedItems = [];
    this.searchText = '';
  }
}
