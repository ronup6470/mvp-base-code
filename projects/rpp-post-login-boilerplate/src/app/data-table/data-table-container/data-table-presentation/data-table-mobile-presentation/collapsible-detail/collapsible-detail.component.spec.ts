import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleDetailComponent } from './collapsible-detail.component';

describe('CollapsibleDetailComponent', () => {
  let component: CollapsibleDetailComponent;
  let fixture: ComponentFixture<CollapsibleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsibleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
