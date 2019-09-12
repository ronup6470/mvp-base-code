/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';
import { Customer, FilterRecord } from '../data-table.model';

@Injectable()
export class CustomerAdapter implements Adapter<Customer> {
    /** This method is used when data transform. */
    public toResponse(items: Customer): Customer {
        const customer: Customer = new Customer(
            items.id,
            items.firstName,
            items.company,
            items.group,
            new Date(items.createdAt),
            items.email,
            items.productNo,
            items.image
        );
        return customer;
    }

    /** This method is used when data transform. */
    public toRequest(items: Customer): Customer {
        const customer: Customer = new Customer(
            items.id,
            items.firstName,
            items.company,
            items.group,
            new Date(items.createdAt),
            items.email,
            items.productNo,
            items.image
        );
        return customer;
    }
}
export class FilterAdapter implements Adapter<FilterRecord> {
    /** This method is used when data transform. */
    public toResponse(items: FilterRecord): FilterRecord {
        const filterRecord: FilterRecord = new FilterRecord(
            items.firstName,
            items.company,
            items.group,
            items.createdAt ? new Date(items.createdAt): undefined,
            items.email,
            items.productNo
        );
        return filterRecord;
    }

    /** This method is used when data transform. */
    public toRequest(items: FilterRecord): FilterRecord {
        const filterRecord: FilterRecord = new FilterRecord(
            items.firstName,
            items.company,
            items.group,
            items.createdAt ? new Date(items.createdAt): undefined,
            items.email,
            items.productNo
        );
        return filterRecord;
    }
}