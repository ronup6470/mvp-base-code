import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/app-shared.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationContainerComponent } from './notification-container/notification-container.component';
import { NotificationPresentationComponent } from './notification-container/notification-presentation/notification-presentation.component';
import { NotificationPresenterService } from './notification-container/notification-presenter/notification-presenter.service';
import { SharedModule } from 'common-libs';

@NgModule({
  declarations: [NotificationContainerComponent, NotificationPresentationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    AppSharedModule,
    SharedModule
  ],
  providers: [NotificationPresenterService]
})
export class NotificationModule { }
