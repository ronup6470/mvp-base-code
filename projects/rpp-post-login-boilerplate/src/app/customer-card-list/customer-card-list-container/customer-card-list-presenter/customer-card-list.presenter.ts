/**
 * @author Hem Chudgar.
 * @description Presenter service for card list presentation component.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from '@ngx-translate/core';
// ---------------------------------------------- //
import { ConfirmationModalService, TableProperty, ConfirmationModalComponent } from 'common-libs';
import { CustomerList } from '../../customer.model';

/** Presenter */
@Injectable()
export class CustomerCardListPresenter {

  /** This property is used for subscribing the value of subject setTableProp */
  public setTableProp$: Observable<TableProperty>;

  /** This property is used for subscribe the value of subject delete Customer */
  public deleteCustomer$: Observable<CustomerList>;

  /** This property is used to store the Customers that has been retrieved from the API. */
  public customers: CustomerList[];

  /** This property is used to store the unique ID's of the selected Customers */
  public selectedCustomersId: Set<CustomerList>;

  /** This property is used to store the criteria that are selected by the user */
  public tableProperty: TableProperty;

  /** Stores the ID of the Customerthat needs to be deleted */
  public customerId: number;

  /** This property is used to store searchText . */
  public searchText: string;

  /** This is used for user info object */
  public setTableProp: BehaviorSubject<TableProperty>; 

  /** This property is used for emit when delete Customer.  */
  private deleteCustomer: Subject<CustomerList> ;

  constructor(
    private modalService: ConfirmationModalService,
    private translate: TranslateService
  ) {
    this.initProperty();
    this.setTableProp$ = this.setTableProp.asObservable();
    this.deleteCustomer$ = this.deleteCustomer.asObservable();
  }

  /** This method is invoke when table property change. */
  public setTableProperty(tableProperty: TableProperty): void {
    this.tableProperty = tableProperty;
    this.setTableProp.next(this.tableProperty);
  }

  /** This method is invoke when data successfully get */
  public getTableProperty(tableProperty: TableProperty, length: number): TableProperty {
    this.tableProperty = tableProperty;
    this.tableProperty.start = (this.tableProperty.pageLimit * (this.tableProperty.pageNumber)) + 1;
    this.tableProperty.end = this.tableProperty.start + length - 1;
    return this.tableProperty;
  }

  /**
   * This method is invoked when the user performs a global search. It resets the selected rows, updates the criteria
   * and then gets the new list of Customerbased on updated criteria.
   * @param searchTerm The search string that has been searched by the user
   */
  public onSearch(searchTerm: string): void {
    this.selectedCustomersId = new Set();
    if (searchTerm) {
      this.tableProperty = new TableProperty();
      this.tableProperty.search = searchTerm;
    } else {
      this.tableProperty = new TableProperty();
    }
    if (this.searchText === searchTerm) { return; }
    this.searchText = searchTerm;
    this.setTableProperty(this.tableProperty);
  }

  /** Get lazy loaded data on scroll */
  public onScroll(searchTerm: string, pageNo: number): void {
    if (searchTerm) {
      this.tableProperty = new TableProperty();
      this.tableProperty.search = searchTerm;
      this.tableProperty.pageNumber = 0;
    } else {
      this.tableProperty = new TableProperty();
      this.tableProperty.pageNumber = pageNo;
    }
    this.searchText = searchTerm;
    this.setTableProperty(this.tableProperty);
  }

  /** Get index from array */
  public getIndex(object: Object, array: Array<any>): number {
    return array.indexOf(object);
  }

  /** create for open modal when action perform */
  public openModal(customer: CustomerList): void {
    const modalInstance: ConfirmationModalComponent = this.modalService.openModal();
    modalInstance.confirmationMessage = this.translate.instant('confirmationMessage');
    modalInstance.positiveAction = this.translate.instant('positiveAction');
    modalInstance.negativeAction = this.translate.instant('negativeAction');
    modalInstance.confirmModal.subscribe((value: boolean) => {
      (value) ? this.onDelete(customer) : console.log('decline conformations');
      this.modalService.closeModal();
    });
  }

  /** create for delete record base on id. */
  public onDelete(customer: CustomerList): void {
    this.modalService.closeModal();
    this.selectedCustomersId = new Set()
    this.deleteCustomer.next(customer);
  }

  /** Initializes default properties for the component */
  private initProperty(): void {
    this.customers = [];
    this.selectedCustomersId = new Set()
    this.searchText = '';
    this.setTableProp = new BehaviorSubject(new TableProperty());
    this.deleteCustomer= new Subject();
  }
}

