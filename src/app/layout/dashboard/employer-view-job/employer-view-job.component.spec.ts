import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerViewJobComponent } from './employer-view-job.component';

describe('EmployerViewJobComponent', () => {
  let component: EmployerViewJobComponent;
  let fixture: ComponentFixture<EmployerViewJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerViewJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerViewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
