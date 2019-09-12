/** 
 * @author Mayur Patel 
 */

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// ------------------------------ //
import { SubMenu } from '../../../core/models/core.model';
import { ToggleAnimation } from '../../../core/component/sidebar/dashboard.animation';

/**
 * SubmenuComponent
 */
@Component({
  selector: 'lib-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ToggleAnimation.bodyExpansion],
  preserveWhitespaces: false
})
export class SubmenuComponent {
  /**
   * Toggle state of submenu component
   */
  public toggleState: boolean;

  /**
   * Sets input
   */
  @Input() public set subMenuData(menu: SubMenu[]) {
    this._subMenuData = menu;
    this.cdref.detectChanges();
  }

  public get subMenuData(): SubMenu[] {
    return this._subMenuData;
  }

  /**
   * Input  of submenu component
   */
  @Input() public orientation: boolean;
  /**
   * Sub menu data of submenu component
   */
  private _subMenuData: SubMenu[];
  constructor(private cdref: ChangeDetectorRef) {
    this.toggleState = true;
  }

  /**
   * trackBy
   */
  public trackBy(index: number, item: SubMenu): number {
    return index;
  }

}
