/**
 * @author Ronak Patel.
 * @description
 */

/**
 * User profile
 */
export class UserProfile{
    public fullName: string;
    public username?: string;
    public email: string;
    public phoneNumber: number;
    public language: string;
    constructor(
        fullName?: string,   
        username?: string,   
        email?: string,   
        phoneNumber?: number,
        language?: string
    ) {
        this.fullName= fullName;
        this.username= username;
        this.email= email;
        this.phoneNumber= phoneNumber;
        this.language= language;
    }
}
