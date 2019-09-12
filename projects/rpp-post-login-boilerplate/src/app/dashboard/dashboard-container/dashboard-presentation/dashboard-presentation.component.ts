import { Component, OnInit, Input } from '@angular/core';
import { Card, FunctionalLink } from '../../../core/model/gentic.model';

@Component({
  selector: 'app-dashboard-presentation-ui',
  templateUrl: './dashboard-presentation.component.html',
  styleUrls: ['./dashboard-presentation.component.scss']
})
export class DashboardPresentationComponent implements OnInit {

  @Input() public cardConfig: Card[];
  @Input() public functionalLinkConfig: FunctionalLink[];
  constructor() { }

  ngOnInit() {
  }

}
