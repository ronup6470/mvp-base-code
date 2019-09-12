
/**  
 * @author Nitesh Sharma 
 */
import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<Date> {

  /**
   * Froms model
   * @param value 
   * @returns model 
   */
  public fromModel(value: Date): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split: string[] = value.toString().split(':');
    return {
      hour: parseInt(split[3], 10),
      minute: parseInt(split[4], 10),
      second: 0
    };
  }

  /**
   * To model
   * @param time 
   * @returns date of model 
   */
  public toModel(time: NgbTimeStruct): Date {
    if (!time) {
      return null;
    }
    let currentDate: Date = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), time.hour, time.minute, time.second);
  }
}
