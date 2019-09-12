/**
 * @author Bhumi Desai.
 * @description This is mobile table presentation component.To represent data in mobile view.
 */
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { DataTablePresentationBase } from '../data-table-presentation-class/data-table-presentation-base';
import { DataTablePresenterService } from '../../data-table-presenter/data-table-presenter.service';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Customer } from '../../../data-table.model';

@Component({
  selector: 'app-data-table-mobile-presentation',
  templateUrl: './data-table-mobile-presentation.component.html',
  styleUrls: ['./data-table-mobile-presentation.component.scss'],
  // viewProviders: [DataTableMobilePresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableMobilePresentationComponent extends DataTablePresentationBase implements OnInit {

  /** This property is used for customer details */
  public customerDetail: Customer;

  @ViewChildren('detail', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;
  @ViewChild('templateRef', { read: TemplateRef }) templatePortalContent: TemplateRef<any>;
 
  /** This property is used for filter apply or not. */
  public isSortApply: boolean;
  @ViewChildren(CdkPortalOutlet) private portalOutlets: QueryList<CdkPortalOutlet>;
  /** This property is used to destroy the subscription */
  private destroy: Subject<boolean>;
  constructor(
    public dataTablePresenter: DataTablePresenterService,
    public changeDetection: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef) {
      super(dataTablePresenter, changeDetection);
      this.destroy = new Subject();
  }

  public ngOnInit(): void {
    this.dataTablePresenter.isCheckAll$.pipe(takeUntil(this.destroy)).subscribe((isCheckAll: boolean) => { this.isCheckAll = isCheckAll })
  }
  /** This method is for the detail data */
  public detailAction(customer: Customer, customerIndex: number): void {
    this.customerDetail = customer;
    let portalOutlet: CdkPortalOutlet = this.portalOutlets.find((item: CdkPortalOutlet, index: number) => index === customerIndex);
    if (portalOutlet) {
      if (!portalOutlet.portal) {
        let portal: TemplatePortal = new TemplatePortal(this.templatePortalContent, this.viewContainerRef, { $implicit: customer });
        portalOutlet.attachTemplatePortal(portal);
      }
      else {
        portalOutlet.detach();
      }
    }
  }
}
