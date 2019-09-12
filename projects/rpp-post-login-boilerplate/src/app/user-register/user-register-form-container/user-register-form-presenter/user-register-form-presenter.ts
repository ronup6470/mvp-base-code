/**
 * @name UserRegisterPresenter
 * @author Nitesh Sharma
 * @description This is a presenter service for user-registerwhich contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//---------------------------------------------------------------------//
import { LanguageDataService } from 'common-libs';

import { UserRegister } from '../../user-register.model';

@Injectable()
export class UserRegisterFormPresenter {

    /** This is used for subscribing the value of subject add */
    public add$: Observable<UserRegister>;
    /** This is used for add camelCaseModelName object */
    private add: Subject<UserRegister> = new Subject();

    constructor(private fb: FormBuilder,
        private languageService: LanguageDataService) {
        this.add$ = this.add.asObservable();
    }

    /**
     * This will create all the controls for the form group
     * @param userRegisterFormGroup is the form group
     * @param fb is the form builder which will create the controls
     * @returns It will return the userRegisterFromGroup with all the controls
     */
    public buildForm(): FormGroup {

        const strongRegex: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        const strongPhone: RegExp = new RegExp(/^[6-9]\d{9}$/);
        const emailRegex: RegExp =
            // tslint:disable-next-line: max-line-length
            new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return this.fb.group({

            fullName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2),
            Validators.pattern(/^[^-\s][a-zA-Z ]+$/)]],

            userName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],

            email: ['', [Validators.required, Validators.pattern(emailRegex)]],

            language: ['', [Validators.required]],

            phoneNumber: ['', [Validators.required, Validators.pattern(strongPhone)]],

            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern(strongRegex)]],

            confirmPassword: ['', [Validators.required]],

            captchaToken: ['', [Validators.required]],

            termCheck: [false, [Validators.required]],
        }, {
                validator: [this.checkPassword('password', 'confirmPassword'),
                this.checkTruthy('termCheck')
                ]
            })
    };


    /**
     * Checks truthy
     * @param controlName 
     * @returns  
     */
    public checkTruthy(controlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];

            if (control.errors && !control.errors.mustChecked) {
                // return if another validator has already found an error on the control
                return;
            }
            // set error on control if validation fails
            if (!control.value) {
                control.setErrors({ mustChecked: true });
            } else {
                control.setErrors(null);
            }
        }
    }

    /**
     * Must match
     * @param controlName 
     * @param matchingControlName 
     * @returns Form 
     */
    public checkPassword(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    /**
     * This method will validate the form
     * If form is valid then it will 
     * @param userRegisterFormGroup 
     */
    public saveUserRegister(userRegisterFormGroup: FormGroup): void {
        // console.log(userRegisterFormGroup);
        if (userRegisterFormGroup.valid) {
            let userRegister: UserRegister = new UserRegister();
            userRegister = userRegisterFormGroup.getRawValue();
            this.languageService.updateLanguage(userRegister.language);
            this.add.next(userRegister);
        }
        else {
            // show any custom validation here 
        }
    }

    /**
     * This will bind the form control value
     * @param userFormGroup is the form group containing all the controls
     * @param userRegisteris the object storing all the values  
     */
    public bindControlValue(userRegisterFormGroup: FormGroup, userRegister: UserRegister): FormGroup {
        if (userRegister) {
            userRegisterFormGroup.patchValue(userRegister);
        }
        return userRegisterFormGroup;
    }
}
