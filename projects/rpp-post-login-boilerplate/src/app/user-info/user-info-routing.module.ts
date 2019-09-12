/**
 * @author Ronak Patel.
 * @description This file is used to initialize the routes for UserInfoModule
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------------- //
import { UserInfoContainerComponent } from './user-info-container/user-info.container';
                        import { EmployeeFormContainerComponent } from './user-info-container/user-info-presentation/employee-container/employee.container';
                        import { UserFormContainerComponent } from './user-info-container/user-info-presentation/user-container/user.container';
                        import { CustomerListContainerComponent } from './user-info-container/user-info-presentation/customer-container/customer.container';

const routes: Routes = [
  {
    path: '',
    component: UserInfoContainerComponent,
        children: [
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full'
      },
    {
        path: 'employee',
        component: EmployeeFormContainerComponent,
      },
    {
        path: 'user',
        component: UserFormContainerComponent,
      },
    {
        path: 'customer',
        component: CustomerListContainerComponent,
      },
    
      
      
    ]
 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }

