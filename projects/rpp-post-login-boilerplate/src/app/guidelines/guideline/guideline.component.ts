import { Component, OnInit, HostBinding } from '@angular/core';
import { GuidelinesService } from '../../core/services/guidelines/guidelines.service';
import { GuideLine, Site } from '../../core/model/gentic.model';
import { GuideLineDataAdapter } from '../../core/adapter/guidelines-adapter';
import { LanguageDataService, SiteDataService } from 'common-libs';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-guideline',
  templateUrl: './guideline.component.html',
  styleUrls: ['./guideline.component.scss']
})
export class GuidelineComponent implements OnInit {

  @HostBinding('class') class = 'flex-grow-1';

  public guideline: Observable<GuideLine>;

  constructor(private guidelineService: GuidelinesService,
              private guideAdapter: GuideLineDataAdapter,
              private languageService: LanguageDataService,
              private siteDataServie:SiteDataService<Site>) { }

  ngOnInit() {
    this.siteDataServie.currentSiteChange.subscribe((res :boolean)=>{
      
      if(res){
        // this.languageService.languageChange$.subscribe((res: string) => {
          this.guidelineService.getGuidelinesFromSite(this.languageService.defaultLanguage)
            .subscribe((res) => {
              this.guideline = of(this.guideAdapter.toRequest(res));
              // console.log(this.guideline);
            });
        // });
    }
    });
    
  }

}
