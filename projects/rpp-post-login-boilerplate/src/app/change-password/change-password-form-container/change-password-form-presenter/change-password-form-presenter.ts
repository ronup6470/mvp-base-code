/**
 * @name PasswordPresenter
 * @author Bhumi Desai.
 * @description This is a presenter service for change-password which contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
//---------------------------------------------------------------------//
import { ConfirmationModalComponent, ConfirmationModalService } from 'common-libs';
import { Password } from '../../change-password.model';
import { PasswordAdapter } from '../../change-password-adapter/change-password-adapter';



/**
 * Injectable
 */
@Injectable()
export class PasswordFormPresenter {

    /** This is used for subscribing the value of subject add */
    public add$: Observable<Password>;
    /** This is used for add camelCaseModelName object */
    private add: Subject<Password> = new Subject();

    constructor(
        private fb: FormBuilder,
        private changeAdapter: PasswordAdapter,
        private modalService: ConfirmationModalService,
        private translate: TranslateService,
    ) {
        this.add$ = this.add.asObservable();
    }

    /**
     * This will create all the controls for the form group
     * @param changePasswordFormGroup is the form group
     * @param fb is the form builder which will create the controls
     * @returns It will return the changePasswordFromGroup with all the controls
     */
    public buildForm(): FormGroup {
        const strongRegex: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        return this.fb.group(
            {

                currentPassword: ['', [Validators.required]],

                newPassword: ['', [Validators.required, Validators.pattern(strongRegex)]],

                confirmPassword: ['', [Validators.required]]
            },
            {
                validator: [this.checkPassword('newPassword', 'confirmPassword')]
            })
    };

    /**
     * Checks password
     * @param controlName 
     * @param matchingControlName 
     * @returns  
     */
    public checkPassword(controlName: string, matchingControlName: string): any {
        // tslint:disable-next-line: typedef
        return (formGroup: FormGroup) => {
            const control: AbstractControl = formGroup.controls[controlName];
            const matchingControl: AbstractControl = formGroup.controls[matchingControlName];

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
     * @param changePasswordFormGroup 
     */
    public savePassword(changePasswordFormGroup: FormGroup): void {

        const modalInstance: ConfirmationModalComponent = this.modalService.openModal();
        modalInstance.confirmationMessage = this.translate.instant('displayMessage');
        modalInstance.positiveAction = this.translate.instant('okAction');
        modalInstance.negativeAction = this.translate.instant('cancelAction');
        modalInstance.confirmModal.subscribe((value: boolean) => {
            (value) ? this.onPassword(changePasswordFormGroup) : console.log('decline conformations');
            this.modalService.closeModal();
        });

    }

    /**
     * Determines whether password on
     * @param changePasswordFormGroup 
     */
    public onPassword(changePasswordFormGroup: FormGroup): void {
        if (changePasswordFormGroup.valid) {
            let changePassword: Password = new Password();
            changePassword = changePasswordFormGroup.getRawValue();
            let changeDetail: Password = this.changeAdapter.toRequest(changePassword);
            this.add.next(changeDetail);
            // this.oidcFacade.signoutRedirect();
        }
        else {
            // show any custom validation here 
        }
    }
    /**
     * This will bind the form control value
     * @param userFormGroup is the form group containing all the controls
     * @param changePasswordis the object storing all the values  
     */
    public bindControlValue(changePasswordFormGroup: FormGroup, changePassword: Password): FormGroup {
        if (changePassword) {
            changePasswordFormGroup.patchValue(changePassword);
        }
        return changePasswordFormGroup;
    }
}
