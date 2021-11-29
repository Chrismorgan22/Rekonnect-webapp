import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgvFormDashboardComponent } from './bgv-form-dashboard.component';

describe('BgvFormDashboardComponent', () => {
  let component: BgvFormDashboardComponent;
  let fixture: ComponentFixture<BgvFormDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgvFormDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgvFormDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
