/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for CustomerModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { CustomerListContainerComponent } from './customer-list-container/customer-list.container';
import { CustomerFormContainerComponent } from './customer-form-container/customer-form.container';


const routes: Routes = [
  {
    path: '',
    component: CustomerListContainerComponent,

  }

  ,
  {
    path: 'add',
    component: CustomerFormContainerComponent
  },
  {
    path: 'edit/:id',
    component: CustomerFormContainerComponent
  }
];

/**
 * Ng module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

