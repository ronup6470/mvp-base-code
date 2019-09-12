import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablePresentationComponent } from './data-table-presentation.component';

describe('DataTablePresentationComponent', () => {
  let component: DataTablePresentationComponent;
  let fixture: ComponentFixture<DataTablePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablePresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
