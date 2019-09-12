import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSortPresentationComponent } from './data-sort-presentation.component';

describe('DataSortPresentationComponent', () => {
  let component: DataSortPresentationComponent;
  let fixture: ComponentFixture<DataSortPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSortPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSortPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
