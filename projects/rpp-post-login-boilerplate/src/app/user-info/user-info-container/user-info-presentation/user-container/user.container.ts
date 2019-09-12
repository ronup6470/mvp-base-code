
/**
 * @name UserInfoContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for UserInfo. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty } from 'common-libs';
import { User } from '../../../user-info.model';
import { UserInfoService } from '../../../user-info.service';
@Component({
  selector: 'app-user-form-container',
  templateUrl: './user.container.html'
})
export class UserFormContainerComponent {
  @HostBinding('class') class = 'flex-grow-1 overflow-auto';

  /** This is a observable which passes the User object to its child component */
  public user$: Observable<User> = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    switchMap(params => this.userInfoService.getUserById(params.get('id'))),
  );

  constructor(
    private toasterService: ToastrService,
    private userInfoService: UserInfoService,
    private route: ActivatedRoute
  ) { }
  /** When presentation layer emits the save event, then this will post data on server */
  public addUser(user: User): void {
    this.userInfoService.addUser(user).subscribe(response => {

      this.toasterService.success("Data saved successfully.");

    }, (err) => {
    });
  }

  /** When presentation layer emits the save event, then this will post data on server */
  public updateUser(user: User): void {
    const id = this.route.snapshot.params.id;
    this.userInfoService.updateUser(id, user).subscribe(response => {

      this.toasterService.success("Data saved successfully.");

    }, (err) => {
    });
  }

}
