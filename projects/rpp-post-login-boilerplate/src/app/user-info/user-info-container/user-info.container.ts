
/**
 * @name UserInfoContainerComponent
 * @author Nitesh Sharma
 * @description This is a container component for UserInfo. This is responsible for all data retrieving and posting to the server by http calls.
 */

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
//--------------------------------------------------------------------//
import { TableProperty} from 'common-libs';
@Component({
  selector: 'app-user-info-container',
  templateUrl: './user-info.container.html'
})
export class UserInfoContainerComponent {
 
  constructor(
  ) {}
  
}
