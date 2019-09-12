import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ChannelNotificationService {

  channelNotifications$ = new BehaviorSubject<any>(null);
  constructor() { }

  setChannelNotification(channelNotifications) {
    this.channelNotifications$.next(channelNotifications);
  }

  // getChannelNotification() {
  //   return this.channelNotifications.asObservable();
  // }
}
