import { Component, OnInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'lib-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private oidcFacade: OidcFacade) { }

  /**
   * on init
   */
  public ngOnInit(): void {
    this.oidcFacade.signoutRedirect();
  }

}
