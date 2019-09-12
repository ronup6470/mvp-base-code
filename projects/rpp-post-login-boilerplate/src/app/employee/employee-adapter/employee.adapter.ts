

/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';

import { Employee, } from '../employee.model'; 


/**
 * EmployeeAdapter
 */
@Injectable()
export class EmployeeAdapter implements Adapter<Employee> {

    /** This method is used to transform response object into T object. */
    public toResponse(item: Employee): Employee{
        const employee: Employee= new Employee(
                item.id,            
                item.name,            
                item.company,            
                item.isAdmin,            
                item.gender,            
                item.city,            
                item.multiCity,            
                new Date(item.createdAt),
                new Date(item.birthDate),
                item.orderTime,            
                item.productNo,            
                item.image,            
                item.email,            
                item.description,            
        );
        return employee;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(item: Employee): Employee{
        const employee: Employee= new Employee(
                item.id,
                item.name,
                item.company,
                item.isAdmin,
                item.gender,
                item.city,
                item.multiCity,
                item.createdAt,
                item.birthDate,
                item.orderTime,
                item.productNo,
                item.image,
                item.email,
                item.description,
        );
        return employee;
    }
}

