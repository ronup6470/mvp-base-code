

/**
 * @name EmployeePresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for employeewhich contains the ui and business logic
 */

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
//-------------------------------------------------------------------------------//
import { EmployeeFormPresenter } from '../employee-form-presenter/employee-form.presenter';
import { Employee} from '../../employee.model';


@Component({
  selector: 'app-employee-form-ui',
  templateUrl: './employee-form.presentation.html',
  styleUrls: ['./employee-form.presentation.scss'],
  viewProviders: [EmployeeFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormPresentationComponent implements OnInit, OnDestroy {

  public employeeFormGroup: FormGroup;
  @Output() add: EventEmitter<Employee>;
  @Output() update: EventEmitter<Employee>;
  public isFormSubmitted: boolean = false;
  public meridian: boolean;
  public bsConfig: BsDatepickerConfig;



  private destroy: Subject<void>;
  private _employee: Employee;

  /** This will set the data */
  @Input() set employee(value: Employee) {
    this._employee= value;
    if (value) {
      this.employeeFormGroup = this.employeePresentor.bindControlValue(this.employeeFormGroup, 
      this._employee);
    }
  }

  get employee(): Employee{
    return this._employee  }

  constructor(private employeePresentor: EmployeeFormPresenter,
    private cdrRef: ChangeDetectorRef) {
    this.destroy = new Subject();
    this.add = new EventEmitter();
    this.update = new EventEmitter();
    this.meridian = true;

    this.bsConfig = new BsDatepickerConfig();
    this.bsConfig.containerClass = 'theme-primary';
    this.bsConfig.adaptivePosition = true;

    this.employeeFormGroup = this.employeePresentor.buildForm();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.employeePresentor.add$.pipe(takeUntil(this.destroy)).subscribe((employee: Employee) =>
    {
      if(this.employee){
          this.update.emit(employee);
      } else {
        this.add.emit(employee);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** This is used to save the data */
  public saveEmployee(): void {
    this.isFormSubmitted = true;
    this.employeePresentor.saveEmployee(this.employeeFormGroup);
  }

  /** When user click on cancel */
  public cancel(): void {
    // do something here
  }


}

