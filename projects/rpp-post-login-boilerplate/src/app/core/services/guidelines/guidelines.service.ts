import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { Observable, BehaviorSubject } from 'rxjs';
import { GuideLine } from '../../model/gentic.model';
import { TagFamilyService } from '../tag-family/tag-family.service';
import { MenuDataService } from 'common-libs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GuidelinesService {

  public currentGuideLineChange :BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);

  public currentGuideLine :GuideLine;
  public myMap = new Map();
  constructor(private apollo: Apollo,
    private tagService: TagFamilyService,
    private menuDataService:MenuDataService) {
 
    this.myMap.set('en-us', 'en');
    this.myMap.set('en', 'en');
    this.myMap.set('sw', 'sw');
    this.myMap.set('fr', 'fr');
  }

  public getGuidelinesFromSite(currentLanguageCode?: string): Observable<any> {
    let tagId = this.tagService.getTagIdByName(this.menuDataService.currentGuidelineTag);
    return this.apollo.query<any>({
      query: gql`
      query tag($tagId: String,$lang:String) {
        tag(uuid: $tagId){
          nodes(lang: [$lang]){
            elements {
             
              fields {
                ... on guidelines {
                  title
                  termText
                  description
                  isAllowedTermCondition
                }
              }
            }
          }
        }

      }
      `,
      variables: {
        tagId: tagId,
        lang: this.myMap.get(currentLanguageCode) || this.myMap.get(environment.defaultLanguageCode)
      },
    });
    
  }

 

}
