/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for CustomerModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { CustomerCardListViewContainerComponent } from './customer-card-list-view.container';
import { CustomerViewContainerComponent } from './customer-view-container/customer-view.container';
import { CustomerFormContainerComponent } from './customer-form-container/customer-form.container';

const routes: Routes = [
  {
    path: '',
    component: CustomerCardListViewContainerComponent,
    children: [
      {
        path: 'view/:id',
        component: CustomerViewContainerComponent,
      },

      {
        path: 'add',
        component: CustomerFormContainerComponent,
      },
      {
        path: 'edit/:id',
        component: CustomerFormContainerComponent,
      },
       
     
    ]
 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCardListRoutingModule { }

