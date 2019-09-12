import { Injectable } from '@angular/core';
import { TableProperty } from 'common-libs';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NotificationPresenterService {

  public tableProperty: TableProperty<any>;
  private setTableProp: Subject<TableProperty<any>> = new Subject();
  public setTableProp$: Observable<TableProperty<any>>;

  constructor() { 
    this.setTableProp$ = this.setTableProp.asObservable();
  }


  public onPageChange(pageNumber: number): void {
    this.tableProperty.pageNumber = pageNumber;
    this.setTableProperty(this.tableProperty);
  }

  /**
   * This method is invoked when the user changes the current page size.
   * @param pageSize The page number that needs to be set.
   */
  public onPageSizeChange(pageSize: number): void {
    this.tableProperty.pageNumber = 0;
    this.tableProperty.pageLimit = pageSize;
    this.setTableProperty(this.tableProperty);
  }

  /** This method is invoke when table property change. */
  public setTableProperty(tableProperty: TableProperty<any>, filterApply?: boolean): void {
    this.tableProperty = tableProperty;
    this.setTableProp.next(this.tableProperty);
  }

  /** This method is invoke when data successfully get */
  public getTableProperty(tableProperty: TableProperty<any>): TableProperty<any> {
    this.tableProperty = tableProperty;
    this.tableProperty.start = (this.tableProperty.pageLimit * (this.tableProperty.pageNumber - 1)) + 1;
    this.tableProperty.end = (this.tableProperty.pageLimit >= this.tableProperty.totalRecord ||
      (this.tableProperty.pageLimit * this.tableProperty.pageNumber) > this.tableProperty.totalRecord)
      ? this.tableProperty.totalRecord : (this.tableProperty.pageLimit * this.tableProperty.pageNumber)
    return this.tableProperty;
  }
}
