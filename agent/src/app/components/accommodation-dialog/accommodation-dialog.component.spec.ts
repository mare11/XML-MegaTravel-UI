import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDialogComponent } from './accommodation-dialog.component';

describe('AccommodationDialogComponent', () => {
  let component: AccommodationDialogComponent;
  let fixture: ComponentFixture<AccommodationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
