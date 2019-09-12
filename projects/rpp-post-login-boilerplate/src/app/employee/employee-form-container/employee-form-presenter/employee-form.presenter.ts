
/**
 * @name EmployeePresenter
 * @author Nitesh Sharma
 * @description This is a presenter service for employeewhich contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//---------------------------------------------------------------------//
import { ValidationRegex , requiredFileType, validateFileSize} from 'common-libs';

import { Employee} from '../../employee.model';


@Injectable()
export class EmployeeFormPresenter {

    /** This is used for subscribing the value of subject add */
    public add$: Observable<Employee>;
    /** This is used for add camelCaseModelName object */
    private add: Subject<Employee> = new Subject();

    constructor(private fb: FormBuilder) {
        this.add$ = this.add.asObservable();
    }

    /**
     * This will create all the controls for the form group
     * @param employeeFormGroup is the form group
     * @param fb is the form builder which will create the controls
     * @returns It will return the employeeFromGroup with all the controls
     */
    public buildForm(): FormGroup {
        return this.fb.group({
            name: [ '',[Validators.required ,Validators.maxLength(30) ,Validators.minLength(2) ]],           
            company: [ '',[Validators.required ]],           
            city: [ null ],           
            multiCity: [ ''],           
            birthDate: [ ''],           
            orderTime: [ ''],           
            productNo: [ '',[Validators.required ]],           
            email: [ '',[Validators.pattern('(@)(.+)$') ]],           
            image: [ '',[Validators.required ,requiredFileType(['png', 'jpg', 'jpeg']), validateFileSize(2048) ]],           
            description: [ '',[Validators.required ]],           
            isAdmin: [ false,[Validators.required ]],           
            gender: [ false]           
      })
    };

    /**
     * This method will validate the form
     * If form is valid then it will 
     * @param employeeFormGroup 
     */
    public saveEmployee(employeeFormGroup: FormGroup): void {
        if (employeeFormGroup.valid) {
            let employee: Employee= new Employee();
            employee= employeeFormGroup.getRawValue();
            this.add.next(employee);
        }
        else {
            // show any custom validation here 
        }
    }

    /**
     * This will bind the form control value
     * @param userFormGroup is the form group containing all the controls
     * @param employeeis the object storing all the values  
     */
    public bindControlValue(employeeFormGroup: FormGroup, employee: Employee): FormGroup {
        if (employee) {
            employeeFormGroup.patchValue(employee);
        }
        return employeeFormGroup;
    }
}

