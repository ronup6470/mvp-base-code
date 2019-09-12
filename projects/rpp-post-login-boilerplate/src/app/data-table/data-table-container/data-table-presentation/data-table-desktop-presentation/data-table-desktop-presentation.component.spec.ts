import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableDesktopPresentationComponent } from './data-table-desktop-presentation.component';

describe('DataTableDesktopPresentationComponent', () => {
  let component: DataTableDesktopPresentationComponent;
  let fixture: ComponentFixture<DataTableDesktopPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableDesktopPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableDesktopPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
