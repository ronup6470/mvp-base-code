
/**
 * @name UserInfoContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for UserInfo. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty } from 'common-libs';
import { Employee } from '../../../user-info.model';
import { UserInfoService } from '../../../user-info.service';
@Component({
  selector: 'app-employee-form-container',
  templateUrl: './employee.container.html'
})
export class EmployeeFormContainerComponent {

  @HostBinding('class') class = 'flex-grow-1 overflow-auto';
  /** This is a observable which passes the Employee object to its child component */
  public employee$: Observable<Employee> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.userInfoService.getEmployeeById(params.get('id'))),
  );

  constructor(
    private toasterService: ToastrService,
    private userInfoService: UserInfoService,
    private route: ActivatedRoute
  ) { }
  /** When presentation layer emits the save event, then this will post data on server */
  public addEmployee(employee: Employee): void {
    this.userInfoService.addEmployee(employee).subscribe(response => {

      this.toasterService.success("Data saved successfully.");

    }, (err) => {
    });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateEmployee(employee: Employee): void {
    const id = this.route.snapshot.params.id;
    this.userInfoService.updateEmployee(id, employee).subscribe(response => {

      this.toasterService.success("Data saved successfully.");

    }, (err) => {
    });
  }

}
