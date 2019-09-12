/**
 * @author Shahbaz Shaikh
 */

import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
// ------------------------------------------------ //
import { DropdownAnimation } from '../../../sidebar/dashboard.animation';
import { Notifications } from '../../../../models/notification.model';


/**
 * NotificationDropdownPresentationComponent
 */
@Component({
  selector: 'lib-notification-dropdown-presentation',
  templateUrl: './notification-dropdown-presentation.component.html',
  styleUrls: ['./notification-dropdown-presentation.component.scss'],
  animations: [DropdownAnimation.fadeInDown],
  preserveWhitespaces: true,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDropdownPresentationComponent {

  /**
   * Dropdown state of notification dropdown presentation component
   */
  public dropdownState: boolean;

  /**
   * Output  of notification dropdown presentation component
   */
  @Output() public detach: EventEmitter<string> 

  /**
   * Notifications  of notification dropdown presentation component
   */
  private _notifications: Notifications[];


  /**
   * Sets input
   */
  @Input() public set notifications(notifications: Notifications[]) {
    if (notifications) {
      this._notifications = notifications;
      setTimeout(() => {
        this.dropdownState = true;
      },         100);
    }
  }

  public get notifications(): Notifications[] {
    return this._notifications;
  }
  constructor(private router: Router) {
    this.detach= new EventEmitter();
   }

  /**
   * Detachs overlay
   */
  public detachOverlay(): void {
    this.detach.emit('');
    this.router.navigate(['/notification']);
  }

}
