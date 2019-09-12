
/**
 * @author Ronak Patel.
 * @description
 */
import { InjectionToken } from '@angular/core'; 

/** model class for Employee */
export class Employee{
    /** id  of Employee */
    public id: number;
    /** name  of Employee */
    public name: string;
    /** company  of Employee */
    public company: Company[];
    /** isAdmin  of Employee */
    public isAdmin: string;
    /** gender  of Employee */
    public gender: string;
    /** city  of Employee */
    public city: string;
    /** multiCity  of Employee */
    public multiCity: string;
    /** createdAt  of Employee */
    public createdAt: Date;
    /** birthDate  of Employee */
    public birthDate: Date;
    /** orderTime  of Employee */
    public orderTime: string;
    /** productNo  of Employee */
    public productNo: string;
    /** image  of Employee */
    public image: string;
    /** email  of Employee */
    public email: string;
    /** description  of Employee */
    public description: string;

    constructor(
        id?: number,   
        name?: string,   
        company?: Company[],   
        isAdmin?: string,   
        gender?: string,   
        city?: string,   
        multiCity?: string,   
        createdAt?: Date,   
        birthDate?: Date,   
        orderTime?: string,   
        productNo?: string,   
        image?: string,   
        email?: string,   
        description?: string,   
    ) {
           this.id= id;
           this.name= name;
           this.company= company;
           this.isAdmin= isAdmin;
           this.gender= gender;
           this.city= city;
           this.multiCity= multiCity;
           this.createdAt= createdAt;
           this.birthDate= birthDate;
           this.orderTime= orderTime;
           this.productNo= productNo;
           this.image= image;
           this.email= email;
           this.description= description;
    }
}
/** model class for Company */
export class Company{
    /** id  of Company */
    public id: number;
    /** employeeId  of Company */
    public employeeId: number;
    /** name  of Company */
    public name: string;

    constructor(
        id?: number,   
        employeeId?: number,   
        name?: string,   
    ) {
           this.id= id;
           this.employeeId= employeeId;
           this.name= name;
    }
}
/** model class for Customer */
export class Customer{
    /** id  of Customer */
    public id: number;
    /** firstName  of Customer */
    public firstName: string;
    /** company  of Customer */
    public company: string;
    /** group  of Customer */
    public group: string;
    /** createdAt  of Customer */
    public createdAt: Date;
    /** email  of Customer */
    public email: string;
    /** productNo  of Customer */
    public productNo: string;
    /** image  of Customer */
    public image: string;
        isChecked: boolean;

    constructor(
        id?: number,   
        firstName?: string,   
        company?: string,   
        group?: string,   
        createdAt?: Date,   
        email?: string,   
        productNo?: string,   
        image?: string,   
    ) {
           this.id= id;
           this.firstName= firstName;
           this.company= company;
           this.group= group;
           this.createdAt= createdAt;
           this.email= email;
           this.productNo= productNo;
           this.image= image;
        this.isChecked = false;
    }
}
            
export class CustomerFilterRecord {
    firstName: string;
    company: string;
    group: string;
    email: string;
    productNo: string;
    image: string;

    constructor(
        firstName?: string,
        company?: string,
        group?: string,
        email?: string,
        productNo?: string,
        image?: string,
    ) {
        this.firstName= firstName;
        this.company= company;
        this.group= group;
        this.email= email;
        this.productNo= productNo;
        this.image= image;
    }
}

export const CUSTOMER_FILTER: InjectionToken<CustomerFilterRecord> = new InjectionToken<CustomerFilterRecord>('customerFilter');

export class CustomerSortRecord {
        company:string;
        group:string;
        createdAt:Date;
}
    
export const CUSTOMER_SORTDATA: InjectionToken<CustomerSortRecord> = new InjectionToken<CustomerSortRecord>('customerSort');

