import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarWashReportComponent } from './car-wash-report.component';

describe('CarWashReportComponent', () => {
  let component: CarWashReportComponent;
  let fixture: ComponentFixture<CarWashReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarWashReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarWashReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
