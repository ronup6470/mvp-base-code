import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '../../../core/model/gentic.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  preserveWhitespaces:false
})
export class CardComponent{

  @HostBinding('class') classes = 'col-xl-3 col-md-6 mb-4';

  private _card: Card;

  @Input() set card(card: Card) {
    this._card = card;
    if (this._card.gridsize !== null) {
      this.classes = 'col-xl-% col-md-6 mb-4';
      if (this._card.type) {
        this.classes += '';
      }
      this.classes = this.classes.replace('%', this._card.gridsize);
    }
  }

  get card(): Card {
    return this._card;
  }

  constructor() {}


}
