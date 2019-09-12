/**
 * @name UserProfileContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for UserProfile. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component} from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { Language, AuthService, SiteDataService, LanguageDataService, TopbarService } from 'common-libs';

import { UserProfileService } from '../user-profile.service';
import { UserProfile} from '../user-profile.model';
import { of } from 'rxjs';
import { User } from 'oidc-client';
import { Site } from '../../core/model/gentic.model';

@Component({
  selector: 'app-user-profile-form-container',
  templateUrl: './user-profile-form-container.component.html'
})
export class UserProfileFormContainerComponent {
   /** This is a observable which passes the UserProfile object to its child component */
  // public userProfile$: Observable<UserProfile> = this.route.paramMap.pipe(
  //   filter(params => params.has('id')),
  //   switchMap(params => this.userProfileService.getUserProfileById(params.get('id'))),
  // );
  // public currentLanguage: string;
  public userProfile$: Observable<any> = this.authService.getUserData();
  public userLanguages$ :Observable<Language[]>;
  public userCountries$ :Observable<string[]>;
  
  constructor(
          private toasterService: ToastrService,
          private userProfileService: UserProfileService,
          private authService: AuthService,
          private router : Router,
          private topbarService:TopbarService,
          private languageService :LanguageDataService,
          private siteDataService:SiteDataService<Site>
  ) {
    this.siteDataService.currentSiteChange.subscribe((res :boolean)=>{
      if(res){
        this.userLanguages$ = this.siteDataService.currentSite.language;
      }
    })
   
    this.userCountries$ = of(['India','France','USA']);
  }
  
  /** When presentation layer emits the save event, then this will post data on server */
  public addUserProfile(userProfile: UserProfile): void {
    this.userProfileService.addUserProfile(userProfile).subscribe(response => {
      if (response) {
        this.toasterService.success('Data saved successfully.');
      }
    },(err) => {
    });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateUserProfile(userProfile: UserProfile): void {
    // const id = this.route.snapshot.params.id;
    this.authService.getUserData().subscribe((userData :User)=>{
      this.userProfileService.updateUserProfile(userData.profile.sub,userProfile).subscribe(response => {
        this.toasterService.success('Data updated successfully.');
        this.router.navigate(['/dashboard']);
        this.languageService.updateLanguage(userProfile.language);
        this.topbarService.setProfileChange(userProfile);
        
      },(err) => {
      });
    })
    
  }
  }
