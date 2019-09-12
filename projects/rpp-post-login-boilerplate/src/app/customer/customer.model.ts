
/**
 * @author Ronak Patel.
 * @description
 */
import { InjectionToken } from '@angular/core';
import { SortingOrder } from 'common-libs';

/** model class for Customer */
export class Customer {
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
        this.id = id;
        this.firstName = firstName;
        this.company = company;
        this.group = group;
        this.createdAt = createdAt;
        this.email = email;
        this.productNo = productNo;
        this.image = image;
        this.isChecked = false;
    }
}

export class CustomerFilterRecord {
    firstName: string;
    company: string;
    group: string;
    email: string;

    constructor(
        firstName?: string,
        company?: string,
        group?: string,
        email?: string,
    ) {
        this.firstName = firstName;
        this.company = company;
        this.group = group;
        this.email = email;
    }
}

export const CUSTOMER_FILTER: InjectionToken<CustomerFilterRecord> = new InjectionToken<CustomerFilterRecord>('customerFilter');

export class CustomerSortRecord {
    sortBy: SortingOrder;
    sortColumn: string;
}

export const CUSTOMER_SORT: InjectionToken<CustomerSortRecord> = new InjectionToken<CustomerSortRecord>('customerSort');

