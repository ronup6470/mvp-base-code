/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for EmployeeModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { EmployeeFormContainerComponent } from './employee-form-container/employee-form.container';

const routes: Routes = [
  {
    path: '',
    component: EmployeeFormContainerComponent,
 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

