/**
 * @name 
 * @author Ronak Patel.
 * @description 
 */

import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
//------------------------------------------------------------//
import { UserInfoPresenter } from '../user-info-presenter/user-info.presenter';

@Component({
  selector: 'app-user-info-ui',
  templateUrl: './user-info.presentation.html',
  styleUrls: ['./user-info.presentation.scss'],
  viewProviders: [UserInfoPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoPresentationComponent implements OnInit, OnDestroy {

  /** This is a tab component which stores the list of tab */
  @ViewChild('tabSet') public tabSet: TabsetComponent;
  @Output() public save: EventEmitter<any>;

  public tabIndex: number;
  private destroy: Subject<void>;

  constructor(
    private tabPresenter: UserInfoPresenter,
  ) {
    this.save = new EventEmitter();
    this.destroy = new Subject();
  }

  public ngOnInit(): void {
    // This will subscribe the save event and emit to container component
    this.tabPresenter.save$.pipe(takeUntil(this.destroy)).subscribe((tabData) => this.save.emit(tabData));
    this.tabIndex = 0;
  }


  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /** 
   *  for dynamically change the active tab
   * @param tabId : This is the tab id which we want to active
   */
  public onBack(): void {
    this.tabIndex -= 1;
    this.tabPresenter.changeTab(this.tabIndex, this.tabSet);
  }
  /** 
   *  for dynamically change the active tab
   * @param tabId : This is the tab id which we want to active
   */
  public onNext(): void {
    this.tabIndex += 1;
    this.tabPresenter.changeTab(this.tabIndex, this.tabSet);
  }

  /**
   *   on selection of tab
   * @param data : This is the selected tab which will be emitted on selection
   */
  public onSelect(data: TabDirective, tabId: number): void {
    this.tabIndex = tabId;
    this.tabPresenter.onSelect(data, tabId);
  }
}
