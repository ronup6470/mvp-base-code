
/** 
 * @author Ronak Patel.
 * @description Data table presenter service for Customer presentation component.
 */

import {
  Injectable, QueryList, Renderer2, Injector, NgZone, ComponentRef,
  InjectionToken, TemplateRef, ViewContainerRef, ComponentFactoryResolver, Type
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ComponentPortal, PortalInjector, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
// ---------------------------------------------- //
import { ConfirmationModalService, ConfirmationModalComponent, TableProperty, SortingOrder, SortingOrderDirective } from 'common-libs';
import { Customer, CUSTOMER_FILTER, CustomerFilterRecord, CUSTOMER_SORT, CustomerSortRecord } from '../../customer.model';
import { CustomerFilterPresentationComponent } from '../customer-list-presentation/customer-filter-presentation/customer-filter.presentation';
import { CustomerSortPresentationComponent } from
  '../customer-list-presentation/customer-list-mobile-presentation/customer-sort-presentation/customer-sort.presentation';

/**
 * Injectable
 */
@Injectable()
export class CustomerListPresenter {

  /** This property is used for subscribing the value of subject setTableProp */
  public setTableProp$: Observable<TableProperty<CustomerFilterRecord>>;

  /** This is used for user info object */
  public setTableProp: BehaviorSubject<TableProperty<CustomerFilterRecord>>;

  /** This property is used for subscribe the value of subject deleteCustomer */
  public deleteCustomer$: Observable<Customer>;

  /** This property is used for subscribe the value of subject  isCheckAll */
  public isCheckAll$: Observable<boolean>;
  /** Table prop$ of customer list presenter */
  public tableProp$: Observable<TableProperty<CustomerFilterRecord>>;

  /** This boolean is used to indicate whether all rows are selected or not  */
  public isCheckAll: Subject<boolean>;

  /** This property is used to store the Customers that has been retrieved from the API. */
  public customers: Customer[];

  /** This property is used to store the unique ID's of the selected Customers */
  public selectedCustomersId: Set<Customer>;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<CustomerFilterRecord>;

  /** Stores the current sorting order */
  public isAscending: boolean;

  /** The message that will be shown in template when no record found */
  public message: string;

  /** Stores the ID of the Customer that needs to be deleted */
  public customerId: number;

  /** This property is sue to store selected items. */
  public selectedItems: string[];

  /** This property is used to store searchText . */
  public searchText: string;

  /** This property is used for emit when delete Customer.  */
  private deleteCustomer: Subject<Customer>;

  /** This property is used to store filterData.  */
  private filterData: CustomerFilterRecord;

  /** This property is used to store sortData.  */
  private sortData: CustomerSortRecord;

  /** This property is used to store overlayRef. */
  private overlayRef: OverlayRef;

  /** Table prop of customer list presenter */
  private tableProp: Subject<TableProperty<CustomerFilterRecord>>;

  /** Component ref of data table presentation component */
  private componentRef: ComponentRef<any>;
  /** Customer data of customer list presenter */
  private customerData: Subject<Customer[]>;
  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private overlay: Overlay,
    private injector: Injector,
    private ngZone: NgZone,
    private modalService: ConfirmationModalService,
    private factoryResolver: ComponentFactoryResolver
  ) {
    this.initProperty();
  }

  /** This method is invoke when table property change. */
  public setTableProperty(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.tableProperty = tableProperty;
    this.setTableProp.next(this.tableProperty);
  }

  /** This method is invoke when data successfully get */
  public getTableProperty(tableProperty: TableProperty<CustomerFilterRecord>, length: number): TableProperty<CustomerFilterRecord> {
    this.tableProperty = tableProperty;
    this.tableProperty.start = (this.tableProperty.pageLimit * (this.tableProperty.pageNumber)) + 1;
    this.tableProperty.end = this.tableProperty.start + length - 1;
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
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    this.setTableProperty(this.tableProperty);
  }

  /**
   * This method is invoked when the user performs a global search. It resets the selected rows, updates the criteria
   * and then gets the new list of Customer based on updated criteria.
   * @param searchTerm The search string that has been searched by the user
   */
  public onSearch(searchTerm: string): void {
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    if (searchTerm) {
      let filter: CustomerFilterRecord = this.tableProperty.filter;
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
   * to get the updated list of Customers.
   * @param column The column on which sorting needs to be performed. 
   * @param sortingOrder The sort order by which the column needs to be sorted.
   */
  public onSortOrder(column: string, sortingOrder: SortingOrder, sortingColumns: QueryList<SortingOrderDirective>): void {
    this.selectedCustomersId = new Set();
    this.isCheckAll.next(false);
    let filter: CustomerFilterRecord = this.tableProperty.filter;
    this.tableProperty = new TableProperty();
    this.tableProperty.sort = column;
    this.tableProperty.order = sortingOrder;
    this.tableProperty.filter = filter;
    this.ngZone.runOutsideAngular(() => {
      sortingColumns.forEach((sortingColumn: SortingOrderDirective) => {
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
    (customer.isChecked) ? this.selectedCustomersId.add(customer) : this.selectedCustomersId.delete(customer);
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
      customers.forEach((customer: Customer) => { customer.isChecked = isCheckAll; this.selectedCustomersId.add(customer); })
      : customers.forEach((customer: Customer) => { customer.isChecked = isCheckAll; this.selectedCustomersId.delete(customer); });
    return customers;
  }

  /**
   * Used for performance optimization.
   */
  public trackBy(index: number, customer: Customer): number {
    return customer.id;
  }

  /** create for open modal when action perform */
  public openModal(customer: Customer): void {
    const modalInstance: ConfirmationModalComponent = this.modalService.openModal();
    modalInstance.confirmationMessage = this.translate.instant('confirmationMessage');
    modalInstance.positiveAction = this.translate.instant('positiveAction');
    modalInstance.negativeAction = this.translate.instant('negativeAction');
    modalInstance.confirmModal.subscribe((value: boolean) => {
      (value) ? this.onDelete(customer) : console.log('decline conformations');
      this.modalService.closeModal();
    });
  }

  /**
   * create for delete record base on id.
   */
  public onDelete(customer: Customer): void {
    this.modalService.closeModal();
    this.selectedCustomersId = new Set()
    this.isCheckAll.next(false);
    this.deleteCustomer.next(customer);
  }

  /*** This method is invoked when the user click on filter button. */
  public openFilter(): void {
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = '';
    this.overlayRef = this.overlay.create(overlayConfig);
    const injectionTokens: WeakMap<InjectionToken<CustomerFilterRecord>, CustomerFilterRecord>
      = new WeakMap<InjectionToken<CustomerFilterRecord>, CustomerFilterRecord>([
        [CUSTOMER_FILTER, this.filterData]
      ]);
    // use injection token for passing value.
    const injector2: PortalInjector = new PortalInjector(this.injector, injectionTokens);
    const portal: ComponentPortal<CustomerFilterPresentationComponent>
      = new ComponentPortal<CustomerFilterPresentationComponent>(CustomerFilterPresentationComponent, null, injector2);
    const componentRef: ComponentRef<CustomerFilterPresentationComponent> = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
    componentRef.instance.filterData.subscribe((data: CustomerFilterRecord) => {
      this.sortData.sortBy = this.tableProperty.order;
      this.sortData.sortColumn = this.tableProperty.sort;
      this.selectedCustomersId = new Set();
      this.isCheckAll.next(false);
      this.filterData = data;
      Object.keys(data).forEach((key: string) => { if (!data[key]) { delete data[key]; } });
      this.tableProperty = new TableProperty();
      this.tableProperty.filter = data;
      this.tableProperty.sort = this.sortData.sortColumn;
      this.tableProperty.order = this.sortData.sortBy;
      this.setTableProperty(this.tableProperty);
    });
    componentRef.instance.clearFilter.subscribe(() => {
      this.filterData = null;
      this.overlayRef.detach();
      this.tableProperty.filter = undefined;
      this.setTableProperty(this.tableProperty);
    });
    componentRef.instance.closeFilter.subscribe(() => { this.overlayRef.detach() })
  }

  /** This method is invoked when the user click on filter button. */
  public openSort(): void {
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = '';
    this.overlayRef = this.overlay.create(overlayConfig);
    const injectionTokens: WeakMap<InjectionToken<CustomerSortRecord>, CustomerSortRecord>
      = new WeakMap<InjectionToken<CustomerSortRecord>, CustomerSortRecord>([
        [CUSTOMER_SORT, this.sortData]
      ]);
    // use injection token for passing value.
    const injector2: PortalInjector = new PortalInjector(this.injector, injectionTokens);
    const portal: ComponentPortal<CustomerSortPresentationComponent>
      = new ComponentPortal<CustomerSortPresentationComponent>(CustomerSortPresentationComponent, null, injector2);
    const componentRef: ComponentRef<CustomerSortPresentationComponent> = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
    componentRef.instance.sortData.subscribe((data: CustomerSortRecord) => {
      this.sortData = data;
      const filter: CustomerFilterRecord = this.tableProperty.filter;
      this.tableProperty = new TableProperty();
      this.tableProperty.sort = data.sortColumn;
      this.tableProperty.order = data.sortBy;
      this.tableProperty.filter = filter;
      this.setTableProperty(this.tableProperty);
    });
    componentRef.instance.closeSort.subscribe(() => { this.overlayRef.detach() });
  }

  /**
   * Details action
   * @param customer 
   * @param customerIndex 
   * @param portalOutlets 
   * @param templatePortalContent 
   * @param viewContainerRef 
   */
  public detailAction(
    customer: Customer, customerIndex: number, portalOutlets: QueryList<CdkPortalOutlet>,
    templatePortalContent: TemplateRef<{ $implicit: Customer }>, viewContainerRef: ViewContainerRef
  ): void {
    const portalOutlet: CdkPortalOutlet = portalOutlets.find((item: CdkPortalOutlet, index: number) => index === customerIndex);
    if (portalOutlet) {
      if (!portalOutlet.portal) {
        const portal: TemplatePortal = new TemplatePortal(templatePortalContent, viewContainerRef, { $implicit: customer });
        portalOutlet.attachTemplatePortal(portal);
      }
      else {
        portalOutlet.detach();
      }
    }
  }

  /**
   * Sets table data
   */
  public setTableData(): void {
    if (this.tableProperty.pageNumber > 0 && this.customers.length === 0) {
      // this.toaster.info('No more records found', 'alert');
      return;
    } else if (this.customers.length === 0) {
      this.tableProperty.pageNumber = 0;
    }
    const customerLength: number = this.customers.length;
    this.customerData.next(this.customers);
    this.tableProperty = this.getTableProperty(this.tableProperty, customerLength);
    this.tableProp.next(this.tableProperty);
  }

  /**
   * Views size change
   * @template T component type
   * @param componentRef 
   * @param container 
   */
  public viewSizeChange<T>(
    componentRef: Type<T>,
    container: ViewContainerRef): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = container.createComponent<T>(
      this.factoryResolver.resolveComponentFactory(componentRef)
    );
    this.componentRef.instance.customers = this.customers;
    this.customerData.subscribe((res: Customer[]) => {
      this.componentRef.instance.customers = this.customers;
      this.componentRef.instance.tableProperty = this.tableProperty;
    })
  }

  /**
   * Filters apply
   * @param filter 
   * @returns true if apply 
   */
  public filterApply(filter: CustomerFilterRecord): boolean {
    if (filter) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Sorts apply
   * @param sort 
   * @returns true if apply 
   */
  public sortApply(sort: string): boolean {
    if (sort) {
      return true;
    } else {
      return false;
    }
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.customers = [];
    this.selectedCustomersId = new Set();
    this.isAscending = false;
    this.tableProperty = new TableProperty();
    this.sortData = new CustomerSortRecord();
    this.selectedItems = [];
    this.searchText = '';
    this.isCheckAll = new Subject();
    this.deleteCustomer = new Subject();
    this.tableProp = new Subject();
    this.customerData = new Subject();
    this.setTableProp = new BehaviorSubject(new TableProperty());
    this.setTableProp$ = this.setTableProp.asObservable();
    this.deleteCustomer$ = this.deleteCustomer.asObservable();
    this.isCheckAll$ = this.isCheckAll.asObservable();
    this.tableProp$ = this.tableProp.asObservable();
  }
}

