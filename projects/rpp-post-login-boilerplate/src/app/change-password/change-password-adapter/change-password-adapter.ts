

/**
 * @author Bhumi Desai.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';
import { Password } from '../change-password.model';


/**
 * Injectable
 */
@Injectable()
export class PasswordAdapter implements Adapter<Password> {

    /** This method is used to transform response object into T object. */
    public toResponse(items: Password): Password {
        const changePassword: Password = new Password(
            items.oldPassword,
            items.newPassword,
        );
        return changePassword;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(items: any): Password {
        const changePassword: Password = new Password(
            items.currentPassword,
            items.newPassword
        );
        return changePassword;
    }
}




