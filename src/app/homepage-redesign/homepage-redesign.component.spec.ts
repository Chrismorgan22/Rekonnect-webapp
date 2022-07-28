import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageRedesignComponent } from './homepage-redesign.component';

describe('HomepageRedesignComponent', () => {
  let component: HomepageRedesignComponent;
  let fixture: ComponentFixture<HomepageRedesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageRedesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageRedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
