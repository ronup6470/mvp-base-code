/** 
 * @author Ronak Patel
 * This component create for conformation modal. 
 */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ModalSize } from '../../../core/models/core.model';

/**
 * ConfirmationModalComponent
 */
@Component({
  selector: 'lib-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationModalComponent {

  /**
   * Sets template ref
   */
  public set templateRef(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.viewContainerRef.createEmbeddedView(templateRef);
      this.isTemplateVisible = false;
    }
  }
  /** This property is used for get conformation message. */
  public confirmationMessage: string;
  /** This property is used for emit when user click confirm or decline button. */
  public confirmModal: Subject<boolean>;
  /**
   * Positive action of confirmation modal component
   */
  public positiveAction: string;
  /**
   * Negative action of confirmation modal component
   */
  public negativeAction: string;
  /**
   * Modal size of confirmation modal component
   */
  public modalSize: ModalSize;
  /**
   * Determines whether template visible is
   */
  public isTemplateVisible: boolean;

  /**
   * View child of confirmation modal component
   */
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) private viewContainerRef: ViewContainerRef;

  constructor() {
    this.confirmModal = new Subject<boolean>();
    this.confirmationMessage = 'Are you sure you want to delete?';
    this.positiveAction = 'Yes';
    this.negativeAction = 'No';
    this.isTemplateVisible = true;
    this.modalSize = null;

  }

  /** This method is invoke when user click on confirm button */
  public confirm(): void {
    this.confirmModal.next(true);
    this.confirmModal.complete();
  }

  /** This method is invoke when user click on decline button */
  public decline(): void {
    this.confirmModal.next(false);
    this.confirmModal.complete();
  }

}
