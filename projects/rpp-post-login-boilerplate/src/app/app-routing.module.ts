import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent, AuthGuard, LogoutComponent } from 'common-libs';
import { MasterComponent } from './core/components/master/master.component';
import { AppResolverService } from './core/resolvers/app.resolver';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '',
    component: MasterComponent,
    resolve: {
      appResolve: AppResolverService
    },
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {
          title: 'Dashboard',
          breadcrumb: 'dashboard',
        },
      },
      {
        path: 'notification',
        loadChildren: './notification/notification.module#NotificationModule',
        data: {
          title: 'Notifications'
        },
      },
      {
        path: 'data-table',
        loadChildren: './data-table/data-table.module#DataTableModule',
        data: {
          breadcrumb: 'dataTableBreadCrumb',
          title: 'dataTableTitle'
        }

      },
      {
        path: 'guidelines',
        loadChildren: './guidelines/guidelines.module#GuidelinesModule',
        data: {
          breadcrumb: 'guidelinesBreadCrumb',
          title: 'Guidelines'
        }
      },
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule',
        data: {
          breadcrumb: 'Customer',
          title: 'customer'
        }
      },
      {
        path: 'customer-card-list',
        loadChildren: './customer-card-list/customer-card-list.module#CustomerCardListModule',

      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#EmployeeModule',
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
        data: {
          breadcrumb: 'User',
          title: 'user'
        }
      },
      {
        path: 'user-info',
        loadChildren: './user-info/user-info.module#UserInfoModule',
        data: {
          breadcrumb: 'User Info',
          title: 'user info'
        }
      },
      {
        path: 'user-profile/:id',
        loadChildren: './user-profile/user-profile.module#UserProfileModule',
        data: {
          title: 'user profile'
        }
      },
      {
        path: 'change-password',
        loadChildren: './change-password/change-password.module#ChangePasswordModule',
        data: {
          title: 'Change Password'
        }
      }
    ]
  },
  {
    path: 'reg',
    loadChildren: './user-register/user-register.module#UserRegisterModule',
  },
  {
    path: 'confirm-email',
    component: ConfirmRegistrationComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
