/**
 * @author YOUR_NAME_HERE
 * @description This is data table presentation component.To represent get data from container component and render to dom.
 */
import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ViewContainerRef, ViewChild,
         ComponentRef, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { ToastrService } from 'ngx-toastr';
import { BreakpointState } from '@angular/cdk/layout';
// ---------------------------------------------------------- //
import { TableProperty, SortingOrderDirective, pageCount, BreakPointObserverService, BreakPointEnum } from 'common-libs';
import { Customer, CustomerFilterRecord} from '../../../../user-info.model';
import { CustomerListPresenter } from '../customer-list-presenter/customer-list.presenter';
import { CustomerListPresentationBase } from '../customer-list-presentation-base/customer-list.presentation.base';
import { CustomerListDesktopPresentationComponent } from './customer-list-desktop-presentation/customer-list-desktop.presentation';
import { CustomerListMobilePresentationComponent } from './customer-list-mobile-presentation/customer-list-mobile.presentation';

@Component({
  selector: 'app-customer-list-ui',
  templateUrl: './customer-list.presentation.html',
  styleUrls: ['./customer-list.presentation.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [CustomerListPresenter]
})
export class CustomerListPresentationComponent extends CustomerListPresentationBase implements OnInit, OnDestroy {

  /** This property is used for get data from container component */
  @Input() public set baseResponse(baseResponse:  Customer[]) {
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
      this.toastr.success('Successfully Deleted', 'success');
      this.changeDetection.detectChanges();
      this.getCustomer.emit(this.tableProperty);
    }

  }

  /** This property is used for emit data to container component */
  @Output() public getCustomer: EventEmitter<TableProperty<CustomerFilterRecord>>;

  /** This property is used for emit data to container component */
  @Output() public deleteCustomer: EventEmitter <Customer>;

  /** This property is used for emit filter data to container component */
  @Output() public filterCustomer: EventEmitter<TableProperty<CustomerFilterRecord>>;

  public isMobile: Observable<BreakpointState>;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  /** This property is used to store the Customers that has been retrieved from the API. */
  public customers: Customer[];

  /** This property is used to store the unique ID's of the selected Customers */
  public selectedCustomersId: Set <Customer>;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<CustomerFilterRecord>;

  /** This property is used to store the options that are available in the Page Size selection drawdown */
  public pageSize: number[];

  /** This boolean is used to indicate whether all rows are selected or not  */
  public isCheckAll: boolean;

  public tableProp: Subject<TableProperty<CustomerFilterRecord>> = new Subject();
  // public customer: Subject<Customer[]> = new Subject();
  public customer: BehaviorSubject<Customer[]> = new BehaviorSubject([]);
  /** This property is used for subscribe the value of subject customer*/
  public customer$: Observable<Customer[]>;

  public isMobileDevice: boolean;

  /** This property is used for checking filter applied or not. */
  public isFilterApply: boolean;

  /** This property is used for checking sort applied or not. */  
  public isSortApply: boolean;

  /** This property is used to store QueryList of SortingOrderDirective */
  @ViewChildren(SortingOrderDirective) public sortingColumns: QueryList<SortingOrderDirective>;

  /** Component ref of data table presentation component */
  public componentRef: ComponentRef<CustomerListDesktopPresentationComponent | CustomerListMobilePresentationComponent>;
  /** create for getter setter */
  private _baseResponse:  Customer[];

  /** create for  */
  private destroy: Subject<boolean>;

  constructor(
    public customerPresenter: CustomerListPresenter,
    public changeDetection: ChangeDetectorRef,
    private factoryResolver: ComponentFactoryResolver,
    private breakPointObservableService: BreakPointObserverService,
    private toastr: ToastrService) {
    super(customerPresenter, changeDetection);
    this.initProperty();
  }

  public ngOnInit(): void {
    this.customerPresenter.setTableProp$.pipe(takeUntil(this.destroy)).subscribe((tableProperty: TableProperty<CustomerFilterRecord>) => {
      if(tableProperty.filter){
        this.filterCustomer.emit(tableProperty);
        this.tableProperty = tableProperty;
      }else{
        this.getCustomer.emit(tableProperty);
        this.tableProperty = tableProperty;
      }
          });
    this.customerPresenter.deleteCustomer$.pipe(takeUntil(this.destroy)).subscribe((customer: Customer) => { this.deleteCustomer.emit(customer) })
  }

  public ngAfterViewInit(): void {
    this.breakPointObservableService.deviceObserver$.subscribe((value: BreakPointEnum) => {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
      if (value === BreakPointEnum.IsMobile) {
        this.isMobileDevice = true;
        const factory = this.factoryResolver.resolveComponentFactory(CustomerListMobilePresentationComponent);
        this.componentRef = this.container.createComponent(factory);

        this.customer$.pipe(takeUntil(this.destroy)).subscribe((res) => {
          this.componentRef.instance.customers = res;
          this.componentRef.instance.tableProperty = this.tableProperty;
        })
      } else {
        this.isMobileDevice = false;
        const factory = this.factoryResolver.resolveComponentFactory(CustomerListDesktopPresentationComponent);
        this.componentRef = this.container.createComponent(factory);

        this.customer$.pipe(takeUntil(this.destroy)).subscribe((res) => {
          this.componentRef.instance.tableProperty = this.tableProperty;
          this.componentRef.instance.customers = res;
        })
      }
      this.changeDetection.detectChanges();
    });
  }

    /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public setTableData(): void {
    if (this.tableProperty.filter) { this.isFilterApply = true } else { this.isFilterApply = false };
    if (this.tableProperty.sort) { this.isSortApply = true };
    this.customerPresenter.customers = this.baseResponse;
    this.customers = this.baseResponse;
    if(this.tableProperty.pageNumber > 0 && this.customers.length === 0){
      this.toastr.info('No more records found', 'alert');
      return;
    } else if(this.customers.length === 0) {
      this.tableProperty.pageNumber = 0;
    }
    const customerLength = this.customerPresenter.customers.length;
    this.customer.next(this.customerPresenter.customers);
    this.tableProperty = this.customerPresenter.getTableProperty(this.tableProperty, customerLength);

    this.changeDetection.detectChanges();
  }

  public openSort(): void {
    this.customerPresenter.openSort();
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.customerPresenter.customers =[];
    this.selectedCustomersId = new Set();
    this.isCheckAll = false;
    this.tableProperty = new TableProperty();
    this.pageSize = pageCount;
    this.destroy = new Subject();
    this.getCustomer= new EventEmitter<TableProperty<CustomerFilterRecord>>();
    this.deleteCustomer= new EventEmitter <Customer> ();
    this.filterCustomer = new EventEmitter<TableProperty<CustomerFilterRecord>>();
    this.customer$ = this.customer.asObservable();
  }
}
