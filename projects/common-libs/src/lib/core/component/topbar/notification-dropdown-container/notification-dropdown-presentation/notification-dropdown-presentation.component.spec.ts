import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropdownPresentationComponent } from './notification-dropdown-presentation.component';

describe('NotificationDropdownPresentationComponent', () => {
  let component: NotificationDropdownPresentationComponent;
  let fixture: ComponentFixture<NotificationDropdownPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDropdownPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDropdownPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
