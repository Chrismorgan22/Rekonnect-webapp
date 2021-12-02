import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobViewComponent } from './candidate-job-view.component';

describe('CandidateJobViewComponent', () => {
  let component: CandidateJobViewComponent;
  let fixture: ComponentFixture<CandidateJobViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateJobViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateJobViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
