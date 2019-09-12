/** 
 * @author Shahbaz Shaikh 
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
// ---------------------------------------------- //
import { Notifications } from '../../../core/models/notification.model';

/**
 * NotificationContentComponent
 */
@Component({
  selector: 'lib-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationContentComponent {
  /**
   * Sets input
   */
  @Input() public set notifications(baseResponse: Notifications[]) {
    if (baseResponse) {
      this._notifications = baseResponse;
      this.cdr.detectChanges();
    }
  }

  public get notifications(): Notifications[] {
    return this._notifications;
  }

  /**
   * Show description of notification content component
   */
  public showDescription: boolean;

  /**
   * Notifications  of notification content component
   */
  private _notifications: Notifications[];
  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    router.events.subscribe((val: Event) => {
      if (val instanceof NavigationEnd) {
        this.showDescription = true;
      }
    });
  }
  /**
   * Tracks by
   * @param index 
   * @param item 
   * @returns by 
   */
  public trackBy(index: number, item: Notifications): number {
    return index;
  }
}
