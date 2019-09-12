import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, FunctionalLink, Site } from '../../core/model/gentic.model';
import { SiteDataService } from 'common-libs';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
})
export class DashboardContainerComponent implements OnInit {

  public cards$: Observable<Card[]>;
  public functionalLinks$: Observable<FunctionalLink[]>;
  constructor(
    private siteDataServie: SiteDataService<Site>
  ) {
  }

  ngOnInit() {
      this.siteDataServie.currentSiteChange.subscribe((res :boolean)=>{
        if(res){
          this.cards$ = this.siteDataServie.currentSite.cards;
          this.functionalLinks$ =this.siteDataServie.currentSite.functionallinks;
        }
      })
  }

}
