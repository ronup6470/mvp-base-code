/**
 * @author Bhumi Desai.
 * @description This is mobile table presentation component.To represent data in mobile view.
 */
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
//-----------------------------------------------------------------------------------------------------------------------------------------------//
import { CustomerListPresentationBase } from '../../customer-list-presentation-base/customer-list.presentation.base';
import { CustomerListPresenter } from '../../customer-list-presenter/customer-list.presenter';
import { Customer } from '../../../../../user-info.model';

@Component({
  selector: 'app-customer-list-mobile-presentation',
  templateUrl: './customer-list-mobile.presentation.html',
  styleUrls: ['./customer-list-mobile.presentation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListMobilePresentationComponent extends CustomerListPresentationBase implements OnInit {

  @ViewChildren('detail', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;

  @ViewChild('templateRef', { read: TemplateRef }) templatePortalContent: TemplateRef<any>;

  @ViewChildren(CdkPortalOutlet) private portalOutlets: QueryList<CdkPortalOutlet>;


  private destroy: Subject<boolean>;
  /** This property is used for filter apply or not. */
  public isSortApply: boolean;

  constructor(public customerPresenter: CustomerListPresenter,
    public changeDetection: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef) {
    super(customerPresenter, changeDetection);
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.customerPresenter.isCheckAll$.pipe(takeUntil(this.destroy)).subscribe((isCheckAll: boolean) => { this.isCheckAll = isCheckAll })
  }

  public detailAction(customer: Customer, customerIndex: number) {
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

