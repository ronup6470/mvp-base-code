/**
 * @author Ronak Patel.
 * @description Service layer class to communicate with the server.
 */
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// ------------------------------------------------------------- //
import { environment } from '../../environments/environment';
import { Params , TableProperty, HttpService} from 'common-libs';
import {EmployeeAdapter, } from './employee-adapter/employee.adapter';
import { Employee, } from './employee.model';

@Injectable()
export class EmployeeService {
  /** store base url */
  private baseUrl: string;
  constructor(
    private http: HttpService,
    private employeeAdapter:EmployeeAdapter,
  ) {
    this.baseUrl = environment.baseUrl;

  }
   /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - employee[]
   */
  public getEmployees(tableProperty: TableProperty): Observable<Employee[]> {
    const url = this.baseUrl + 'Employee';
    const params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<Employee[]>(
      url,'1.0', { params: { ...params } }).pipe(map((data: Employee[]) => {
        return data.map((items) => this.employeeAdapter.toResponse(items));
      }));
  }

  /** This will get the record by id from database */
  public getEmployeeById(id: string): Observable<Employee> {
    const url = this.baseUrl + 'Employee/' + id;
    return this.http.httpGetRequest<Employee>(url,'1.0').pipe(map((response: Employee)=> this.employeeAdapter.toResponse(response)));;
  }

  /** This will save the record into database */
  public addEmployee(employee: Employee): Observable<Employee> {
    const url = this.baseUrl + 'Employee';
    return this.http.httpPostRequest<Employee>(url, employee, '1.0');
  }

    /** This will save the record by id into database */
  public updateEmployee(id: string,employee: Employee): Observable<Employee> {
    const url = this.baseUrl + 'Employee/' + id;
    return this.http.httpPutRequest<Employee>(url, employee, '1.0');
  }

  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deleteEmployee(employee: Employee): Observable<Employee> {
    const url = this.baseUrl + `Employee`;
    let options = {
      headers: new HttpHeaders(),
      body: employee    };
    return this.http.httpDeleteRequest<Employee>(url, '1.0', options);
  }




  /**
   * This function checks for the presence or criteria and constructs the query params object accordingly.
   * This function should be inside shared/utils
   * @param tableProperty The model which needs to be mapped to the criteria that is accepted by the API.
   */
  private paramProcess(tableProperty: TableProperty): Params {
    const params: Params = new Params();
    (tableProperty.pageNumber || (tableProperty.pageNumber === 0)) ? params.page = tableProperty.pageNumber.toString() : '';
    (tableProperty.pageLimit) ? params.perPage = tableProperty.pageLimit.toString() : '';
    (tableProperty.sort) ? params.sort = tableProperty.order+''+tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';
    
    return params;
  }
}
