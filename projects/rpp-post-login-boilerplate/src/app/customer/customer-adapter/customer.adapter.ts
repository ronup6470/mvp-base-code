

/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';

import { Customer, CustomerFilterRecord, } from '../customer.model'; 


/**
 * CustomerAdapter
 */
@Injectable()
export class CustomerAdapter implements Adapter<Customer> {

    /** This method is used to transform response object into T object. */
    public toResponse(item: Customer): Customer{
        const customer: Customer= new Customer(
                item.id,            
                item.firstName,            
                item.company,            
                item.group,            
                new Date(item.createdAt),
                item.email,            
                item.productNo,            
                item.image,            
        );
        return customer;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(item: Customer): Customer{
        const customer: Customer= new Customer(
                item.id,
                item.firstName,
                item.company,
                item.group,
                item.createdAt,
                item.email,
                item.productNo,
                item.image,
        );
        return customer;
    }
}

/**
 * CustomerFilterAdapter
 */
@Injectable()
export class CustomerFilterAdapter implements Adapter<CustomerFilterRecord> {

    /** This method is used to transform response object into T object. */
    public toResponse(item: CustomerFilterRecord): CustomerFilterRecord {
        const customerFilter: CustomerFilterRecord = new CustomerFilterRecord(
            item.firstName,
            item.company,
            item.group,
            item.email,
        );
        return customerFilter;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(item: CustomerFilterRecord): CustomerFilterRecord {
        const customerFilter: CustomerFilterRecord = new CustomerFilterRecord(
            item.firstName,
            item.company,
            item.group,
            item.email,
        );
        return customerFilter;
    }
}
