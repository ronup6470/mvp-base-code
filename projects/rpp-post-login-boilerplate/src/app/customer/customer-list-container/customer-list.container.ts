
/**
 * @name CustomerContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for Customer. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty } from 'common-libs';
import { CustomerService } from '../customer.service';
import { Customer, CustomerFilterRecord } from '../customer.model';
/**
 * Component
 */
@Component({
  selector: 'app-customer-list-container',
  templateUrl: './customer-list.container.html'
})
export class CustomerListContainerComponent {
  /** This is a observable which passes the list of customer to its child component */
  public customers$: Observable<Customer[]> = this.customerService.getCustomers(new TableProperty());
  /** Determines whether deleted is */
  public isDeleted: boolean;

  constructor(
    private toasterService: ToastrService,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) { }

  /** This Method is used to get data from server  */
  public getCustomers(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.customers$ = this.customerService.getCustomers(tableProperty);
  }

  /** This Method is invoke when user filters data from server  */
  public filterCustomer(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.customers$ = this.customerService.filterCustomer(tableProperty);
  }


}
