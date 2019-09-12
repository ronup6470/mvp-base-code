import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableMobilePresentationComponent } from './data-table-mobile-presentation.component';

describe('DataTableMobilePresentationComponent', () => {
  let component: DataTableMobilePresentationComponent;
  let fixture: ComponentFixture<DataTableMobilePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableMobilePresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableMobilePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
