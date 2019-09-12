

/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';

import { UserProfile, } from '../user-profile.model';




@Injectable()
export class UserProfileAdapter implements Adapter<UserProfile> {

    /** This method is used to transform response object into T object. */
    public toResponse(items: UserProfile): UserProfile {
        const userProfile: UserProfile = new UserProfile(
            items.fullName,
            items.username,
            items.email
        );
        return userProfile;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(items: UserProfile): UserProfile {
        const userProfile: UserProfile = new UserProfile(
            items.fullName,
            items.username,
            items.email

        );
        return userProfile;
    }
}




