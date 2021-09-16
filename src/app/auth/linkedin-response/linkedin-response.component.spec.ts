import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinResponseComponent } from './linkedin-response.component';

describe('LinkedinResponseComponent', () => {
  let component: LinkedinResponseComponent;
  let fixture: ComponentFixture<LinkedinResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedinResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
