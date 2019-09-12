import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPresentationComponent } from './notification-presentation.component';

describe('NotificationPresentationComponent', () => {
  let component: NotificationPresentationComponent;
  let fixture: ComponentFixture<NotificationPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
