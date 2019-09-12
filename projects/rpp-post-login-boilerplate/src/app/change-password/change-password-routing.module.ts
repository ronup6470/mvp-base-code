/**
 * @author Bhumi Desai.
 * @description This file is used to initialize the routes for PasswordModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { PasswordFormContainerComponent } from './change-password-form-container/change-password-form.container';
const routes: Routes = [
  {
    path: '',
    component: PasswordFormContainerComponent,

  }
];

/**
 * Ng module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }

