/**
 * @author Bhumi Desai.
 * @description This is Collapsible Detail Component.To represent the details of the collapsed row.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../../data-table.model';

@Component({
  selector: 'app-collapsible-detail',
  templateUrl: './collapsible-detail.component.html',
  styleUrls: ['./collapsible-detail.component.scss']
})
export class CollapsibleDetailComponent implements OnInit {
  /** This property gets the data from its parent component using Input decorator to display the detail records. */
  @Input() public customerDetail: Customer;
  constructor() { }

  ngOnInit() {
  }

}
