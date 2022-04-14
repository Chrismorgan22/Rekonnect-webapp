import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicJobsComponent } from './view-public-jobs.component';

describe('ViewPublicJobsComponent', () => {
  let component: ViewPublicJobsComponent;
  let fixture: ComponentFixture<ViewPublicJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPublicJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPublicJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
