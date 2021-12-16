import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavscreenComponent } from './navscreen.component';

describe('NavscreenComponent', () => {
  let component: NavscreenComponent;
  let fixture: ComponentFixture<NavscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
