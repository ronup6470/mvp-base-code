/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for UserModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { UserContainerComponent } from './user-container/user.container';

const routes: Routes = [
  {
    path: '',
    component: UserContainerComponent,
 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

