import { NgModule } from '@angular/core';
import { SharedModule } from 'common-libs';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [
    SharedModule
  ],
  exports: [CardComponent]
})
export class AppSharedModule { }
