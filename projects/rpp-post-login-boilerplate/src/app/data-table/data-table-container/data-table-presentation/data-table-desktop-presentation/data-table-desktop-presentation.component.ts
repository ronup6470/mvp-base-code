/**
 * @author Bhumi Desai.
 * @description This is data table desktop presentation component.To represent data in the desktop view.
 */
import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { DataTablePresentationBase } from '../data-table-presentation-class/data-table-presentation-base';
import { DataTablePresenterService } from '../../data-table-presenter/data-table-presenter.service';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { SortingOrderDirective, SortingOrder } from 'common-libs';

@Component({
  selector: 'app-data-table-desktop-presentation',
  templateUrl: './data-table-desktop-presentation.component.html',
  styleUrls: ['./data-table-desktop-presentation.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableDesktopPresentationComponent extends DataTablePresentationBase implements OnInit, OnDestroy {

  /** This property is used to store QueryList of SortingOrderDirective */
  @ViewChildren(SortingOrderDirective) public sortingColumns: QueryList<SortingOrderDirective>;
  /** THis property is used for destroying the subscription */
  private destroy: Subject<boolean>;
  constructor(public dataTablePresenter: DataTablePresenterService, public changeDetection: ChangeDetectorRef){
    super(dataTablePresenter, changeDetection);
    this.destroy = new Subject();
  }
 
  ngOnInit() {
    this.dataTablePresenter.isCheckAll$.pipe(takeUntil(this.destroy)).subscribe((isCheckAll: boolean) => { this.isCheckAll = isCheckAll })
  }

  /**
   * This method is invoked when the user clicks on sorting icons. It sets the sort related criteria and queries the server
   * to get the updated list of customers.
   * @param column The column on which sorting needs to be performed. 
   * @param sortingOrder The sort order by which the column needs to be sorted.
   */
  public onSortOrder(column: string, sortingOrder: SortingOrder): void {
    this.dataTablePresenter.onSortOrder(column, sortingOrder, this.sortingColumns);
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}