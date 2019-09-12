/**
 * @author Hem Chudgar.
 * @description Card view presentation component.
 */
import { Component, ChangeDetectionStrategy, Input  } from '@angular/core';
//---------------------------------------------------------------------//
import { Customer } from '../../customer.model';

@Component({
  selector: 'app-customer-view-presentation',
  templateUrl: './customer-view.presentation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false

})
export class CustomerViewPresentationComponent {
  
  /** This will set the data */
  @Input() public set customer(value: Customer) {
    if (value) {
    this._customer= value;
    }
  }
  public get customer(): Customer{
    return this._customer  }

  /** Customer property  */
  private _customer: Customer;

  constructor() {
    this._customer= new  Customer();
  }

}

