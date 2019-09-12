/**
 * @author Ronak Patel.
 * @description This is data table presentation component.To represent get data from container component and render to dom.
 */
import {
  Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ViewContainerRef, ViewChild,
  ComponentRef, ChangeDetectorRef, ComponentFactoryResolver,
  AfterViewInit, ComponentFactory
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { ToastrService } from 'ngx-toastr';
import { BreakpointState } from '@angular/cdk/layout';
// ---------------------------------------------------------- //
import { TableProperty, SortingOrderDirective, pageCount, BreakPointObserverService, BreakPointEnum } from 'common-libs';
import { Customer, CustomerFilterRecord } from '../../customer.model';
import { CustomerListPresenter } from '../customer-list-presenter/customer-list.presenter';
import { CustomerListPresentationBase } from '../customer-list-presentation-base/customer-list.presentation.base';
import { CustomerListDesktopPresentationComponent } from './customer-list-desktop-presentation/customer-list-desktop.presentation';
import { CustomerListMobilePresentationComponent } from './customer-list-mobile-presentation/customer-list-mobile.presentation';

/**
 * Component
 */
@Component({
  selector: 'app-customer-list-ui',
  templateUrl: './customer-list.presentation.html',
  styleUrls: ['./customer-list.presentation.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [CustomerListPresenter]
})
export class CustomerListPresentationComponent extends CustomerListPresentationBase implements OnInit, AfterViewInit, OnDestroy {

  /** This property is used for get data from container component */
  @Input() public set baseResponse(baseResponse: Customer[]) {
    if (baseResponse) {
      this._baseResponse = baseResponse;
      this.setTableData();
    }
  };
  public get baseResponse(): Customer[] {
    return this._baseResponse;
  }

  /** This property is used for get delete record or not. */
  @Input() public set isDeleted(response: boolean) {
    if (response) {
      this.toaster.success('Successfully Deleted', 'success');
      this.changeDetection.detectChanges();
      this.getCustomer.emit(this.tableProperty);
    }

  }

  /** This property is used for emit data to container component */
  @Output() public getCustomer: EventEmitter<TableProperty<CustomerFilterRecord>>;

  /** This property is used for emit data to container component */
  @Output() public deleteCustomer: EventEmitter<Customer>;

  /** This property is used for emit filter data to container component */
  @Output() public filterCustomer: EventEmitter<TableProperty<CustomerFilterRecord>>;
  /**
   * View child of customer list presentation component
   */
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  /** This property is used to store QueryList of SortingOrderDirective */
  @ViewChildren(SortingOrderDirective) public sortingColumns: QueryList<SortingOrderDirective>;

  /** This property is used to store the unique ID's of the selected Customers */
  public selectedCustomers: Set<Customer>;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<CustomerFilterRecord>;

  /** This property is used to store the options that are available in the Page Size selection drawdown */
  public pageSize: number[];

  /** This boolean is used to indicate whether all rows are selected or not  */
  public isCheckAll: boolean;

  /** Table prop of customer list presentation component */
  public tableProp: Subject<TableProperty<CustomerFilterRecord>>;

  /** Determines whether mobile device or not */
  public isMobileDevice: boolean;

  /**  isMobile property for mobile screen or not */
  public isMobile: Observable<BreakpointState>;

  /** This property is used for checking filter applied or not. */
  public isFilterApply: boolean;

  /** This property is used for checking sort applied or not. */
  public isSortApply: boolean;

  /** create for getter setter */
  private _baseResponse: Customer[];

  /** create for  */
  private destroy: Subject<boolean>;

  constructor(
    public customerPresenter: CustomerListPresenter,
    public changeDetection: ChangeDetectorRef,
    private breakPointObservableService: BreakPointObserverService,
    private toaster: ToastrService) {
    super(customerPresenter, changeDetection);
    this.initProperty();
  }

  public ngOnInit(): void {
    this.customerPresenter.setTableProp$.pipe(takeUntil(this.destroy)).subscribe((tableProperty: TableProperty<CustomerFilterRecord>) => {
      if (tableProperty.filter) {
        this.filterCustomer.emit(tableProperty);
        this.tableProperty = tableProperty;
      } else {
        this.getCustomer.emit(tableProperty);
        this.tableProperty = tableProperty;
      }
    });
    this.customerPresenter.deleteCustomer$.pipe(takeUntil(this.destroy)).subscribe((customer: Customer) => { this.deleteCustomer.emit(customer) })
    this.customerPresenter.tableProp$.subscribe((value: TableProperty<CustomerFilterRecord>) => {
      this.tableProperty = value;
    });
  }

  /**
   * after view init
   */
  public ngAfterViewInit(): void {
    this.breakPointObservableService.deviceObserver$.subscribe((value: BreakPointEnum) => {
      if (value === BreakPointEnum.IsMobile) {
        this.isMobileDevice = true;
        this.customerPresenter.viewSizeChange<CustomerListMobilePresentationComponent>(CustomerListMobilePresentationComponent, this.container);
      } else {
        this.isMobileDevice = false;
        this.customerPresenter.viewSizeChange<CustomerListDesktopPresentationComponent>(CustomerListDesktopPresentationComponent, this.container);
      }
      this.changeDetection.detectChanges();
    });
  }

  /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  /**
   * Sets table data
   * @returns table data 
   */
  public setTableData(): void {
    this.isFilterApply = this.customerPresenter.filterApply(this.tableProperty.filter);
    this.isSortApply = this.customerPresenter.sortApply(this.tableProperty.sort);
    this.customerPresenter.customers = this.baseResponse;
    this.customerPresenter.setTableData();
  }

  /**
   * Opens sort
   */
  public openSort(): void {
    this.customerPresenter.openSort();
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.selectedCustomers = new Set();
    this.isCheckAll = false;
    this.tableProp = new Subject();
    this.tableProperty = new TableProperty();
    this.pageSize = pageCount;
    this.destroy = new Subject();
    this.getCustomer = new EventEmitter<TableProperty<CustomerFilterRecord>>();
    this.deleteCustomer = new EventEmitter<Customer>();
    this.filterCustomer = new EventEmitter<TableProperty<CustomerFilterRecord>>();
  }
}
