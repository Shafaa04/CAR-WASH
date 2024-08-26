import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLauyoutComponent } from './main-lauyout.component';

describe('MainLauyoutComponent', () => {
  let component: MainLauyoutComponent;
  let fixture: ComponentFixture<MainLauyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLauyoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLauyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
