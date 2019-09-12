/**
 * @author Hem Chudgar
 */

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators/map';
// ------------------------------------ //
import { Notifications } from '../../models/notification.model';
import { Params } from '../../models/core.model';
import { TableProperty } from '../../models/table-property.model';
import { NotificationAdapter } from '../../adapter/notification-adapter';
import { HttpService } from '../http/http.service';

/**
 * NotificationService
 */
@Injectable()
export class NotificationService {
  /** baseUrl */
  private baseUrl: string;

  constructor(
    private http: HttpService,
    @Inject('environment') private environment: any,
    private adapter: NotificationAdapter
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * getNotifications
   * @param tableProperty 
   * @param notificationUrl 
   */
  public getNotifications(tableProperty: TableProperty, notificationUrl: string): Observable<Notifications[]> {
    const url: string = this.baseUrl + notificationUrl;
    const params: Params = this.paramProcess(tableProperty);
    return this.http.httpGetRequest<Notifications[]>(
      url, '1.0', { params: { ...params } }).pipe(map((data: Notifications[]) => {
        return data.map((items: Notifications) => this.adapter.toResponse(items));
      }));
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
    (tableProperty.sort) ? params.sort = tableProperty.order + '' + tableProperty.sort : '';
    (tableProperty.search) ? params.q = tableProperty.search : '';
    return params;
  }
}
