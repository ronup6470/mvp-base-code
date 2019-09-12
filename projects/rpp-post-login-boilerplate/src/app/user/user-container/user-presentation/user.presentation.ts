/**
 * @name AccordionPresentationComponent
 * @author Nitesh Sharma
 * @description This is a presentation component for accordion control which contains the ui and business logic
 */

import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
 import { NgbAccordion, NgbPanelChangeEvent, NgbPanel } from '@ng-bootstrap/ng-bootstrap';
 import { Subject } from 'rxjs/Subject';
 import { takeUntil } from 'rxjs/operators'; 
 import { TableProperty } from 'common-libs';
 import { UserPresenter } from '../user-presenter/user.presenter'
 import { Employee, Customer,CustomerFilterRecord} from '../../user.model'; 
      
 @Component({
   selector: 'app-user-ui',
   templateUrl: './user.presentation.html',
   styleUrls: ['./user.presentation.scss'],
   viewProviders: [UserPresenter],
   changeDetection: ChangeDetectionStrategy.OnPush
 })
 export class UserPresentationComponent implements OnInit, AfterViewInit {
 
  @ViewChild('accordion') accordionComponent: NgbAccordion;

  @Output() addEmployeeEmitter: EventEmitter<Employee> = new EventEmitter();
  @Output() updateEmployeeEmitter: EventEmitter<Employee> = new EventEmitter();         
  private _employee: Employee;
  /** This will set the data */
  @Input() set employee(value: Employee) {
    this._employee= value;
  } 
  get employee(): Employee{
    return this._employee  }
  public customers: Customer[];
  @Input() public set baseResponseCustomer(value: Customer[]) {
    if (value) {
      this.customers = value;
    }
  };
  public get baseResponseCustomer(): Customer[] {
    return this.customers
  }
  /** This property is used for get delete record or not. */
  @Input() public isDeleted: boolean;
  @Output() public getCustomerEmitter: EventEmitter<TableProperty<CustomerFilterRecord>> = new EventEmitter();
  @Output() deleteCustomerEmitter: EventEmitter<Customer> = new EventEmitter();
  @Output() filterCustomerEmitter: EventEmitter<TableProperty<CustomerFilterRecord>> = new EventEmitter();

  private destroy: Subject<void>;
 
  constructor(
    private cdr: ChangeDetectorRef,
    private userPresenter: UserPresenter) {
    this.destroy = new Subject();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.userPresenter.activeIds = ['0'];
    this.setPanelPrimaryType('0', false);
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /**
  * @description When user click on save, make current panel collapsed and set next panel opened
  * @param id : This is the panel which we want to set as active
  */
  public onSave(id: string): void {
    this.userPresenter.activeIds = [id];
    this.setPanelPrimaryType(id, false);
  }

  /**
  * @description When user click on cancel, make it collapsed
  * @param id : This is the panel which we want to remove from its active state
  */
  public onCancel(id: string): void {
    this.userPresenter.onCancel(id, this.accordionComponent);
  }

  /**
  * @description  On change of tabs, it will set the panel type according to its state
  * @param data: This is the current clicked tab
  */
  public toggleAccordion(data: NgbPanelChangeEvent): void {
    this.accordionComponent = this.userPresenter.toggleAccordion(data, this.accordionComponent);
  }

  /** 
  * @description This will set the panel type of the active panel and remove from other panels
  * @param id : This is the panel which we want to set as active
  * @param isCancel : This flag is optional, only used when user click on cancel button, then remove the primary type from active tab
  */
  private setPanelPrimaryType(id: string, isCancel?: boolean) {
    this.accordionComponent = this.userPresenter.setPanelPrimaryType(id, this.accordionComponent, isCancel);
  }

  /** It will return list of active panel ids */
  get activeIds(): string[] {
    return this.userPresenter.activeIds;
  }

  public addEmployee(employee: Employee): void{
    this.addEmployeeEmitter.emit(employee);
  }
  public updateEmployee(employee: Employee): void{
    this.updateEmployeeEmitter.emit(employee);
  } 
  public getCustomers(tableProperty: TableProperty<CustomerFilterRecord>): void{
    this.getCustomerEmitter.emit(tableProperty);
  }         
  public deleteCustomer(customer: Customer): void{
    this.deleteCustomerEmitter.emit(customer);
  }  
  /** This Method is invoke when user filters data from server  */
  public filterCustomer(tableProperty: TableProperty<CustomerFilterRecord>): void {
    this.filterCustomerEmitter.emit(tableProperty);
  }
 }
 