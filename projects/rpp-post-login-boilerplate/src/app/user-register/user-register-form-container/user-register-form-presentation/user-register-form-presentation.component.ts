/**
 * @name UserRegisterPresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for user-registerwhich contains the ui and business logic
 */

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { UserRegisterFormPresenter } from '../user-register-form-presenter/user-register-form-presenter';
import { UserRegister } from '../../user-register.model';
import { Language } from 'common-libs';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-user-register-form-ui',
  templateUrl: './user-register-form-presentation.component.html',
  styleUrls: ['./user-register-form-presentation.component.scss'],
  viewProviders: [UserRegisterFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegisterFormPresentationComponent implements OnInit, OnDestroy {

  // private _userLanguages: Language[];
  public userLanguage: Language[];
  public userRegisterFormGroup: FormGroup;
  @Output() add: EventEmitter<UserRegister>;

  public isFormSubmitted: boolean = false;

  private destroy: Subject<void>;
 

  @Input() public set userLanguages(value: Language[]) {
    this.userLanguage = value;
    this.userRegisterFormGroup.get('language').setValue('en-us');
  }

  public get userLanguages(): Language[] {
    return this.userLanguage;
  }

  constructor(private userRegisterPresentor: UserRegisterFormPresenter,private readonly translate: TranslateService) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.userRegisterFormGroup = this.userRegisterPresentor.buildForm();
  }

  /**
   * Resolved user register form presentation component
   * @param captchaResponse 
   */
  public resolved(captchaResponse: string) {
    this.userRegisterFormGroup.get('captchaToken').setValue(captchaResponse);

  }

  public languageChange(event: any){
    this.translate.use(event.value);
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.userRegisterPresentor.add$.pipe(takeUntil(this.destroy)).subscribe((userRegister: UserRegister) => {
        this.add.emit(userRegister);
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveUserRegister(): void {
    this.isFormSubmitted = true;
    this.userRegisterPresentor.saveUserRegister(this.userRegisterFormGroup);
  }

}

