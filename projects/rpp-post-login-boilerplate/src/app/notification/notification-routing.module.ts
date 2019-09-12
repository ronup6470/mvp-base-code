import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationContainerComponent } from './notification-container/notification-container.component';

const routes: Routes = [{ path: '', component: NotificationContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
