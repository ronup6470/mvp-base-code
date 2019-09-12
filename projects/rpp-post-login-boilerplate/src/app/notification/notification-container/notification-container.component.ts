import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationService, Notifications, TableProperty } from 'common-libs';
import { ChannelNotificationService } from '../../core/services/channel-notification/channel-notification.service';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss'],

})
export class NotificationContainerComponent {

  constructor(private notificationService: NotificationService,
    private channelNotification: ChannelNotificationService) {
   }

  public dropdownState: boolean;
  public pagesize = 10;
  public pageNo = 0;
  private notificationUrl = 'notifications';

  public notifications$: Observable<Notifications[]> = this.notificationService.getNotifications(new TableProperty(), this.notificationUrl);
  public channelNotifications$: Observable<any> = this.channelNotification.channelNotifications$;

  public getnotifications(tableProperty: TableProperty<any>): void {
    this.notifications$ = this.notificationService.getNotifications(tableProperty, this.notificationUrl);
  }
}
