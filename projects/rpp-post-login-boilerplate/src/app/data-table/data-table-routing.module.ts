/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for DataTableModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { DataTableContainerComponent } from './data-table-container/data-table-container.component';

const routes: Routes = [
  {
    path: '',
    component: DataTableContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableRoutingModule { }
