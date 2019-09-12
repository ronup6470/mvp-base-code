/**
 * @author Hem Chudgar.
 * @description Card view container component.
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute,ParamMap } from '@angular/router';
// ---------------------------------------------- //
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-view-container',
  templateUrl: './customer-view.container.html',
  host: {
    class: 'flex-grow-1 h-100'
  }
})
export class CustomerViewContainerComponent {
  /** This is a observable which passes the Customer object to its child component */
  public customer$: Observable<Customer>;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.customer$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      switchMap((params: ParamMap) => this.customerService.getCustomerById(params.get('id'))),
    );

  }

}

