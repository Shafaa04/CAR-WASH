import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBarChartComponent } from './customer-bar-chart.component';

describe('CustomerBarChartComponent', () => {
  let component: CustomerBarChartComponent;
  let fixture: ComponentFixture<CustomerBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
