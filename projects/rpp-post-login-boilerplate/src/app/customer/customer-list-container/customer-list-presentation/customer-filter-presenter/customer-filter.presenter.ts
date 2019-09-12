/**
 * @author Ronak Patel.
 * @description This class is used for Customerpresenter component.
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Injectable
 */
@Injectable()
export class CustomerFilterPresenter {

  constructor(private fb: FormBuilder) { }

  /**
   * This will create all the controls for the form group
   * @param customerFormGroup is the form group
   * @param fb is the form builder which will create the controls
   * @returns It will return the customerFromGroup with all the controls
   */
  public buildForm(): FormGroup {
    return this.fb.group({
      firstName: [ '' ,[Validators.maxLength(15) ]],
      company: [ '' ,[]],
      group: [ '' ,[]],
      email: [ '' ,[Validators.pattern('(@)(.+)$') ]]    })
  }
}

