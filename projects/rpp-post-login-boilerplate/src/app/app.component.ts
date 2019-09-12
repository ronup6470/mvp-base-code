import { Component, AfterViewInit } from '@angular/core';
import { LoaderService, AuthService } from 'common-libs';
import { OidcFacade } from 'ng-oidc-client';
import { Observable } from 'apollo-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'ROCDashboard';
  showLoader = false;
  public currentSite : Observable<any>;
  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private oidcFacade: OidcFacade,
  ) {
    this.oidcFacade.getUserManager().getUser().then(user => {
      this.authService.setUserData(user);
    });

    this.oidcFacade.getUserManager().events.addUserLoaded(()=>{
        this.oidcFacade.getUserManager().getUser().then(user => {
          this.authService.setUserData(user);
        });
        
    });
  }

  ngAfterViewInit() {
    
    this.loaderService.status.subscribe((val: boolean) => {
      setTimeout(() => {
        this.showLoader = val;
      }, 100);
    });
  }
}
