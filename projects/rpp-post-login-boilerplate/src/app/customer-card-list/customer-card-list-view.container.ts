/**
 * @author Enter name.
 * @description Customer Card list view container.
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-customer-card-list-view-container',
  templateUrl: './customer-card-list-view.container.html',
  host: {
    class: 'h-100 d-flex position-relative'
  }
})
export class CustomerCardListViewContainerComponent implements OnInit {

  /** Element ref of the div */
  @ViewChild('view') public elementRef: ElementRef;

  constructor() { }

  /** ngOnInit */
  public ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('d-flex');
  }

}
