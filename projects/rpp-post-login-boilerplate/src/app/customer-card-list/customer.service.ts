/**
 * @author Ronak Patel.
 * @description Service layer class to communicate with the server.
 */
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// ------------------------------------------------------------- //
import { environment } from '../../environments/environment';
import { Params , TableProperty, HttpService} from 'common-libs';
import {CustomerAdapter,CustomerListAdapter } from './customer-adapter/customer.adapter';
import { Customer,CustomerList } from './customer.model';

@Injectable()
export class CustomerService {
  /** store base url */
  private baseUrl: string;
  /** Behavior subject of customer */
  private customer: BehaviorSubject<Customer>;
  /** Initialize behavior subject */
  private reinitializeList: BehaviorSubject<boolean>;
  /** Behavior subject if data is deleted */
  private isDeleted: BehaviorSubject<boolean>;
  constructor(
    private http: HttpService,
    private customerAdapter:CustomerAdapter,
    private customerListAdapter: CustomerListAdapter
  ) {
    this.baseUrl = environment.baseUrl;
    this.customer= new BehaviorSubject<Customer>(null);
    this.reinitializeList = new BehaviorSubject<boolean>(null);
    this.isDeleted = new BehaviorSubject<boolean>(false);

  }
   /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - customerList[]
   */
  public getCustomerList(tableProperty: TableProperty): Observable<CustomerList[]> {
    const url = this.baseUrl + 'Customer';
    const params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<CustomerList[]>(
      url,'1.0', { params: { ...params } }).pipe(map((data: CustomerList[]) => {
        return data.map((items) => this.customerListAdapter.toResponse(items));
      }));
  }
  /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - customer[]
   */
  public getCustomers(tableProperty: TableProperty): Observable<Customer[]> {
    const url = this.baseUrl + 'Customer';
    const params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<Customer[]>(
      url,'1.0', { params: { ...params } }).pipe(map((data: Customer[]) => {
        return data.map((items) => this.customerAdapter.toResponse(items));
      }));
  }

  /** This will get the record by id from database */
  public getCustomerById(id: string): Observable<Customer> {
    const url = this.baseUrl + 'Customer/' + id;
    return this.http.httpGetRequest<Customer>(url,'1.0').pipe(map((response: Customer)=> this.customerAdapter.toResponse(response)));;
  }

  /** This will save the record into database */
  public addCustomer(customer: Customer): Observable<Customer> {
    const url = this.baseUrl + 'Customer';
    return this.http.httpPostRequest<Customer>(url, customer, '1.0');
  }

    /** This will save the record by id into database */
  public updateCustomer(id: string,customer: Customer): Observable<Customer> {
    const url = this.baseUrl + 'Customer/' + id;
    return this.http.httpPutRequest<Customer>(url, customer, '1.0');
  }
  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deleteCustomer(customer: CustomerList): Observable<CustomerList> {
    const url = this.baseUrl + `Customer`;
    let options = {
      headers: new HttpHeaders(),
      body: customer    };
    return this.http.httpDeleteRequest<CustomerList>(url, '1.0', options);
  }


  /** Set customer  */
  public setCustomer(customer: Customer): void {
     this.customer.next(customer);
   }
  
  /** Get customer */
  public getCustomer(): Observable<Customer> {
     return this.customer.asObservable();
   }
  
   /**
    * Set true to get all data on add
    */
   public initializeList(): void {
     this.reinitializeList.next(true);
   }
  
   /**
    * Get all data on add
    */
   public getInitializeList(): Observable<boolean> {
     return this.reinitializeList.asObservable();
   }
  
   /**
    * Set when data is deleted successfully
    */
   public setIsDeleted(isDeleted: boolean): void {
     this.isDeleted.next(isDeleted);
   }
   /**
    * Get whether data is deleted or not
    */
   public getIsDeleted(): Observable<boolean> {
     return this.isDeleted.asObservable();
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
