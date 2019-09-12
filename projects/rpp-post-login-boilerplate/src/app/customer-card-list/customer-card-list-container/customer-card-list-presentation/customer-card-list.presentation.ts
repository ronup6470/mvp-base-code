/**
 * @author Hem Chudgar.
 * @description Card list presentation component.
 */
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
// ---------------------------------------------- //
import { CustomerList } from '../../customer.model';
import { TableProperty } from 'common-libs';
import { CustomerCardListPresenter } from '../customer-card-list-presenter/customer-card-list.presenter';
import { CustomerService } from './../../customer.service';

/** component */
@Component({
  selector: 'app-customer-card-list-presentation',
  templateUrl: './customer-card-list.presentation.html',
  viewProviders: [CustomerCardListPresenter],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCardListPresentationComponent implements OnInit, OnDestroy {
  /** This property is used for get data from container component */
  @Input() public set customers(customers: CustomerList[]) {
    if (customers) {
      if (this.tableProperty.pageNumber > 0) {
        this._customers = this._customers.concat(customers)
      } else {
        this._customers = customers;
        if(customers.length > 0){
          this.getCustomerById(customers[0]);
        }
      }
    } else {
      this.router.navigate(['customer-card-list']);
    }

  };

  public get customers(): CustomerList[] {
    return this._customers;
  }

  /** This property is used for emit data to container component */
  @Output() public getCustomer: EventEmitter<TableProperty>;

  /** This property is used for emit data to container component */
  @Output() public deleteCustomer: EventEmitter<CustomerList>;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty;

  /** create for  */
  private destroy: Subject<boolean>;

  /** create for getter setter */
  private _customers: CustomerList[];

  /** current customer  */
  private customer: CustomerList;
  
  /** Search text */
  private searchTerm: string;

  /** Active index of the record */
  private activeIndex: number;

  /** Active id */
  private activeId: number;

  /** Customer data subscription */
  private customerDataSubscription: Subscription;

  /** Customer data subscription */
  private isDeletedSubscription: Subscription;

  constructor(
    public customerPresenter: CustomerCardListPresenter,
    private router: Router,
    private customerService: CustomerService,
    public changeDetection: ChangeDetectorRef,
    private toastr: ToastrService) {
    this.initProperty();
    this.customerDataSubscription = this.customerService.getCustomer().subscribe((customer: CustomerList) => {
      if (customer) {
        if (customer.id) {
          this.customers[this.activeIndex] = customer;
        }
        this.changeDetection.detectChanges();
      }
    });

    this.isDeletedSubscription = this.customerService.getIsDeleted().subscribe((data: boolean) => {
      if (data) {
        this.toastr.success('Successfully Deleted', 'success');
        const index: number = this.customers.indexOf(this.customer);
        this.customers.splice(index, 1);
        this.getCustomer.emit(new TableProperty());
        this.changeDetection.detectChanges();
      }
    });
  }

  public ngOnInit(): void {
    this.customerPresenter.setTableProp$.pipe(takeUntil(this.destroy)).subscribe((tableProperty: TableProperty) => {
      this.getCustomer.emit(tableProperty);
      this.tableProperty = tableProperty;
    });

    this.customerPresenter.deleteCustomer$.pipe(takeUntil(this.destroy)).subscribe((customer: CustomerList) => { this.deleteCustomer.emit(customer) })
}

  /**
   * The search string that has been searched by the user
   * @param searchTerm
   */
  public onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm
    this.customerPresenter.onSearch(searchTerm);
  }

  /**
   * This method will emit load event when scrolling occurs.
   */
  public baseOnScroll(): void {
    let pageNo: number = this.tableProperty.pageNumber + 1;
    this.customerPresenter.onScroll(this.searchTerm, pageNo);
  }

  /**
   * Used for performance optimization.
   */
  public trackBy(index: number, customer: CustomerList): CustomerList {
    return customer;
  }

  /**
   * Get first customer data from the array.
   * @param customerList 
   */
  public getCustomerById(customer: CustomerList): void {
    this.activeIndex = this.customerPresenter.getIndex(customer, this.customers);
    this.activeId = customer.id
    this.router.navigate(['customer-card-list/view', customer.id]);
  }

  /**
   * Get active index
   * @param customer   * @param event 
   */
  public getActiveIndex(customer: CustomerList, event: Event): void {
    event.stopPropagation();
    this.activeId = customer.id;
    this.customer= customer;
    this.activeIndex = this.customerPresenter.getIndex(customer, this.customers);
  }

  /** Route to view */
  public viewCustomer(customer: CustomerList): void {
    this.activeId = customer.id;
    this.router.navigate(['customer-card-list/view', customer.id]);
  }

  /** create for open modal when action perform */
  public openModal(customer: CustomerList): void {
    this.customer= customer;
    this.customerPresenter.openModal(customer);
  }

  /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.customerDataSubscription.unsubscribe();
    this.isDeletedSubscription.unsubscribe();
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.customerPresenter.customers = [];
    this.tableProperty = new TableProperty();
    this.getCustomer= new EventEmitter<TableProperty>();
    this.destroy = new Subject();
    this.deleteCustomer= new EventEmitter<CustomerList>();
  }



}

