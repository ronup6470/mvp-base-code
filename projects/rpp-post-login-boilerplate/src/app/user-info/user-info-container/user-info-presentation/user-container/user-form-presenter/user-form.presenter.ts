
/**
 * @name UserPresenter
 * @author Nitesh Sharma
 * @description This is a presenter service for userwhich contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//---------------------------------------------------------------------//
import { ValidationRegex , requiredFileType, validateFileSize} from 'common-libs';
import { User} from '../../../../user-info.model';


@Injectable()
export class UserFormPresenter {

    /** This is used for subscribing the value of subject add */
    public add$: Observable<User>;
    /** This is used for add camelCaseModelName object */
    private add: Subject<User> = new Subject();

    constructor(private fb: FormBuilder) {
        this.add$ = this.add.asObservable();
    }

    /**
     * This will create all the controls for the form group
     * @param userFormGroup is the form group
     * @param fb is the form builder which will create the controls
     * @returns It will return the userFromGroup with all the controls
     */
    public buildForm(): FormGroup {
        return this.fb.group({
            name: [ '',[Validators.required ,Validators.maxLength(30) ,Validators.minLength(2) ]],           
            company: [ '',[Validators.required ]],           
            isAdmin: [ false,[Validators.required ]],           
            gender: [ false],           
            city: [ null ],           
            multiCity: [ ''],           
            createdAt: [ ''],           
            birthDate: [ ''],           
            orderTime: [ ''],           
            productNumber: [ '',[Validators.required ]],           
            image: [ '',[Validators.required ,requiredFileType(['png', 'jpg', 'jpeg']), validateFileSize(2048) ]],           
            email: [ '',[Validators.pattern('(@)(.+)$') ]]           
      })
    };

    /**
     * This method will validate the form
     * If form is valid then it will 
     * @param userFormGroup 
     */
    public saveUser(userFormGroup: FormGroup): void {
        if (userFormGroup.valid) {
            let user: User= new User();
            user= userFormGroup.getRawValue();
            this.add.next(user);
        }
        else {
            // show any custom validation here 
        }
    }

    /**
     * This will bind the form control value
     * @param userFormGroup is the form group containing all the controls
     * @param useris the object storing all the values  
     */
    public bindControlValue(userFormGroup: FormGroup, user: User): FormGroup {
        if (user) {
            userFormGroup.patchValue(user);
        }
        return userFormGroup;
    }
}

