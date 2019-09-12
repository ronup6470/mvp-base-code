/**
 * @author Bhumi Desai
 * @description This service is used for sorting of customer sort component.
 */

import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// ----------------------------------------------------- //
import { SortType } from 'common-libs';

/**
 * Injectable
 */
@Injectable()
export class CustomerSortPresenter {
  
  constructor(private fb: FormBuilder) { }

  /**
   * This will create all the controls for the form group
   * @param userFormGroup is the form group
   * @param fb is the form builder which will create the controls
   * @returns It will return the userFromGroup with all the controls
   */
  public buildForm(): FormGroup {
    return this.fb.group({
      sortBy: [SortType.Ascending,Validators.required],
      sortColumn: [null,Validators.required]
    });
  }  
}