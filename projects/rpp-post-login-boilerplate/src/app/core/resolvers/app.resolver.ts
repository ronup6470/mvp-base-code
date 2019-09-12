import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthPolicyService } from 'auth-policy';
import { TagFamilyService } from '../services/tag-family/tag-family.service';


@Injectable()
export class AppResolverService implements Resolve<any> {
  constructor(
    
    private authPolicy: AuthPolicyService,private tagService :TagFamilyService) { }

  resolve(
  ): Observable<any> | Promise<any> | any {


    let authPolicies = this.authPolicy.loadPolicyData();
    let tagFamiltData = this.tagService.getTags('portals');
    return forkJoin([authPolicies,tagFamiltData]).pipe(map(result => {
      return {
        authPolicies: result[0],
        tagFamiltData: result[1]
      };
    }));
  }

}
