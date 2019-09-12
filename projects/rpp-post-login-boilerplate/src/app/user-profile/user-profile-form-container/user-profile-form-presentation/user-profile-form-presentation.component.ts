

/**
 * @name UserProfilePresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for user-profilewhich contains the ui and business logic
 */

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { UserProfileFormPresenter } from '../user-profile-form-presenter/user-profile-form-presenter';
import { UserProfile } from '../../user-profile.model';
import { Language, LanguageDataService } from 'common-libs';


@Component({
  selector: 'app-user-profile-form-ui',
  templateUrl: './user-profile-form-presentation.component.html',
  styleUrls: ['./user-profile-form-presentation.component.scss'],
  viewProviders: [UserProfileFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileFormPresentationComponent implements OnInit, OnDestroy {

  public userProfileFormGroup: FormGroup;
  @Output() public add: EventEmitter<UserProfile>;
  @Output() public update: EventEmitter<UserProfile>;
  public isFormSubmitted: boolean = false;
  // public bsConfig: BsDatepickerConfig;

  private destroy: Subject<void>;
  private _userProfile: UserProfile;
  private _userLanguages: Language[];
  private _userCountries: string[];
  
  public urlImg: string | ArrayBuffer;

  /** This will set the data */
  @Input() public set userProfile(value: any) {
    if (value) {
        let userProfile = {
          username: value.profile.preferred_username,
          fullName: value.profile.fullname,
          email: value.profile.email,
          phoneNumber: value.profile.phone_number,
          language: value.profile.language
          // language: value.profile.language
          
        }
        this._userProfile = value; 
     
        this.userProfileFormGroup = this.userProfilePresentor.bindControlValue(this.userProfileFormGroup,userProfile);
    }
  }

  public get userProfile(): any {
    return this._userProfile
  }

  @Input() public set userLanguages(value: Language[]) {
    this._userLanguages = value;
    this.userProfileFormGroup.get('language').setValue(this.userProfile.profile.language);
    
  }

  public get userLanguages(): Language[] {
    return this._userLanguages
  }

  @Input() public set userCountries(value: string[]) {
    this._userCountries = value;
  }

  public get userCountries(): string[] {
    return this._userCountries
  }

  constructor(private userProfilePresentor: UserProfileFormPresenter,
              private cdrRef: ChangeDetectorRef , private languageService: LanguageDataService) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.update = new EventEmitter();
    this.userProfileFormGroup = this.userProfilePresentor.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.userProfilePresentor.add$.pipe(takeUntil(this.destroy)).subscribe((userProfile: UserProfile) => {
      if (userProfile) {
        this.update.emit(userProfile);
      } else {
        this.add.emit(userProfile);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveUserProfile(): void {
    this.isFormSubmitted = true;
    this.userProfilePresentor.saveUserProfile(this.userProfileFormGroup);
  }

  /** When user click on cancel */
  public cancel(): void {
    // do something here
  }


}
