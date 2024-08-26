import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarWashDashboardComponent } from './car-wash-dashboard.component';

describe('CarWashDashboardComponent', () => {
  let component: CarWashDashboardComponent;
  let fixture: ComponentFixture<CarWashDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarWashDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarWashDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
