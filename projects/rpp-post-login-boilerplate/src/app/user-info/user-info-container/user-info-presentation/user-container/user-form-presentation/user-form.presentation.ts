

/**
 * @name UserPresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for userwhich contains the ui and business logic
 */

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { UserFormPresenter } from '../user-form-presenter/user-form.presenter';
import { User} from '../../../../user-info.model';


@Component({
  selector: 'app-user-form-ui',
  templateUrl: './user-form.presentation.html',
  styleUrls: ['./user-form.presentation.scss'],
  viewProviders: [UserFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormPresentationComponent implements OnInit, OnDestroy {

  public userFormGroup: FormGroup;
  @Output() add: EventEmitter<User>;
  @Output() update: EventEmitter<User>;
  public isFormSubmitted: boolean = false;
  public meridian: boolean;
  public bsConfig: BsDatepickerConfig;



  private destroy: Subject<void>;
  private _user: User;

  /** This will set the data */
  @Input() set user(value: User) {
    this._user= value;
    if (value) {
      this.userFormGroup = this.userPresentor.bindControlValue(this.userFormGroup, 
      this._user);
    }
  }

  get user(): User{
    return this._user  }

  constructor(private userPresentor: UserFormPresenter,
    private cdrRef: ChangeDetectorRef) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.update = new EventEmitter();
    this.meridian = true;

    this.bsConfig = new BsDatepickerConfig();
    this.bsConfig.containerClass = 'theme-primary';
    this.bsConfig.adaptivePosition = true;

    this.userFormGroup = this.userPresentor.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.userPresentor.add$.pipe(takeUntil(this.destroy)).subscribe((user: User) =>
    {
      if(this.user){
          this.update.emit(user);
      } else {
        this.add.emit(user);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveUser(): void {
    this.isFormSubmitted = true;
    this.userPresentor.saveUser(this.userFormGroup);
  }

  /** When user click on cancel */
  public cancel(): void {
    // do something here
  }


}

