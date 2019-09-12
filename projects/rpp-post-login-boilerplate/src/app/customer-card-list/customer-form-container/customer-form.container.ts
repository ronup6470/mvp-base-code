
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
import { TableProperty} from 'common-libs';
import { CustomerService } from '../customer.service';
import {Customer,   
} from '../customer.model';
@Component({
  selector: 'app-customer-form-container',
  templateUrl: './customer-form.container.html'
})
export class CustomerFormContainerComponent {
     /** This is a observable which passes the Customer object to its child component */
  public customer$: Observable<Customer> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.customerService.getCustomerById(params.get('id'))),
  );

  constructor(
    private toasterService: ToastrService,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  
  
  
  /** When presentation layer emits the save event, then this will post data on server */
  public addCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer).subscribe(response => {
   
        this.toasterService.success("Data saved successfully.");
     
    }, (err) => {
    });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateCustomer(customer: Customer): void {
    const id = this.route.snapshot.params.id;
    this.customerService.updateCustomer(id,customer).subscribe(response => {
     
        this.toasterService.success("Data saved successfully.");
    
    }, (err) => {
    });
  }

}
