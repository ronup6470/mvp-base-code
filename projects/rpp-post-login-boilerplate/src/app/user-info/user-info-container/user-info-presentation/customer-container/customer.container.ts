
/**
 * @name UserInfoContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for UserInfo. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty } from 'common-libs';
import { Customer, CustomerFilterRecord } from '../../../user-info.model';
import { UserInfoService } from '../../../user-info.service';
@Component({
  selector: 'app-customer-list-container',
  templateUrl: './customer.container.html'
})
export class CustomerListContainerComponent {

  @HostBinding('class') class = 'flex-grow-1 overflow-auto';
  /** This is a observable which passes the list of customer to its child component */
  public customers$: Observable<Customer[]> = this.userInfoService.getCustomers(new TableProperty());
  public isDeleted: boolean;

  constructor(
    private toasterService: ToastrService,
    private userInfoService: UserInfoService,
    private route: ActivatedRoute
  ) { }
  /** This Method is used to get data from server  */
  public getCustomers(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.customers$ = this.userInfoService.getCustomers(tableProperty);
  }

  /** This Method is delete data from server  */
  public deleteCustomer(customer: Customer): void {
    this.userInfoService.deleteCustomer(customer).subscribe(() => {
      this.isDeleted = true;
    });
  }
  /** This Method is invoke when user filters data from server  */
  public filterCustomer(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.customers$ = this.userInfoService.filterCustomer(tableProperty);
  }


}
