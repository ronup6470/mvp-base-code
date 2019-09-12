/**
 * @name UserRegisterContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for UserRegister. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { UserRegisterService } from '../user-register.service';
import { UserRegister, LanguageDropdown } from '../user-register.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-register-form-container',
  templateUrl: './user-register-form-container.component.html'
})
export class UserRegisterFormContainerComponent {

  public userLanguages$: Observable<LanguageDropdown[]>;
  // public userLanguages$ = this.languageService.getAllLanguage();

  constructor(
    private toasterService: ToastrService,
    private userRegisterService: UserRegisterService,
    private router: Router,
    private translate: TranslateService
  ) {
    //get the language from query params.
    // use the code to fetch the language
    this.userLanguages$ = of([new LanguageDropdown('English', 'en-us'),
    new LanguageDropdown('French', 'fr'),
    new LanguageDropdown('Swahili', 'sw')]);
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public addUserRegister(userRegister: UserRegister): void {
    this.userRegisterService.addUserRegister(userRegister).subscribe(response => {

      if (response) {
        this.toasterService.success('Data saved successfully.');
        this.router.navigate(['/confirm-email']);
      }
    }, (err: HttpErrorResponse) => {
      for (const iterator of err.error.errors) {
        // this.toasterService.error(iterator.Error);
        this.toasterService.error(this.translate.instant(iterator.Error));
      }
    });
  }

}
