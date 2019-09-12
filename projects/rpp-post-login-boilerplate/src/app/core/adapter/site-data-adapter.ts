import { Adapter, LanguageDataService, MenuDataService, HelpContentDataService } from 'common-libs';

import { Injectable } from '@angular/core';
import { FunctionalDataService } from '../services/functional-link/functional-data.service';
import { CardDataService } from '../services/card/card-data.service';
import { Site } from '../model/gentic.model';


@Injectable()
export class SiteDataAdapter implements Adapter<Site> {

    constructor(private languageService :LanguageDataService,
                private functionalService :FunctionalDataService,
                private menuService:MenuDataService,
                private helpContetnService :HelpContentDataService,
                private cardService:CardDataService){

    }
    public siteInfo: any;
    /**
     * Filter site information and provide necessary information required by APP.
     * @param siteInfo : Hold site information give by API.
     */
    public toRequest(siteInfo: any): Site {
        this.siteInfo = { ...siteInfo };
        const siteElements: any = siteInfo.data.node.children.elements;
        const sitebasics: any = siteInfo.data.node.fields;
        // console.log(sitebasics);
        // console.log(siteInfo.data.node);
        
        return new Site(
            sitebasics.name,
            sitebasics.logo,
            this.languageService.getAllLanguages(sitebasics.language),
            this.menuService.getAllMenus(siteElements),
            this.helpContetnService.getAllHelpContents(siteElements),
            this.cardService.getAllCards(siteElements),
            this.functionalService.getFunctionalLinks(siteElements)
        );
    }
  
}
