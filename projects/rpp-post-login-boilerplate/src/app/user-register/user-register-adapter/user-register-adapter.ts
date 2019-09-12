/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';

 import {UserRegister,} from '../user-register.model'; 
import { environment } from '../../../environments/environment';

@Injectable()
export class UserRegisterAdapter implements Adapter<UserRegister> {

    /** This method is used to transform response object into T object. */
    public toResponse(items: UserRegister): UserRegister{
        const userRegister: UserRegister= new UserRegister(
                items.fullName,
                items.userName,
                items.email,
                items.language,
                items.phoneNumber,
                items.password,
                items.captchaToken,
            
        );
        return userRegister;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(items: UserRegister): UserRegister{
        const userRegister: UserRegister= new UserRegister(
            items.fullName,
            items.userName,
            items.email,
            items.language,
            items.phoneNumber,
            items.password,
            environment.client_id,
            items.captchaToken
            
        );
        return userRegister;
    }
}


