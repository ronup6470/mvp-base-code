/** 
 * @author Bhumi Desai.
 * @description Data table mobile service.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// ---------------------------------------------- //
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TableProperty } from 'common-libs';
import { Customer, SortRecord, FilterRecord } from '../../../../data-table.model';

@Injectable()
export class DataTableMobilePresenterService {
  
  /** This property is used for subscribing the value of subject setTableProp */
  public setTableProp$: Observable<TableProperty<FilterRecord>>;

  /** This property is used to store the Customers that has been retrieved from the API. */
  public customers: Customer[];

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty<FilterRecord>;

  /** This is used for user info object */
  // private setTableProp: Subject<TableProperty> = new Subject();
  public setTableProp: BehaviorSubject<TableProperty<FilterRecord>> = new BehaviorSubject(new TableProperty());

  /** This property is used to store filterData.  */
  private sortData: SortRecord;

  constructor() {
    this.initProperty();
    this.setTableProp$ = this.setTableProp.asObservable();
  }

  /** This method is invoke when table property change. */
  public setTableProperty(tableProperty: TableProperty<FilterRecord>, filterApply?: boolean): void {
    if (filterApply) { this.sortData = new SortRecord() };
    this.tableProperty = tableProperty;
    this.setTableProp.next(this.tableProperty);
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.customers = [];
    this.tableProperty = new TableProperty();
  }
}
