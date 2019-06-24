import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsAndMessagesComponent } from './reservations-and-messages.component';

describe('ReservationsAndMessagesComponent', () => {
  let component: ReservationsAndMessagesComponent;
  let fixture: ComponentFixture<ReservationsAndMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsAndMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsAndMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
