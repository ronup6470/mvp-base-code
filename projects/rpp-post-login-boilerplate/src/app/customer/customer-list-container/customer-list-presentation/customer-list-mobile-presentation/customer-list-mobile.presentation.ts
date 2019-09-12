/**
 * @author Bhumi Desai.
 * @description This is mobile table presentation component.To represent data in mobile view.
 */
import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList, ViewChild,
  ViewContainerRef, TemplateRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
//-----------------------------------------------------------------------------------------------------------------------------------------------//
import { CustomerListPresentationBase } from '../../customer-list-presentation-base/customer-list.presentation.base';
import { CustomerListPresenter } from '../../customer-list-presenter/customer-list.presenter';
import { Customer } from '../../../customer.model';

/**
 * Component
 */
@Component({
  selector: 'app-customer-list-mobile-presentation',
  templateUrl: './customer-list-mobile.presentation.html',
  styleUrls: ['./customer-list-mobile.presentation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class CustomerListMobilePresentationComponent extends CustomerListPresentationBase implements OnInit {

  /** This property is used for filter apply or not. */
  public isSortApply: boolean;

  /** View child of customer list mobile presentation component */
  @ViewChild('templateRef', { read: TemplateRef }) public templatePortalContent: TemplateRef<{ $implicit: Customer }>;

  /** View children of customer list mobile presentation component */
  @ViewChildren(CdkPortalOutlet) private portalOutlets: QueryList<CdkPortalOutlet>;

  /** Destroy  of customer list mobile presentation component */
  private destroy: Subject<boolean>;

  constructor(
    public customerPresenter: CustomerListPresenter,
    public changeDetection: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef
  ) {
    super(customerPresenter, changeDetection);
    this.destroy = new Subject();
  }

  public ngOnInit(): void {
    this.customerPresenter.isCheckAll$.pipe(takeUntil(this.destroy)).subscribe((isCheckAll: boolean) => { this.isCheckAll = isCheckAll });
  }

  /**
   * Details action
   * @param customer 
   * @param customerIndex 
   */
  public detailAction(customer: Customer, customerIndex: number): void {
    this.customerPresenter.detailAction(customer, customerIndex, this.portalOutlets, this.templatePortalContent, this.viewContainerRef);
  }
}

