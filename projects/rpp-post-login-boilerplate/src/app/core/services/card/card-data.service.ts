import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Card } from '../../model/gentic.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Injectable()
export class CardDataService {

  private cards: Card[];
  constructor(private sanitizer :DomSanitizer) {
    this.cards = [];
  }

  public getAllCards(responseData: any): Observable<Card[]> {
    this.cards = responseData.filter((item: any) => {
      if (item.fields.__typename === 'card') {
        return item;
      }
    }).map((filteredItem: any) => {
      return this.cardAdapter(filteredItem.fields);
    });
    let sortedItem = this.cards.sort(function (a, b) {
      return a.index - b.index;
    });
    return of(sortedItem);

  }
  private cardAdapter(cardInfo: any): Card {
    let isDynamicCard = false;
    if (cardInfo.type === 'dynamic') {
      isDynamicCard = true;
    }
    let safeUrl :SafeResourceUrl= this.sanitizer.bypassSecurityTrustResourceUrl(cardInfo.link);
    return new Card(cardInfo.index,
                    isDynamicCard,
                    cardInfo.icon,
                    cardInfo.title,
                    safeUrl,
                    cardInfo.description,
                    cardInfo.height,
                    cardInfo.width);
  }
}
