/**
 * @author Ronak Patel.
 * @description Service layer class to communicate with the server.
 */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// ------------------------------------------------------------- //
import { TableProperty, Params } from 'common-libs';
import { environment } from '../../environments/environment';
import { Customer, Company, Group, FilterRecord } from './data-table.model';
import { CustomerAdapter, FilterAdapter } from './data-table-adapter/data-table.adapter';

@Injectable()
export class DataTableService {
  /** store base url */
  private baseUrl: string;
  private baseUrl1: string;
  constructor(
    private http: HttpClient,
    private adapter: CustomerAdapter,
    private filterAdapter: FilterAdapter
  ) {
    this.baseUrl = environment.baseUrl;
    // this.baseUrl = 'http://localhost:3000';
    this.baseUrl1 = 'http://localhost:3000';
  }

  /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - BaseResponse<Customer>
   */
  public getCustomers(tableProperty: TableProperty<FilterRecord>): Observable<Customer[]> {
    const url: string = this.baseUrl + '/customer';
    const params: Params = this.paramProcess(tableProperty);
    return this.http.get<Customer[]>(
      url, { params: { ...params } }).pipe(map((data: Customer[]) => {
        return data.map((items: Customer) => this.adapter.toResponse(items));
      }));
  }

  /**
   *  This method posts the filtered data to the server and returns the particular filtered data.
   * @param tableProperty - the data which needs to be filtered out.
   * @returns - BaseREsponse<Customer>
   */
  public filterCustomer(tableProperty: TableProperty<FilterRecord>): Observable<Customer[]> {
    const url: string = this.baseUrl + '/customer/filter';
    const body: FilterRecord = this.filterAdapter.toRequest(tableProperty.filter);
    const params: Params = this.paramProcess(tableProperty);
    return this.http.post<Customer[]>(
      url, body, { params: { ...params } }).pipe(map((data: Customer[]) => {
        return data.map((items: Customer) => this.adapter.toResponse(items));
      }));
  }

  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deleteCustomer(id: number): Observable<Customer> {
    const url: string = this.baseUrl + '/customer/' + id;
    return this.http.delete<Customer>(url);
  }

  /** This property is used to store array.  */
  public getCompanies(): Observable<Company[]> {
    const url: string = this.baseUrl + '/companies';
    return this.http.get<Company[]>(url);
  }

  /** This property is used to store array.  */
  public getGroups(): Observable<Group[]> {
    const url: string = this.baseUrl + '/groups';
    return this.http.get<Group[]>(url);
  }

  /**
   * This function checks for the presence or criteria and constructs the query params object accordingly.
   * This function should be inside shared/utils
   * @param tableProperty The model which needs to be mapped to the criteria that is accepted by the API.
   */
  private paramProcess(tableProperty: TableProperty<FilterRecord>): Params {
    const params: Params = new Params();
    (tableProperty.pageNumber || (tableProperty.pageNumber === 0)) ? params.page = tableProperty.pageNumber.toString() : '';
    (tableProperty.pageLimit) ? params.perPage = tableProperty.pageLimit.toString() : '';
    (tableProperty.sort) ? params.sort = tableProperty.order + '' + tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';
    return params;
  }
}
