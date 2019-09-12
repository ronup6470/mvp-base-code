import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFilterPresentationComponent } from './data-filter-presentation.component';

describe('DataFilterComponent', () => {
  let component: DataFilterPresentationComponent;
  let fixture: ComponentFixture<DataFilterPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFilterPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilterPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
