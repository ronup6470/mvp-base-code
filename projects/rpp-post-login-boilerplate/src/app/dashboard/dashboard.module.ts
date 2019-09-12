import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { DashboardPresentationComponent } from './dashboard-container/dashboard-presentation/dashboard-presentation.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppSharedModule } from '../shared/app-shared.module';
import { SharedModule } from 'common-libs';


@NgModule({
  declarations: [
    DashboardContainerComponent,
    DashboardPresentationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppSharedModule,
    TooltipModule,
    SharedModule
  ]
})
export class DashboardModule { }
