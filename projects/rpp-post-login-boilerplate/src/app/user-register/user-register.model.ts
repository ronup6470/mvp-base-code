/**
 * @author Ronak Patel.
 * @description
 */
import { InjectionToken } from '@angular/core';


/**
 * User register
 */
export class UserRegister {

    public fullName: string;
    public userName: string;
    public email: string;
    public language: string;
    public phoneNumber: string;
    public password: string;
    public userclient: string;
    public claims: Claim[];
    public roles: string[];
    public captchaToken: string;

    constructor(
        fullName?: string,
        userName?: string,
        email?: string,
        language?: string,
        phoneNumber?: string,
        password?: string,
        userclient?: string,
        captchaToken?: string,
        claims?: Claim[],
        roles?: string[]
    ) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.language = language;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.userclient = userclient;
        this.claims = claims;
        this.roles = roles;
        this.captchaToken = captchaToken;

    }
}

export class Claim {

    public claimType: string;
    public claimValue: string;

    constructor(claimType: string,
        claimValue: string) {
        this.claimType = claimType;
        this.claimValue = claimValue;
    }
}

export class LanguageDropdown {
    name: string;
    value: string;
    constructor(name: string,
        value: string) {
        this.name = name;
        this.value = value;
    }
}

