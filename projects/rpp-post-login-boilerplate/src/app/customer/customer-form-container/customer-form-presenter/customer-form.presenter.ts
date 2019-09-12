
/**
 * @name CustomerPresenter
 * @author Nitesh Sharma
 * @description This is a presenter service for customerwhich contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//---------------------------------------------------------------------//
import { ValidationRegex, requiredFileType, validateFileSize } from 'common-libs';

import { Customer } from '../../customer.model';


/**
 * Injectable
 */
@Injectable()
export class CustomerFormPresenter {

    /** This is used for subscribing the value of subject add */
    public add$: Observable<Customer>;
    /** This is used for add camelCaseModelName object */
    private add: Subject<Customer> = new Subject();

    constructor(private fb: FormBuilder) {
        this.add$ = this.add.asObservable();
    }

    /**
     * This will create all the controls for the form group
     * @param customerFormGroup is the form group
     * @param fb is the form builder which will create the controls
     * @returns It will return the customerFromGroup with all the controls
     */
    public buildForm(): FormGroup {
        return this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(15)]],
            company: ['', [Validators.required]],
            group: ['', [Validators.required]],
            email: ['', [Validators.pattern('(@)(.+)$')]],
            createdAt: [''],
            productNo: ['', [Validators.required]],
            image: ['', [Validators.required, requiredFileType(['png', 'jpg', 'jpeg']), validateFileSize(2048)]]
        })
    };

    /**
     * This method will validate the form
     * If form is valid then it will 
     * @param customerFormGroup 
     */
    public saveCustomer(customerFormGroup: FormGroup): void {
        if (customerFormGroup.valid) {
            let customer: Customer = new Customer();
            customer = customerFormGroup.getRawValue();
            this.add.next(customer);
        }
        else {
            // show any custom validation here 
        }
    }

    /**
     * This will bind the form control value
     * @param userFormGroup is the form group containing all the controls
     * @param customer is the object storing all the values  
     */
    public bindControlValue(customerFormGroup: FormGroup, customer: Customer): FormGroup {
        if (customer) {
            customerFormGroup.patchValue(customer);
        }
        return customerFormGroup;
    }
}

