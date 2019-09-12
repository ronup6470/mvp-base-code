/**
 * @author Ronak Patel.
 * @description This class is used for data filter presenter component.
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class DataFilterPresenterService {

  constructor(private fb: FormBuilder) { }

  /**
   * This will create all the controls for the form group
   * @param userFormGroup is the form group
   * @param fb is the form builder which will create the controls
   * @returns It will return the userFromGroup with all the controls
   */
  public buildForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(30)]],
      company: [null],
      group: [null],
      createdAt: [''],
      email: [''],
      productNo: ['', [Validators.minLength(2), Validators.maxLength(30)]]
    });
  }
  
}
