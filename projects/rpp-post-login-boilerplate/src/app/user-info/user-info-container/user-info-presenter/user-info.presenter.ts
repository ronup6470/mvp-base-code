

/**
 * @name 
 * @author Ronak Patel.
 * @description 
 */

import { Injectable } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
//--------------------------------------------//

@Injectable()
export class UserInfoPresenter {

  public save$: Observable<any>;
  public tabRoute: Map<number, string>;

  private save: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.save$ = this.save.asObservable();
    this.tabRoute = new Map([
      [0, 'employee'],
      [1, 'user'],
      [2, 'customer'],
    ]);
    this.router.navigate([this.tabRoute.get(0)], { relativeTo: this.activateRoute });
  }

  /** 
   * @description for dyanamically change the active tab
   * @param tabId : This is the tab id which we want to active
   * @param tabSet : This is the tabSet component
   */
  public changeTab(tabId: number, tabSet: TabsetComponent): void {
    if (!tabSet.tabs[tabId].disabled) {
      tabSet.tabs[tabId].active = true;
      this.save.next({ name: 'Tab' + tabId })
    } else {
      // show message if tab is disabled
      alert('tab is disabled');
    }
    this.router.navigate([this.tabRoute.get(tabId)], { relativeTo: this.activateRoute });
  }

  /** on selection of tab */
  public onSelect(data: TabDirective, tabId: number): void {
    this.router.navigate([this.tabRoute.get(tabId)], { relativeTo: this.activateRoute });
    // console.log(data);
  }
}
