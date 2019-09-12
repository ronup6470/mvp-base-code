

/**
 * @name PasswordPresentationComponent
 * @author Bhumi Desai.
 * @description This is a presentation component for change-passwordwhich contains the ui and business logic
 */

import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { PasswordFormPresenter } from '../change-password-form-presenter/change-password-form-presenter';
import { Password } from '../../change-password.model';


/**
 * Component
 */
@Component({
  selector: 'app-change-password-form-ui',
  templateUrl: './change-password-form.presentation.html',
  viewProviders: [PasswordFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormPresentationComponent implements OnInit, OnDestroy {

  /**
   * Output  of password form presentation component
   */
  @Output() public update: EventEmitter<Password>;
  /**
   * Change password form group of password form presentation component
   */
  public changePasswordFormGroup: FormGroup;

  /**
   * Determines whether form submitted or not
   */
  public isFormSubmitted: boolean = false;
  /**
   * Destroy  of password form presentation component
   */
  private destroy: Subject<void>;


  constructor(
    private changePasswordPresenter: PasswordFormPresenter
  ) {
    this.destroy = new Subject();
    this.update = new EventEmitter();
    this.changePasswordFormGroup = this.changePasswordPresenter.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.changePasswordPresenter.add$.pipe(takeUntil(this.destroy)).subscribe((changePassword: Password) => {
      if (changePassword) {
        this.update.emit(changePassword);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public savePassword(): void {
    this.isFormSubmitted = true;
    this.changePasswordPresenter.savePassword(this.changePasswordFormGroup);
  }

}

