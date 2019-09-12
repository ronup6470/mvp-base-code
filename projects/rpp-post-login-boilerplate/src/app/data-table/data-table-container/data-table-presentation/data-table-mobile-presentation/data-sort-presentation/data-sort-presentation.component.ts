/**
 * @author Bhumi Desai.
 * @description This is sort presentation component, used for sorting the data.
 */
import { Component, ChangeDetectionStrategy, Optional, Inject } from '@angular/core';
import { DataSortPresenterService } from '../data-sort-presenter/data-sort-presenter.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Company, Group, SORT_DATA } from '../../../../data-table.model';

@Component({
  selector: 'app-data-sort-presentation',
  templateUrl: './data-sort-presentation.component.html',
  styleUrls: ['./data-sort-presentation.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [DataSortPresenterService]
})
export class DataSortPresentationComponent {

  /** This property is used to create for sort Form. */
  public sortForm: FormGroup;
  /** This property is used to create for store company []. */
  public companies: Company[];
  /** This property is used to create for store group []. */
  public groups: Group[];
  /** This property is used for date picker. */
  public bsConfig: any;
  /** This property is used for emit when sort apply. */
  public sortData: Subject<FormGroup>;
  /** This property is used for emit when sort close. */
  public closeSort: Subject<boolean>;
  /** This property is used for showing the dropdown options. */
  public sortArray : string[];

  constructor(
    private presenter: DataSortPresenterService,
    @Optional() @Inject(SORT_DATA) private data: any,
  ) {
    this.sortForm = this.presenter.buildForm();
    this.sortData = new Subject();
    this.closeSort = new Subject();
    this.bsConfig = {
      containerClass: 'theme-primary',
      adaptivePosition: false
    };
    this.sortArray = ['firstName','company','group','createdAt','email','productNumber','image'];
    if (this.data) {
      this.sortForm.patchValue(data);
      this.sortForm.markAsDirty();
    }
  }

  /**
   * This method is invoke when user click on Reset button.
   * Use for reset from value.
   */
  public onReset(): void {
    this.sortForm.reset();
  }

  /**
   * This method is invoke when user click on apply button.
   * Use for emit form value to parent.
   */
  public onApplysort(): void {
    this.sortData.next(this.sortForm.value);
    this.sortData.complete();
    this.dismiss();
  }

  /**
   * This method is invoke when user click dismiss button.
   */
  public dismiss(): void {
    this.closeSort.next(true);
    this.closeSort.complete();
  }


}


