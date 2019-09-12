/**
 * @author Ronak Patel.
 * @description Service layer class to communicate with the server.
 */
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// ------------------------------------------------------------- //
import { environment } from '../../environments/environment';
import { Params , TableProperty, HttpService} from 'common-libs';
import {UserProfileAdapter,
} from './user-profile-adapter/user-profile-adapter';
import { UserProfile,} from './user-profile.model';

@Injectable()
export class UserProfileService {
  /** store base url */
  private baseUrl: string;

  constructor(
    private http: HttpService,
    private userProfileAdapter:UserProfileAdapter,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * This method invokes the server's get endpoint to fetch the record as per the criteria mentioned in the tabelProperty parameters.
   * It converts the criteria to key and values expected by the API by invoking processParam method. It then invokes the server, on successful
   * response, it fetches the count from the header and invokes the adapter to convert server's response to what is expected by the client.
   * What happens when there is an error from the server ?
   * @param  tableProperty - Store the criterias based on which the records should be fetched from the server.
   * @returns - userProfile
   */
  public getUserProfiles(tableProperty: TableProperty<any>): Observable<UserProfile[]> {
    const url = this.baseUrl + 'UserProfile';
    const params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<UserProfile[]>(
      url,'1.0', {  params: { ...params } }).pipe(map((data: UserProfile[]) => {
        return data.map((items) => this.userProfileAdapter.toResponse(items));
      }));
  }

  /** This will get the record by id from database */
  public getUserProfileById(id: string): Observable<UserProfile> {
    const url = this.baseUrl + 'UserProfile/' + id;
    return this.http.httpGetRequest<UserProfile>(url,'1.0').pipe(map((response: UserProfile)=> this.userProfileAdapter.toResponse(response)));;
    
  }

  /** This will save the record into database */
  public addUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    const url = this.baseUrl + 'UserProfile';
    return this.http.httpPostRequest<UserProfile>(url, userProfile,'1.0');
  }

    /** This will save the record by id into database */
  public updateUserProfile(id: string,userProfile: UserProfile): Observable<UserProfile> {
    const url = this.baseUrl + 'account/' + id;
    return this.http.httpPutRequest<UserProfile>(url, userProfile,'1.0');
  }

  /**
   * It invokes the API to delete the record mentioned in the path parameter.
   * @param id The id of the record that needs to be deleted from the server.
   */
  public deleteUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    const url = this.baseUrl + 'UserProfile';
    let options = {
      headers: new HttpHeaders(),
      body: userProfile    };
    return this.http.httpDeleteRequest<UserProfile>(url,'1.0', options);
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
