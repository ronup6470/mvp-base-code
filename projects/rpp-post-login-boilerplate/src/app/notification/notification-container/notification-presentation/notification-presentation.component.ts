import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableProperty, Notifications, pageCount } from 'common-libs';
import { NotificationPresenterService } from '../notification-presenter/notification-presenter.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-notification-presentation',
  templateUrl: './notification-presentation.component.html',
  styleUrls: ['./notification-presentation.component.scss'],
})
export class NotificationPresentationComponent {

  private _notifications: Notifications[];
  private _channelNotifications: any;
  public tableProperty: TableProperty<any>;
  // public notifications: Notifications[] = [];
  private destroy: Subject<boolean>;
  public pageSize: number[];

  @Output() public getnotifications: EventEmitter<TableProperty<any>>;

  constructor(private notificationPresenter: NotificationPresenterService) {
    this.initProperty();
  }

  @Input() public set notifications(baseResponse: Notifications[]) {
    if (baseResponse) {
      this._notifications = baseResponse;
      this.setNotifcations();
    }
  }

  public get notifications(): Notifications[] {
    return this._notifications;
  }

  @Input() public set channelNotifications(channelNotifications: any) {
    if (channelNotifications) {
      this._channelNotifications = channelNotifications;

      if (this.tableProperty.pageNumber === 0) {
        this.updateNotifications(channelNotifications);
      }
    }
  }

  public get channelNotifications(): any {
    return this._channelNotifications;
  }

  private initProperty(): void {
    this.tableProperty = new TableProperty();
    this.pageSize = pageCount;
    this.destroy = new Subject();
    this.getnotifications = new EventEmitter<TableProperty<any>>();
    this._notifications = [];
  }

  public ngOnInit(): void {

    // This will subscribe the save event and emit to container component
    this.notificationPresenter.setTableProp$.pipe(takeUntil(this.destroy)).subscribe((tableProperty: TableProperty<any>) => {
      this.getnotifications.emit(tableProperty); this.tableProperty = tableProperty
    });
  }

  private setNotifcations(): void {
    console.log(this.notifications);
    // this.notifications = this.baseResponse.body;
    // this.tableProperty.totalRecord = (this.baseResponse.count) ? this._baseResponse.count : this.notifications.length;
    this.tableProperty = this.notificationPresenter.getTableProperty(this.tableProperty);
  }

  private updateNotifications(channelNotifications) {
    let notificationExist = false;
    for (let i = 0; i < channelNotifications.notifications.length; i++) {
      const parsedNotification = JSON.parse(channelNotifications.notifications[i].result);
      for (let j = 0; j < this.notifications.length; j++) {
        if (this.notifications[i].notificationId === parsedNotification.notificationId) {
          notificationExist = true;
          break;
        }
      }
      if (!notificationExist) {
        this.notifications.unshift(parsedNotification);
      }
    }
    this.notifications = this.notifications.slice(0, 10);
  }
  
  /**
   * This method is invoked when the user changes the current page size.
   * @param pageSize The page number that needs to be set.
   */
  public onPageSizeChange(pageSize: number): void {
    this.notificationPresenter.onPageSizeChange(pageSize);
  }

  public onPageChange(pageNumber: number): void {
    this.notificationPresenter.onPageChange(pageNumber);
  }
}
