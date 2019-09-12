import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { FunctionalLink } from '../../model/gentic.model';

@Injectable()
export class FunctionalDataService {

  private functionalLinks: FunctionalLink[];
  constructor() {
    this.functionalLinks = [];
  }

  public getFunctionalLinks(responseData: any): Observable<FunctionalLink[]> {
    this.functionalLinks = responseData.filter((item: any) => {
      if (item.fields.__typename === 'functionalLinks') {
        return item;
      }
    }).map((filteredItem :any) => {
      return this.functionalAdapter(filteredItem.fields);
    });
    let sortedItem = this.functionalLinks.sort(function (a, b) {
      return a.index - b.index;
    });
    return of(sortedItem);

  }
  private functionalAdapter(functionalInfo: any): FunctionalLink {
    return new FunctionalLink(functionalInfo.index,functionalInfo.label, functionalInfo.link);
  }
}
