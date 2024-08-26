import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPieChartComponent } from './customer-pie-chart.component';

describe('CustomerPieChartComponent', () => {
  let component: CustomerPieChartComponent;
  let fixture: ComponentFixture<CustomerPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
