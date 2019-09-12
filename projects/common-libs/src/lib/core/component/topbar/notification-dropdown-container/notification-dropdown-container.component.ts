/**
 * @author Shahbaz Shaikh
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
// ------------------------------------------------ //
import { Notifications } from '../../../models/notification.model';
import { UpdatedNotificationService } from '../../../services/notifications/updated-notification.service';

/**
 * NotificationDropdownContainerComponent
 */
@Component({
  selector: 'lib-notification-dropdown-container',
  templateUrl: './notification-dropdown-container.component.html',
  styleUrls: ['./notification-dropdown-container.component.scss'],
  preserveWhitespaces: true,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDropdownContainerComponent {

  /**
   * detach  of notification dropdown container component
   */
  @Output() public detach: EventEmitter<string>;
  /**
   * Dropdown state of notification dropdown container component
   */
  public dropdownState: boolean;
  /**
   * Pagesize  of notification dropdown container component
   */
  public pagesize: number;
  /**
   * Page no of notification dropdown container component
   */
  public pageNo: number;
  /**
   * Notifications$  of notification dropdown container component
   */
  public notifications$: Observable<Notifications[]>;

  /**
   * Sets input
   */
  @Input() public set notificationUrl(notificationUrl: string) {
    this.notifications$ = this.updateNotification.getUpdatedNotification();
    this._notificationUrl = notificationUrl;
  }

  public get notificationUrl(): string {
    return this._notificationUrl;
  }
  /**
   * Notification url of notification dropdown container component
   */
  private _notificationUrl: string

  constructor(
    private updateNotification: UpdatedNotificationService,
  ) {
    this.detach = new EventEmitter();
    this.pagesize = 10;
    this.pageNo = 0;
  }



  /**
   * Detach overlay
   */
  public detachOverlay(): void {
    this.detach.emit('');
  }
}
