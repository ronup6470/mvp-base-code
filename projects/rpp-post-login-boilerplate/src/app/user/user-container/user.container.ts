
/**
 * @name UserContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for User. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty} from 'common-libs';
import { UserService } from '../user.service';
import { Employee, Customer,CustomerFilterRecord} from '../user.model';
@Component({
  selector: 'app-user-container',
  templateUrl: './user.container.html'
})
export class UserContainerComponent {
     /** This is a observable which passes the Employee object to its child component */
  public employee$: Observable<Employee> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.userService.getEmployeeById(params.get('id'))),
  );
    /** This is a observable which passes the list of customer to its child component */
  public customers$: Observable<Customer[]> = this.userService.getCustomers(new TableProperty());
  public isDeleted: boolean; 

  constructor(
    private toasterService: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
    /** When presentation layer emits the save event, then this will post data on server */
  public addEmployee(employee: Employee): void {
    this.userService.addEmployee(employee).subscribe(response => {
      
        this.toasterService.success("Data saved successfully.");
    
    }, (err) => {
    });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateEmployee(employee: Employee): void {
    const id = this.route.snapshot.params.id;
    this.userService.updateEmployee(id,employee).subscribe(response => {
      
        this.toasterService.success("Data saved successfully.");
      
    }, (err) => {
    });
  }
    /** This Method is used to get data from server  */
  public getCustomers(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.customers$ = this.userService.getCustomers(tableProperty);
  }

    /** This Method is delete data from server  */
  public deleteCustomer(customer: Customer): void {
    this.userService.deleteCustomer(customer).subscribe(() => {
      this.isDeleted = true;
    });
  }                 
  /** This Method is invoke when user filters data from server  */
  public filterCustomer(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.customers$ = this.userService.filterCustomer(tableProperty);
  }

  
}
