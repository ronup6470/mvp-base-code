/**
 * @author Ronak Patel.
 * @description This is data table presentation component.To represent get data from container component and render to dom.
 */

import { Component, OnInit, ViewChildren, QueryList, ChangeDetectionStrategy, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
// ---------------------------------------------------------- //
import { DataTablePresenterService } from '../data-table-presenter/data-table-presenter.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataTableDesktopPresentationComponent } from './data-table-desktop-presentation/data-table-desktop-presentation.component';
import { DataTableMobilePresentationComponent } from './data-table-mobile-presentation/data-table-mobile-presentation.component';
import { DataTablePresentationBase } from './data-table-presentation-class/data-table-presentation-base';

import { TableProperty, SortingOrderDirective, pageCount, BreakPointObserverService, BreakPointEnum } from 'common-libs';
import { Customer, Company, FilterRecord } from '../../data-table.model';

import { ToastrService } from 'ngx-toastr';

// import { BreakPointEnum } from 'common-libs/rpp-post-login-boilerplate/src/app/core/model/break-point-enum';

@Component({
  selector: 'app-data-table-ui',
  templateUrl: './data-table-presentation.component.html',
  styleUrls: ['./data-table-presentation.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataTablePresenterService]
})
export class DataTablePresentationComponent extends DataTablePresentationBase implements OnInit, AfterViewInit, OnDestroy {

  /** This property is used for get data from container component */
  @Input() public set baseResponse(baseResponse: Customer[]) {

    if (baseResponse) {
      this._baseResponse = baseResponse;
      this.setTableData();
      this.changeDetection.detectChanges();
    }
  }

  public get baseResponse(): Customer[] {
    return this._baseResponse;
  }
  @Input() public set isDeleted(response: boolean) {
    if (response) {
      this.toastr.success('Successfully Deleted', 'success');
      this.changeDetection.detectChanges();
      this.getCustomer.emit(this.tableProperty);
    }
  }

  /** This property is used for get data from container component */
  @Input() public set companies(companies: Company[]) {
    if (companies) {
      this.dataTablePresenter.companies = companies;
    }
  };

  /** This property is used for get data from container component */
  @Input() public set groups(groups: Company[]) {
    if (groups) {
      this.dataTablePresenter.groups = groups;
    }
  };
  /** This property is used for emit data to container component */
  @Output() public getCustomer: EventEmitter<TableProperty<FilterRecord>>;
  /** This property is used for emit data to container component */
  @Output() public deleteCustomer: EventEmitter<number>;
  /** This property is used for emit data to container component */
  @Output() public filterCustomer: EventEmitter<TableProperty<FilterRecord>>;
  /** viewchild to get the container reference */
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;
  /** This property is used to store the customers data */
  public customers: Customer[];
  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<FilterRecord>;
  /** This property is used to store the unique ID's of the selected customers */
  public selectedCustomersId: Set<number>;
  /** This property is used to store the options that are available in the Page Size selection drawdown */
  public pageSize: number[];
  /** This boolean is used to indicate whether all rows are selected or not  */
  public isCheckAll: boolean;
  /** behaviour subject to emit the customer value */
  public customer: BehaviorSubject<Customer[]> = new BehaviorSubject([]);
  /** This property is used for subscribe the value of subject  customer */
  public customer$: Observable<Customer[]>;
  /** This property is used to check if the device is mobile or desktop */
  public isMobileDevice: boolean;
  /** This property is used to check if filter is applied or not */
  public isFilterApply: boolean;
  /** This property is used to check if sort is applied or not */
  public isSortApply: boolean;
  /** This property is used to store QueryList of SortingOrderDirective */
  @ViewChildren(SortingOrderDirective) public sortingColumns: QueryList<SortingOrderDirective>;
  /** Component ref of data table presentation component */
  public componentRef: ComponentRef<DataTableDesktopPresentationComponent | DataTableMobilePresentationComponent>;
  /** create for getter setter */
  protected _baseResponse: Customer[];
  /** create for destroying the subscription */
  private destroy: Subject<boolean>;

  constructor(
    public dataTablePresenter: DataTablePresenterService,
    public changeDetection: ChangeDetectorRef,
    private factoryResolver: ComponentFactoryResolver,
    private breakPointObservableService: BreakPointObserverService,
    private toastr: ToastrService) {
    super(dataTablePresenter, changeDetection);
    this.initProperty();
  }

  public ngOnInit(): void {
    this.breakPointObservableService.deviceObserver$.pipe(takeUntil(this.destroy)).subscribe((value: BreakPointEnum) => { })

    // This will subscribe the save event and emit to container component
    this.dataTablePresenter.setTableProp$.pipe(takeUntil(this.destroy)).subscribe((tableProperty: TableProperty<FilterRecord>) => {
      if (tableProperty.filter) {
        this.filterCustomer.emit(tableProperty); this.tableProperty = tableProperty
      } else {
        this.getCustomer.emit(tableProperty); this.tableProperty = tableProperty
      }
    });
    // This will subscribe for header text.
    this.dataTablePresenter.deleteCustomer$.pipe(takeUntil(this.destroy)).subscribe((id: number) => { this.deleteCustomer.emit(id) });
  }

  /**
   * after view init
   */
  public ngAfterViewInit(): void {
    this.breakPointObservableService.deviceObserver$.subscribe((value: BreakPointEnum) => {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
      if (value === BreakPointEnum.IsMobile) {
        this.isMobileDevice = true;
        const factory = this.factoryResolver.resolveComponentFactory(DataTableMobilePresentationComponent);
        this.componentRef = this.container.createComponent(factory);

        this.customer$.pipe(takeUntil(this.destroy)).subscribe((res) => {
          this.componentRef.instance.customers = res;
          this.componentRef.instance.tableProperty = this.tableProperty;
        })

      } else {
        this.isMobileDevice = false;
        const factory = this.factoryResolver.resolveComponentFactory(DataTableDesktopPresentationComponent);
        this.componentRef = this.container.createComponent(factory);

        this.customer$.pipe(takeUntil(this.destroy)).subscribe((res) => {
          this.componentRef.instance.tableProperty = this.tableProperty;
          this.componentRef.instance.customers = res;
          this.changeDetection.detectChanges();
        })
      }
      this.changeDetection.detectChanges();
    })
  }

  /** 
   * This method is called when this component gets data as an Input from container component
   * It then emits the customer data
   * It also shows the toastr message if there are no records, if user clicks on the pagination next button.
   * And it does not show pagination if there are no records.
   */
  public setTableData(): void {
    if (this.tableProperty.filter) { this.isFilterApply = true } else { this.isFilterApply = false };
    if (this.tableProperty.sort) { this.isSortApply = true };

    this.dataTablePresenter.customers = this.baseResponse;
    this.customers = this.baseResponse;
    const customerLength = this.dataTablePresenter.customers.length;
    if (this.tableProperty.pageNumber > 0 && this.customers.length === 0) {
      this.toastr.info('No more records found', 'alert');
      return;
    } else if (this.customers.length === 0) {
      console.log("no record");
      this.tableProperty.pageNumber = 0;
    }
    this.customer.next(this.dataTablePresenter.customers);
    // this.tableProperty.totalRecord = (this.baseResponse.count) ? this._baseResponse.count : this.dataTablePresenter.customers.length;
    this.tableProperty = this.dataTablePresenter.getTableProperty(this.tableProperty, customerLength);
    this.changeDetection.detectChanges();
  }

  /** ngOnDestroy lifecycle hook */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  /** THis method calls the openSort method from presenter service */
  public openSort(): void {
    this.dataTablePresenter.openSort();
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.dataTablePresenter.customers = [];
    this.selectedCustomersId = new Set();
    this.isCheckAll = false;
    this.tableProperty = new TableProperty();
    this.pageSize = pageCount;
    this.destroy = new Subject();
    this.getCustomer = new EventEmitter<TableProperty<FilterRecord>>();
    this.deleteCustomer = new EventEmitter<number>();
    this.filterCustomer = new EventEmitter<TableProperty<FilterRecord>>();
    this.customer$ = this.customer.asObservable();
  }


}
