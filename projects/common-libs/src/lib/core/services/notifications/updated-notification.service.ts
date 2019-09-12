/**
 * @author Shahbaz Shaikh
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Notifications } from '../../models/notification.model';

/**
 * UpdatedNotificationService
 */
@Injectable()
export class UpdatedNotificationService {

  /** updatedNotification */
  private updatedNotification: BehaviorSubject<Notifications[]>;
  constructor() {
    this.updatedNotification = new BehaviorSubject<Notifications[]>(null);
  }

  /** getUpdatedNotification */
  public setUpdatedNotification(updatedNotifications: Notifications[]): void {
    this.updatedNotification.next(updatedNotifications);
  }

  /** getUpdatedNotification */
  public getUpdatedNotification(): Observable<Notifications[]> {
    return this.updatedNotification.asObservable();
  }
}
