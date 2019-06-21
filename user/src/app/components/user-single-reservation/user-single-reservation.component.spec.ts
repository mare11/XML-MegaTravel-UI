import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleReservationComponent } from './user-single-reservation.component';

describe('UserSingleReservationComponent', () => {
  let component: UserSingleReservationComponent;
  let fixture: ComponentFixture<UserSingleReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSingleReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
