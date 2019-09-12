
/**
 * @author Ronak Patel.
 * @description
 */
import { InjectionToken } from '@angular/core'; 

/** model class for CustomerList */
export class CustomerList {
    /** id of CustomerList */
    public id: number;
    /** firstName of CustomerList */
    public firstName: string;
    /** company of CustomerList */
    public company: string;
    constructor(
        id?: number,   
        firstName?: string,   
        company?: string,   
    ){
        this.id = id;
        this.firstName = firstName;
        this.company = company;
    }
}
/** model class for Customer */
export class Customer extends CustomerList{
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

    constructor(
        group?: string,   
        createdAt?: Date,   
        email?: string,   
        productNo?: string,   
        image?: string,   
        id?: number,   
        firstName?: string,   
        company?: string,   
    ) {
        super(
            id,
            firstName,
            company,
        )
           this.group= group;
           this.createdAt= createdAt;
           this.email= email;
           this.productNo= productNo;
           this.image= image;
    }
}

