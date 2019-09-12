/**
 * @author Ronak Patel.
 * @description
 */
import { InjectionToken } from '@angular/core';

/** create class for Customer modal class */
export class Customer {
    id: number;
    firstName: string;
    company: string;
    group: string;
    createdAt: Date;
    email: string;
    productNo: string;
    image: string;
    isChecked: boolean;
    isAscending: boolean;
    constructor(
        id: number,
        name: string,
        company: string,
        group: string,
        createdAt: Date,
        email: string,
        productNo: string,
        image: string
    ) {
        this.id = id;
        this.firstName = name;
        this.company = company;
        this.group = group;
        this.createdAt = createdAt;
        this.email = email;
        this.productNo = productNo;
        this.image = image;
        this.isChecked = false;
        this.isAscending = false;
    }
}



export class Company {
    id: number;
    name: string;
}

export class Group {
    id: number;
    name: string;
}

export class FilterRecord {
    firstName: string;
    company: string;
    group: string;
    createdAt: Date;
    email: string;
    productNo: string;
    constructor(
        firstName: string,
        company: string,
        group: string,
        createdAt: Date,
        email: string,
        productNo: string,
    ) {
        this.firstName = firstName;
        this.company = company;
        this.group = group;
        this.createdAt = createdAt;
        this.email = email;
        this.productNo = productNo;
    }
}
export class SortRecord {
    name: string;
    company: string;
    group: string;
    createdAt: Date;
    email: string;
    productNumber: string;
}

export const FILTER_DATA: InjectionToken<FilterRecord> = new InjectionToken<FilterRecord>('filterData');
export const SORT_DATA: InjectionToken<SortRecord> = new InjectionToken<SortRecord>('sortData');

