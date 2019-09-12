

/**
 * @name CustomerPresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for customerwhich contains the ui and business logic
 */

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { CustomerFormPresenter } from '../customer-form-presenter/customer-form.presenter';
import { Customer } from '../../customer.model';


/**
 * Component
 */
@Component({
  selector: 'app-customer-form-ui',
  templateUrl: './customer-form.presentation.html',
  styleUrls: ['./customer-form.presentation.scss'],
  viewProviders: [CustomerFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFormPresentationComponent implements OnInit, OnDestroy {

  /** This will set the data */
  @Input() public set customer(value: Customer) {
    this._customer = value;
    if (value) {
      this.customerFormGroup = this.customerPresenter.bindControlValue(this.customerFormGroup, this._customer);
    }
  }
  public get customer(): Customer {
    return this._customer
  }
  /** Customer form group of customer form presentation component */
  public customerFormGroup: FormGroup;
  /*** Output  of customer form presentation component */
  @Output() public add: EventEmitter<Customer>;
  /*** Output  of customer form presentation component */
  @Output() public update: EventEmitter<Customer>;
  /** Determines whether form submitted  */
  public isFormSubmitted: boolean = false;
  /** Bs config of customer form presentation component */
  public bsConfig: BsDatepickerConfig;

  /*** Destroy  of customer form presentation component   */
  private destroy: Subject<void>;
  /** Customer  of customer form presentation component   */
  private _customer: Customer;


  constructor(
    private customerPresenter: CustomerFormPresenter,
    private cdrRef: ChangeDetectorRef
  ) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.update = new EventEmitter();
    this.bsConfig = new BsDatepickerConfig();
    this.bsConfig.containerClass = 'theme-primary';
    this.bsConfig.adaptivePosition = true;
    this.customerFormGroup = this.customerPresenter.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.customerPresenter.add$.pipe(takeUntil(this.destroy)).subscribe((customer: Customer) => {
      if (this.customer) {
        this.update.emit(customer);
      } else {
        this.add.emit(customer);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveCustomer(): void {
    this.isFormSubmitted = true;
    this.customerPresenter.saveCustomer(this.customerFormGroup);
  }

  /** When user click on cancel */
  public cancel(): void {
    // do something here
  }


}

