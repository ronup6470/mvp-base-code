/**
 * @author Bhumi Desai.
 * @description Service layer class to communicate with the server.
 */
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// ------------------------------------------------------------- //
import { environment } from '../../environments/environment';
import { Params, TableProperty, HttpService } from 'common-libs';
import { PasswordAdapter } from './change-password-adapter/change-password-adapter';
import { Password, } from './change-password.model';

/**
 * Injectable
 */
@Injectable()
export class PasswordService {
  /** store base url */
  private baseUrl: string;

  constructor(
    private http: HttpService,
    private changePasswordAdapter: PasswordAdapter,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criteria based on which the records should be fetched from the server.
   * @returns - changePassword[]
   */
  public getPasswords(tableProperty: TableProperty): Observable<Password[]> {
    const url: string = this.baseUrl + 'Password';
    const params: Params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<Password[]>(
      url, '1.0', { params: { ...params } }).pipe(map((data: Password[]) => {
        return data.map((items: Password) => this.changePasswordAdapter.toResponse(items));
      }));
  }

  /** This will get the record by id from database */
  public getPasswordById(id: string): Observable<Password> {
    const url: string = this.baseUrl + 'Password/' + id;
    return this.http.httpGetRequest<Password>(url, '1.0').pipe(map((response: Password) =>
      this.changePasswordAdapter.toResponse(response)));;

  }

  /** This will save the record into database */
  public addPassword(changePassword: Password): Observable<Password> {
    const url: string = this.baseUrl + 'Password';
    const password: Password = this.changePasswordAdapter.toRequest(changePassword);
    return this.http.httpPostRequest<Password>(url, password, '1.0');
  }

  /** This will save the record by id into database */
  public updatePassword(id: string, changePassword: Password): Observable<Password> {
    const url: string = this.baseUrl + 'account/updatepassword/' + id;
    return this.http.httpPutRequest<Password>(url, changePassword, '1.0');
  }

  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deletePassword(changePassword: Password): Observable<Password> {
    const url: string = this.baseUrl + 'Password';
    let options: {
      headers: HttpHeaders;
      body: Password;
    } = {
      headers: new HttpHeaders(),
      body: changePassword
    };
    return this.http.httpDeleteRequest<Password>(url, '1.0', options);
  }

  /**
   * Params process
   * @param tableProperty 
   * @returns process 
   */
  private paramProcess(tableProperty: TableProperty): Params {
    const params: Params = new Params();
    (tableProperty.pageNumber) ? params.page = tableProperty.pageNumber.toString() : '';
    (tableProperty.pageLimit) ? params.perPage = tableProperty.pageLimit.toString() : '';
    (tableProperty.order) ? params.order = tableProperty.order : '';
    (tableProperty.sort) ? params.sort = tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';
    return (tableProperty.filter) ? tableProperty.filter : params;
  }
}
