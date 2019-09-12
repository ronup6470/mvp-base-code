/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for UserRegisterModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { UserRegisterFormContainerComponent } from './user-register-form-container/user-register-form-container.component';
const routes: Routes = [
  {
    path: '',
    component: UserRegisterFormContainerComponent,
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRegisterRoutingModule { }

