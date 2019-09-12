import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropdownContainerComponent } from './notification-dropdown-container.component';

describe('NotificationDropdownContainerComponent', () => {
  let component: NotificationDropdownContainerComponent;
  let fixture: ComponentFixture<NotificationDropdownContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDropdownContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDropdownContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
