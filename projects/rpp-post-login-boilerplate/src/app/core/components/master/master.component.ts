import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import {
  SiteDataService, 
  AuthService, 
  NotificationService, 
  Notifications, 
  TableProperty, 
  UpdatedNotificationService, 
  Language, 
  Menu, 
  HelpContent, 
  LanguageDataService } from 'common-libs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'oidc-client';
import { SchedulerService } from '@one-rpp/backchannel-gateway-client';
import { SiteDataAdapter } from '../../adapter/site-data-adapter';
import { FunctionalLink, Site } from '../../model/gentic.model';
import { ChannelNotificationService } from '../../services/channel-notification/channel-notification.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  /** Languages$  of master component */
  public languages$: Observable<Language[]>;
  /** Menus$  of master component */
  public menus$: Observable<Menu[]>;
  /** Functional links$ of master component */
  public functionalLinks$: Observable<FunctionalLink[]>;
  /** Help contents$ of master component */
  public helpContents$: Observable<HelpContent[]>;
  /** Loged in user data$ of master component */
  public logedInUserData$: Observable<User>;
   /** Notification url of master component */
   public notificationUrl: string = 'notifications';
   public notification: Notifications[];
   private channelList = ['notifications'];
 

  constructor(
    private languageService: LanguageDataService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private siteDataServie: SiteDataService<Site>,
    private notificationService: NotificationService,
    private updatedNotificationService: UpdatedNotificationService,
    private channelNotificationService: ChannelNotificationService,
    private schedulerService: SchedulerService,
    private siteAdapter: SiteDataAdapter
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.appResolve.authPolicies) {
        this.authService.getUserData().subscribe((userData:User)=>{
          this.languageService.updateLanguage(userData.profile.language);
        });
        this.languageService.languageChange$.subscribe((res: string) => {
          this.siteDataServie.getCurrentSite(res).subscribe((resData:any)=>{
           
              // console.log('response:= ',resData);
              this.siteDataServie.currentSite = this.siteAdapter.toRequest(resData);
              // console.log('response after:= ',this.siteDataServie.currentSite);
              this.helpContents$ = this.siteDataServie.currentSite.helpcontents;
              this.menus$ = this.siteDataServie.currentSite.menus;
              this.languages$ = this.siteDataServie.currentSite.language;
              this.siteDataServie.currentSiteChange.next(true);
          });
        });
      }
    });
    this.logedInUserData$ = this.authService.getUserData();
    this.getNotification();
  }

  /**
   * Firstly, Get the notification data from server.
   * Then, set the data in updatedNotification service.
   */
  private getNotification(): void {
    this.notificationService.getNotifications(new TableProperty(), this.notificationUrl)
      .subscribe((res: Notifications[]) => {
        this.notification = res;
        this.notification = this.notification.filter((thing, index) => {
          return index === this.notification.findIndex(obj => {
            return JSON.stringify(obj) === JSON.stringify(thing);
          });
        });
        this.updatedNotificationService.setUpdatedNotification(this.notification);
        this.backchannelIntegration();
      });
    this.logedInUserData$ = this.authService.getUserData();
  }

  /**
   * Start back channel Scheduler Service.
   * And Get updated data.
   * Then, check to scheduler data withn old notification data.
   */
  private backchannelIntegration(): void {
    this.schedulerService.startScheduler(this.channelList)
      .subscribe((res) => {
        if (res.length !== 0) {
          let notificationExist = false;
          for (let i = 0; i < res.notifications.length; i++) {
            const parsedNotification = JSON.parse(res.notifications[i].result);
            for (let j = 0; j < this.notification.length; j++) {
              if (this.notification[i].notificationId === parsedNotification.notificationId) {
                notificationExist = true;
                break;
              }
            }
            if (!notificationExist) {
              this.notification.unshift(parsedNotification);
            }
          }
          this.notification = this.notification.slice(0, 10);
          this.updatedNotificationService.setUpdatedNotification(this.notification);
          this.channelNotificationService.setChannelNotification(res);
        }
      });
  }

}
