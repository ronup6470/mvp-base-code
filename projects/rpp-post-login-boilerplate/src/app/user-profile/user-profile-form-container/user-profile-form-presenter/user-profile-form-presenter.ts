
/**
 * @name UserProfilePresenter
 * @author Nitesh Sharma
 * @description This is a presenter service for user-profilewhich contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//---------------------------------------------------------------------//
import { LanguageDataService } from 'common-libs';

import { UserProfile } from '../../user-profile.model';

@Injectable()
export class UserProfileFormPresenter {

    /** This is used for subscribing the value of subject add */
    public add$: Observable<UserProfile>;
    /** This is used for add camelCaseModelName object */
    private add: Subject<UserProfile> = new Subject();

    constructor(private fb: FormBuilder,
        private languageService: LanguageDataService) {
        this.add$ = this.add.asObservable();
    }

    /**
     * This will create all the controls for the form group
     * @param userProfileFormGroup is the form group
     * @param fb is the form builder which will create the controls
     * @returns It will return the userProfileFromGroup with all the controls
     */
    public buildForm(): FormGroup {

        const strongPhone: RegExp = new RegExp(/^[6-9]\d{9}$/);
        const emailRegex: RegExp =
            // tslint:disable-next-line: max-line-length
            new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return this.fb.group({

            username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],

            fullName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2),Validators.pattern(/^[^-\s][a-zA-Z ]+$/)]],

            email: ['', [Validators.required, Validators.pattern(emailRegex)]],

            phoneNumber: ['', [Validators.required,, Validators.pattern(strongPhone)]],

            language: [null, [Validators.required]]

        })
    };


    /**
     * This method will validate the form
     * If form is valid then it will 
     * @param userProfileFormGroup 
     */
    public saveUserProfile(userProfileFormGroup: FormGroup): void {
        if (userProfileFormGroup.valid) {
            let userProfile: UserProfile = new UserProfile();
            userProfile = userProfileFormGroup.getRawValue();
            this.add.next(userProfile);
        }
        else {
            // show any custom validation here 
        }
    }

    /**
     * This will bind the form control value
     * @param userFormGroup is the form group containing all the controls
     * @param userProfileis the object storing all the values  
     */
    public bindControlValue(userProfileFormGroup: FormGroup, userProfile: UserProfile): FormGroup {
        if (userProfile) {
            userProfileFormGroup.patchValue(userProfile);
        }
        return userProfileFormGroup;
    }

}
