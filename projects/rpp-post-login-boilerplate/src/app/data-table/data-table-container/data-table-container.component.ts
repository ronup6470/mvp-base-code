/**
 * @author Ronak Patel.
 * @description This is a container component for data table.
 *  This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// ----------------------------------------------------------- //
import { DataTableService } from '../data-table.service';
import { Customer, Company, Group, FilterRecord } from '../data-table.model';
import { TableProperty } from 'common-libs';

@Component({
  selector: 'app-data-table-container',
  templateUrl: './data-table-container.component.html',
})
export class DataTableContainerComponent {

  /** This property is used to set boolean value if record is deleted or not */
  public isDeleted: boolean;
  /** This is a observable which passes the list of customer to its child component */
  public customers$: Observable<Customer[]> = this.dataTableService.getCustomers(new TableProperty());

  /** This is a observable which passes the list of companies to its child component */
  // public companies$: Observable<Company[]> = this.dataTableService.getCompanies();

  /** This is a observable which passes the list of groups to its child component */
  // public groups$: Observable<Group[]> = this.dataTableService.getGroups();

  constructor(private dataTableService: DataTableService) {
  }

  /** This Method is invoke when user get data from server  */
  public getCustomers(tableProperty: TableProperty<FilterRecord>): void {
    this.customers$ = this.dataTableService.getCustomers(tableProperty);
  }
  /** This Method is invoke when user delete data from server  */
  public deleteCustomer(id: number): void {
    this.dataTableService.deleteCustomer(id).subscribe(() => {
      this.isDeleted = true;
      // this.customers$ = this.dataTableService.getCustomers(this.tableProperty);
    });
  }
  /** This Method is invoke when user filters data from server  */
  public filterCustomer(tableProperty: TableProperty<FilterRecord>): void {
    this.customers$ = this.dataTableService.filterCustomer(tableProperty);
  }

}
