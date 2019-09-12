/**
 * @author Mayur Patel.
 * @description This is topbar component to manage user profile,Change language and notification.  
 */
import { Component, OnInit, Input, ViewChild, ElementRef, ComponentRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OidcFacade } from 'ng-oidc-client';
import { User } from 'oidc-client';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
// -------------------------------- //
import { ToggleAnimation, DropdownAnimation } from '../../sidebar/dashboard.animation';
import { NotificationDropdownContainerComponent } from './../notification-dropdown-container/notification-dropdown-container.component';
import { Language } from '../../../models/core.model';
import { TopbarService } from '../../../services/topbar/topbar.service';
import { LanguageDataService } from '../../../services/language/language-data.service';
import { TopbarPresenter } from '../topbar-presenter/topbar.presenter';

/**
 * TopbarPresentationComponent
 */
@Component({
  selector: 'lib-topbar-ui',
  templateUrl: './topbar.presentation.html',
  viewProviders: [TopbarPresenter],
  animations: [ToggleAnimation.bodyExpansion, ToggleAnimation.indicatorRotate, DropdownAnimation.fadeInDown],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarPresentationComponent {
  /** Property to store all language data of type Language objects */
  @Input() public languageData: Language[];

  /** Property to store notification url */
  @Input() public notificationUrl: string;
  /** Notification dropdown component of topbar component reference */
  public notificationDropdownComponent: ComponentRef<NotificationDropdownContainerComponent>;
  /** userData */
  @Input() public set userData(user: User) {
    this._userData = user;
    // this.cdref.detectChanges();
    this.userName = this.userData.profile.fullname;

  }
  /** Property to get the position and click of profile menu */
  @ViewChild('buttonRef') public elementRef: ElementRef;
  /** Property use to append class based on dropdown display type. */
  public userProfileState: boolean;
  /** Property use to manage dropdown state */
  public dropdownState: boolean;
  /** Property use to store sidebar collasped state. */
  public isSideBarCollapsed: boolean;
  /** Language group form of topbar component */
  public languageGroupForm: FormGroup;
  /** User name of topbar component */
  public userName: string;
  /** Overlay ref of topbar component to create dropdown for profile options */
  private overlayRef: OverlayRef;
  /** Input  of topbar component */
  private _userData: User;
  /** isScreenForDesktop */
  private isScreenForDesktop: boolean;

  public get userData(): User {
    return this._userData;
  }

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageDataService,
    private topbarSerive: TopbarService,
    public overlay: Overlay,
    private oidcFacade: OidcFacade,
    public breakpointObserver: BreakpointObserver
  ) {
    this.dropdownState = false;
    this.userProfileState = false;
    this.isSideBarCollapsed = false;
    this.topbarSerive.setDashboardCollapsed(this.isSideBarCollapsed);

  }

  /**
   * on init
   */
  public ngOnInit(): void {
    this.languageGroupForm = this.formBuilder.group({
      selectedLanguage: ['en-us']
    });
    this.languageService.languageChange$.subscribe((res: string) => {
      if (!res) {
        res = 'en-us';
      }
      this.languageGroupForm.get('selectedLanguage').setValue(res);
    });
    this.topbarSerive.profileChange.subscribe((profileData: User['profile']) => {
      if (profileData != null) {
        this.userName = profileData.fullName;
      }
    });

    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenForDesktop = false;
          this.isSideBarCollapsed = false;
          this.topbarSerive.setDashboardCollapsed(this.isSideBarCollapsed);
        } else {
          this.isScreenForDesktop = true;
          this.isSideBarCollapsed = false;
          this.topbarSerive.setDashboardCollapsed(this.isSideBarCollapsed);
        }
      });
  }

  /**
   * Users profile btn to open dropdown
   */
  public userProfileBtn(): void {
    this.dropdownState = false;
    this.userProfileState = !this.userProfileState;
  }

  /**
   * Renders notifications on notification click
   */
  public renderNotifications(): void {
    this.configureOverlay();
    this.showNotifcationBox();
    this.userProfileState = false;
    this.dropdownState = !this.dropdownState;
  }



  /**
   * function called when user select language from dropdown
   */
  public languageChanged(): void {
    const selectedLang: string = this.languageGroupForm.get('selectedLanguage').value;
    this.languageService.updateLanguage(selectedLang);
  }

  /**
   * Toggels side bar flag Iscollapsed
   */
  public toggelSideBar(): void {
    if (this.isScreenForDesktop) {
      if (this.isSideBarCollapsed) {
        this.isSideBarCollapsed = false;
      } else {
        this.isSideBarCollapsed = true;
      }
      this.topbarSerive.setDashboardCollapsed(this.isSideBarCollapsed);
    }

  }

  /**
   * called when click on logout option
   */
  public logout(): void {
    this.oidcFacade.signoutRedirect();
  }

  /**
   * Tracks by
   * @param index 
   * @param item 
   * @returns by 
   */
  public trackBy(index: number, item: Language): number {
    return index;
  }
  /**
   * Configures overlay
   */
  private configureOverlay(): void {
    const config: OverlayConfig = new OverlayConfig();
    config.hasBackdrop = true;
    config.backdropClass = '';
    config.positionStrategy = this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([{
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 20
    }]);
    this.overlayRef = this.overlay.create(config);
  }

  /**
   * Shows notifcation box on notification click
   */
  private showNotifcationBox(): void {
    this.notificationDropdownComponent = this.overlayRef.attach(new ComponentPortal(NotificationDropdownContainerComponent));

    this.notificationDropdownComponent.instance.notificationUrl = this.notificationUrl;
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });

    this.notificationDropdownComponent.instance.detach.subscribe(() => {
      this.overlayRef.detach();
    });
  }

}
