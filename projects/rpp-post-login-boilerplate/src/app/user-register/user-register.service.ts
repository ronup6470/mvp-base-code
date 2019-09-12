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
import { Params, TableProperty, HttpService } from 'common-libs';
import {
  UserRegisterAdapter,
} from './user-register-adapter/user-register-adapter';
import { UserRegister, } from './user-register.model';

@Injectable()
export class UserRegisterService {
  /** store base url */
  private baseUrl: string;

  constructor(
    private http: HttpService,
    private userRegisterAdapter: UserRegisterAdapter,
  ) {
    // this.baseUrl = environment.apiUrl;
    this.baseUrl = 'http://104.45.158.75:8044/api/';
  }

  /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - BaseResponse<userRegister>
   */
  public getUserRegisters(tableProperty: TableProperty<any>): Observable<UserRegister[]> {
    const url = this.baseUrl + 'account';
    const params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<UserRegister[]>(
      url, '1.0', { params: { ...params } }).pipe(map((data: UserRegister[]) => {
        return data.map((items) => this.userRegisterAdapter.toResponse(items));
      }));
  }

  /** This will get the record by id from database */
  public getUserRegisterById(id: string): Observable<UserRegister> {
    const url = this.baseUrl + 'account/' + id;
    return this.http.httpGetRequest<UserRegister>(url, '1.0').pipe(map((response: UserRegister) => this.userRegisterAdapter.toResponse(response)));;

  }

  /** This will save the record into database */
  public addUserRegister(userRegister: UserRegister): Observable<UserRegister> {
    const url = this.baseUrl + 'account';
    const vall = this.userRegisterAdapter.toRequest(userRegister);
    return this.http.httpPostRequest<UserRegister>(url, vall, '1.0');
  }

  /** This will save the record by id into database */
  public updateUserRegister(id: string, userRegister: UserRegister): Observable<UserRegister> {
    const url = this.baseUrl + 'account/' + id;
    return this.http.httpPutRequest<UserRegister>(url, userRegister, '1.0');
  }

  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deleteUserRegister(userRegister: UserRegister): Observable<UserRegister> {
    const url = this.baseUrl + 'UserRegister';
    let options = {
      headers: new HttpHeaders(),
      body: userRegister
    };
    return this.http.httpDeleteRequest<UserRegister>(url, '1.0', options);
  }



  /**
   * This function checks for the presence or criteria and constructs the query params object accordingly.
   * This function should be inside shared/utils
   * @param tableProperty The model which needs to be mapped to the criteria that is accepted by the API.
   */
  private paramProcess(tableProperty: TableProperty<any>): Params {
    const params = new Params();
    (tableProperty.pageNumber) ? params.page = tableProperty.pageNumber.toString() : '';
    (tableProperty.pageLimit) ? params.perPage = tableProperty.pageLimit.toString() : '';
    (tableProperty.order) ? params.order = tableProperty.order : '';
    (tableProperty.sort) ? params.sort = tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';
    return (tableProperty.filter) ? tableProperty.filter : params;
  }
}
