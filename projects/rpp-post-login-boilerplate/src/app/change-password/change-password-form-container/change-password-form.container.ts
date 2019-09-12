/**
 * @name PasswordContainerComponent
 * @author Bhumi Desai.
 * @description This is a container component for Password. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';
//--------------------------------------------------------------------//
import { AuthService } from 'common-libs';
import { PasswordService } from '../change-password.service';
import { Password } from '../change-password.model';
/**
 * Component
 */
@Component({
  selector: 'app-change-password-form-container',
  templateUrl: './change-password-form.container.html'
})
export class PasswordFormContainerComponent {

  constructor(
    private toasterService: ToastrService,
    private changePasswordService: PasswordService,
    private authService: AuthService,
    private oidcFacade: OidcFacade,
    private translate: TranslateService
  ) {

  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updatePassword(changePassword: Password): void {

    this.authService.getUserData().subscribe((userData: User) => {
      this.changePasswordService.updatePassword(userData.profile.sub, changePassword).subscribe(
        (response: Password) => {
          if (response) {
            this.toasterService.success('Password changed successfully.');
          }
          this.oidcFacade.signoutRedirect();
        },
        (err: HttpErrorResponse) => {

          for (const iterator of err.error.errors) {
            // this.toasterService.error(iterator.Error);
            this.toasterService.error(this.translate.instant(iterator.Error));
          }
        });
    })


  }
}
