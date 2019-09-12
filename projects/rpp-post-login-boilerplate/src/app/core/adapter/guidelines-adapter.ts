import { Adapter} from 'common-libs';

import { Injectable } from '@angular/core';
import {  GuideLine } from '../model/gentic.model';

@Injectable()
export class GuideLineDataAdapter implements Adapter<GuideLine> {

    constructor(){

    }
    public guidelineInfo: any;
   
    public toRequest(guidelineInfo: any): GuideLine {
        this.guidelineInfo = { ...guidelineInfo };
        
        const guidelineElements: any = guidelineInfo.data.tag.nodes.elements[0];
        // console.log(guidelineElements);
        
        return new GuideLine(
            guidelineElements.fields.title,
            guidelineElements.fields.description,
            guidelineElements.fields.termText,
            guidelineElements.fields.isAllowedTermCondition
            
        );
    }
  
}
