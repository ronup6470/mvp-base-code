
/**
 * @name EmployeeContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for Employee. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty} from 'common-libs';
import { EmployeeService } from '../employee.service';
import {Employee,   
} from '../employee.model';
@Component({
  selector: 'app-employee-form-container',
  templateUrl: './employee-form.container.html'
})
export class EmployeeFormContainerComponent {
   /** This is a observable which passes the Employee object to its child component */
  public employee$: Observable<Employee> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.employeeService.getEmployeeById(params.get('id'))),
  );

  constructor(
    private toasterService: ToastrService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}
  
  /** When presentation layer emits the save event, then this will post data on server */
  public addEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe(response => {
   
        this.toasterService.success("Data saved successfully.");
     
    }, (err) => {
    });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateEmployee(employee: Employee): void {
    const id = this.route.snapshot.params.id;
    this.employeeService.updateEmployee(id,employee).subscribe(response => {
     
        this.toasterService.success("Data saved successfully.");
    
    }, (err) => {
    });
  }

}
