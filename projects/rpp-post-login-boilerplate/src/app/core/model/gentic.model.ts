import { Observable } from 'rxjs';
import { SiteBase, Language, Menu, HelpContent } from 'common-libs';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Site extends SiteBase{


    /** Holds cards of current site. */
    public cards: Observable<Card[]>;
    /** Holds functional links of current site. */
    public functionallinks: Observable<FunctionalLink[]>;

    constructor(

        name: string,
        logo: string,
        language: Observable<Language[]>,
        menus: Observable<Menu[]>,
        helpcontents: Observable<HelpContent[]>,
        cards: Observable<Card[]>,
        functionallinks: Observable<FunctionalLink[]>,
    ) {
        super(name, logo, language, menus, helpcontents);
        
        this.functionallinks = functionallinks;
        this.cards = cards;

    }
}

export class Card {

    public index: number;
    /** Holds Type of card */
    public type: boolean;

    /** Holds Icon of card */
    public icon: string;

    /** Holds Title of card */
    public title: string;

    /** Holds Link of card */
    public link: SafeResourceUrl;

    /** Holds Description of card */
    public description: string;

    /** Holds Height of card */
    public height: string;

    /** Holds Width of card */
    public gridsize: string;

    constructor(
        index: number,
        type: boolean,
        icon: string,
        title: string,
        link: SafeResourceUrl,
        description: string,
        height: string,
        gridsize: string,
    ) {
        this.index = index
        this.type = type;
        this.icon = icon;
        this.title = title;
        this.link = link;
        this.description = description;
        this.height = height;
        this.gridsize = gridsize;
    }
}

export class FunctionalLink {

    public index: number;

    public label: string;

    public link: string;

    constructor(
        index: number,
        label: string,
        link: string
    ) {
        this.index = index;
        this.label = label;
        this.link = link;
    }
}
export class GuideLine {

    public title: string;

    public description: string;

    public termText: string;

    public isAllowedTermCondition: boolean;

    constructor(
       
        title: string,
        description: string,
        termText: string,
        isAllowedTermCondition:boolean
    ) {
       
        this.title = title;
        this.description = description;
        this.termText = termText;
        this.isAllowedTermCondition =isAllowedTermCondition;
    }
}
