/**
 * @author mayur patel.
 */

import { Injectable, Inject } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Apollo } from 'apollo-angular';

/**
 * SiteDataService
 */
@Injectable()
export class SiteDataService<T> {

  /**
   * Current site of site data service
   */
  public currentSite: T;
  /** myMap */
  public myMap: Map<string, string>;
  /**
   * Current site change of site data service
   */
  public currentSiteChange: BehaviorSubject<boolean>;

  constructor(
    private apollo: Apollo,
    @Inject('environment') private environment: any,
  ) {
    this.myMap = new Map();
    this.currentSiteChange = new BehaviorSubject<boolean>(false);
    this.myMap.set('en-us', 'en');
    this.myMap.set('sw', 'sw');
    this.myMap.set('fr', 'fr');
  }
  /**
   * API to get minimal info of all pages for current site.
   */
  public getCurrentSite(currentLanguageCode?: string): Observable<any> {

    return this.apollo.query<any>({
      query: gql`
      query node($siteId: String, $currentLanguageCode: String) {
        node(uuid: $siteId, lang: [$currentLanguageCode]) {
          fields {
            ... on site {
              name
              logo
              language {
                __typename
                ... on language {
                  index
                  name
                  code
                }
              }
            }
          }
          children {
            elements {
              fields {
                __typename
                ... on card {
                  index
                  icon
                  title
                  link
                  description
                  height
                  type
                  width
                }
                ... on menu {
                  index
                  name
                  link
                  icon
                  permission
                  guidelineTag
                  submenu {
                    __typename
                    ... on submenu {
                      index
                      name
                      link
                      icon
                    }
                  }
                }
                ... on functionalLinks {
                  index
                  label
                  link
                }
                ... on helpContent {
                  index
                  question
                  answer
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        siteId: this.environment.siteId,
        currentLanguageCode: this.myMap.get(currentLanguageCode) || this.myMap.get(this.environment.defaultLanguageCode)
      },
    });
  }
}
